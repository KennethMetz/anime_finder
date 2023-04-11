import Box from "@mui/material/Box";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";

import { X } from "phosphor-react";
import { useNavigate } from "react-router-dom";

export default function ProfileListItem({ item, canEdit, onRemove }) {
  const navigate = useNavigate();

  return (
    <ListItem
      disablePadding={true}
      disableGutters={true}
      secondaryAction={
        canEdit && (
          <Tooltip title="Remove item">
            <IconButton
              edge="end"
              aria-label="delete"
              disabled={!onRemove}
              onClick={() => {
                onRemove();
              }}
            >
              <X size={20} />
            </IconButton>
          </Tooltip>
        )
      }
    >
      <ListItemButton
        sx={{ padding: 0 }}
        onClick={() => {
          navigate(`/anime/${item.id}`, { state: item });
        }}
      >
        <ListItemAvatar>
          <Box
            component="img"
            alt={item.display_name}
            src={item.image_large ?? item.image_small}
            sx={{ height: "56px" }}
          ></Box>{" "}
        </ListItemAvatar>
        <ListItemText
          primary={item.display_name}
          primaryTypographyProps={{ fontFamily: "interMedium" }}
        />
      </ListItemButton>
    </ListItem>
  );
}
