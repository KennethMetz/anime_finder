import { createContext, useState } from "react";

export const AppSettingsContext = createContext();

export const AppSettingsProvider = (props) => {
  const [appSettings, setAppSettings] = useState({
    darkMode: false,
  });

  // TODO read and write settings from disk.

  return (
    <AppSettingsContext.Provider value={[appSettings, setAppSettings]}>
      {props.children}
    </AppSettingsContext.Provider>
  );
};
