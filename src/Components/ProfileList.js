import {
  Box,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { X } from "phosphor-react";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./Firebase";
import { SaveToFirestore } from "./Firestore";
import { LocalUserContext } from "./LocalUserContext";

export default function ProfileList({ item, index, list, listIndex }) {
  const [localUser, setLocalUser] = useContext(LocalUserContext);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  function handleSaving() {
    if (list === "likes") localUser["likes"].splice(index, 1);
    else if (list === "dislikes") localUser["dislikes"].splice(index, 1);
    else if (list === "lists")
      localUser.lists[listIndex].anime.splice(index, 1);
    setLocalUser({ ...localUser });
    SaveToFirestore(user, localUser);
  }

  return (
    <ListItem
      key={index}
      disablePadding={true}
      disableGutters={true}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => {
            handleSaving();
          }}
        >
          <X size={20} />{" "}
        </IconButton>
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
