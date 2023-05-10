import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useState } from "react";

export default function GenreChips({ selectedGenre, setSelectedGenre }) {
  let genres = [
    "Action",
    "Award Winning",
    "Comedy",
    "Ecchi",
    "Gourmet",
    "Horror",
    "Romance",
    "Sci-Fi",
    "Sports",

    // "Adventure",
    // "Drama",
    // "Fantasy",
    // "Mystery",
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

  const [selected, setSelected] = useState();
  const [startIndex, setStartIndex] = useState(0);

  const theme = useTheme();

  const fourHundred = useMediaQuery(theme.breakpoints.up("fourHundred"));

  const fiveHundred = useMediaQuery(theme.breakpoints.up("fiveHundred"));

  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  const sevenHundredFifty = useMediaQuery(
    theme.breakpoints.up("sevenHundredFifty")
  );
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const lg = useMediaQuery(theme.breakpoints.up("lg"));

  const itemsPerPage = lg
    ? 9
    : md
    ? 9
    : sevenHundredFifty
    ? 7
    : sm
    ? 5
    : fiveHundred
    ? 4
    : fourHundred
    ? 3
    : 2;

  const breakpoints = { xs: 12 / itemsPerPage };

  const currentItems = genreState.slice(startIndex, startIndex + itemsPerPage);

  const hasPrevious = startIndex > 0;
  const hasNext = startIndex < genreState.length - itemsPerPage;

  const onClickNext = (e) => {
    setStartIndex(
      Math.min(startIndex + itemsPerPage, genreState.length - itemsPerPage)
    );
    e.preventDefault();
  };

  const onClickPrevious = (e) => {
    setStartIndex(Math.max(startIndex - itemsPerPage, 0));
    e.preventDefault();
  };

  function handleClick(item, index) {
    const temp = [...genreState];
    if (!temp[index + startIndex].selected) {
      temp[index + startIndex] = {
        ...temp[index + startIndex],
        selected: true,
      };
    } else {
      temp[index + startIndex] = {
        ...temp[index + startIndex],
        selected: false,
      };
    }
    for (let i = 0; i < genreState.length; i++) {
      if (index + startIndex !== i) {
        temp[i].selected = false;
      }
    }

    setGenreState(temp);
    if (temp[index + startIndex].selected)
      setSelectedGenre(`&genre=${item.genre}`);
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
      <Paper
        elevation={4}
        sx={{
          visibility: hasPrevious ? "visible" : "hidden",
          marginLeft: hasPrevious ? "0px" : "-48px",
          top: "calc(68% - 24px)",
          borderRadius: "24px",
          zIndex: 1,
        }}
      >
        <IconButton onClick={onClickPrevious} color="inherit">
          <CaretLeft size={24} />
        </IconButton>
      </Paper>
      {currentItems?.map((item, index) => (
        <Chip
          sx={{
            fontFamily: "interMedium",
            borderRadius: "16px",
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
      <Paper
        elevation={4}
        sx={{
          visibility: hasNext ? "visible" : "hidden",
          top: "calc(68% - 24px)",
          borderRadius: "24px",
          zIndex: 1,
        }}
      >
        <IconButton onClick={onClickNext} color="inherit">
          <CaretRight size={24} />
        </IconButton>
      </Paper>
    </Stack>
  );
}
