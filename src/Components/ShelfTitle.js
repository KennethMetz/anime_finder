import { Grid } from "@mui/material";
import GenreChips from "./GenreChips";

export default function ShelfTitle({ selectedGenre, setSelectedGenre, title }) {
  return (
    <div>
      <h4 style={{ marginBottom: "15px", marginTop: "41px" }}>{title}</h4>
      <GenreChips
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />
    </div>
  );
}
