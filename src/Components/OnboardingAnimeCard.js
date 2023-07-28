import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import { ThumbsUp } from "phosphor-react";
import useLikeState from "../Hooks/useLikeState";

export default function OnboardingAnimeCard({ anime }) {
  const { liked, setLiked } = useLikeState(anime);
  const theme = useTheme();

  const onClick = (e) => {
    setLiked(!liked);
    e.preventDefault();
  };

  // TODO Extract elements shared with AnimeCard into a common component.
  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: theme.palette.action.disabledBackground,
        backgroundImage: anime.image_hardcoded
          ? `url(${anime.image_hardcoded})`
          : `url(${anime.image_large})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        borderRadius: "8px",
        overflow: "clip",
      }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick(e);
      }}
      tabIndex="0"
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          color: "#fff",
          cursor: "pointer",
          justifyContent: liked ? "space-around" : "flex-end",
          alignItems: liked ? "center" : "unset",
          background: liked ? "rgba(0,0,0,0.8)" : "unset",
          "&:hover": {
            background: liked ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.3)",
          },
        }}
      >
        {liked ? (
          <Box>
            <ThumbsUp size={52} weight="regular" />
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%," +
                "rgba(0, 0, 0, 0.79) 40.00%," +
                "rgba(0, 0, 0, 0.94) 100%)",
              boxSizing: "border-box",
              padding: 2,
            }}
          >
            <Typography
              sx={{
                textAlign: "start",
                fontWeight: 600,
                fontSize: "1.2rem",
              }}
            >
              {anime.display_name}
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
}
