import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { setDoc, getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./Firebase";

import { LocalUserContext } from "./LocalUserContext";
import { useContext } from "react";

export async function PopulateFromFirestore(user, localUser, setLocalUser) {
  try {
    let docRef = doc(db, "users", user.uid);
    let querySnapshot = await getDoc(docRef);
    let data = querySnapshot.data();
    setLocalUser(data);
  } catch (error) {
    console.error("Error loading data from Firebase Database", error);
  }
}

export async function SaveToFirestore(user, localUser) {
  //   const [user] = useAuthState(auth);
  if (user) {
    try {
      // let data = JSON.stringify(localUser);

      await updateDoc(doc(db, "users", user.uid), {
        likes: localUser.likes,
        dislikes: localUser.dislikes,
      });
    } catch (error) {
      console.error("Error writing data to Firestore", error);
    }
  }
}
