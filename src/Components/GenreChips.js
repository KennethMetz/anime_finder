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
      color: undefined,
      selected: false,
    },
    {
      genre: "Award Winning",
      color: undefined,
      selected: false,
    },
    {
      genre: "Comedy",
      color: undefined,

      selected: false,
    },
    {
      genre: "Ecchi",
      color: undefined,
      selected: false,
    },

    {
      genre: "Gourmet",
      color: undefined,
      selected: false,
    },
    {
      genre: "Horror",
      color: undefined,
      selected: false,
    },
    {
      genre: "Romance",
      color: undefined,
      selected: false,
    },
    {
      genre: "Sci-Fi",
      color: undefined,
      selected: false,
    },
    {
      genre: "Sports",
      color: undefined,
      selected: false,
    },
  ]);

  function handleClick(item, index) {
    const temp = [...genreState];
    if (!temp[index].selected) {
      temp[index] = { ...temp[index], color: "primary", selected: true };
    } else {
      temp[index] = { ...temp[index], color: undefined, selected: false };
    }
    for (let i = 0; i < genreState.length; i++) {
      if (index !== i) temp[i].color = undefined;
    }

    setGenreState(temp);
    if (temp[index].selected) setSelectedGenre(`&genre=${item.genre}`);
    else {
      setSelectedGenre("");
    }
    console.log(selectedGenre);
  }

  return (
    <Stack direction="row" spacing={1}>
      {genreState?.map((item, index) => (
        <Chip
          sx={{ fontFamily: "interMedium" }}
          variant="filled"
          clickable={true}
          key={index}
          label={item.genre}
          color={item.color}
          onClick={() => {
            handleClick(item, index);
          }}
        />
      ))}
    </Stack>
  );
}
