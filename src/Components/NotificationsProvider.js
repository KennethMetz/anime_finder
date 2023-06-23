import { useEffect, useMemo, useState } from "react";
import NotificationsContext from "./NotificationsContext";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "./Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function NotificationsProvider(props) {
  const [user, loading, error] = useAuthState(auth);
  const [notifications, setNotifications] = useState();

  // Read initial state from Firestore, or else use blank array.
  // It calls Firestore one time, after user has been authed.

  useMemo(() => {
    if (!user) return;
    onSnapshot(doc(db, "notifications", user?.uid), (doc) => {
      setNotifications(doc.data()?.notificationStack ?? []);
    });
  }, [user]);

  return (
    <NotificationsContext.Provider value={[notifications, setNotifications]}>
      {props.children}
    </NotificationsContext.Provider>
  );
}
