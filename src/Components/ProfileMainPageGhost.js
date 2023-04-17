import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

export default function ProfileMainPageGhost() {
  return (
    <Grid container sx={{ mt: 2 }}>
      <Grid item xs={12} md={4}>
        <Skeleton width={120} height={27} variant="rounded" sx={{ mb: 1 }} />
        <Skeleton variant="text" sx={{ mb: 0.2 }} />
        <Skeleton variant="text" sx={{ mb: 4.2 }} />
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid
          container
          columnSpacing={2}
          sx={{ paddingLeft: { xs: 0, md: "45px" } }}
        >
          <Grid item xs={12} sx={{ mb: 2 }}>
            <Skeleton variant="rounded" width={120} height={24} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton
              variant="rounded"
              height={162}
              sx={{ borderRadius: "16px", mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton
              variant="rounded"
              height={162}
              sx={{ borderRadius: "16px", mb: 2 }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
