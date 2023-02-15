import { Grid, Skeleton } from "@mui/material";
import OnboardingAnimeCard from "./OnboardingAnimeCard";

export default function OnboardingAnimeGrid({ items }) {
  items = items ?? [];

  const columns = 20;
  const breakpoints = { xs: 10, sm: 5, md: 4 };

  const ghosts = new Array(10).fill(0);
  const showGhosts = !items.length;

  return (
    <Grid container spacing={2} columns={columns}>
      {showGhosts &&
        ghosts.map((anime, index) => (
          <Grid item key={index} {...breakpoints} sx={{ aspectRatio: "0.7" }}>
            <Skeleton
              variant="rounded"
              sx={{ height: "100%", borderRadius: "8px" }}
            />
          </Grid>
        ))}
      {!showGhosts &&
        items.map((anime, index) => (
          <Grid item key={index} {...breakpoints} sx={{ aspectRatio: "0.7" }}>
            <OnboardingAnimeCard anime={anime} />
          </Grid>
        ))}
    </Grid>
  );
}
