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
  const [listeningDocs, setListeningDocs] = useState([]);
  const [lastVisible, setLastVisible] = useState();
  const [lastVisibleListener, setLastVisibleListener] = useState();
  const [showNewNotiButton, setShowNewNotiButton] = useState(false);

  // Creates realtime listener on most recent notifications
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
      const latestNoti = documentSnapshots.docs.map((doc) => ({
        ...doc.data(),
        firestoreDocId: doc.id,
      }));
      setListeningDocs(latestNoti);
      if (latestNoti.length === 5)
        setLastVisibleListener(
          documentSnapshots.docs[documentSnapshots.docs.length - 2]
        );
      else setLastVisibleListener(null);
    });
    return unsub;
  }, [user]);

  async function getNotis() {
    if (!user) return;
    const notisRef = collection(
      db,
      "notifications",
      user?.uid,
      "usersNotifications"
    );
    // Populates noti popper when first opened, with real time results
    if (!lastVisible) {
      let temp = [...listeningDocs];
      if (listeningDocs.length === 5) {
        setShowMore(true);
        temp.splice(temp.length - 1);
        setLastVisible(lastVisibleListener);
      } else {
        setShowMore(false);
        setLastVisible(null);
      }
      setNotifications(temp);
      return;
    }

    // Concatenates additional notifications to the end of the real time results
    else {
      const q = query(
        notisRef,
        orderBy("time", "desc"),
        startAfter(lastVisible),
        limit(9)
      );

      try {
        const documentSnapshots = await getDocs(q);
        const notis = [...notifications];
        let docCount = 0;
        documentSnapshots.forEach((doc) => {
          docCount++;
          notis.push({ ...doc.data(), firestoreDocId: doc.id });
        });
        if (docCount === 9) {
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
        console.error(
          "Error getting more notifications from Firestore: ",
          error
        );
      }
    }
  }

  function displayLatestNotis() {
    setShowNewNotiButton(false);
    const notis = [...listeningDocs];
    if (listeningDocs.length === 5) {
      setShowMore(true);
      notis.splice(notis.length - 1);
    } else setShowMore(false);
    setNotifications(notis);
    setLastVisible(lastVisibleListener);
  }

  // The count() firestore fn can't be used with real-time listeners...so this is my work-around.
  useEffect(() => {
    if (!user || !notifications) return;
    getUnseenNotiCount().then((result) => {
      setHideBadge(result);
      setShowNewNotiButton(!result);
    });
  }, [listeningDocs]);

  async function getUnseenNotiCount() {
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

  function resetPagination() {
    setNotifications([]);
    setLastVisible();
  }

  return (
    <NotificationsContext.Provider
      value={[
        notifications,
        showMore,
        hideBadge,
        getNotis,
        showNewNotiButton,
        displayLatestNotis,
        resetPagination,
      ]}
    >
      {props.children}
    </NotificationsContext.Provider>
  );
}
