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
    if (!data.likes) {
      data = {
        ...data,
        likes: [],
        dislikes: [],
        lists: [],
        savedLists: [],
        avatar: "",
        bio: "",
        top8: [],
        reviews: [],
        comments: [],
      };
    }
    if (!data.savedLists) data.savedLists = [];
    if (!data.top8) data.top8 = [];
    if (!data.reviews) data.reviews = [];
    if (!data.comments) data.comments = [];
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
          name: localUser.name ?? null,
          likes: [...localUser.likes],
          dislikes: [...localUser.dislikes],
          lists: [...localUser.lists],
          savedLists: [...localUser.savedLists],
          avatar: localUser?.avatar ?? null,
          bio: localUser?.bio ?? null,
          top8: [...localUser.top8],
          reviews: [...localUser.reviews],
          comments: [...localUser.comments],
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error writing data to Firestore", error);
    }
  }
}

// Handle "animeData" collection on firestore

export async function SaveReviewToFirestore(userID, userReview, animeID, type) {
  let collectionName = type === "reviews" ? "animeData" : "watchlistData";
  let reviewRef = doc(db, collectionName, animeID, "reviews", userID);
  try {
    await setDoc(reviewRef, userReview, { merge: true });
  } catch (error) {
    console.error("Error writing review data to Firestore", error);
  }
}

export async function DeleteReviewFromFirestore(user, animeID, type) {
  let collectionName = type === "reviews" ? "animeData" : "watchlistData";
  const userID = user.uid.toString();
  await deleteDoc(doc(db, collectionName, animeID, "reviews", userID));
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
  docId,
  reviews,
  setReviews,
  sortOption,
  lastVisible,
  setLastVisible,
  seeMore,
  setSeeMore,
  type
) {
  let collectionName = type === "reviews" ? "animeData" : "watchlistData";
  try {
    if (!docId) return;
    let docIdString = docId.toString();
    let collectionQuery = null;
    if (!lastVisible) {
      collectionQuery = query(
        collection(db, collectionName, docIdString, "reviews"),
        orderBy(sortOption[0], sortOption[1]),
        limit(4)
      );
    } else {
      collectionQuery = query(
        collection(db, collectionName, docIdString, "reviews"),
        orderBy(sortOption[0], sortOption[1]),
        startAfter(lastVisible),
        limit(4)
      );
    }
    const documentSnapshots = await getDocs(collectionQuery);
    if (documentSnapshots._snapshot.docChanges.length < 4) setSeeMore(false);
    else if (seeMore === false) setSeeMore(true);
    let temp = [];
    if (reviews && lastVisible) temp = [...reviews];
    documentSnapshots.forEach((doc) => {
      temp.push({ ...doc.data() });
    });
    setReviews(temp);
    setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
  } catch (error) {
    console.error("Error loading data from Firebase Database", error);
  }
}

export function generateId() {
  return doc(collection(db, "test")).id;
}

// Handle "watchlistData / reactions" on firestore

export async function GetListReactions(docId, setListRxns) {
  try {
    let animeRef = doc(db, "watchlistData", docId, "reactions", "emojis");
    let querySnapshot = await getDoc(animeRef);
    // Use default value if the document doesn't exist yet.
    if (!querySnapshot.data()) {
      setListRxns({
        emojis: { applause: [], heart: [], trash: [] },
      });
      return;
    }
    let temp = querySnapshot.data();
    setListRxns(temp);
  } catch (error) {
    console.error("Error loading data from Firebase Database", error);
  }
}

export async function SaveListReactionsToFirestore(docId, updatedRxns) {
  let Ref = doc(db, "watchlistData", docId, "reactions", "emojis");
  try {
    await setDoc(Ref, updatedRxns, { merge: true });
  } catch (error) {
    console.error("Error writing review data to Firestore", error);
  }
}
