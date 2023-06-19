import useMediaQuery from "@mui/material/useMediaQuery";
import GenreChipsClassic from "./GenreChipsClassic";
import ChipShelf from "./ChipShelf";

export default function GenreChips({ selectedGenre, setSelectedGenre }) {
  const cannotHover = useMediaQuery("(hover: none)");
  const coarsePointer = useMediaQuery("(pointer: coarse)");

  const isTouchscreen = cannotHover && coarsePointer;

  if (isTouchscreen) {
    return (
      <ChipShelf
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />
    );
  } else {
    return (
      <GenreChipsClassic
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />
    );
  }
}
