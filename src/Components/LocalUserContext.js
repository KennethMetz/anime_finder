import React, { useState, createContext } from "react";

export const LocalUserContext = createContext();

export const LocalUserProvider = (props) => {
  const [localUser, setLocalUser] = useState({
    likes: [],
    dislikes: [],
    lists: [],
    avatar: null,
    bio: null,
  });
  return (
    <LocalUserContext.Provider value={[localUser, setLocalUser]}>
      {props.children}
    </LocalUserContext.Provider>
  );
};
