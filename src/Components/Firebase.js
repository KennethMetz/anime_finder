import firebase, { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  TwitterAuthProvider,
  getRedirectResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
} from "firebase/auth";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
  doc,
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

//Google authentication
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, provider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//Twitter authentication
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
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "twitter",
          email: user.email,
        });
      } else {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "twitter",
          email: user.email,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

//Phone Number authentication
// window.recaptchaVerifier = new RecaptchaVerifier(
//   "recaptcha-container",
//   {},
//   auth
// );

// const phoneNumber = getPhoneNumberFromUserInput();
// const appVerifier = window.recaptchaVerifier;

export const logInWithPhoneNumber = async () => {
  // try {
  //   const res = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
  //   const user = res.user;
  //   const q = query(collection(db, "users"), where("uid", "==", user.uid));
  //   const docs = await getDocs(q);
  //   if (docs.docs.length === 0) {
  //     await addDoc(collection(db, "users"), {
  //       uid: user.uid,
  //       name: user.displayName,
  //       authProvider: "google",
  //       email: user.email,
  //     });
  //   }
  // } catch (error) {
  //   console.log(error);
  //   appVerifier.reset(window.recaptchaWidgetId);
  // }
};

//Email and password authentication
export const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
  }
};

export const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      authProvider: "email/password via firebase",
      email,
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => {
  signOut(auth);
};
