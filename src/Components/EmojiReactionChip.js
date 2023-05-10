import Chip from "@mui/material/Chip";
import useTheme from "@mui/material/styles/useTheme";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import {
  SaveListReactionsToFirestore,
  SaveReviewToFirestore,
} from "./Firestore";

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

  useEffect(() => {
    if (item?.emojis[reaction]?.includes(user.uid)) setSelected(true);
    else setSelected(false);
  }, [item]);

  function reactToReview() {
    let docIdString = docId.toString();

    if (!selected) {
      let temp = [...reviews];
      temp[index].emojis[reaction].push(user.uid);
      setReviews(temp);
      setSelected(true);
      let newUserReview = { ...temp[index] };
      SaveReviewToFirestore(temp[index].uid, newUserReview, docIdString, type);
    } else if (selected) {
      let temp = [...reviews];
      let indexInArray = temp[index].emojis[reaction].indexOf(user.uid);
      temp[index].emojis[reaction].splice(indexInArray, 1);
      setReviews(temp);
      setSelected(false);
      let newUserReview = { ...temp[index] };
      SaveReviewToFirestore(temp[index].uid, newUserReview, docIdString, type);
    }
  }

  function reactToList() {
    if (!selected) {
      let temp = { ...item };
      temp.emojis[reaction].push(user.uid);
      setItem(temp);
      setSelected(true);
      SaveListReactionsToFirestore(docId, temp);
    } else if (selected) {
      let temp = { ...item };
      let indexInArray = temp.emojis[reaction].indexOf(user.uid);
      temp.emojis[reaction].splice(indexInArray, 1);
      setItem(temp);
      setSelected(false);
      SaveListReactionsToFirestore(docId, temp);
    }
  }

  return (
    <Chip
      variant={selected ? "filled" : "outlined"}
      icon={emoji}
      label={item?.emojis[reaction]?.length}
      sx={{
        paddingLeft: 0.5,
        borderRadius: "20px",
        mr: 2,
        "& .MuiChip-label": { fontFamily: "interMedium", fontSize: "1rem" },
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
