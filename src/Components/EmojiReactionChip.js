import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import {
  DeleteNotification,
  SaveNotification,
  SaveReactionsToFirestore,
} from "./Firestore";
import Skeleton from "@mui/material/Skeleton";
import { useParams } from "react-router-dom";

export default function EmojiReactionChip({
  docId, // "userId + listId" or "animeId"
  emoji, // Phosphor emoji component to display
  item, // Object containing booleans whether user has reacted
  setItem,
  reaction, // "applause" "heart" or "trash"
  type, // content being reacted to: "list" "comments" or "reviews"
  tooltip,
  rxnCount, // Number of reactions to display for this emoji
  IdToNotify,
}) {
  const [user] = useAuthState(auth);
  const [selected, setSelected] = useState();
  const [emojiCount, setEmojiCount] = useState(null);

  const params = useParams();
  const ownerId = params.userId;
  const listId = params.listId;

  tooltip = user?.isAnonymous ? "Register to react" : tooltip;

  useEffect(() => {
    if (!user) return;
    if (item?.[reaction]) setSelected(true);
    else setSelected(false);
  }, [user, item?.[reaction]]);

  useEffect(() => {
    setEmojiCount(rxnCount);
  }, [rxnCount]);

  const notification = {
    interactorId: user.uid, // Person sending the emoji
    action: reaction,
    docId: docId,
    docType: type,
    time: new Date(),
    seen: false, // Remains false until noti popper is opened.
    read: false, // Remains false until popper is closed (so it can be specially styled)
    listId: listId ?? null,
    listOwnerId: ownerId ?? null,
    commentOwnerId: item?.uid ?? null,
  };

  function reactToReview() {
    let docIdString = docId.toString();
    if (!selected) {
      let temp = { ...item };
      temp[reaction] = !temp[reaction];
      setItem(temp);
      setEmojiCount(emojiCount + 1);
      SaveReactionsToFirestore(
        user.uid,
        docIdString,
        temp,
        type,
        reaction,
        IdToNotify
      );
      if (reaction !== "trash")
        SaveNotification(notification, IdToNotify ?? item.uid); // Good vibes only on EdwardML!
    } else if (selected) {
      let temp = { ...item };
      temp[reaction] = !temp[reaction];
      setItem(temp);
      setEmojiCount(emojiCount - 1);
      SaveReactionsToFirestore(
        user.uid,
        docIdString,
        temp,
        type,
        reaction,
        IdToNotify
      );
      if (reaction !== "trash")
        DeleteNotification(notification, IdToNotify ?? item.uid);
    }
  }

  function reactToList() {
    if (!selected) {
      let temp = { ...item };
      temp[reaction] = !temp[reaction];
      setItem(temp);
      setEmojiCount(emojiCount + 1);
      SaveReactionsToFirestore(user.uid, docId, temp, "list", reaction);
      if (reaction !== "trash") SaveNotification(notification, ownerId);
    } else if (selected) {
      let temp = { ...item };
      temp[reaction] = !temp[reaction];
      setItem(temp);
      setEmojiCount(emojiCount - 1);
      SaveReactionsToFirestore(user.uid, docId, temp, "list", reaction);
      if (reaction !== "trash") DeleteNotification(notification, ownerId);
    }
  }

  if (!item)
    return (
      <Skeleton
        variant="rounded"
        width={65}
        height={32}
        sx={{ paddingLeft: 0.5, borderRadius: "20px", mr: 2 }}
      />
    );
  return (
    <Tooltip title={tooltip} followCursor>
      <div>
        <Chip
          variant={selected ? "filled" : "outlined"}
          icon={emoji}
          label={emojiCount}
          disabled={user?.isAnonymous}
          sx={{
            paddingLeft: 0.5,
            borderRadius: "20px",
            mr: 2,
            "& .MuiChip-label": { fontSize: "1rem" },
            "& .MuiChip-icon": {
              ...(selected && { color: "inherit" }),
            },
          }}
          onClick={(e) => {
            if (type === "list") reactToList();
            else reactToReview();
            e?.stopPropagation();
          }}
        />
      </div>
    </Tooltip>
  );
}
