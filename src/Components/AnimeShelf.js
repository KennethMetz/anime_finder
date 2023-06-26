import useMediaQuery from "@mui/material/useMediaQuery";
import AnimeShelfNew from "./AnimeShelfNew";
import AnimeShelfClassic from "./AnimeShelfClassic";

export default function AnimeShelf({ items }) {
  const cannotHover = useMediaQuery("(hover: none)");
  const coarsePointer = useMediaQuery("(pointer: coarse)");

  const isTouchscreen = cannotHover && coarsePointer;

  // Hovering doesn't work so well with the new shelf yet.  Only serve it for
  // touchscreens.
  if (isTouchscreen) {
    return <AnimeShelfNew items={items} />;
  } else {
    return <AnimeShelfClassic items={items} />;
  }
}
