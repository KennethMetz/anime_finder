import {
  Avatar,
  IconButton,
  ListItemButton,
  ListItemText,
  Tooltip,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { Camera, X } from "phosphor-react";
import { useContext, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAvatarSrc } from "./Avatars";
import ChooseAvatar from "./ChooseAvatar";
import { auth } from "./Firebase";
import { LocalUserContext } from "./LocalUserContext";

export default function ProfileUserBanner() {
  const [localUser, setLocalUser] = useContext(LocalUserContext);
  const [user, loading, error] = useAuthState(auth);
  const [editAvatar, setEditAvatar] = useState(false);

  function handleAvatarToggle() {
    setEditAvatar((editAvatar) => !editAvatar);
  }

  const avatarSrc = useMemo(
    () => getAvatarSrc(localUser?.avatar),
    [localUser?.avatar]
  );

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Tooltip title="Change your avatar">
          <ListItemButton
            onClick={handleAvatarToggle}
            sx={{ maxWidth: "96px", p: 1, borderRadius: "16px" }}
          >
            <Avatar
              sx={{ width: "80px", height: "80px" }}
              alt={user?.displayName}
              src={avatarSrc}
            />
            <Box
              sx={{
                position: "absolute",
                left: "63px",
                top: "64px",
                width: "30px",
                height: "30px",
                borderRadius: "20px",
                backgroundColor: "custom.subtleCardBg",
                boxSizing: "border-box",
                padding: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Camera sx={{ color: "text" }} size={24} />
            </Box>
          </ListItemButton>
        </Tooltip>

        <ListItemText
          sx={{ ml: 1 }}
          primary={user?.displayName ? user.displayName : "Guest"}
          primaryTypographyProps={{
            fontFamily: "interBlack",
            fontSize: "1.66rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          secondary={user?.email}
          secondaryTypographyProps={{
            fontFamily: "interMedium",
            fontSize: "1rem",
            color: "text",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        />
      </div>
      {editAvatar ? (
        <Box
          sx={{
            backgroundColor: "custom.subtleCardBg",
            mt: 2,
            pt: 2,
            borderRadius: "24px",
          }}
        >
          <div
            className="row"
            style={{ position: "relative", justifyContent: "end" }}
          >
            <IconButton
              color="inherit"
              size="large"
              sx={{ mr: 1, position: "absolute", top: "-5px" }}
              onClick={handleAvatarToggle}
            >
              <X color="grey" />
            </IconButton>
          </div>
          <ChooseAvatar />
        </Box>
      ) : (
        ""
      )}
    </>
  );
}
