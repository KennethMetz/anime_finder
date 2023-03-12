import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { ThumbsDown } from "phosphor-react";
import useLikeState from "../Hooks/useLikeState";

export default function DislikeButton({ anime, variant }) {
  const { disliked, setDisliked } = useLikeState(anime);

  const onClick = (e) => {
    setDisliked(!disliked);
    e.preventDefault();
  };
  const disabled = !anime;
  const weight = disliked ? "fill" : "regular";

  const size = variant === "contained" ? "large" : "medium";

  //Theme colors are taken from the default "palette" theme and MUST have a child color titled "main"
  const buttonColor = disliked ? "primary" : "inherit";

  return (
    <Tooltip title="Not for me">
      <IconButton
        onClick={onClick}
        disabled={disabled}
        color={buttonColor}
        size={size}
        variant={variant}
      >
        <ThumbsDown weight={weight} />
      </IconButton>
    </Tooltip>
  );
}
