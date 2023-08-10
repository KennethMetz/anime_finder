import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Skeleton from "@mui/material/Skeleton";
import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import useTheme from "@mui/material/styles/useTheme";
import { getAvatarSrc } from "./Avatars";
import { APIGetAnime, useProfile } from "../Components/APICalls";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { formatDistanceToNowStrict, fromUnixTime } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";
import useAnime from "../Hooks/useAnime";
import { LocalUserContext } from "./LocalUserContext";
import { Asterisk, AsteriskSimple, Circle } from "phosphor-react";
import useMediaQuery from "@mui/material/useMediaQuery";

//
// @param {Object} item - The notification object.

export function NotificationListItem({ item, handleClose, index }) {
  const [localUser, setLocalUser] = useContext(LocalUserContext);
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobileWidth = useMediaQuery(theme.breakpoints.down("sm"));

  // Determine what type of notification this is, in order to select text output
  let notificationType;
  if (!item.docType) notificationType = "listComment";
  if (item.docType === "comments") notificationType = "emojiOnComment";
  if (item.docType === "reviews") notificationType = "emojiOnReview";
  if (item.docType === "list") notificationType = "emojiOnList";

  const animeId =
    notificationType === "emojiOnReview" ? item.docId.toString() : null;

  const { data: interactorData } = useProfile(item.interactorId);
  const { data: listOwnerData, loading: loadingListOwner } = useProfile(
    item.listOwnerId
  );
  const [anime, animeLoading, animeError] = useAnime(animeId, location.state);
  const verbed = getInteractionType(item.action);
  const contentName = getContentName(item.listId, listOwnerData?.lists);

  const avatarSrc = useMemo(
    () => getAvatarSrc(interactorData?.avatar),
    [interactorData?.avatar]
  );

  const loading =
    !interactorData || !avatarSrc || animeLoading || loadingListOwner;

  const time = useMemo(
    () => getTimeElapsed(item.time, isMobileWidth),
    [item.time, isMobileWidth]
  );

  if (loading)
    return (
      <Box sx={{ display: "flex", mb: 1, alignItems: "center" }}>
        <Skeleton
          variant="circular"
          sx={{ height: 48, width: 48, ml: 2, flexShrink: 0 }}
        />
        <Skeleton
          variant="text"
          sx={{ width: "65%", minWidth: "150px", mx: 1, height: 40 }}
        />
        <Skeleton
          variant="text"
          sx={{ width: "10%", minWidth: "50px", ml: 4, mr: 1, height: 40 }}
        />
      </Box>
    );

  return (
    <MenuItem
      selected={!item.read ? true : false}
      autoFocus={index === 0 ? true : false}
      sx={{
        whiteSpace: "normal",
        mt: 1,
        mb: 1,
        bgcolor: !item.read ? theme.palette.custom.subtleCardBg : "inherit",
      }}
      onClick={(e) => {
        handleClose(e);
        if (notificationType === "emojiOnReview")
          navigate(`/anime/${item.docId}`);
        else navigate(`/profile/${item.listOwnerId}/list/${item.listId}`);
      }}
    >
      {!item.read && (
        <Box sx={{ display: "flex", alignItems: "center", mr: 2, ml: 0 }}>
          <Circle size={14} weight="fill" color={theme.palette.primary.main} />
        </Box>
      )}
      <ListItemAvatar>
        <Avatar
          alt={interactorData?.name ?? "Guest"}
          src={avatarSrc ?? "purposefully bad link"}
          sx={{
            bgcolor: theme.palette.primary.main,
            fontWeight: 600,
            width: "48px",
            height: "48px",
          }}
        />
      </ListItemAvatar>
      <Box sx={{ flexGrow: 1 }}>
        <Typography sx={{ fontWeight: "800", display: "inline" }}>
          {`@${interactorData?.handle} `}
        </Typography>
        {notificationType === "listComment" && (
          <Fragment>
            <Typography
              sx={{ display: "inline" }}
            >{`commented on your list `}</Typography>
            <Typography sx={{ fontWeight: "800", display: "inline" }}>
              {contentName}
            </Typography>
          </Fragment>
        )}
        {notificationType === "emojiOnComment" && (
          <Fragment>
            <Typography component="div" sx={{ display: "inline" }}>
              {`${verbed} your comment on @${listOwnerData?.handle}'s list `}{" "}
            </Typography>
            <Typography sx={{ fontWeight: "800", display: "inline" }}>
              {contentName}
            </Typography>
          </Fragment>
        )}
        {notificationType === "emojiOnReview" && (
          <Fragment>
            <Typography sx={{ display: "inline" }}>
              {`${verbed} your review of `}
            </Typography>
            <Typography sx={{ fontWeight: "800", display: "inline" }}>
              {anime?.display_name}
            </Typography>
          </Fragment>
        )}
        {notificationType === "emojiOnList" && (
          <Fragment>
            <Typography
              sx={{ display: "inline" }}
            >{`${verbed} your list `}</Typography>
            <Typography sx={{ fontWeight: "800", display: "inline" }}>
              {contentName}
            </Typography>
          </Fragment>
        )}
      </Box>
      <Box sx={{ textAlign: "center", flexShrink: 0, ml: 2 }}>
        <Typography>{time}</Typography>
      </Box>
    </MenuItem>
  );
}

// Support functions
function getInteractionType(input) {
  if (input === "applause") return "applauded";
  if (input === "heart") return "loved";
}

function getContentName(listId, listOwnersLists) {
  if (!listOwnersLists) return;
  if (listId === "likes") return "Likes";
  if (listId === "dislikes") return "Dislikes";
  for (let item of listOwnersLists) {
    if (listId === item?.id) return item?.name;
  }
}

function getTimeElapsed(input, isMobileWidth) {
  const inputDate = fromUnixTime(input?.seconds);
  if (!isMobileWidth) return formatDistanceToNowStrict(inputDate);
  // Returns an abbreviated time interval on mobile devices (ie. h instead of hours)
  else {
    let date = formatDistanceToNowStrict(inputDate);
    let splitString = date.split(" ");
    let target = splitString[1];
    //Create hashmaps of possible words we want to abbreviate;
    let hashmap = {};
    hashmap.second = "s";
    hashmap.seconds = "s";
    hashmap.minute = "m";
    hashmap.minutes = "m";
    hashmap.hour = "h";
    hashmap.hours = "h";
    hashmap.day = "d";
    hashmap.days = "d";
    hashmap.month = "mo";
    hashmap.months = "mo";
    hashmap.year = "y";
    hashmap.years = "y";
    let abbreviatedTimeElapsed;
    if (hashmap[target]) {
      abbreviatedTimeElapsed = date.replace(target, hashmap[target]);
    }
    return abbreviatedTimeElapsed;
  }
}
