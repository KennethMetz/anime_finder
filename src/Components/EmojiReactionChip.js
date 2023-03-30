import { Chip, useTheme } from "@mui/material";
import { HandsClapping } from "phosphor-react";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { SaveReviewToFirestore } from "./Firestore";

export default function EmojiReactionChip({
  anime,
  emoji,
  item,
  animeReviews,
  reaction,
  index,
  setAnimeReviews,
}) {
  const [user] = useAuthState(auth);
  let [selected, setSelected] = useState();
  const theme = useTheme();

  useEffect(() => {
    console.log(item);
    if (item.emojis[reaction]?.includes(user.uid)) setSelected(true);
  }, []);

  function reactToReview() {
    let animeID = anime.id.toString();

    if (!selected) {
      let temp = [...animeReviews];
      temp[index].emojis[reaction].push(user.uid);
      setAnimeReviews(temp);
      setSelected(true);
      let newUserReview = { ...temp[index] };
      SaveReviewToFirestore(temp[index].uid, newUserReview, animeID);
    } else if (selected) {
      let temp = [...animeReviews];
      let indexInArray = temp[index].emojis[reaction].indexOf(user.uid);
      temp[index].emojis[reaction].splice(indexInArray, 1);
      setAnimeReviews(temp);
      setSelected(false);
      let newUserReview = { ...temp[index] };
      SaveReviewToFirestore(temp[index].uid, newUserReview, animeID);
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
