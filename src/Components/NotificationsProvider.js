import { useEffect, useMemo, useState } from "react";
import NotificationsContext from "./NotificationsContext";
import {
  collection,
  doc,
  getCountFromServer,
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
  const [totalNotis, setTotalNotis] = useState();
  const [unreadNotiCount, setUnreadNotiCount] = useState();
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
      setNotifications(notis ?? []);
    });
  }, [user, moreNotiRequests]);

  // The count() firestore fn can't be used with real-time listeners...so this is my work-around.
  useMemo(() => {
    if (!user) return;
    GetTotalNotiCount().then((result) => {
      setTotalNotis(result);
    });
    GetUnreadNotiCount().then((result) => {
      setUnreadNotiCount(result);
    });
  }, [notifications]);

  async function GetTotalNotiCount() {
    const notisRef = collection(
      db,
      "notifications",
      user?.uid,
      "usersNotifications"
    );
    const qCollection = query(notisRef);
    try {
      const countSnapshot = await getCountFromServer(qCollection);
      return countSnapshot.data().count;
    } catch (error) {
      console.error("Error getting notification count: ", error);
    }
  }

  async function GetUnreadNotiCount() {
    const notisRef = collection(
      db,
      "notifications",
      user?.uid,
      "usersNotifications"
    );
    const qCollection = query(notisRef, where("seen", "==", false));
    try {
      const countSnapshot = await getCountFromServer(qCollection);
      return countSnapshot.data().count;
    } catch (error) {
      console.error("Error getting notification count: ", error);
    }
  }

  return (
    <NotificationsContext.Provider
      value={[
        notifications,
        setNotifications,
        totalNotis,
        unreadNotiCount,
        moreNotiRequests,
        setMoreNotiRequests,
      ]}
    >
      {props.children}
    </NotificationsContext.Provider>
  );
}
