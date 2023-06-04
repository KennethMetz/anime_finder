import createTheme from "@mui/material/styles/createTheme";
import { alpha } from "@mui/system/colorManipulator";

const mainFontStack = "Inter, Arial-fallback, Roboto-fallback, sans-serif";

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
        main: darkMode ? "#080808" : "#fcfcfc",
      },
      //Theses are new/custom theme keys.
      custom: {
        subtleCardBg: darkMode ? "#171717" : "#F2F2F2",
        gradientCardBg: darkMode
          ? "linear-gradient(180deg, #323232 0%, #262626 100%)"
          : "linear-gradient(180deg, #F5F5F5 0%, #F5EAEA 100%)",
        top8Bg: darkMode
          ? "linear-gradient(#171717, #4a3636)"
          : "linear-gradient(#f5f5f5, #f5eaea)",
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
            fontFamily: mainFontStack,
            fontWeight: 600,
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
      MuiLink: {
        root: {
          fontFamily: mainFontStack,
          fontWeight: 600,
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
            fontFamily: mainFontStack,
            fontWeight: 600,
          },
        },
      },
      MuiIconButton: {
        variants: [
          {
            props: { variant: "contained" },
            style: {
              backgroundColor: darkMode ? "#2D2D2D" : "#EEE",
            },
          },
          {
            props: { variant: "contained", color: "primary" },
            style: {
              backgroundColor: alpha("#EF2727", 0.2),
            },
          },
        ],
      },
    },
    typography: {
      fontFamily: mainFontStack,
      body1: {
        letterSpacing: "0.00938em",
        fontSize: "1rem",
        lineHeight: 1.5,
      },
      h1: {
        fontFamily: "montserrat, sans-serif",
        fontSize: "4.0rem",
      },
      h2: {
        fontFamily: mainFontStack,
        fontSize: "2.5rem",
        fontWeight: 900,
      },
      h3: {
        fontFamily: mainFontStack,
        fontSize: "1.375rem",
        lineHeight: "1.23em",
        fontWeight: 900,
      },
      h4: {
        fontFamily: mainFontStack,
        fontSize: "1.25rem",
        lineHeight: "1.23em",
        fontWeight: 600,
      },
      h5: {
        fontFamily: mainFontStack,
        fontSize: "1rem",
        lineHeight: "1.1875em",
        fontWeight: 800,
      },
    },
  });
}
