import Chip from "@mui/material/Chip";
import useTheme from "@mui/material/styles/useTheme";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import {
  DeleteNotification,
  SaveListReactionsToFirestore,
  SaveNotification,
  SaveReviewToFirestore,
} from "./Firestore";
import Skeleton from "@mui/material/Skeleton";
import { useParams } from "react-router-dom";

export default function EmojiReactionChip({
  docId,
  emoji,
  item,
  setItem, // Note, only used for list reactions (and NOT reviews/comments)
  reviews,
  reaction,
  index,
  setReviews,
  type,
}) {
  const [user] = useAuthState(auth);
  let [selected, setSelected] = useState();
  const theme = useTheme();

  const params = useParams();
  const ownerId = params.userId;
  const listId = params.listId;

  useEffect(() => {
    if (item?.emojis[reaction]?.includes(user.uid)) setSelected(true);
    else setSelected(false);
  }, [item]);

  const notification = {
    interactorId: user.uid, // Person sending the emoji
    action: reaction,
    docId: docId,
    docType: type,
    time: new Date(),
    seen: false, // Remains true until noti popper is opened.
    read: false, // Remains true until popper is closed (so it can be specially marked)
    listId: listId ?? null,
    listOwnerId: ownerId ?? null,
    commentOwnerId: item?.uid ?? null,
  };

  // To-Do: Prevent repeated clicking of a reaction from filling up someone's notification stack. - DONE

  // To-Do: Paginate notifications. - DONE
  //        Get see more button to work - DONE
  //        Get read/seen working - DONE
  //        Fix unread count - DONE

  // To-Do: Responsive design for mobile
  //         Add loading spinner after clicking see more
  //         Add margin left on mobile

  // To-Do: Get scroll bar AND elevation to show up on Popper - DONE

  // To-Do: Add ghost cards while info needed to display notis is loading - NOT NEEDED

  // To-Do: Get comment notifications working

  function reactToReview() {
    let docIdString = docId.toString();

    if (!selected) {
      let temp = [...reviews];
      temp[index].emojis[reaction].push(user.uid);
      setReviews(temp);
      setSelected(true);
      let newUserReview = { ...temp[index] };
      SaveReviewToFirestore(temp[index].uid, newUserReview, docIdString, type);
      if (reaction !== "trash") SaveNotification(notification, item.uid);
    } else if (selected) {
      let temp = [...reviews];
      let indexInArray = temp[index].emojis[reaction].indexOf(user.uid);
      temp[index].emojis[reaction].splice(indexInArray, 1);
      setReviews(temp);
      setSelected(false);
      let newUserReview = { ...temp[index] };
      SaveReviewToFirestore(temp[index].uid, newUserReview, docIdString, type);
      if (reaction !== "trash") DeleteNotification(notification, item.uid);
    }
  }

  function reactToList() {
    if (!selected) {
      let temp = { ...item };
      temp.emojis[reaction].push(user.uid);
      setItem(temp);
      setSelected(true);
      SaveListReactionsToFirestore(docId, temp);
      if (reaction !== "trash") SaveNotification(notification, ownerId);
    } else if (selected) {
      let temp = { ...item };
      let indexInArray = temp.emojis[reaction].indexOf(user.uid);
      temp.emojis[reaction].splice(indexInArray, 1);
      setItem(temp);
      setSelected(false);
      SaveListReactionsToFirestore(docId, temp);
      console.log(notification, ownerId);
      if (reaction !== "trash") DeleteNotification(notification, ownerId);
    }
  }

  if (!item?.emojis)
    return (
      <Skeleton
        variant="rounded"
        width={65}
        height={32}
        sx={{ paddingLeft: 0.5, borderRadius: "20px", mr: 2 }}
      />
    );

  return (
    <Chip
      variant={selected ? "filled" : "outlined"}
      icon={emoji}
      label={item.emojis[reaction].length}
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
  );
}
