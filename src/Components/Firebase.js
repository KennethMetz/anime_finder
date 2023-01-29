import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  TwitterAuthProvider,
  signInAnonymously,
  updateProfile,
  linkWithPopup,
  EmailAuthProvider,
  linkWithCredential,
} from "firebase/auth";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

// Firebase authentication initialization
const firebaseApp = initializeApp({
  apiKey: "AIzaSyB8-v2I6mtPvmvopHB4bNII1fv_naA_YmQ",
  authDomain: "anime-finder-b3751.firebaseapp.com",
  projectId: "anime-finder-b3751",
  storageBucket: "anime-finder-b3751.appspot.com",
  messagingSenderId: "150771130448",
  appId: "1:150771130448:web:ac5a65a572061ad1073155",
});

export const auth = getAuth(firebaseApp);

export const db = getFirestore(firebaseApp);

// function onAuthStateChange() {
//   return firebase.auth().onAuthStateChanged((user) => {
//     if (user) console.log("user is logged in");
//     else console.log("user is NOT logged in");
//   });
// }

//************************Google Authentication*************************//
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, provider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        },
        { merge: true }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

//Merge existing account to use Google credentials
export const linkWithGoogle = async (setForwardToken) => {
  try {
    const result = await linkWithPopup(auth.currentUser, provider);

    // Accounts successfully linked.
    const credential = GoogleAuthProvider.credentialFromResult(result);

    const user = result.user;
    await updateProfile(auth.currentUser, {
      displayName: result.user.providerData[0].displayName,
    });

    // Firebase auth displayName successfully updated.
    await setDoc(
      doc(db, "users", user.uid),
      {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      },
      { merge: true }
    );

    // forwardToken keeps user on login page until login w/ Google is verified.
    setForwardToken(true);
  } catch (error) {
    console.log(error);
  }
};

//************************Twitter Authentication*************************//
const providerTwitter = new TwitterAuthProvider();

export const signInWithTwitter = async () => {
  try {
    const res = await signInWithPopup(auth, providerTwitter);
    // const credential = await TwitterAuthProvider.credentialFromResult(res);
    // const token = credential.accessToken;
    // const secret = credential.secret;
    const user = res.user;
    console.log(user);
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      if (user.email) {
        await setDoc(
          doc(db, "users", user.uid),
          {
            uid: user.uid,
            name: user.displayName,
            authProvider: "twitter",
            email: user.email,
          },
          { merge: true }
        );
      } else {
        await setDoc(
          doc(db, "users", user.uid),
          {
            uid: user.uid,
            name: user.displayName,
            authProvider: "twitter",
            email: user.email,
          },
          { merge: true }
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// Merge existing account to use Twitter credentials.
export const linkWithTwitter = async (setForwardToken) => {
  try {
    const result = await linkWithPopup(auth.currentUser, providerTwitter);

    // Accounts successfully linked.
    const credential = TwitterAuthProvider.credentialFromResult(result);

    const user = result.user;
    await updateProfile(auth.currentUser, {
      displayName: result.user.providerData[0].displayName,
    });

    // Firebase auth displayName successfully updated.
    await setDoc(
      doc(db, "users", user.uid),
      {
        uid: user.uid,
        name: user.displayName,
        authProvider: "twitter",
        email: user.email,
      },
      { merge: true }
    );

    // forwardToken keeps user on login page until login w/ Google is verified.
    setForwardToken(true);
  } catch (error) {
    console.log(error);
  }
};

//************************Anonymous Authentication*************************//
export const logInAnon = async () => {
  try {
    const res = await signInAnonymously(auth);
    const user = res.user;
    console.log(user);
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      if (user.uid) {
        await setDoc(
          doc(db, "users", user.uid),
          {
            uid: user.uid,
            name: "guest",
            authProvider: "anonymous",
          },
          { merge: true }
        );
      } else {
        await updateDoc(
          doc(db, "users", user.uid),
          {
            uid: user.uid,
            name: "guest",
            authProvider: "anonymous",
          },
          { merge: true }
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};

//************************Email/Password Authentication*************************//
export const logInWithEmailAndPassword = async (
  email,
  password,
  setLoginError
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    setLoginError(undefined);
  } catch (error) {
    console.log(error);
    if (error["code"].search(/\buser-not-found\b/) > -1) {
      setLoginError("*Email not found");
    } else if (error["code"].search(/\bwrong-password\b/) > -1) {
      setLoginError("*Incorrect password");
    } else if (error["code"].search(/\btoo-many-requests\b/) > -1) {
      setLoginError(
        "*Your account has been locked due to too many login attempts. Please reset your password to unlock your account."
      );
    }
  }
};

export const registerWithEmailAndPassword = async (
  name,
  email,
  password,
  setEmailError
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    //Writes name to firebase's auth profile....as this isn't done automatically for some odd reason.
    updateProfile(auth.currentUser, {
      displayName: name,
    });
    const user = res.user;
    await setDoc(
      doc(db, "users", user.uid),
      {
        uid: user.uid,
        name,
        authProvider: "email/password via firebase",
        email,
      },
      { merge: true }
    );
    setEmailError(false);
  } catch (error) {
    console.log(error);
    //Used to alert user their email address is already in Firebase and can't be used
    if (error["code"].search(/\bemail-already-in-use\b/) > -1)
      setEmailError(true);
  }
};

//Merge existing account to use Email/Password credentials
export const linkWithEmailAndPassword = async (
  setForwardToken,
  email,
  password,
  name
) => {
  try {
    const credential = EmailAuthProvider.credential(email, password);

    const usercred = await linkWithCredential(auth.currentUser, credential);

    const user = usercred.user;
    console.log("Accounts linked successfully!", user);
    await updateProfile(auth.currentUser, {
      displayName: name,
    });

    // Firebase auth displayName successfully updated.
    await setDoc(
      doc(db, "users", user.uid),
      {
        uid: user.uid,
        name: user.displayName,
        authProvider: "email/password via firebase",
        email: user.email,
      },
      { merge: true }
    );

    // forwardToken keeps user on login page until login w/ email is verified.
    setForwardToken(true);
  } catch (error) {
    console.log(error);
  }
};

export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => {
  signOut(auth);
};
