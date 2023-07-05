import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import { useContext, useMemo } from "react";
import { Helmet } from "react-helmet";

import AppSettingsContext from "./AppSettingsContext";
import { createAppTheme } from "./theme";

export default function AppThemeProvider(props) {
  const [appSettings, setAppSettings] = useContext(AppSettingsContext);

  const currentTheme = useMemo(
    () => createAppTheme(appSettings.darkMode),
    [appSettings.darkMode]
  );

  return (
    <ThemeProvider theme={currentTheme}>
      <Helmet>
        <meta
          name="theme-color"
          content={currentTheme.palette.background.default}
        />
      </Helmet>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
}
