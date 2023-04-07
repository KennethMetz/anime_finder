import { Grid, Skeleton } from "@mui/material";

export default function ProfileMainPageGhost() {
  return (
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
  );
}
