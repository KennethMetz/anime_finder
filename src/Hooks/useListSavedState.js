import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Components/Firebase";
import { useContext } from "react";
import { LocalUserContext } from "../Components/LocalUserContext";
import { SaveToFirestore } from "../Components/Firestore";

export default function useListSavedState(listId, userId) {
  const [user] = useAuthState(auth);
  const [localUser, setLocalUser] = useContext(LocalUserContext);

  const savedLists = localUser?.savedLists ?? [];

  const entry = { listId, userId };

  const saved = Boolean(savedLists.find((x) => matchesEntry(x, entry)));

  const setSaved = (value) => {
    const newLocalUser = {
      ...localUser,
      savedLists: value ? add(savedLists, entry) : remove(savedLists, entry),
    };

    setLocalUser(newLocalUser);
    SaveToFirestore(user, newLocalUser);
  };

  return {
    saved,
    setSaved,
  };
}

// Equality matcher for two savedLists entries.
function matchesEntry(a, b) {
  return a.listId === b.listId && a.userId === b.userId;
}

// Adds `entry` to `savedLists`, if not already present.  Always returns a new list.
function add(savedLists, entry) {
  if (savedLists.find((x) => matchesEntry(x, entry))) {
    return [...savedLists];
  } else {
    return [...savedLists, entry];
  }
}

// Removes an `entry` from `savedLists` if it is present. Always returns a new list.
function remove(savedLists, entry) {
  return savedLists.filter((x) => !matchesEntry(x, entry));
}
