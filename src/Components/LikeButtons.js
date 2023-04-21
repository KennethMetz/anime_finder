import Box from "@mui/material/Box";
import AddToListDropMenu from "./AddToListDropMenu";
import DisikeButton from "./DislikeButton";
import LikeButton from "./LikeButton";
import DeleteButtonListItem from "./DeleteButtonListItem";

export default function LikeButtons({
  anime,
  variant,
  selected,
  showDeleteButton,
  onRemove,
}) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box component="span">
        <LikeButton anime={anime} variant={variant} selected={selected} />
      </Box>
      <Box sx={{ ml: 1, mr: 1 }} component="span">
        <DisikeButton anime={anime} variant={variant} selected={selected} />
      </Box>
      <Box component="span">
        <AddToListDropMenu
          anime={anime}
          variant={variant}
          selected={selected}
        />
      </Box>
      {showDeleteButton && (
        <Box sx={{ ml: 1, mr: 1 }} component="span">
          <DeleteButtonListItem onRemove={onRemove} />
        </Box>
      )}
    </Box>
  );
}
