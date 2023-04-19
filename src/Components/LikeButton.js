import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { ThumbsUp } from "phosphor-react";
import useLikeState from "../Hooks/useLikeState";

export default function LikeButton({ anime, variant, selected }) {
  const { liked, setLiked } = useLikeState(anime);

  const onClick = (e) => {
    setLiked(!liked);
    e.stopPropagation();
  };
  const disabled = !anime;
  const weight = liked ? "fill" : "regular";

  const size = variant === "contained" ? "large" : "medium";

  //Theme colors are taken from the default "palette" theme and MUST have a child color titled "main"
  const buttonColor = !selected ? "background" : liked ? "primary" : "inherit";

  return (
    <Tooltip title="I liked it">
      <IconButton
        onClick={onClick}
        disabled={disabled}
        color={buttonColor}
        size={size}
        variant={variant}
      >
        <ThumbsUp weight={weight} />
      </IconButton>
    </Tooltip>
  );
}
