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
  where,
  runTransaction,
  getCountFromServer,
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
        handle: "",
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
          handle: localUser?.handle ?? null,
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error writing data to Firestore", error);
    }
  }
}

// Handle "animeData" collection on firestore

export async function SaveReviewToFirestore(
  userID,
  userReview,
  docIdString,
  type,
  reviewCount
) {
  let collectionName = type === "reviews" ? "animeData" : "watchlistData";
  try {
    let subdocumentRef = doc(
      db,
      collectionName,
      docIdString,
      "reviews",
      userID
    );
    await setDoc(subdocumentRef, userReview, { merge: true });
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
  type,
  setReviewCount
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
    // To-Do: Prevent seeMore button from showing up when all results are showing (ie. if there are 4, 8, 12...results)
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
    console.error("Error loading data from Firebase Database: ", error);
  }
}

export async function GetReviewCount(docId, type, setReviewCount) {
  if (!docId || !type) return;
  let collectionName = type === "reviews" ? "animeData" : "watchlistData";
  let docIdString = docId.toString();
  try {
    let collectionRef = collection(db, collectionName, docIdString, "reviews");
    let q = query(collectionRef);
    // Get count of docs - NOT WORKING CORRECTLY FOR COMMENTS
    const countSnapshot = await getCountFromServer(q);
    let numOfReviews = countSnapshot.data().count;
    setReviewCount(numOfReviews);
    console.log(numOfReviews);
    // Get docs - works fine and proves the docs ARE there!!
    let docSnapshot = await getDocs(q);
    let docs = [];
    docSnapshot.forEach((x) => {
      docs.push(x.data());
    });
    console.log(docs);
  } catch (error) {
    console.error("Error getting review count from Firebase Database: ", error);
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

export async function ClaimHandle(handle, userId) {
  const handleDocRef = doc(db, "handles", handle);
  const userDocRef = doc(db, "users", userId);

  return runTransaction(db, async (transaction) => {
    // This code may get re-run multiple times if there are conflicts.
    const handleDoc = await transaction.get(handleDocRef);

    if (handleDoc.exists()) {
      throw new Error("Handle has already been taken");
    }

    // These two writes will only succeed if the document read above has not changed since then.
    // Otherwise, it will re-run this function.
    transaction.set(handleDocRef, { uid: userId, handle: handle });
    transaction.update(userDocRef, { handle: handle });
  });
}
