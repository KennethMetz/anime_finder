import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { ThumbsDown } from "phosphor-react";
import useLikeState from "../Hooks/useLikeState";

export default function DislikeButton({ anime }) {
  const { disliked, setDisliked } = useLikeState(anime);

  const onClick = (e) => {
    setDisliked(!disliked);
    e.preventDefault();
  };
  const disabled = !anime;
  const weight = disliked ? "fill" : "regular";

  //Theme colors are taken from the default "palette" theme and MUST have a child color titled "main"
  const buttonColor = disliked ? "primary" : "inherit";

  return (
    <Tooltip title="Not for me">
      <IconButton
        onClick={onClick}
        disabled={disabled}
        color={buttonColor}
        sx={{ border: "2px solid" }}
      >
        <ThumbsDown weight={weight} />
      </IconButton>
    </Tooltip>
  );
}
