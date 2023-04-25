import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Components/Firebase";
import { SaveToFirestore } from "../Components/Firestore";
import { LocalUserContext } from "../Components/LocalUserContext";

export default function useTop8ListState(anime) {
  const [user] = useAuthState(auth);
  const [localUser, setLocalUser] = useContext(LocalUserContext);

  const included = Boolean(localUser.top8.find((x) => x === anime.id));

  const setIncluded = (value) => {
    let newLocalUser = { ...localUser };

    //Adds title to list
    if (value && !included) {
      newLocalUser.top8.push(anime.id);
    }

    // Removes title from list
    if (!value) {
      let shortenedList = newLocalUser.top8.filter((x) => x !== anime.id);
      newLocalUser.top8 = shortenedList;
    }

    setLocalUser(newLocalUser);
    SaveToFirestore(user, newLocalUser);
  };

  return {
    included,
    setIncluded,
  };
}
