import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

import { Link } from "react-router-dom";
import LikeButtons from "./LikeButtons";

export default function AnimeCard({ anime, large }) {
  const theme = useTheme();

  const canHover = useMediaQuery("(hover: hover)");

  return (
    <Link
      to={`/anime/${anime.id}`}
      state={anime}
      aria-label={anime.display_name}
    >
      <Paper
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: theme.palette.action.disabledBackground,
          backgroundImage: `url(${anime.image_large})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          borderRadius: "8px",
          overflow: "clip",
          transition: "transform 0.175s ease-in-out",
          transform: "scale3d(1, 1, 1)",
          zIndex: 0,
          ":hover": canHover
            ? {
                transform: "scale3d(1.08, 1.08, 1)",
                zIndex: 2,
                boxShadow: theme.shadows[12],
              }
            : {},
          "& div": {
            visibility: "hidden",
          },
          "&:hover div": {
            visibility: "visible",
          },
        }}
      >
        {canHover && (
          <Box
            component={"div"}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              color: "#fff",
              cursor: "pointer",
              justifyContent: "flex-end",
            }}
          >
            <Box
              sx={{
                width: "100%",
                background:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%," +
                  "rgba(0, 0, 0, 0.79) 40.00%," +
                  "rgba(0, 0, 0, 0.94) 100%)",
                boxSizing: "border-box",
                padding: 2,
                color: "#fff",
              }}
            >
              <Typography
                sx={{
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: 600,
                  fontSize: large ? "1.2rem" : "unset",
                  mb: 1,
                }}
              >
                {anime.display_name}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <LikeButtons anime={anime} selected={true} />
              </Box>
            </Box>
          </Box>
        )}
      </Paper>
    </Link>
  );
}
