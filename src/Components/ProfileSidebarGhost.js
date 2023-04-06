import { Box, Skeleton } from "@mui/material";

export default function ProfileSidebarGhost() {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", width: "100%", mb: 4 }}>
        <Skeleton
          width={80}
          height={80}
          variant="circular"
          sx={{ mr: 2, flexShrink: 0 }}
        />
        <Skeleton
          height={27}
          variant="rounded"
          sx={{ flexGrow: 1, maxWidth: "180px" }}
        />
      </Box>
      <Skeleton width={120} height={27} variant="rounded" sx={{ mb: 1 }} />
      <Skeleton variant="text" sx={{ mb: 0.2 }} />
      <Skeleton variant="text" sx={{ mb: 4.2 }} />
    </>
  );
}
