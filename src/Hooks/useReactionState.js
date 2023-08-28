import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Components/Firebase";
import { useCallback, useEffect, useState } from "react";
import {
  GetUserRxStateFromFirestore,
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
    },
    [user?.uid, userRxns, rxnTarget]
  );

  return [userRxns, updateUserRxns];
}
