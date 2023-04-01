import {
  IconButton,
  ListItemAvatar,
  ListItemButton,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { X } from "phosphor-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import NoResultsImage from "./NoResultsImage";
import ProfilePageContext from "./ProfilePageContext";

export default function Top8List() {
  const { profile, isOwnProfile, updateTop8 } = useContext(ProfilePageContext);
  const navigate = useNavigate();
  const theme = useTheme();

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = [...profile.top8];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateTop8(items);
  }

  function onRemoveItem(index) {
    const items = [...profile.top8];
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
                  profile?.top8.map((item, index) => (
                    <Draggable
                      key={item.name}
                      draggableId={item.display_name}
                      index={index}
                      isDragDisabled={!isOwnProfile}
                    >
                      {(provided) => (
                        <ListItemButton
                          disableRipple
                          variant="X"
                          className="invisibleX"
                          aria-label={item.display_name}
                          disableGutters={true}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            position: "relative",
                            padding: isOwnProfile
                              ? "4px 40px 4px 1rem"
                              : "4px 1rem 4px 1rem",
                          }}
                          onClick={(e) => {
                            console.log(e.target);
                            console.log(e.currentTarget);

                            if (e.target === e.currentTarget) {
                              navigate(`/anime/${item.id}`);
                            }
                          }}
                        >
                          <ListItemAvatar
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <Box
                              component="img"
                              alt={item.display_name}
                              src={item.image_large ?? item.image_small}
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
                              fontSize: "0.875rem",
                              cursor: "pointer",
                              lineHeight: "1.5",
                              maxHeight: "2.625rem",
                              overflow: "hidden",
                            }}
                          >
                            {item.display_name}
                          </Typography>

                          {isOwnProfile && (
                            <IconButton
                              size="small"
                              sx={{
                                position: "absolute",
                                right: "4px",
                              }}
                              aria-label="delete"
                              onClick={(e) => {
                                e.preventDefault();
                                onRemoveItem(index);
                              }}
                            >
                              <X />
                            </IconButton>
                          )}
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
