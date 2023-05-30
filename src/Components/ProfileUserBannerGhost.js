import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function ProfileUserBannerGhost() {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Skeleton
        variant="circular"
        width={80}
        height={80}
        sx={{ flexShrink: 0 }}
      />
      <Skeleton variant="text" sx={{ ml: 2 }} width={220} height={60} />
    </Box>
  );
}
