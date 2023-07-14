import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

import { CaretDown } from "phosphor-react";
import { useEffect, useState } from "react";
import AnimeCard from "./AnimeCard";

export default function AnimeGrid({ items, large }) {
  items = items ?? [];

  const [selected, setSelected] = useState();
  let [seeMore, setSeeMore] = useState(0);

  const ghosts = new Array(10).fill(0);
  const showGhosts = !items.length;

  const shownItems = howManyItems(seeMore);
  const showSeeMoreButton = seeMore !== 2 && shownItems.length !== items.length;

  let columns = 12;
  let breakpoints = { xs: 6, sm: 3, md: 2 };

  if (large) {
    columns = 20;
    breakpoints = { xs: 10, sm: 5, md: 4 };
  }

  function howManyItems(seeMore) {
    if (seeMore === 0) return items.slice(0, 10);
    if (seeMore === 1) return items.slice(0, 20);
    if (seeMore === 2) return items;
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
        {showSeeMoreButton && !showGhosts && (
          <Grid
            item
            xs={columns}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => setSeeMore(seeMore + 1)}
              endIcon={<CaretDown />}
            >
              See more
            </Button>
          </Grid>
        )}
        {showGhosts && (
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Skeleton
              variant="rounded"
              width="120px"
              height="40px"
              sx={{ ml: "16px", mt: "16px", borderRadius: "20px" }}
            />
          </Box>
        )}
      </Grid>
    </Box>
  );
}
