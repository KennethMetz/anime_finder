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
import mightguy from "../Styles/images/userAvatars/mightguy.jpg";
import sasuke from "../Styles/images/userAvatars/sasuke.jpg";
import itachi from "../Styles/images/userAvatars/itachi.jpg";
import sakura from "../Styles/images/userAvatars/sakura.jpg";
import franky from "../Styles/images/userAvatars/franky.jpg";
import sanji from "../Styles/images/userAvatars/sanji.jpg";

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
              backgroundColor:
                localUser.avatar === item
                  ? theme.palette.text.primary
                  : "inherit",
              "&:hover": {
                backgroundColor:
                  localUser.avatar === item
                    ? theme.palette.text.primary
                    : "inherit",
              },
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

const avatars = [
  david,
  ryuko,
  naruto,
  sakura,
  sasuke,
  itachi,
  kakashi,
  mightguy,
  luffy,
  franky,
  sanji,
  sailormoon,
];
