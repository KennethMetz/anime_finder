import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Components/Firebase";
import { useCallback, useEffect, useState } from "react";
import {
  DeleteNotification,
  GetUserRxStateFromFirestore,
  SaveNotification,
  SaveUserRxStateToFirestore,
} from "../Components/Firestore";
import { getDefaultUserRxns } from "../Util/ReactionUtil";

/**
 * Gets reaction state for a specified `rxnTarget`.
 * @param {import("../Util/ReactionUtil").RxnTarget} rxnTarget The `RxnTarget`
 *  being reacted to.
 * @returns A list of [userRxns, updateUserRxns] for the specified target.
 */
export default function useReactionState(rxnTarget) {
  const [user, userLoading] = useAuthState(auth);
  const [userRxns, setUserRxns] = useState();

  useEffect(() => {
    // Can't load user reactions if there is no user.
    if (!user?.uid) {
      setUserRxns(undefined);
      return;
    }
    // TODO better tracking of async state, prevent races.
    setUserRxns(undefined);
    GetUserRxStateFromFirestore(user.uid, rxnTarget).then((value) =>
      setUserRxns(value)
    );
  }, [user?.uid, rxnTarget]);

  const updateUserRxns = useCallback(
    (rxnType, newValue) => {
      if (!user) {
        throw new Error("Cannot update reactions until user has been loaded.");
      }
      if (!userRxns) {
        throw new Error("Cannot update reactions until they have been loaded.");
      }
      const increment = newValue ? 1 : -1;
      const newUserRxns = {
        ...getDefaultUserRxns(rxnTarget),
        ...userRxns,
        [rxnType.key]: newValue,
      };
      setUserRxns(newUserRxns);
      // TODO Do something to prevent firestore races.
      SaveUserRxStateToFirestore(
        user.uid,
        rxnTarget,
        rxnType,
        newUserRxns,
        increment
      );
      // Update notifications, if this type notifies.
      if (rxnType.notifies) {
        const notification = getNotification(user, rxnTarget, rxnType);
        if (newValue) {
          SaveNotification(notification, rxnTarget.ownerId);
        } else {
          DeleteNotification(notification, rxnTarget.ownerId);
        }
      }
    },
    [user?.uid, userRxns, rxnTarget]
  );

  return [userRxns, updateUserRxns];
}

/**
 * Builds a notification for `user` reacting to `rxnTarget` w/ type `rxnType`.
 * @param {import("firebase/auth").User} user
 * @param {import("../Util/ReactionUtil").RxnTarget} rxnTarget
 * @param {import("../Util/ReactionUtil").RxnType} rxnType
 * @returns {import("../Util/NotificationUtil").Notification} A notification
 *  object that can be saved to storage.
 */
function getNotification(user, rxnTarget, rxnType) {
  // TODO Extract basic notification template logic to shared lib.
  return {
    interactorId: user.uid, // Person sending the emoji
    action: rxnType.type,
    docId: rxnTarget.notifData.docId,
    docType: rxnTarget.notifData.docType,
    time: new Date(),
    seen: false, // Remains false until noti popper is opened.
    read: false, // Remains false until popper is closed (so it can be specially styled)
    listId: rxnTarget.notifData.listId,
    listOwnerId: rxnTarget.notifData.listOwnerId,
    commentOwnerId: rxnTarget.notifData.commentOwnerId,
  };
}
