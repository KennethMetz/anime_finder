import { alpha, Box, Grid, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import NoResultsImage from "./NoResultsImage";

export default function WatchlistTile({ userId, listId, name, items }) {
  const theme = useTheme();

  const bgColor = theme.palette.custom.subtleCardBg;
  const gradient = `linear-gradient(270deg, ${bgColor} 0%, rgba(245, 245, 245, 0) 67.39%)`;

  return (
    <Link to={`/profile/${userId}/list/${listId}`}>
      <Box
        sx={{
          padding: "18px",
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
            {items?.length ?? "0"} {items?.length === 1 ? "video" : "videos"}
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
                      ? `${gradient}, url(${item.image_large})`
                      : `url(${item.image_large})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  borderRadius: "8px",
                  overflow: "clip",
                }}
              />
            </Grid>
          ))}
          {!items?.length && (
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
      </Box>
    </Link>
  );
}
