import { red, blue } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    //This overwrites the MUI generic theme key.
    primary: { main: "#EF2727" },
    grey: { main: "#bdbdbd" },
    //Theses are new/custom theme keys.
    day: {
      primary: "#EF2727",
      main: "#EF2727",

      text: "#000000",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      fourHundred: 400,
      fiveHundred: 500,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
