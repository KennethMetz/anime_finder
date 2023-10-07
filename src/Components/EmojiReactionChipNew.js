import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import EmojiReactionChipView from "./EmojiReactionChipView";

export default function EmojiReactionChipNew({
  userRxns,
  updateUserRxns,
  countDoc,
  rxnTarget,
  rxnType,
}) {
  const [user, loadingUser] = useAuthState(auth);

  const [localCount, setLocalCount] = useState(0);

  // Re-initialize local count if dependencies change.
  useEffect(() => {
    setLocalCount(countDoc?.reactionCounts?.[rxnType.key] ?? 0);
  }, [countDoc, rxnType.key]);

  // Compute selected value from userRxns.
  const selected = useMemo(() => {
    return userRxns?.[rxnType.key] ?? false;
  }, [userRxns, rxnType.key]);

  // Compute tooltip.
  const tooltip = useMemo(() => {
    if (user?.isAnonymous) {
      return "Register to react";
    }
    return `${rxnType.verb} this ${rxnTarget.noun}`;
  }, [user?.isAnonymous, rxnType.verb, rxnTarget.noun]);

  // Build on-click callback.
  const onClick = useCallback(
    (event) => {
      const newState = !selected;
      const increment = newState ? 1 : -1;
      updateUserRxns(rxnType, newState);
      setLocalCount(localCount + increment);
      event.stopPropagation();
    },
    [selected, localCount, updateUserRxns, rxnType]
  );

  return (
    <EmojiReactionChipView
      emoji={rxnType.emoji}
      count={localCount}
      selected={selected}
      onClick={onClick}
      tooltip={tooltip}
      isLoading={!userRxns || !countDoc}
      isDisabled={user?.isAnonymous}
    />
  );
}
