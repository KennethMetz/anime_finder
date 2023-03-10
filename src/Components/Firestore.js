import { setDoc, getDoc, doc } from "firebase/firestore";
import { db } from "./Firebase";

export async function PopulateFromFirestore(user, localUser, setLocalUser) {
  try {
    let docRef = doc(db, "users", user.uid);
    let querySnapshot = await getDoc(docRef);
    let data = querySnapshot.data();
    let temp = sortTitles(data);
    setLocalUser(temp);
  } catch (error) {
    console.error("Error loading data from Firebase Database", error);
  }
}

function compareTitles(a, b) {
  if (a.display_name < b.display_name) {
    return -1;
  }
  if (a.display_name > b.display_name) {
    return 1;
  }
  return 0;
}

function sortTitles(data) {
  let temp = { ...data };
  if (data.likes.length > 1) {
    temp["likes"] = temp["likes"].sort(compareTitles);
  }
  if (data.dislikes.length > 1) {
    temp["dislikes"] = temp["dislikes"].sort(compareTitles);
  }
  return temp;
}

export async function SaveToFirestore(user, localUser) {
  //   const [user] = useAuthState(auth);

  if (user) {
    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          likes: [...localUser.likes],
          dislikes: [...localUser.dislikes],
          lists: [...localUser.lists],
          avatar: localUser?.avatar ?? null,
          bio: localUser?.bio ?? null,
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error writing data to Firestore", error);
    }
  }
}
