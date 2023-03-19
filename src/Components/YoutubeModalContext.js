import { createContext } from "react";

const YoutubeModalContext = createContext({
  open: (src) => {},
  close: () => {},
});

export default YoutubeModalContext;
