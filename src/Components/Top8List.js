import {
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { X } from "phosphor-react";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./Firebase";
import { SaveToFirestore } from "./Firestore";
import { LocalUserContext } from "./LocalUserContext";

export default function Top8List() {
  const [localUser, setLocalUser] = useContext(LocalUserContext);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  return (
    <>
      <Typography
        sx={{ fontFamily: "interBlack", fontSize: "1.375rem", mt: 1 }}
      >
        Your Top 8
      </Typography>

      <List>
        {localUser.top8.map((item, index) => (
          <ListItem
            key={index}
            disablePadding={true}
            disableGutters={true}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => {
                  localUser.top8.splice(index, 1);
                  setLocalUser({ ...localUser });
                  SaveToFirestore(user, localUser);
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
                ></Box>
              </ListItemAvatar>

              <ListItemText
                primary={item.display_name}
                primaryTypographyProps={{ fontFamily: "interMedium" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}
