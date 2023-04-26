import React, { useState, createContext, useContext } from "react";
import ProfilePageContext from "./ProfilePageContext";

export const AnimeObjectsContext = createContext();

export const AnimeObjectsProvider = (props) => {
  const [animeObjects, setAnimeObjects] = useState({
    likes: [],
    dislikes: [],
    lists: [],
    top8: [],
  });
  const { profile, isLoading } = useContext(ProfilePageContext);
  return (
    <AnimeObjectsContext.Provider value={[animeObjects, setAnimeObjects]}>
      {props.children}
    </AnimeObjectsContext.Provider>
  );
};
