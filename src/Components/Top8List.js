import ListItemAvatar from "@mui/material/ListItemAvatar";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";

import useTheme from "@mui/material/styles/useTheme";
import { X, List } from "phosphor-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import NoResultsImage from "./NoResultsImage";
import ProfilePageContext from "./ProfilePageContext";

export default function Top8List() {
  const { profile, animeObjects, isOwnProfile, updateTop8 } =
    useContext(ProfilePageContext);
  const navigate = useNavigate();
  const theme = useTheme();

  const [visible, setVisible] = useState(false);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = [...profile?.top8];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateTop8(items);
  }

  function onRemoveItem(index) {
    const items = [...profile?.top8];
    items.splice(index, 1);
    updateTop8(items);
  }

  return (
    <>
      <Box
        component="div"
        sx={{
          borderRadius: "16px",
          pt: 1,
          pb: 2,
          mt: 3,
          background: theme.palette.custom.top8Bg,
        }}
      >
        <Typography
          sx={{
            fontFamily: "interBlack",
            fontSize: "1.375rem",
            mt: 1,
            mb: 2.5,
            pl: 2,
          }}
        >
          Top 8
        </Typography>
        {profile?.top8?.length === 0 ? <NoResultsImage noImage /> : ""}
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="top8titles">
            {(provided) => (
              <ul
                className="top8titles"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {profile?.top8?.length > 0 &&
                  animeObjects?.top8.map((item, index) => (
                    <Draggable
                      key={`${item} + ${index}`}
                      draggableId={`${item} + ${index}`}
                      index={index}
                      isDragDisabled={!isOwnProfile}
                    >
                      {(provided) => (
                        <ListItemButton
                          variant="X"
                          className="invisibleX"
                          aria-label={item?.display_name}
                          disableGutters={true}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          sx={{
                            position: "relative",
                            padding: isOwnProfile
                              ? "4px 4px 4px 1rem"
                              : "4px 1rem 4px 1rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                          onClick={(e) => {
                            navigate(`/anime/${item.id}`);
                          }}
                          onMouseEnter={(e) => {
                            setVisible(index);
                          }}
                          onDrag={(e) => {
                            setVisible(false);
                          }}
                          onMouseLeave={(e) => {
                            setVisible(false);
                          }}
                          onFocus={(e) => {
                            setVisible(index);
                          }}
                          onBlur={(e) => {
                            setVisible(false);
                          }}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {" "}
                            <ListItemAvatar
                              sx={{ display: "flex", alignItems: "center" }}
                            >
                              <Box
                                component="img"
                                alt={item?.display_name}
                                src={item?.image_large ?? item?.image_small}
                                sx={{
                                  height: "56px",
                                  borderRadius: "8px",
                                  cursor: "pointer",
                                }}
                              ></Box>
                            </ListItemAvatar>
                            <Typography
                              sx={{
                                fontFamily: "interMedium",
                                fontSize: "1rem",
                                cursor: "pointer",
                                lineHeight: "1.5",
                                maxHeight: "2.625rem",
                                overflow: "hidden",
                              }}
                            >
                              {item?.display_name}
                            </Typography>
                          </div>
                          <div
                            style={{ display: "flex" }}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            {isOwnProfile && (
                              <IconButton
                                size="small"
                                tabIndex={isOwnProfile ? 0 : -1}
                                sx={{
                                  zIndex:
                                    isOwnProfile && visible === index
                                      ? "1"
                                      : "-1",
                                }}
                                aria-label="delete"
                                onClick={(e) => {
                                  onRemoveItem(index);
                                }}
                              >
                                <X size={24} />
                              </IconButton>
                            )}
                            {isOwnProfile && (
                              <Icon
                                tabIndex={0}
                                sx={{
                                  width: "34px",
                                  height: "34px",
                                  display: "flex",
                                  alignItems: "center",
                                  padding: "5px",
                                }}
                                {...provided.dragHandleProps}
                              >
                                <List />
                              </Icon>
                            )}
                          </div>
                        </ListItemButton>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </>
  );
}
