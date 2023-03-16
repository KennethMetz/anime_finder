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

export default function Top8List() {
  const [localUser, setLocalUser] = useContext(LocalUserContext);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const theme = useTheme();

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    console.log(result);
    const items = [...localUser.top8];
    const [reorderedItem] = items.splice(result.source.index, 1);
    console.log(reorderedItem);
    items.splice(result.destination.index, 0, reorderedItem);
    console.log(items);

    let newLocalUser = { ...localUser };
    newLocalUser.top8 = items;
    setLocalUser(newLocalUser);
    SaveToFirestore(user, newLocalUser);
    console.log(localUser);
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: "custom.subtleCardBg",
          borderRadius: "16px",
          pt: 1,
          pb: 3,
          mt: 1,
        }}
      >
        <Typography
          sx={{
            fontFamily: "interBlack",
            fontSize: "1.375rem",
            mt: 1,
            paddingLeft: "2rem",
          }}
        >
          Top 8
        </Typography>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="top8titles">
            {(provided) => (
              <ul
                className="top8titles"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ backgroundColor: "custom.subtleCardBg" }}
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
                          disablePadding={true}
                          disableGutters={true}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{ position: "relative" }}
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
                                "&:hover": {
                                  boxShadow: `0px 0px 15px grey`,
                                },
                              }}
                              onClick={(e) => {
                                navigate(`/anime/${item.id}`);
                              }}
                            ></Box>
                          </ListItemAvatar>

                          <Typography
                            sx={{
                              fontFamily: "interMedium",
                              fontSize: "1rem",
                              cursor: "pointer",
                              "&:hover": { color: "grey" },
                            }}
                            onClick={(e) => {
                              navigate(`/anime/${item.id}`);
                            }}
                            tabIndex="0"
                          >
                            {" "}
                            {item.display_name}
                          </Typography>

                          <IconButton
                            sx={{
                              position: "absolute",
                              right: "0px",
                              width: "40px",
                              height: "40px",
                            }}
                            aria-label="delete"
                            onClick={() => {
                              localUser.top8.splice(index, 1);
                              setLocalUser({ ...localUser });
                              SaveToFirestore(user, localUser);
                            }}
                          >
                            <X
                              size={20}
                              // color={ ? "text.primary" : "inherit"}
                            />{" "}
                          </IconButton>
                        </ListItemButton> //
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