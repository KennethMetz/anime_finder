import { Container, useTheme } from "@mui/material";
import GenreChips from "./GenreChips";

export default function ShelfTitle({ selectedGenre, setSelectedGenre, title }) {
  const theme = useTheme();

  return (
    <div
      style={{
        position: "sticky",
        top: "68px",
        backgroundColor: theme.palette.background.default,
        zIndex: "3",
        width: "100vw",
      }}
    >
      <Container maxWidth="lg">
        <h4 style={{ marginBottom: "15px", paddingTop: "10px" }}>{title}</h4>

        <GenreChips
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
      </Container>

      <div style={{ marginTop: "-15px", height: "1px" }}></div>
    </div>
  );
}
