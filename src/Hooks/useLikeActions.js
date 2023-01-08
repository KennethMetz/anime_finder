import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Components/Firebase";
import { SaveToFirestore } from "../Components/Firestore";
import { LocalUserContext } from "../Components/LocalUserContext";

export default function useLikeActions() {
  const [user] = useAuthState(auth);
  const [localUser, setLocalUser] = useContext(LocalUserContext);

  const likes = localUser.likes;
  const dislikes = localUser.dislikes;

  return {
    toggleLike: (anime) => {
      let newLikes = toggle(likes, anime);
      let newDislikes = remove(dislikes, anime);

      const newLocalUser = {
        ...localUser,
        dislikes: newDislikes,
        likes: newLikes,
      };

      setLocalUser(newLocalUser);
      SaveToFirestore(user, newLocalUser);
    },
    toggleDislike: (anime) => {
      let newLikes = remove(likes, anime);
      let newDislikes = toggle(dislikes, anime);

      const newLocalUser = {
        ...localUser,
        dislikes: newDislikes,
        likes: newLikes,
      };

      setLocalUser(newLocalUser);
      SaveToFirestore(user, newLocalUser);
    },
  };
}

// Toggles `anime`'s presence in `list`.  Always returns a new list.
function toggle(list, anime) {
  if (list.find((x) => x.id === anime.id)) {
    return list.filter((x) => x.id !== anime.id);
  } else {
    return [...list, anime];
  }
}

// Removes an `anime` from `list` if it is present. Always returns a new list.
function remove(list, anime) {
  if (list.find((x) => x.id === anime.id)) {
    return list.filter((x) => x.id !== anime.id);
  } else {
    return [...list];
  }
}
