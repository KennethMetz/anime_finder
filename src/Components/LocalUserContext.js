import React, { useState, createContext } from "react";

export const LocalUserContext = createContext();

export const LocalUserProvider = (props) => {
  const [localUser, setLocalUser] = useState({
    likes: [],
    dislikes: [],
    lists: [],
    avatar: "",
    bio: "",
    top8: [],
    reviews: [],
  });
  return (
    <LocalUserContext.Provider value={[localUser, setLocalUser]}>
      {props.children}
    </LocalUserContext.Provider>
  );
};
