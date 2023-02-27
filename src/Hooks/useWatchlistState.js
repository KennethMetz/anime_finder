import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Components/Firebase";
import { SaveToFirestore } from "../Components/Firestore";
import { LocalUserContext } from "../Components/LocalUserContext";

export default function useWatchlistState(anime, list) {
  const [user] = useAuthState(auth);
  const [localUser, setLocalUser] = useContext(LocalUserContext);

  const allLists = localUser?.lists ?? [];

  const indexOfList = allLists.findIndex((x) => x.name === list);

  const included = Boolean(
    allLists[indexOfList].anime.find((x) => x.id === anime.id)
  );

  const setIncluded = (value) => {
    let indexOfList = allLists.findIndex((x) => x.name === list);

    let newLocalUser = { ...localUser };

    //Adds title to list
    if (value && !allLists[indexOfList].anime.find((x) => x.id === anime.id)) {
      newLocalUser.lists[indexOfList].anime.push(anime);
    }

    // Removes title from list
    if (!value) {
      let shortenedList = newLocalUser.lists[indexOfList].anime.filter(
        (x) => x.id !== anime.id
      );
      newLocalUser.lists[indexOfList].anime = shortenedList;
    }

    setLocalUser(newLocalUser);
    SaveToFirestore(user, newLocalUser);
  };

  return {
    included,
    setIncluded,
  };
}
