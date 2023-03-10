import {
  Box,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useState } from "react";
import AnimeCard from "./AnimeCard";

export default function AnimeShelf({ items }) {
  items = items ?? [];

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

  const ghosts = new Array(itemsPerPage).fill(0);
  const showGhosts = !items.length;

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
      <Box
        sx={{
          paddingLeft: { xs: hasPrevious ? "24px" : 0, lg: 0 },
          paddingRight: { xs: hasNext ? "24px" : 0, lg: 0 },
        }}
      >
        <Grid container spacing={2} columns={columns}>
          {showGhosts &&
            ghosts.map((_, index) => (
              <Grid
                item
                key={index}
                {...breakpoints}
                sx={{ aspectRatio: "0.7" }}
              >
                <Skeleton
                  variant="rounded"
                  sx={{ height: "100%", borderRadius: "8px" }}
                />
              </Grid>
            ))}
          {!showGhosts &&
            currentItems.map((anime, index) => (
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
      </Box>
      <Paper
        elevation={4}
        sx={{
          position: "absolute",
          visibility: hasPrevious ? "visible" : "hidden",
          left: { xs: 0, lg: "-24px" },
          top: "calc(50% - 24px)",
          zIndex: 1,
          borderRadius: "24px",
        }}
      >
        <IconButton onClick={onClickPrevious} color="inherit">
          <CaretLeft size={24} />
        </IconButton>
      </Paper>
      <Paper
        elevation={4}
        sx={{
          position: "absolute",
          visibility: hasNext ? "visible" : "hidden",
          right: { xs: 0, lg: "-24px" },
          top: "calc(50% - 24px)",
          zIndex: 1,
          borderRadius: "24px",
        }}
      >
        <IconButton onClick={onClickNext} color="inherit">
          <CaretRight size={24} />
        </IconButton>
      </Paper>
    </Box>
  );
}
