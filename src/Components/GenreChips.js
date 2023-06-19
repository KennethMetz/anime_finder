import useMediaQuery from "@mui/material/useMediaQuery";
import GenreChipsClassic from "./GenreChipsClassic";
import GenreChipsNew from "./GenreChipsNew";

export default function GenreChips({ selectedGenre, setSelectedGenre }) {
  const cannotHover = useMediaQuery("(hover: none)");
  const coarsePointer = useMediaQuery("(pointer: coarse)");

  const isTouchscreen = cannotHover && coarsePointer;

  if (isTouchscreen) {
    return (
      <GenreChipsNew
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
