import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getAvatarSrc } from "./Avatars";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "./APICalls";
import Avatar from "@mui/material/Avatar";

import AnimeShelf from "./AnimeShelf";
import Skeleton from "@mui/material/Skeleton";

export default function CommunityListShelf({ data, anime, titleStyle }) {
  const navigate = useNavigate();
  const { data: profile, isLoading: profileLoading } = useProfile(data?.userId);
  const [listName, setListName] = useState();

  const avatarSrc = useMemo(
    () => getAvatarSrc(profile?.avatar),
    [profile?.avatar]
  );

  useEffect(() => {
    if (!profile?.lists) return;
    for (let item of profile.lists) {
      if (item.id === data.listId) setListName(item.name);
    }
  }, [profile]);

  return (
    <Fragment>
      {/* Render list name */}
      {profile?.uid ? (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h4"
            tabIndex="0"
            onClick={(e) => {
              navigate(`/profile/${profile.uid}/list/${data.listId}`);
              e.preventDefault();
              e.stopPropagation();
            }}
            sx={{
              ...titleStyle,
              "&:hover": { color: "primary.main" },
              cursor: "pointer",
              flexShrink: 1,
              mr: 2,
            }}
          >
            {listName}
          </Typography>
        </Box>
      ) : (
        <Fragment>
          <Skeleton
            width="30%"
            height={25}
            variant="rounded"
            sx={{ ...titleStyle }}
          />
        </Fragment>
      )}

      {/* Render anime shelf */}
      <AnimeShelf items={anime} />

      {/* Render list author avatar and author name */}
      {profile?.uid ? (
        <Box
          tabIndex="0"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            "&:hover": { color: "primary.main" },
            cursor: "pointer",
            flexShrink: 1,
          }}
          onClick={(e) => {
            navigate(`/profile/${profile.uid}`);
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Avatar
            sx={{ width: "35px", height: "35px", mr: 2 }}
            alt={profile?.name}
            src={avatarSrc}
          />
          <Typography> {profile?.name}</Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Skeleton variant="circular" width={35} height={35} sx={{ mr: 2 }} />
          <Skeleton variant="text" width="20%" height={36} />
        </Box>
      )}
    </Fragment>
  );
}
