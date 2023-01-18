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
      //DELETING THE BELOW AWAIT CAUSES THE FOLLOWING UPDATEDOC TO ERROR OUT: "NO DOCUMENT TO UPDATE"
      const userProf = await getDoc(doc(db, "users", user.uid));
      if (userProf.exists()) {
        console.log("THE PROFILE EXISTS!!");
      } else {
        console.log("No profile exists.");
      }
      //**************END OF AWAIT REFERENCED IN ABOVE COMMENT**********************
      await updateDoc(doc(db, "users", user.uid), {
        likes: localUser.likes,
        dislikes: localUser.dislikes,
      });
    } catch (error) {
      console.error("Error writing data to Firestore", error);
    }
  }
}
