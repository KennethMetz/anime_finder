import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { ThumbsDown } from "phosphor-react";
import useLikeState from "../Hooks/useLikeState";

export default function DislikeButton({ anime }) {
  const { disliked, setDisliked } = useLikeState(anime);

  const onClick = () => setDisliked(!disliked);
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
