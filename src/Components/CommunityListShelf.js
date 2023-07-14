import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getAvatarSrc } from "./Avatars";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "./APICalls";
import Avatar from "@mui/material/Avatar";

import AnimeShelf from "./AnimeShelf";
import Skeleton from "@mui/material/Skeleton";
import { useMediaQuery } from "@mui/material";

export default function CommunityListShelf({ data, anime, titleStyle }) {
  const navigate = useNavigate();
  const { data: profile, isLoading: profileLoading } = useProfile(data?.userId);
  const cannotHover = useMediaQuery("(hover: none)");
  const coarsePointer = useMediaQuery("(pointer: coarse)");

  const isTouchscreen = cannotHover && coarsePointer;

  const avatarSrc = useMemo(
    () => getAvatarSrc(profile?.avatar),
    [profile?.avatar]
  );

  const listName = useMemo(() => {
    if (!profile?.lists || !data?.listId) return;
    for (let item of profile.lists) {
      if (item.id === data.listId) return item.name;
    }
  }, [profile?.lists, data?.listId]);

  return (
    <Fragment>
      {/* Render list name */}

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          variant="h4"
          tabIndex="0"
          onKeyDown={(e) => {
            if (e.key === "Enter")
              navigate(`/profile/${profile.uid}/list/${data.listId}`);
          }}
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
          {!profile?.uid ? <Skeleton width="40vw" variant="text" /> : listName}
        </Typography>
      </Box>

      {/* Render anime shelf */}
      <AnimeShelf items={anime} />

      {/* Render list author avatar and author name */}
      <Box
        tabIndex="0"
        onKeyDown={(e) => {
          if (e.key === "Enter")
            navigate(`/profile/${profile.uid}/list/${data.listId}`);
        }}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          "&:hover": { color: "primary.main" },
          cursor: "pointer",
          flexShrink: 1,
          mt: isTouchscreen ? 1 : 0,
        }}
        onClick={(e) => {
          navigate(`/profile/${profile.uid}`);
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {!profile?.uid ? (
          <Skeleton variant="circular" width={35} height={35} sx={{ mr: 2 }} />
        ) : (
          <Avatar
            sx={{ width: "35px", height: "35px", mr: 2 }}
            alt={profile?.name}
            src={avatarSrc}
          />
        )}
        <Typography>
          {!profile?.uid ? (
            <Skeleton variant="text" width="20vw" />
          ) : (
            profile?.name
          )}
        </Typography>
      </Box>
    </Fragment>
  );
}
