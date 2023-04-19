import Box from "@mui/material/Box";
import AddToListDropMenu from "./AddToListDropMenu";
import DisikeButton from "./DislikeButton";
import LikeButton from "./LikeButton";

export default function LikeButtons({ anime, variant, selected }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ mr: 1 }} component="span">
        <LikeButton anime={anime} variant={variant} selected={selected} />
      </Box>
      <Box component="span">
        <DisikeButton anime={anime} variant={variant} selected={selected} />
      </Box>
      <Box sx={{ ml: 1 }} component="span">
        <AddToListDropMenu
          anime={anime}
          variant={variant}
          selected={selected}
        />
      </Box>
    </Box>
  );
}
