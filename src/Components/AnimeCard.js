import { Box, Paper, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import LikeButtons from "./LikeButtons";

export default function AnimeCard({ anime, large, onChangeSelected }) {
  const [selected, setSelected] = useState(false);
  const theme = useTheme();

  const onMouseOver = () => {
    setSelected(true);
    if (onChangeSelected) {
      onChangeSelected(true);
    }
  };

  const onMouseOut = () => {
    setSelected(false);
    if (onChangeSelected) {
      onChangeSelected(false);
    }
  };

  return (
    <Link to={`/anime/${anime.id}`} state={anime}>
      <Paper
        elevation={selected ? 12 : 3}
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: theme.palette.action.disabledBackground,
          backgroundImage: `url(${anime.image_large})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          borderRadius: "8px",
          overflow: "clip",
          transition: "transform 0.25s ease-in-out",
          transform: selected ? "scale3d(1.15, 1.15, 1)" : "scale3d(1, 1, 1)",
          zIndex: selected ? 2 : 0,
        }}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            visibility: selected ? "visible" : "hidden",
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
                textAlign: "start",
                fontWeight: 600,
                fontSize: large ? "1.2rem" : "unset",
              }}
            >
              {anime.display_name}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <LikeButtons anime={anime} />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Link>
  );
}
