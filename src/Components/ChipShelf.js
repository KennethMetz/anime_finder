import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

import "react-horizontal-scrolling-menu/dist/styles.css";
import "../Styles/ScrollShelf.css";

const genres = [
  "Action",
  "Award Winning",
  "Comedy",
  "Ecchi",
  "Gourmet",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Sports",
];

export default function ChipShelf({ selectedGenre, setSelectedGenre }) {
  const onClick = (genre) => {
    if (selectedGenre === genre) {
      setSelectedGenre("");
    } else {
      setSelectedGenre(genre);
    }
  };

  return (
    <Box sx={{ mx: { xs: -2, sm: -3, lg: 0 } }}>
      <ScrollMenu scrollContainerClassName={"scrollContainer"}>
        {genres.map((genre) => (
          <Chip
            key={genre}
            itemId={genre}
            sx={{
              borderRadius: "16px",
              mr: 1,
              my: 1,
            }}
            variant={genre === selectedGenre ? "filled" : "outlined"}
            clickable={true}
            label={genre}
            onClick={() => onClick(genre)}
          >
            {genre}
          </Chip>
        ))}
      </ScrollMenu>
    </Box>
  );
}
