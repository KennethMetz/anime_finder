import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { ThumbsUp } from "phosphor-react";
import useLikeState from "../Hooks/useLikeState";

export default function LikeButton({ anime }) {
  const { liked, setLiked } = useLikeState(anime);

  const onClick = () => setLiked(!liked);
  const disabled = !anime;
  const weight = liked ? "fill" : "regular";

  return (
    <Tooltip title="I liked it">
      <IconButton
        onClick={onClick}
        disabled={disabled}
        color="primary"
        sx={{ border: "2px solid" }}
      >
        <ThumbsUp weight={weight} />
      </IconButton>
    </Tooltip>
  );
}
