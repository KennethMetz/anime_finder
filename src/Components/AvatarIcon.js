import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import useTheme from "@mui/material/styles/useTheme";

import { useContext, useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { LocalUserContext } from "./LocalUserContext";
import { auth } from "./Firebase";
import { SaveToFirestore } from "./Firestore";
import { getAvatarSrc } from "./Avatars";

export default function AvatarIcon({ avatar }) {
  const [localUser, setLocalUser] = useContext(LocalUserContext);
  const [user, loading, error] = useAuthState(auth);
  const theme = useTheme();

  function selectAvatar(item) {
    let newLocalUser = { ...localUser };
    newLocalUser.avatar = item;
    setLocalUser(newLocalUser);
    SaveToFirestore(user, newLocalUser);
  }

  const avatarSrc = useMemo(() => getAvatarSrc(avatar), [avatar]);

  return (
    <IconButton
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
      <Avatar
        sx={{
          width: "80px",
          height: "80px",
          backgroundColor: theme.palette.divider,
        }}
        src={avatarSrc}
      ></Avatar>
    </IconButton>
  );
}
