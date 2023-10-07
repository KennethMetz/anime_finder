import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";

import Skeleton from "@mui/material/Skeleton";

export default function EmojiReactionChipView({
  emoji, // Phosphor emoji component to display
  count,
  selected,
  onClick,
  tooltip,
  isLoading,
  isDisabled,
}) {
  if (isLoading) {
    return (
      <Skeleton
        variant="rounded"
        width={65}
        height={32}
        sx={{ paddingLeft: 0.5, borderRadius: "20px", mr: 2 }}
      />
    );
  }

  return (
    <Tooltip title={tooltip} followCursor>
      <div>
        <Chip
          variant={selected ? "filled" : "outlined"}
          icon={emoji}
          label={count}
          disabled={isDisabled}
          sx={{
            paddingLeft: 0.5,
            borderRadius: "20px",
            mr: 2,
            "& .MuiChip-label": { fontSize: "1rem" },
            "& .MuiChip-icon": {
              ...(selected && { color: "inherit" }),
            },
          }}
          onClick={onClick}
        />
      </div>
    </Tooltip>
  );
}
