import { createTheme } from "@mui/material/styles";

export function createAppTheme(darkMode) {
  // A custom theme for this app
  return createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      //This overwrites the MUI generic theme key.
      primary: { main: "#EF2727" },
      grey: { main: "#bdbdbd" },
      text: {
        primary: darkMode ? "#fff" : "#171717",
      },
      background: {
        default: darkMode ? "#080808" : "#fcfcfc",
      },
      //Theses are new/custom theme keys.
      custom: {
        subtleCardBg: darkMode ? "#171717" : "#F2F2F2",
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
}
