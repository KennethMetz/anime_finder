import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
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
        // width: "100vw",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ marginBottom: "0.125em" }}>
          {title}
        </Typography>

        <GenreChips
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
      </Container>
    </div>
  );
}
