import { darken, lighten, useTheme } from "@mui/material";
import Box from "@mui/material/Box";

export default function SearchResultsBanner({ text }) {
  const theme = useTheme();

  return (
    <Box
      component="div"
      sx={{
        textAlign: "left",
        padding: "2px 18px",
        color: theme.palette.text.main,
        fontWeight: "600",
        backgroundColor:
          theme.palette.mode === "dark"
            ? darken(theme.palette.grey.main, 0.7)
            : lighten(theme.palette.grey.main, 0.7),
      }}
    >
      {text}
    </Box>
  );
}
