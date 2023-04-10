import { Box, Skeleton } from "@mui/material";

export default function ProfileListPageGhost() {
  const rows = new Array(5).fill(0);
  return (
    <Box sx={{ mt: 2 }}>
      <Skeleton variant="rounded" width={160} height={40} sx={{ mb: 2 }} />
      {rows.map((i, index) => (
        <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Skeleton variant="rounded" width={40} height={56} sx={{ mr: 2 }} />
          <Skeleton variant="text" width={200} />
        </Box>
      ))}
    </Box>
  );
}
