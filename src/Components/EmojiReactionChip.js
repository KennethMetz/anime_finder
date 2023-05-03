import Chip from "@mui/material/Chip";
import useTheme from "@mui/material/styles/useTheme";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { SaveReviewToFirestore } from "./Firestore";

export default function EmojiReactionChip({
  docId,
  emoji,
  item,
  reviews,
  reaction,
  index,
  setReviews,
}) {
  const [user] = useAuthState(auth);
  let [selected, setSelected] = useState();
  const theme = useTheme();

  useEffect(() => {
    if (item.emojis[reaction]?.includes(user.uid)) setSelected(true);
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
      SaveReviewToFirestore(temp[index].uid, newUserReview, docIdString);
    } else if (selected) {
      let temp = [...reviews];
      let indexInArray = temp[index].emojis[reaction].indexOf(user.uid);
      temp[index].emojis[reaction].splice(indexInArray, 1);
      setReviews(temp);
      setSelected(false);
      let newUserReview = { ...temp[index] };
      SaveReviewToFirestore(temp[index].uid, newUserReview, docIdString);
    }
  }

  return (
    <Chip
      variant={selected ? "filled" : "outlined"}
      icon={emoji}
      label={item.emojis[reaction]?.length}
      sx={{
        mr: 2,
        "& .MuiChip-label": { fontFamily: "interMedium", fontSize: "1rem" },
        "& .MuiChip-icon": {
          ...(selected && { color: "inherit" }),
        },
      }}
      onClick={(e) => {
        reactToReview();
        e?.stopPropagation();
      }}
    />
  );
}
