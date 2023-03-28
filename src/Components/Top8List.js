import {
  Icon,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { X, List, Link } from "phosphor-react";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./Firebase";
import { SaveToFirestore } from "./Firestore";
import { LocalUserContext } from "./LocalUserContext";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import NoResultsImage from "./NoResultsImage";

export default function Top8List() {
  const [localUser, setLocalUser] = useContext(LocalUserContext);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const theme = useTheme();

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = [...localUser.top8];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    let newLocalUser = { ...localUser };
    newLocalUser.top8 = items;
    setLocalUser(newLocalUser);
    SaveToFirestore(user, newLocalUser);
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
        {localUser?.top8?.length === 0 ? <NoResultsImage noImage /> : ""}
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="top8titles">
            {(provided) => (
              <ul
                className="top8titles"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {localUser?.top8?.length > 0 &&
                  localUser?.top8.map((item, index) => (
                    <Draggable
                      key={item.name}
                      draggableId={item.display_name}
                      index={index}
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
                            padding: "4px 40px 4px 1rem",
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

                          <IconButton
                            size="small"
                            sx={{
                              position: "absolute",
                              right: "4px",
                            }}
                            aria-label="delete"
                            onClick={(e) => {
                              e.preventDefault();
                              console.log(e.currentTarget);

                              localUser.top8.splice(index, 1);
                              setLocalUser({ ...localUser });
                              SaveToFirestore(user, localUser);
                            }}
                          >
                            <X />
                          </IconButton>
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
