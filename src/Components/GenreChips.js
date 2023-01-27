import { Chip, Grid, Stack } from "@mui/material";
import { setPersistence } from "firebase/auth";
import { useEffect, useState } from "react";

export default function GenreChips({ selectedGenre, setSelectedGenre }) {
  let genres = [
    "Action",
    "Award Winning",
    "Comedy",
    "Drama",
    "Ecchi",
    "Fantasy",
    "Gourmet",
    "Horror",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Sports",

    // "Adventure",
    // "Supernatural",
    // "Slice of Life",
    // "Suspense",
    // "Boys Love",
    // "Girls Love",
    // "Avant Garde",
  ];

  let [genreState, setGenreState] = useState([
    {
      genre: "Action",
      selected: false,
    },
    {
      genre: "Award Winning",
      selected: false,
    },
    {
      genre: "Comedy",
      selected: false,
    },
    {
      genre: "Ecchi",
      selected: false,
    },
    {
      genre: "Gourmet",
      selected: false,
    },
    {
      genre: "Horror",
      selected: false,
    },
    {
      genre: "Romance",
      selected: false,
    },
    {
      genre: "Sci-Fi",
      selected: false,
    },
    {
      genre: "Sports",
      selected: false,
    },
  ]);

  function handleClick(item, index) {
    const temp = [...genreState];
    if (!temp[index].selected) {
      temp[index] = { ...temp[index], selected: true };
    } else {
      temp[index] = { ...temp[index], selected: false };
    }
    for (let i = 0; i < genreState.length; i++) {
      if (index !== i) {
        temp[i].selected = false;
      }
    }

    setGenreState(temp);
    if (temp[index].selected) setSelectedGenre(`&genre=${item.genre}`);
    else {
      setSelectedGenre("");
    }
  }

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ alignItems: "center", marginTop: "0px", marginBottom: "21px" }}
    >
      {genreState?.map((item, index) => (
        <Chip
          sx={{
            fontFamily: "interMedium",
          }}
          variant={item.selected ? "filled" : "outlined"}
          clickable={true}
          key={index}
          label={item.genre}
          onClick={() => {
            handleClick(item, index);
          }}
        />
      ))}
    </Stack>
  );
}
