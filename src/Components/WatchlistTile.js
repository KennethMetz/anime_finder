import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { alpha } from "@mui/system/colorManipulator";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import Divider from "@mui/material/Divider";

import { Link, useNavigate } from "react-router-dom";
import NoResultsImage from "./NoResultsImage";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
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
  const navigate = useNavigate();
  const theme = useTheme();
  const bgColor = theme.palette.custom.subtleCardBg;
  const gradient = `linear-gradient(270deg, ${bgColor} 0%, rgba(245, 245, 245, 0) 67.39%)`;

  const avatarSrc = useMemo(() => getAvatarSrc(creatorAvatar), [creatorAvatar]);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Link to={`/profile/${userId}/list/${listId}`}>
          <Box
            sx={{
              position: "relative",
              display: "inline-flex",
              flexShrink: 1,
              pr: "25px",
              transition: "border 0.1s linear",
              border: `3px solid ${theme.palette.background.main}`,
              borderRadius: "5px",
              overflow: "clip",
              ":hover": {
                border: `3px solid ${theme.palette.primary.main}`,
              },
            }}
          >
            {items?.slice(0, 8).map((item, index) => (
              <>
                <Box
                  sx={{
                    height: "111px",
                    aspectRatio: "0.7",
                    background: `url(${item?.image_large})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    borderRadius: "3px",
                    overflow: "clip",
                    backgroundColor: theme.palette.custom.missingAnimeCover,
                    mr: "-26px",
                    zIndex: -1 * index,
                    border: `1px solid ${theme.palette.grey.main}`,
                    boxShadow: "2px 0 7px black",
                  }}
                />
              </>
            ))}
            {items?.length === 0 && (
              <Box
                sx={{
                  p: 1,
                  width: "100%",
                  aspectRatio: "4",
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
                }}
              />
            )}
          </Box>
        </Link>

        <Box
          sx={{
            margin: "3px 3px 3px 30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Link
              to={`/profile/${userId}/list/${listId}`}
              style={{ display: "flex" }}
            >
              <Typography
                variant="h4"
                sx={{
                  flexGrow: 1,
                  flexShrink: 1,
                  overflowWrap: "break-word",
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
                    {" "}
                    {creator}
                  </Typography>
                </Box>
              </Link>
            </Fragment>
          )}
        </Box>
      </Box>
      <Divider
        sx={{
          display: "block",

          mt: 2,
          borderColor: theme.palette.grey,
        }}
      />
    </>
  );
}
