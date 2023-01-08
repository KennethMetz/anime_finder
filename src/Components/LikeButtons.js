import Box from "@mui/material/Box";
import DisikeButton from "./DislikeButton";
import LikeButton from "./LikeButton";

export default function LikeButtons({ anime }) {
  return (
    <Box>
      <Box sx={{ mr: 1 }} component="span">
        <LikeButton anime={anime} />
      </Box>
      <Box component="span">
        <DisikeButton anime={anime} />
      </Box>
    </Box>
  );
}
