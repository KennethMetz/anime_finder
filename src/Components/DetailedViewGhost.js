import { Box, Container, Grid, Skeleton } from "@mui/material";

export default function DetailedViewGhost() {
  return (
    <Container maxWidth="lg">
      <Grid container sx={{ paddingTop: { xs: "25px", md: "50px" } }}>
        <Grid item xs={12} md={3}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Skeleton
              variant="rounded"
              width={250}
              height={357}
              sx={{ borderRadius: "16px", mb: 2 }}
            />
          </Box>
          <Skeleton width={120} height={27} variant="rounded" sx={{ mb: 1 }} />
          <Skeleton variant="text" sx={{ mb: 0.2 }} />
          <Skeleton variant="text" sx={{ mb: 2 }} />
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container sx={{ paddingLeft: { xs: 0, md: "46px" } }}>
            {/*Desktop-only big title*/}
            <Grid
              item
              xs={12}
              md={8.5}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <Skeleton variant="rounded" width={280} height={40} />
            </Grid>
            {/* LikeButtons */}
            <Grid
              item
              xs={12}
              md={3.5}
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-end" },
                marginTop: { xs: 0.5, md: 0 },
                marginBottom: 2,
              }}
            >
              <Skeleton
                variant="circular"
                width={50}
                height={50}
                sx={{ mr: 1 }}
              />
              <Skeleton
                variant="circular"
                width={50}
                height={50}
                sx={{ mr: 1 }}
              />
              <Skeleton variant="circular" width={50} height={50} />
            </Grid>

            {/* Data from Edward */}
            <Grid item xs={12}>
              <Skeleton
                variant="rounded"
                height={290}
                sx={{ borderRadius: "16px" }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div className="gap" />
    </Container>
  );
}
