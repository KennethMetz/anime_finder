import { CssBaseline, ThemeProvider } from "@mui/material";
import { useContext, useMemo } from "react";
import { AppSettingsContext } from "./AppSettingsContext";
import { createAppTheme } from "./theme";

export default function AppThemeProvider(props) {
  const [appSettings, setAppSettings] = useContext(AppSettingsContext);

  const currentTheme = useMemo(
    () => createAppTheme(appSettings.darkMode),
    [appSettings.darkMode]
  );

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
}
