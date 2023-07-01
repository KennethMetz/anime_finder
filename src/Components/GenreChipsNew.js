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

export default function GenreChipsNew({ selectedGenre, setSelectedGenre }) {
  const onClick = (genre) => {
    if (selectedGenre === genre) {
      setSelectedGenre("");
    } else {
      setSelectedGenre(genre);
    }
  };

  return (
    <ScrollMenu
      wrapperClassName={"scrollWrapper"}
      scrollContainerClassName={"scrollContainer"}
    >
      {genres.map((genre) => (
        <Chip
          key={genre}
          sx={{
            borderRadius: "16px",
            mr: 1,
            my: 1,
          }}
          variant={genre === selectedGenre ? "filled" : "outlined"}
          clickable={true}
          label={genre}
          onClick={() => onClick(genre)}
        />
      ))}
    </ScrollMenu>
  );
}
