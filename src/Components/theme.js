import { red, blue } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    day: {
      primary: "#EF2727",
      text: "#000000",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
