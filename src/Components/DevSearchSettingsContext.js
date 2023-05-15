import { createContext } from "react";

const DevSearchSettingsContext = createContext({
  backend: "semantic-search",
  semanticSearch: {
    corpora: ["description", "review"],
  },
  algolia: {
    corpora: ["anime"],
  },
  itemsPerPage: 10,
});

export default DevSearchSettingsContext;
