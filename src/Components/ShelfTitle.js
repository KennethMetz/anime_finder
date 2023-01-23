import { Grid } from "@mui/material";
import GenreChips from "./GenreChips";

export default function ShelfTitle(selectedGenre, setSelectedGenre, title) {
  return (
    <Grid container style={{ alignItems: "center" }}>
      <Grid item xs={2}>
        <h4>{title}</h4>
      </Grid>
      <Grid item xs={10}>
        {GenreChips(selectedGenre, setSelectedGenre)}
      </Grid>
    </Grid>
  );
}
