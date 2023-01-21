import { Grid } from "@mui/material";
import OnboardingAnimeCard from "./OnboardingAnimeCard";

export default function OnboardingAnimeGrid({ items }) {
  const columns = 20;
  const breakpoints = { xs: 10, sm: 5, md: 4 };

  return (
    <Grid container spacing={2} columns={columns}>
      {items.map((anime, index) => (
        <Grid item key={index} {...breakpoints} sx={{ aspectRatio: "0.7" }}>
          <OnboardingAnimeCard anime={anime} />
        </Grid>
      ))}
    </Grid>
  );
}
