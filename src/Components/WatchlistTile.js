import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import { Link } from "react-router-dom";
import NoResultsImage from "./NoResultsImage";
import Avatar from "@mui/material/Avatar";
import { getAvatarSrc } from "./Avatars";
import { Fragment, useMemo } from "react";

import malIcon from "../Styles/images/malIcon-256.png";

export default function WatchlistTile({
  userId,
  listId,
  name,
  items,
  creator,
  creatorAvatar,
  syncData,
}) {
  const theme = useTheme();

  const avatarSrc = useMemo(() => getAvatarSrc(creatorAvatar), [creatorAvatar]);

  const canHover = useMediaQuery("(hover: hover)");

  const isAtLeastSmall = useMediaQuery(theme.breakpoints.up("sm"));

  const maxItemsToShow = isAtLeastSmall ? 8 : 6;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          // Move the title info above the tiles on mobile.
          flexDirection: isAtLeastSmall ? "row" : "column-reverse",
        }}
      >
        <Link to={`/profile/${userId}/list/${listId}`}>
          <Paper
            elevation={0}
            sx={{
              position: "relative",
              display: "inline-flex",
              flexShrink: 1,
              pr: "25px",
              transition: "border 0.1s linear",
              border: `3px solid ${theme.palette.background.main}`,
              borderRadius: "16px",
              overflow: "clip",
              background: "unset",
              boxSizing: "border-box",
              background:
                items?.length === 0
                  ? theme.palette.custom.subtleCardBg
                  : "unset",
              ":hover": canHover
                ? {
                    border: `3px solid ${theme.palette.primary.main}`,
                  }
                : {},
            }}
          >
            {items?.slice(0, maxItemsToShow).map((item, index) => (
              <Box
                key={index}
                sx={{
                  height: isAtLeastSmall
                    ? "121px"
                    : // Ensure that 6 items will fit perfectly across screen.
                      // It depends on the gutters being 48px, the overlap
                      // between items being 26px, and the aspect ratio being
                      // 0.7.
                      "calc(((100vw + 188px - (48px * 2))/6)/0.7)",
                  aspectRatio: "0.7",
                  background: `url(${item?.image_large})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  borderRadius: "8px",
                  overflow: "clip",
                  backgroundColor: theme.palette.custom.missingAnimeCover,
                  mr: "-26px",
                  zIndex: 1 - index,
                  boxShadow: "2px 0 7px #000000cc",
                }}
              />
            ))}
            {items?.length === 0 && (
              <Box
                sx={{
                  p: 2,
                  width: "100%",
                  height: "121px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <NoResultsImage noImage />
              </Box>
            )}
            {syncData && (
              <Box
                sx={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  width: "30px",
                  aspectRatio: "1.0",
                  background: `url(${malIcon})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  borderRadius: " 0px 3px 0px 0px",
                  boxShadow: "2px 0 8px #000000cc",
                  zIndex: 2,
                }}
              />
            )}
          </Paper>
        </Link>

        <Box
          sx={{
            m: "3px",
            ml: { xs: "8px", sm: "24px" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              // Layout title info horizontally on mobile.
              flexDirection: isAtLeastSmall ? "column" : "row",
            }}
          >
            <Link
              to={`/profile/${userId}/list/${listId}`}
              style={{ display: "flex", flexGrow: 1 }}
            >
              <Typography
                variant="h5"
                sx={{
                  display: "inline-block",
                  flexGrow: 1,
                  flexShrink: 1,
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                  transition: "color 0.1s linear",
                  "&:hover": { color: "primary.main" },
                }}
              >
                {name}
              </Typography>
            </Link>

            {items && (
              <Typography
                variant="body2"
                sx={{
                  marginRight: "3px",
                  flexShrink: 0,
                }}
              >
                {items.length ?? "0"} {items.length === 1 ? "item" : "items"}
              </Typography>
            )}
          </Box>
          {creator && (
            <Fragment>
              <Link to={`/profile/${userId}`}>
                <Box
                  sx={{
                    display: "inline-flex",
                    mt: "8px",
                    ml: "3px",
                    flexShrink: 1,
                    alignItems: "center",
                    transition: "color 0.1s linear",
                    cursor: "pointer",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  <Avatar
                    sx={{ width: "25px", height: "25px", mr: 2 }}
                    alt={creator}
                    src={avatarSrc}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {creator}
                  </Typography>
                </Box>
              </Link>
            </Fragment>
          )}
        </Box>
      </Box>
    </>
  );
}
