import { Box, Button, Grid, Skeleton } from "@mui/material";
import { CaretDown } from "phosphor-react";
import { useState } from "react";
import AnimeCard from "./AnimeCard";

export default function AnimeGrid({ items, large }) {
  items = items ?? [];

  const [selected, setSelected] = useState();
  const [seeMore, setSeeMore] = useState(false);

  const ghosts = new Array(10).fill(0);
  const showGhosts = !items.length;

  const shownItems = seeMore ? items : items.slice(0, 10);
  const showSeeMoreButton = !seeMore && shownItems.length !== items.length;

  let columns = 12;
  let breakpoints = { xs: 6, sm: 3, md: 2 };

  if (large) {
    columns = 20;
    breakpoints = { xs: 10, sm: 5, md: 4 };
  }

  const onChangeSelected = (index, value) => {
    if (value) {
      setSelected(index);
    } else if (!value && selected === index) {
      setSelected(undefined);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "start",
        mb: 1,
      }}
    >
      <Grid container spacing={2} columns={columns}>
        {showGhosts &&
          ghosts.map((_, index) => (
            <Grid item key={index} {...breakpoints} sx={{ aspectRatio: "0.7" }}>
              <Skeleton
                variant="rounded"
                sx={{ height: "100%", borderRadius: "8px" }}
              />
            </Grid>
          ))}
        {!showGhosts &&
          shownItems.map((anime, index) => (
            <Grid
              item
              key={index}
              {...breakpoints}
              sx={{ aspectRatio: "0.7", zIndex: selected === index ? 1 : 0 }}
            >
              <AnimeCard
                anime={anime}
                large={large}
                onChangeSelected={(v) => onChangeSelected(index, v)}
              />
            </Grid>
          ))}
        {showSeeMoreButton && (
          <Grid
            item
            xs={columns}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => setSeeMore(true)}
              endIcon={<CaretDown />}
            >
              See more
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
