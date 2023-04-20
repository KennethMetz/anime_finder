import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { X } from "phosphor-react";

export default function DeleteButtonListItem({ anime, isListOwner, onRemove }) {
  return (
    <Tooltip title="Remove item">
      <IconButton
        edge="end"
        aria-label="delete"
        sx={{ color: "inherit" }}
        onClick={() => {
          onRemove();
        }}
      >
        <X size={24} />
      </IconButton>
    </Tooltip>
  );
}
