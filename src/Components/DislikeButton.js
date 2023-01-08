import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { ThumbsDown } from "phosphor-react";
import useLikeActions from "../Hooks/useLikeActions";
import useLikeState from "../Hooks/useLikeState";

export default function DislikeButton({ anime }) {
  const { disliked } = useLikeState(anime);
  const likeActions = useLikeActions();

  const onClick = () => likeActions.toggleDislike(anime);
  const disabled = !anime;
  const weight = disliked ? "fill" : "regular";

  return (
    <Tooltip title="Not for me">
      <IconButton
        onClick={onClick}
        disabled={disabled}
        color="primary"
        sx={{ border: "2px solid" }}
      >
        <ThumbsDown weight={weight} />
      </IconButton>
    </Tooltip>
  );
}
