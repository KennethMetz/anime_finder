import { auth, db } from "../Components/Firebase";
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
  linkWithCredential,
  linkWithPopup,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useContext } from "react";
import { LocalUserContext } from "../Components/LocalUserContext";
import {
  CreateWatchlistDataEntry,
  PopulateFromFirestore,
  SaveToFirestore,
} from "../Components/Firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function useAuthActions() {
  const [localUser, setLocalUser] = useContext(LocalUserContext);

  // A general function handling a successful authentication.
  async function onSuccessImpl(
    userCredential,
    authProvider,
    displayNameOverride,
    isRegistration
  ) {
    const user = userCredential.user;

    const userDocRef = doc(db, "users", user.uid);

    const existingUserDoc = await getDoc(userDocRef);
    const userDocAlreadyExists = existingUserDoc.exists();

    // Always write auth info to /users.
    await setDoc(
      userDocRef,
      {
        uid: user.uid,
        authProvider: authProvider,
        email: user.email,
      },
      { merge: true }
    );

    // If this is a new registration, write onboarding LocalUser to /users.
    if (isRegistration && !userDocAlreadyExists) {
      // Set initial display name first.
      const newLocalUser = { ...localUser };
      newLocalUser.name = displayNameOverride ?? user.displayName;
      setLocalUser(newLocalUser);
      await SaveToFirestore(user, newLocalUser);
    }

    // FInally, in all cases, load the user's LocalUser from /users.
    await PopulateFromFirestore(user, localUser, setLocalUser);
  }

  async function onLoginSuccess(userCredential, authProvider) {
    return onSuccessImpl(
      userCredential,
      authProvider,
      /*displayNameOverride=*/ undefined,
      /*isRegistration=*/ false
    );
  }

  async function onRegistrationSuccess(
    userCredential,
    authProvider,
    displayNameOverride = undefined
  ) {
    return onSuccessImpl(
      userCredential,
      authProvider,
      displayNameOverride,
      /*isRegistration=*/ true
    );
  }

  async function writeAllWatchlistDataEntries() {
    await Promise.all(
      localUser?.lists.map((doc) =>
        CreateWatchlistDataEntry(localUser.uid, doc.id)
      )
    );
  }

  return {
    loginWithGoogle: async () => {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      await onLoginSuccess(userCredential, "google");
    },
    linkWithGoogle: async () => {
      const provider = new GoogleAuthProvider();
      const userCredential = await linkWithPopup(auth, provider);
      await onRegistrationSuccess(userCredential, "google");
      await writeAllWatchlistDataEntries();
    },
    registerWithGoogle: async () => {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      await onRegistrationSuccess(userCredential, "google");
    },
    loginWithTwitter: async () => {
      const provider = new TwitterAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      await onLoginSuccess(userCredential, "twitter");
    },
    linkWithTwitter: async () => {
      const provider = new TwitterAuthProvider();
      const userCredential = await linkWithPopup(auth, provider);
      await onRegistrationSuccess(userCredential, "twitter");
      await writeAllWatchlistDataEntries();
    },
    registerWithTwitter: async () => {
      const provider = new TwitterAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      await onRegistrationSuccess(userCredential, "twitter");
    },
    loginWithEmail: async (email, password) => {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      await onLoginSuccess(userCredential, "email/password via firebase");
    },
    linkWithEmail: async (email, password) => {
      const credential = EmailAuthProvider.credential(email, password);
      const userCredential = await linkWithCredential(
        auth.currentUser,
        credential
      );
      await onRegistrationSuccess(
        userCredential,
        "email/password via firebase"
      );
      await writeAllWatchlistDataEntries();
    },
    registerWithEmail: async (email, password) => {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await onRegistrationSuccess(
        userCredential,
        "email/password via firebase"
      );
    },
    registerAnonymously: async () => {
      const userCredential = await signInAnonymously(auth);
      await onRegistrationSuccess(
        userCredential,
        "anonymous",
        /*displayNameOverride=*/ "Guest"
      );
    },
  };
}
