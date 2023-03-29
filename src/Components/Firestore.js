import {
  setDoc,
  getDoc,
  doc,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./Firebase";

// Handle "users" collection on firestore

export async function PopulateFromFirestore(user, localUser, setLocalUser) {
  try {
    let docRef = doc(db, "users", user.uid);
    let querySnapshot = await getDoc(docRef);
    let data = querySnapshot.data();
    let temp = sortTitles(data);
    if (!temp.top8) temp.top8 = [];
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
          top8: [...localUser.top8],
          reviews: [...localUser.reviews],
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error writing data to Firestore", error);
    }
  }
}

// Handle "animeData" collection on firestore

export async function SaveReviewToFirestore(userID, userReview, animeID) {
  let reviewRef = doc(db, "animeData", animeID, "reviews", userID);
  try {
    await setDoc(reviewRef, userReview, { merge: true });
  } catch (error) {
    console.error("Error writing review data to Firestore", error);
  }
}

export async function DeleteReviewFromFirestore(user, animeID) {
  const userID = user.uid.toString();
  await deleteDoc(doc(db, "animeData", animeID, "reviews", userID));
}

export async function PopulateReviewsFromFirestore(anime, setAnimeReviews) {
  try {
    // Populate review info
    let animeID = anime.id.toString();
    let animeRef = collection(db, "animeData", animeID, "reviews");
    let querySnapshot = await getDocs(animeRef);
    // Populate reviewers info
    let temp = [];
    //
    // TODO: Break each async call to be performed in parallel
    //
    querySnapshot.forEach(async (doc) => {
      let userInfo = await getReviewerInfo(doc.id);
      let userReview = { ...doc.data() };
      let review = {
        ...userReview,
        name: userInfo.name,
        avatar: userInfo.avatar,
        reviews: userInfo.reviews,
      };
      temp.push(review);
    });
    //
    // TODO: Sort reviews by date, popularity...or whatever makes sense
    //
    setAnimeReviews(temp);
  } catch (error) {
    console.error("Error loading data from Firebase Database", error);
  }

  async function getReviewerInfo(userID) {
    let docRef = doc(db, "users", userID);
    let querySnapshot = await getDoc(docRef);
    let data = querySnapshot.data();
    return data;
  }
}
