import {
  setDoc,
  getDoc,
  doc,
  getDocs,
  collection,
  deleteDoc,
  query,
  orderBy,
  limit,
  startAfter,
  limitToLast,
  endBefore,
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
    if (!temp.reviews) temp.reviews = [];
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
    let animeID = anime.id.toString();
    let animeRef = collection(db, "animeData", animeID, "reviews");
    let querySnapshot = await getDocs(animeRef);
    let temp = [];
    querySnapshot.forEach((doc) => {
      temp.push({ ...doc.data() });
    });
    temp = sortReviews(temp);
    setAnimeReviews(temp);
  } catch (error) {
    console.error("Error loading data from Firebase Database", error);
  }
}

function sortReviews(data) {
  let temp = [...data];
  if (data.length > 1) {
    temp = temp.sort(compareReviewDates);
  }
  return temp;
}

function compareReviewDates(a, b) {
  if (a.time.seconds > b.time.seconds) {
    return -1;
  }
  if (a.time.seconds < b.time.seconds) {
    return 1;
  }
  return 0;
}

export async function GetPaginatedReviewsFromFirestore(
  anime,
  animeReviews,
  setAnimeReviews,
  sortOption,
  lastVisible,
  setLastVisible,
  setSeeMore
) {
  try {
    let animeID = anime.id.toString();
    let collectionQuery = null;
    if (!lastVisible) {
      collectionQuery = query(
        collection(db, "animeData", animeID, "reviews"),
        orderBy(sortOption[0], sortOption[1]),
        limit(4)
      );
    } else {
      collectionQuery = query(
        collection(db, "animeData", animeID, "reviews"),
        orderBy(sortOption[0], sortOption[1]),
        startAfter(lastVisible),
        limit(4)
      );
    }
    const documentSnapshots = await getDocs(collectionQuery);
    if (documentSnapshots._snapshot.docChanges.length < 4) setSeeMore(false);

    let temp = [];
    if (animeReviews && lastVisible) temp = [...animeReviews];
    documentSnapshots.forEach((doc) => {
      temp.push({ ...doc.data() });
    });
    console.log(temp);
    setAnimeReviews(temp);
    setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
  } catch (error) {
    console.error("Error loading data from Firebase Database", error);
  }
}
