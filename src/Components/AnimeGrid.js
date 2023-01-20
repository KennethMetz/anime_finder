import { Box, Grid } from "@mui/material";
import { useState } from "react";
import AnimeCard from "./AnimeCard";

export default function AnimeGrid({ items, large }) {
  const [selected, setSelected] = useState();

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
        {items.map((anime, index) => (
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
      </Grid>
    </Box>
  );
}
