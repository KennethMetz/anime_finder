import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { LocalUserContext } from "./LocalUserContext";
import { auth } from "./Firebase";
import { Avatar, IconButton, Typography, useTheme } from "@mui/material";
import david from "../Styles/images/userAvatars/david_martinez.160.jpg";
import naruto from "../Styles/images/userAvatars/naruto.160.jpg";
import kakashi from "../Styles/images/userAvatars/kakashi.160.jpg";
import sailormoon from "../Styles/images/userAvatars/sailormoon.160.jpg";
import ryuko from "../Styles/images/userAvatars/ryuko.160.jpg";
import luffy from "../Styles/images/userAvatars/luffy.jpg";

import { SaveToFirestore } from "./Firestore";

export default function ChooseAvatar() {
  const [localUser, setLocalUser] = useContext(LocalUserContext);
  const [user, loading, error] = useAuthState(auth);
  const theme = useTheme();

  function selectAvatar(item) {
    let newLocalUser = { ...localUser };
    newLocalUser.avatar = item;
    setLocalUser(newLocalUser);
    SaveToFirestore(user, newLocalUser);
  }

  return (
    <div>
      <Typography sx={{ fontFamily: "interSemiBold", pl: 1, mb: 1 }}>
        Select an Avatar:
      </Typography>
      {avatars.map((item, index) => {
        return (
          <IconButton
            key={index}
            onClick={(e) => {
              selectAvatar(item);
            }}
            sx={{
              border: localUser.avatar === item ? "4px solid" : "",
              borderColor: theme.palette.text.primary,
              borderRadius: "120px",
              padding: localUser.avatar === item ? "2px" : "8px",
            }}
          >
            <Avatar
              sx={{
                width: "80px",
                height: "80px",
                fontSize: "2.5rem",
              }}
              src={item}
            ></Avatar>
          </IconButton>
        );
      })}
    </div>
  );
}

const avatars = [david, ryuko, naruto, kakashi, luffy, sailormoon];
