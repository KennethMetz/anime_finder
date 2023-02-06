import { Grid } from "@mui/material";
import GenreChips from "./GenreChips";

export default function ShelfTitle({ selectedGenre, setSelectedGenre, title }) {
  return (
    <div
      style={{
        position: "sticky",
        top: "68px",
        backgroundColor: "white",
        zIndex: "3",
        boxShadow: "none",
        width: "100vw",
        marginTop: "-100px",
      }}
    >
      <h4 style={{ marginBottom: "15px", marginTop: "41px" }}>{title}</h4>
      <GenreChips
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />
      <div style={{ marginTop: "-5px", height: "1px" }}></div>
    </div>
  );
}
