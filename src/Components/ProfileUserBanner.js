import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import { Camera, X } from "phosphor-react";
import { useContext, useMemo, useState } from "react";
import { getAvatarSrc } from "./Avatars";
import ChooseAvatar from "./ChooseAvatar";
import ProfilePageContext from "./ProfilePageContext";
import ClickAndEdit from "./ClickAndEdit";
import ProfileUserBannerGhost from "./ProfileUserBannerGhost";
import Typography from "@mui/material/Typography";

export default function ProfileUserBanner() {
  const { profile, isOwnProfile, updateDisplayName, isLoading } =
    useContext(ProfilePageContext);

  const [editAvatar, setEditAvatar] = useState(false);

  function handleAvatarToggle() {
    setEditAvatar((editAvatar) => !editAvatar);
  }

  const avatarSrc = useMemo(
    () => getAvatarSrc(profile?.avatar),
    [profile?.avatar]
  );

  if (isLoading) {
    return <ProfileUserBannerGhost />;
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        {isOwnProfile ? (
          <Tooltip title="Change your avatar">
            <ListItemButton
              onClick={handleAvatarToggle}
              sx={{
                maxWidth: "96px",
                p: 1,
                borderRadius: "16px",
                flexShrink: 0,
              }}
            >
              <Avatar
                sx={{ width: "80px", height: "80px" }}
                alt={profile?.name}
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
        ) : (
          <Avatar
            sx={{ width: "80px", height: "80px", mr: 1, flexShrink: 0 }}
            alt={profile?.name}
            src={avatarSrc}
          />
        )}
        <Box sx={{ ml: 2, display: "flex", flexDirection: "column" }}>
          <ClickAndEdit
            data={profile?.name}
            label={"Edit display name"}
            canEdit={isOwnProfile}
            onSave={updateDisplayName}
            placeholder={"Your display name"}
            styling={{
              pb: "0px",
              fontWeight: 900,
              fontSize: { xs: "1.66rem", md: "2.5rem" },
            }}
          />
          <Typography variant="h4">
            {profile?.handle ? `@${profile?.handle}` : ""}
          </Typography>
        </Box>
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
