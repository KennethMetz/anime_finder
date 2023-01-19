import { setDoc, getDoc, doc } from "firebase/firestore";
import { db } from "./Firebase";

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
      await setDoc(
        doc(db, "users", user.uid),
        {
          likes: localUser.likes,
          dislikes: localUser.dislikes,
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error writing data to Firestore", error);
    }
  }
}
