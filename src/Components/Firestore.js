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
  where,
  runTransaction,
  getCountFromServer,
  addDoc,
  updateDoc,
  deleteField,
  increment,
  collectionGroup,
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

export async function getReviewCount(docId, type, setReviewCount) {
  if (!docId || !type) return;
  let collectionName = type === "reviews" ? "animeData" : "watchlistData";
  let docIdString = docId.toString();
  try {
    let collectionRef = collection(db, collectionName, docIdString, "reviews");
    let q = query(collectionRef);
    const countSnapshot = await getCountFromServer(q);
    let numOfReviews = countSnapshot.data().count;
    setReviewCount(numOfReviews);
  } catch (error) {
    console.error("Error getting review count from Firebase Database: ", error);
  }
}

export function generateId() {
  return doc(collection(db, "test")).id;
}

// Handle "watchlistData / reactions" on firestore

export async function getUserReactions(uid, uniqueEntityId) {
  let reactionsRef = doc(db, "users", uid, "reactions", uniqueEntityId);
  let reactionSnap = await getDoc(reactionsRef);
  if (!reactionSnap.data()) {
    // Use default value if the document doesn't exist yet.
    return {
      uniqueEntityId: uniqueEntityId,
      applause: false,
      heart: false,
      trash: false,
    };
  } else {
    return reactionSnap.data();
  }
}

export async function getWatchlistReactionCount(docId) {
  let rxnCountRef = doc(db, "watchlistData", docId);
  let rxnCountSnap = await getDoc(rxnCountRef);
  return rxnCountSnap.data();
}

export async function SaveReactionsToFirestore(
  uid,
  docId,
  updatedRxns,
  reactionTo,
  reaction,
  commentOwnerId
) {
  const value = updatedRxns[reaction] ? 1 : -1;
  let key;
  if (reaction === "trash") key = "trashCount";
  else if (reaction === "heart") key = "heartCount";
  else if (reaction === "applause") key = "applauseCount";
  else throw new Error(`Unknown reaction: ${reaction}`);

  const uniqueEntityId =
    reactionTo === "comments" ? docId + commentOwnerId : docId;

  const rxnRef = doc(db, "users", uid, "reactions", uniqueEntityId);
  let rxnCountRef;

  if (reactionTo === "list") {
    rxnCountRef = doc(db, "watchlistData", docId);
  } else if (reactionTo === "reviews") {
    rxnCountRef = doc(db, "animeData", docId, "reviews", uid);
  } else if (reactionTo === "comments") {
    rxnCountRef = doc(db, "watchlistData", docId, "reviews", commentOwnerId);
  } else throw new Error(`Unknown item reacted to: ${reactionTo}`);
  try {
    await Promise.all(
      [
        setDoc(
          rxnRef,
          { [reaction]: updatedRxns[reaction], uniqueEntityId },
          { merge: true }
        ),
      ],
      updateDoc(rxnCountRef, { [key]: increment(value) })
    );
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

export async function CreateWatchlistDataEntry(userId, listId) {
  const listData = {
    userId: userId,
    listId: listId,
    random: generateRandomWatchlistInt(),
    applauseCount: 0,
    heartCount: 0,
    trashCount: 0,
  };
  const docName = userId + listId;
  let docRef = doc(db, "watchlistData", docName);
  try {
    await setDoc(docRef, listData);
  } catch (error) {
    console.error("Error writing watchlistData entry to Firestore", error);
  }
}

export async function SaveNotification(notification, IdToNotify) {
  let subcollectionRef = collection(
    db,
    "notifications",
    IdToNotify,
    "usersNotifications"
  );
  try {
    await addDoc(subcollectionRef, notification);
  } catch (error) {
    console.error("Error writing notifications to Firestore: ", error);
  }
}

export async function DeleteNotification(notification, IdToUnnotify) {
  try {
    const d = query(
      collection(db, "notifications", IdToUnnotify, "usersNotifications"),
      where("interactorId", "==", notification.interactorId),
      where("docId", "==", notification.docId),
      where("action", "==", notification.action)
    );
    const docSnap = await getDocs(d);
    await Promise.all(docSnap.docs.map((doc) => deleteDoc(doc.ref)));
  } catch (error) {
    console.error("Error deleting notification from Firestore: ", error);
  }
}

export async function MarkNotificationsSeenOrRead(notiArray, IdToNotify, verb) {
  for (let item of notiArray) {
    const docRef = doc(
      db,
      "notifications",
      IdToNotify,
      "usersNotifications",
      item.firestoreDocId
    );
    try {
      await updateDoc(docRef, { [verb]: true });
    } catch (error) {
      console.error("Error updating notifications on Firestore: ", error);
    }
  }
}

function generateRandomWatchlistInt() {
  return Math.floor(Math.random() * 9999999);
}

export async function getRandomCommunityList() {
  // Repeat call to try and ensure a list with at least (1) anime title is found.
  for (let i = 1; i < 6; i++) {
    try {
      const randomNumber = generateRandomWatchlistInt();
      const q = query(
        collection(db, "watchlistData"),
        where("random", ">=", randomNumber),
        limit(1)
      );
      let querySnapshot = await getDocs(q);
      let listInfo;
      querySnapshot.forEach((doc) => {
        listInfo = { ...doc.data() };
      });
      if (!listInfo) {
        const wrapAroundQuery = query(
          collection(db, "watchlistData"),
          where("random", "<=", randomNumber),
          limit(1)
        );
        querySnapshot = await getDocs(wrapAroundQuery);
        querySnapshot.forEach((doc) => {
          listInfo = { ...doc.data() };
        });
      }
      // Populate anime info for list selected above
      const docRef = doc(db, "users", listInfo.userId);
      const data = await getDoc(docRef);
      const lists = data.data()?.lists;
      for (let item of lists) {
        if (item.id === listInfo.listId && item.anime.length > 0) {
          const data = {
            userId: listInfo.userId,
            listId: listInfo.listId,
            // Only pull 24 shows from list, to prevent unnecessary firestore reads
            anime: item.anime.slice(0, 24),
          };
          return data;
        }
      }
    } catch (error) {
      console.error(
        "Error fetching random community list from Firestore",
        error
      );
    }
  }
}

export async function deleteWatchlistDataEntry(userId, listId) {
  const listDocRef = doc(db, "watchlistData", userId + listId);

  return runTransaction(db, async (transaction) => {
    // This code may get re-run multiple times if there are conflicts.
    const listDoc = await transaction.get(listDocRef);

    // The update will only succeed if the document read above has not changed since then.
    // Otherwise, it will re-run this function.
    transaction.update(listDocRef, {
      random: deleteField(),
      awaitingDeletion: true,
    });
  });
  // To-do: Write script to delete all sub-collections whose  ancestor doc
  // has a true value for 'awaitingDeletion' field.
  // Run this script periodically from server as deleting collections
  // from a web client is not recommended by firestore.
}
