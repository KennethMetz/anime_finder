import { useEffect, useMemo, useState } from "react";
import NotificationsContext from "./NotificationsContext";
import {
  collection,
  doc,
  getCountFromServer,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "./Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function NotificationsProvider(props) {
  const [user, loading, error] = useAuthState(auth);
  const [notifications, setNotifications] = useState();
  const [showMore, setShowMore] = useState(false);
  const [hideBadge, setHideBadge] = useState(true);
  const [moreNotiRequests, setMoreNotiRequests] = useState(0);

  // Read initial state from Firestore, or else use blank array.
  // It calls Firestore one time, after user has been authed.
  useMemo(() => {
    if (!user) return;
    // Get notifications
    const notisRef = collection(
      db,
      "notifications",
      user?.uid,
      "usersNotifications"
    );
    const q = query(
      notisRef,
      orderBy("time", "desc"),
      limit(5 + moreNotiRequests * 5)
    );
    onSnapshot(q, (querySnapshot) => {
      const notis = [];
      querySnapshot.forEach((doc) => {
        notis.push({ ...doc.data(), firestoreDocId: doc.id });
      });
      // Check if there are more notifications than being sent back.
      if (notis.length === 5 + moreNotiRequests * 5) {
        notis.splice(notis.length - 1);
        setNotifications(notis);
        setShowMore(true);
      } else {
        setNotifications(notis ?? []);
        setShowMore(false);
      }
    });
  }, [user, moreNotiRequests]);

  // The count() firestore fn can't be used with real-time listeners...so this is my work-around.
  useMemo(() => {
    if (!user || !notifications) return;
    GetUnseenNotiCount().then((result) => {
      setHideBadge(result);
    });
  }, [notifications]);

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
        moreNotiRequests,
        setMoreNotiRequests,
      ]}
    >
      {props.children}
    </NotificationsContext.Provider>
  );
}
