import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

export default function ProfileMainPageGhost() {
  return (
    <Grid container sx={{ mt: 4 }}>
      <Grid item xs={12} md={3.5}>
        <Skeleton width={120} height={27} variant="rounded" sx={{ mb: 1 }} />
        <Skeleton variant="text" sx={{ mb: 0.2 }} />
        <Skeleton variant="text" sx={{ mb: 0.2 }} />
        <Skeleton variant="text" sx={{ mb: 0.2 }} />
        <Skeleton variant="text" sx={{ mb: 4.2 }} />
        <Skeleton
          height={300}
          variant="rounded"
          sx={{ mb: 4.2, borderRadius: "16px" }}
        />
      </Grid>
      <Grid item xs={12} md={8.5}>
        <Grid
          container
          columnSpacing={2}
          sx={{ paddingLeft: { xs: 0, md: "45px" } }}
        >
          <Grid item xs={12} sx={{ mb: 2 }}>
            <Skeleton variant="rounded" width={120} height={27} />
          </Grid>
          <Grid item xs={12}>
            <GhostWatchlistTile />
          </Grid>
          <Grid item xs={12}>
            <GhostWatchlistTile />
          </Grid>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <Box sx={{ display: "flex" }}>
              <Skeleton
                variant="rounded"
                width={120}
                height={27}
                sx={{ mt: 4 }}
              />
              <Box sx={{ flexGrow: 1 }} />
              <Skeleton
                variant="rounded"
                width={140}
                height={30}
                sx={{ mt: 4, borderRadius: "60px" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <GhostWatchlistTile />
          </Grid>
          <Grid item xs={12}>
            <GhostWatchlistTile />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

function GhostWatchlistTile() {
  return (
    <Skeleton
      variant="rounded"
      height={127}
      sx={{ borderRadius: "16px", maxWidth: "2500px", mb: 2 }}
    />
  );
}
