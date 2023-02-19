import { useCallback, useMemo, useState } from "react";
import AppSettingsContext from "./AppSettingsContext";

const defaultState = {
  darkMode: false,
};

export default function AppSettingsProvider(props) {
  // Read initial state from localStorage, or else use default.
  // This is done only once on first render.
  const initialState = useMemo(
    () =>
      JSON.parse(window.localStorage.getItem("appSettings")) ?? defaultState,
    []
  );

  const [appSettings, setAppSettings] = useState(initialState);

  // Whenever updating this state, save to localStorage.
  const setAppSettingsWithSave = useCallback((value) => {
    window.localStorage.setItem("appSettings", JSON.stringify(value));
    setAppSettings(value);
  }, []);

  return (
    <AppSettingsContext.Provider value={[appSettings, setAppSettingsWithSave]}>
      {props.children}
    </AppSettingsContext.Provider>
  );
}
