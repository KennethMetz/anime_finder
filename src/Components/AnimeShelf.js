import { Box, Grid, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useState } from "react";
import AnimeCard from "./AnimeCard";

export default function AnimeShelf({ items }) {
  const [selected, setSelected] = useState();
  const [startIndex, setStartIndex] = useState(0);
  const theme = useTheme();

  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  const sevenHundredFifty = useMediaQuery(
    theme.breakpoints.up("sevenHundredFifty")
  );
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const lg = useMediaQuery(theme.breakpoints.up("lg"));

  const itemsPerPage = lg ? 6 : md ? 5 : sevenHundredFifty ? 4 : sm ? 3 : 2;

  const columns = 12;
  const breakpoints = { xs: 12 / itemsPerPage };

  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  const hasPrevious = startIndex > 0;
  const hasNext = startIndex < items.length - itemsPerPage;

  const onChangeSelected = (index, value) => {
    if (value) {
      setSelected(index);
    } else if (!value && selected === index) {
      setSelected(undefined);
    }
  };

  const onClickNext = (e) => {
    setStartIndex(
      Math.min(startIndex + itemsPerPage, items.length - itemsPerPage)
    );
    e.preventDefault();
  };

  const onClickPrevious = (e) => {
    setStartIndex(Math.max(startIndex - itemsPerPage, 0));
    e.preventDefault();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "start",
        mb: 1,
        position: "relative",
      }}
    >
      <Grid container spacing={2} columns={columns}>
        {currentItems.map((anime, index) => (
          <Grid
            item
            key={index}
            {...breakpoints}
            sx={{ aspectRatio: "0.7", zIndex: selected === index ? 1 : 0 }}
          >
            <AnimeCard
              anime={anime}
              onChangeSelected={(v) => onChangeSelected(index, v)}
            />
          </Grid>
        ))}
      </Grid>
      <IconButton
        onClick={onClickPrevious}
        color="inherit"
        sx={{
          position: "absolute",
          visibility: hasPrevious ? "visible" : "hidden",
          left: "-24px",
          top: "calc(50% - 24px)",
          zIndex: 1,
          backgroundColor: theme.palette.grey[100],
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.18 )",
          "&:hover, &:focus": {
            backgroundColor: theme.palette.grey[300],
          },
        }}
      >
        <CaretLeft size={24} />
      </IconButton>
      <IconButton
        onClick={onClickNext}
        color="inherit"
        sx={{
          position: "absolute",
          visibility: hasNext ? "visible" : "hidden",
          right: "-24px",
          top: "calc(50% - 24px)",
          zIndex: 1,
          backgroundColor: theme.palette.grey[100],
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.18 )",
          "&:hover, &:focus": {
            backgroundColor: theme.palette.grey[300],
          },
        }}
      >
        <CaretRight size={24} />
      </IconButton>
    </Box>
  );
}
