import { Avatar, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { LocalUserContext } from "./LocalUserContext";
import { auth } from "./Firebase";
import { SaveToFirestore } from "./Firestore";

export default function AvatarIcon({ avatar, index }) {
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
    <IconButton
      key={index}
      onClick={(e) => {
        selectAvatar(avatar);
      }}
      sx={{
        backgroundColor:
          localUser.avatar === avatar ? theme.palette.text.primary : "inherit",
        "&:hover": {
          backgroundColor:
            localUser.avatar === avatar
              ? theme.palette.text.primary
              : "inherit",
        },
      }}
    >
      <Avatar sx={{ width: "80px", height: "80px" }} src={avatar}></Avatar>
    </IconButton>
  );
}
