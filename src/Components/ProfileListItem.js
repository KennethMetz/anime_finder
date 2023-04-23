import Box from "@mui/material/Box";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import useMediaQuery from "@mui/material/useMediaQuery";

import { List, X } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useTheme from "@mui/material/styles/useTheme";
import LikeButtons from "./LikeButtons";
import LikeButtonsDropMenu from "./LikeButtonsDropMenu";

export default function ProfileListItem({
  item,
  isOwnProfile,
  onRemove,
  provided,
}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [selected, setSelected] = useState(false);
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));

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
        onMouseEnter={(e) => {
          setSelected(true);
        }}
        onDrag={(e) => {
          setSelected(false);
        }}
        onMouseLeave={(e) => {
          setSelected(false);
        }}
        onFocus={(e) => {
          setSelected(true);
        }}
        onBlur={(e) => {
          setSelected(false);
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
        {smallScreen ? (
          <LikeButtonsDropMenu
            anime={item}
            isOwnProfile={isOwnProfile}
            onRemove={onRemove}
          />
        ) : (
          <LikeButtons anime={item} selected={selected} />
        )}
        {isOwnProfile && (
          <div
            style={{ display: "flex", alignItems: "center" }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {" "}
            {!smallScreen && (
              <Tooltip title="Remove item">
                <IconButton
                  edge="end"
                  aria-label="delete"
                  tabIndex={isOwnProfile && selected ? 0 : -1}
                  sx={{
                    color:
                      isOwnProfile && selected
                        ? "inherit"
                        : theme.palette.background.default,
                  }}
                  disabled={!onRemove}
                  onClick={() => {
                    onRemove();
                  }}
                >
                  <X size={24} />
                </IconButton>
              </Tooltip>
            )}
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
                  ml: smallScreen ? 0 : 2,
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
