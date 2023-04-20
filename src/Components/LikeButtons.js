import Box from "@mui/material/Box";
import AddToListDropMenu from "./AddToListDropMenu";
import DisikeButton from "./DislikeButton";
import LikeButton from "./LikeButton";
import LikeButtonsDropMenu from "./LikeButtonsDropMenu";
import DeleteButtonListItem from "./DeleteButtonListItem";

export default function LikeButtons({
  anime,
  variant,
  selected,
  smallScreen,
  isListOwner,
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
      {smallScreen && isListOwner && (
        <Box sx={{ ml: 1, mr: 1 }} component="span">
          <DeleteButtonListItem
            anime={anime}
            isListOwner={isListOwner}
            onRemove={onRemove}
            smallScreen={smallScreen}
          />
        </Box>
      )}
    </Box>
  );
}
