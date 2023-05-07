import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { alpha } from "@mui/system/colorManipulator";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import { Link } from "react-router-dom";
import NoResultsImage from "./NoResultsImage";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import { getAvatarSrc } from "./Avatars";
import { Fragment, useMemo } from "react";
import { Divider } from "@mui/material";

export default function WatchlistTile({
  userId,
  listId,
  name,
  items,
  creator,
  creatorAvatar,
}) {
  const theme = useTheme();
  console.log(creatorAvatar);
  const bgColor = theme.palette.custom.subtleCardBg;
  const gradient = `linear-gradient(270deg, ${bgColor} 0%, rgba(245, 245, 245, 0) 67.39%)`;

  const avatarSrc = useMemo(() => getAvatarSrc(creatorAvatar), [creatorAvatar]);

  return (
    <Link to={`/profile/${userId}/list/${listId}`}>
      <Box
        sx={{
          padding: creator ? "18px 18px 4px 18px" : "18px 18px 18px 18px",
          background: bgColor,
          borderRadius: "16px",
          cursor: "pointer",
          marginBottom: "16px",
          ":hover": {
            background: alpha(theme.palette.action.hover, 0.07),
          },
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "interExtraBold",
              fontSize: "16px",
              marginBottom: "6px",
              flexGrow: 1,
              justifyItems: "baseline",
            }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              fontFamily: "interMedium",
              fontSize: "14px",
              marginLeft: "8px",
            }}
          >
            {items?.length ?? "0"} {items?.length === 1 ? "item" : "items"}
          </Typography>
        </Box>
        <Grid container columnSpacing={1}>
          {items?.slice(0, 5).map((item, index) => (
            <Grid item xs={12 / 5} key={index}>
              <Box
                sx={{
                  width: "100%",
                  aspectRatio: "0.7",
                  background:
                    index == 4
                      ? `${gradient}, url(${item?.image_large})`
                      : `url(${item?.image_large})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  borderRadius: "8px",
                  overflow: "clip",
                }}
              />
            </Grid>
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
        </Grid>
        {creator && (
          <Fragment>
            <Divider sx={{ mt: 2 }} />
            <Grid sx={{ mt: 1 }}>
              <Link
                to={`/profile/${userId}`}
                style={{ display: "inline-block" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  <Avatar
                    sx={{ width: "35px", height: "35px", mr: 2 }}
                    alt={creator}
                    src={avatarSrc}
                  />
                  <ListItemText
                    primary={creator}
                    primaryTypographyProps={{
                      fontFamily: "interMedium",
                      fontSize: "1rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  />
                </Box>
              </Link>
            </Grid>
          </Fragment>
        )}
      </Box>
    </Link>
  );
}
