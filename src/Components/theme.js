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
      sevenHundredFifty: 750,
      md: 900,
      elevenHundred: 1100,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "unset",
          fontFamily: "interSemiBold",
        },
        sizeSmall: {
          fontSize: "0.8125rem",
          minHeight: "32px",
          borderRadius: "16px",
        },
        sizeMedium: {
          fontSize: "0.875rem",
          minHeight: "40px",
          borderRadius: "20px",
        },
        sizeLarge: {
          fontSize: "1rem",
          minHeight: "48px",
          borderRadius: "24px",
        },
        outlined: {
          borderWidth: "2px",
          boxSizing: "border-box",
          "&:hover, &:disabled": {
            borderWidth: "2px",
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderColor: "#474747",
          borderStyle: "solid",
          borderRadius: "8px",
          borderWidth: "2px",
          boxSizing: "border-box",
        },
        filledDefault: {
          color: "#fff",
          backgroundColor: "#474747",
          "&:hover, &:focus": {
            color: "#fff",
            backgroundColor: "#626262",
          },
        },
        label: {
          fontFamily: "interSemiBold, sans-serif",
        },
      },
    },
  },
});

export default theme;
