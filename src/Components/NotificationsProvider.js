import { useEffect, useState } from "react";
import NotificationsContext from "./NotificationsContext";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { auth, db } from "./Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function NotificationsProvider(props) {
  const [user, loading, error] = useAuthState(auth);
  const [notifications, setNotifications] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [hideBadge, setHideBadge] = useState(true);
  const [listeningDoc, setListeningDoc] = useState([]);
  const [lastVisible, setLastVisible] = useState();

  // Creates realtime listener on most recent notification
  // Used as trigger for query of unseen data
  useEffect(() => {
    if (!user) return;
    // Set listener for changes
    const notisRef = collection(
      db,
      "notifications",
      user?.uid,
      "usersNotifications"
    );
    const q = query(notisRef, orderBy("time", "desc"), limit(5));
    const unsub = onSnapshot(q, (documentSnapshots) => {
      const latestNoti = [];
      documentSnapshots.forEach((doc) => {
        latestNoti.push({ ...doc.data(), firestoreDocId: doc.id });
      });
      setListeningDoc(latestNoti);
    });
    return unsub;
  }, [user]);

  async function GetNotis() {
    if (!user) return;
    const notisRef = collection(
      db,
      "notifications",
      user?.uid,
      "usersNotifications"
    );
    let q;
    if (!lastVisible) {
      q = query(notisRef, orderBy("time", "desc"), limit(5));
    } else {
      q = query(
        notisRef,
        orderBy("time", "desc"),
        startAfter(lastVisible),
        limit(5)
      );
    }
    try {
      const documentSnapshots = await getDocs(q);
      const notis = [...notifications];
      let docCount = 0;
      documentSnapshots.forEach((doc) => {
        docCount++;
        notis.push({ ...doc.data(), firestoreDocId: doc.id });
      });
      if (docCount === 5) {
        setShowMore(true);
        notis.splice(notis.length - 1);
        setLastVisible(
          documentSnapshots.docs[documentSnapshots.docs.length - 2]
        );
      } else {
        setShowMore(false);
        setLastVisible(null);
      }
      setNotifications(notis);
    } catch (error) {
      console.error("Error getting more notifications from Firestore: ", error);
    }
  }

  // The count() firestore fn can't be used with real-time listeners...so this is my work-around.
  useEffect(() => {
    if (!user || !notifications) return;
    GetUnseenNotiCount().then((result) => {
      setHideBadge(result);
    });
  }, [listeningDoc]);

  async function GetUnseenNotiCount() {
    const notisRef = collection(
      db,
      "notifications",
      user?.uid,
      "usersNotifications"
    );
    const qCollection = query(notisRef, where("seen", "==", false), limit(1));
    try {
      const docSnap = await getDocs(qCollection);
      let hideBadge = true;
      docSnap.forEach((doc) => {
        if (doc.exists()) hideBadge = false;
      });
      return hideBadge;
    } catch (error) {
      console.error("Error getting notification count: ", error);
    }
  }

  return (
    <NotificationsContext.Provider
      value={[
        notifications,
        setNotifications,
        showMore,
        hideBadge,
        GetNotis,
        setLastVisible,
      ]}
    >
      {props.children}
    </NotificationsContext.Provider>
  );
}
