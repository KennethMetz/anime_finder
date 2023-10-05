import React, { useState, createContext } from "react";

export const LocalUserContext = createContext();

export const LocalUserProvider = (props) => {
  const [localUser, setLocalUser] = useState(getDefaultLocalUser());
  return (
    <LocalUserContext.Provider value={[localUser, setLocalUser]}>
      {props.children}
    </LocalUserContext.Provider>
  );
};

/**
 * Gets a `LocalUser` object with default values for all fields.
 *
 * Note that this object does not contain fields that are set by auth, such as
 * `authProvider`, `uid`, and `email`.
 *
 * @returns {Object} A `LocalUser` object with default values.
 */
export function getDefaultLocalUser() {
  return {
    name: "",
    likes: [],
    dislikes: [],
    lists: [],
    savedLists: [],
    avatar: "",
    bio: "",
    top8: [],
    reviews: [],
    comments: [],
    handle: null,
  };
}
