import { useState } from "react";
import DevSearchSettingsContext from "./DevSearchSettingsContext";

const defaultState = {
  backend: "semantic-search",
  semanticSearch: {
    corpora: ["description", "review"],
  },
  algolia: {
    corpora: ["anime"],
  },
  itemsPerPage: 10,
};

export default function DevSearchSettingsProvider(props) {
  const [settings, setSettings] = useState(defaultState);

  return (
    <DevSearchSettingsContext.Provider value={[settings, setSettings]}>
      {props.children}
    </DevSearchSettingsContext.Provider>
  );
}
