import { Box, Grid, Paper, useTheme } from "@mui/material";
import AnimeCard from "./AnimeCard";
import { useState } from "react";

export default function DevSearchResult({ result }) {
  const theme = useTheme();

  const anime = result.anime;

  const [selected, setSelected] = useState(false);

  const onChangeSelected = (value) => {
    setSelected(value);
  };

  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Grid container spacing={2} columns={12}>
        <Grid item xs={3} sm={2.5} sx={{ zIndex: selected ? 2 : 0 }}>
          <Box
            sx={{
              width: "100%",
              aspectRatio: "0.7",
            }}
          >
            <AnimeCard anime={anime} onChangeSelected={onChangeSelected} />
            {false && (
              <Paper
                elevation={0}
                sx={{
                  width: "100%",
                  height: "100%",
                  bgcolor: theme.palette.action.disabledBackground,
                  backgroundImage: `url(${anime.image_large})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  borderRadius: "8px",
                  overflow: "clip",
                }}
              />
            )}
          </Box>
        </Grid>
        <Grid
          item
          xs={9}
          sm={9.5}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Box sx={{ fontFamily: "interSemiBold", fontSize: "1.125rem" }}>
            {anime.display_name}
          </Box>
          <Box sx={{ fontFamily: "interMedium", fontSize: "14px", mb: 1 }}>
            {getFormatAndEpisodesText(anime)}
          </Box>
          {result.excerpts.map((excerpt, index) => (
            <Box
              key={index}
              sx={{ fontFamily: "interMedium", whiteSpace: "pre-line" }}
              dangerouslySetInnerHTML={{ __html: `...${excerpt}...` }}
            />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}

// TODO Move this to a shared lib.
function getFormatAndEpisodesText(anime) {
  const items = [];

  if (anime.start_date) {
    const startYear = anime.start_date.split("-")[0];
    const endYear = anime.end_date?.split("-")[0];
    if (endYear && endYear !== startYear) {
      items.push(`${startYear}-${endYear}`);
    } else {
      items.push(startYear);
    }
  }

  if (anime.format) {
    items.push(anime.format);
  }

  if (anime.episodes === 1) {
    items.push(`${anime.episodes} episode`);
  } else if (anime.episodes > 1) {
    items.push(`${anime.episodes} episodes`);
  }

  if (anime.genres) {
    items.push(...anime.genres);
  }

  return items.join(" • ");
}
