import { useTheme } from "@emotion/react";
import { Container, Grid, useMediaQuery } from "@mui/material";
import GenreChips from "./GenreChips";

export default function ShelfTitle({ selectedGenre, setSelectedGenre, title }) {
  const theme = useTheme();

  const sm = useMediaQuery(theme.breakpoints.up("sm"));

  let singleRowHeader = sm ? true : false;

  return (
    <div
      style={{
        position: "sticky",
        top: singleRowHeader ? "68px" : "127px",
        backgroundColor: "white",
        zIndex: "3",
        width: "100%",
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
