import Box from "@mui/material/Box";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";

import { List, X } from "phosphor-react";
import { useNavigate } from "react-router-dom";

export default function ProfileListItem({ item, canEdit, onRemove, provided }) {
  const navigate = useNavigate();

  return (
    <ListItem
      disablePadding={true}
      disableGutters={true}
      ref={provided.innerRef}
      {...provided.draggableProps}
    >
      <ListItemButton
        sx={{ padding: 0 }}
        onClick={(e) => {
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

        {canEdit && (
          <div
            style={{ display: "flex", alignItems: "center" }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Tooltip title="Remove item">
              <IconButton
                edge="end"
                aria-label="delete"
                disabled={!onRemove}
                onClick={() => {
                  onRemove();
                }}
              >
                <X size={24} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Reorder item">
              <Icon
                edge="end"
                aria-label="reorder"
                disabled={!onRemove}
                sx={{
                  width: "34px",
                  height: "34px",
                  display: "flex",
                  alignItems: "center",
                  padding: "5px",
                  ml: 2,
                }}
                {...provided.dragHandleProps}
              >
                <List />
              </Icon>
            </Tooltip>
          </div>
        )}
      </ListItemButton>
    </ListItem>
  );
}
