import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { getAvatarSrc } from "./Avatars";
import ProfilePageContext from "./ProfilePageContext";

export default function ProfileUserBannerSmall() {
  const { profile, profileUserId, isOwnProfile } =
    useContext(ProfilePageContext);

  const avatarSrc = useMemo(
    () => getAvatarSrc(profile?.avatar),
    [profile?.avatar]
  );

  return (
    <Link to={`/profile/${profileUserId}`}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          "&:hover": { color: "primary.main" },
        }}
      >
        <Avatar
          sx={{ width: "35px", height: "35px", mr: 2 }}
          alt={profile?.name}
          src={avatarSrc}
        />
        <ListItemText
          primary={profile?.name}
          primaryTypographyProps={{
            fontFamily: "interSemiBold",
            fontSize: "1.125rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          secondaryTypographyProps={{
            fontFamily: "interMedium",
            fontSize: "0.875rem",
            color: "text",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        />
      </Box>
    </Link>
  );
}
