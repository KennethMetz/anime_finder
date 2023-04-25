import React, { useState, createContext } from "react";

export const AnimeObjectsContext = createContext();

export const AnimeObjectsProvider = (props) => {
  const [animeObjects, setAnimeObjects] = useState({
    likes: [],
    dislikes: [],
    lists: [],
    top8: [],
  });
  return (
    <AnimeObjectsContext.Provider value={[animeObjects, setAnimeObjects]}>
      {props.children}
    </AnimeObjectsContext.Provider>
  );
};
