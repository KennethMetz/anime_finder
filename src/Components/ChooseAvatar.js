import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { LocalUserContext } from "./LocalUserContext";
import { auth } from "./Firebase";
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  ListItem,
  Typography,
} from "@mui/material";
import david from "../Styles/images/userAvatars/david_martinez.jpg";
import naruto from "../Styles/images/userAvatars/naruto.jpg";
import kakashi from "../Styles/images/userAvatars/Kakashi.jpg";
import { SaveToFirestore } from "./Firestore";

export default function ChooseAvatar(setEditAvatar) {
  const [localUser, setLocalUser] = useContext(LocalUserContext);
  const [user, loading, error] = useAuthState(auth);

  function selectAvatar(item) {
    let newLocalUser = { ...localUser };
    newLocalUser.avatar = item;
    setLocalUser(newLocalUser);
    SaveToFirestore(user, newLocalUser);
    console.log(localUser);
  }

  return (
    <div>
      <Typography sx={{ fontFamily: "interSemiBold", pl: 1 }}>
        Select an Avatar:
      </Typography>
      {avatars.map((item, index) => {
        return (
          <IconButton
            key={index}
            onClick={(e) => {
              selectAvatar(item);
            }}
          >
            <Avatar
              sx={{ width: "80px", height: "80px", fontSize: "2.5rem" }}
              src={item}
            ></Avatar>
          </IconButton>
        );
      })}
    </div>
  );
}

const avatars = [david, naruto, kakashi];
