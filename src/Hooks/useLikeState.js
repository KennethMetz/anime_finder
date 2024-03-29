import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Components/Firebase";
import { SaveToFirestore } from "../Components/Firestore";
import { LocalUserContext } from "../Components/LocalUserContext";

export default function useLikeState(anime) {
  const [user] = useAuthState(auth);
  const [localUser, setLocalUser] = useContext(LocalUserContext);

  const likes = localUser?.likes ?? [];
  const dislikes = localUser?.dislikes ?? [];

  const liked = Boolean(likes.find((x) => x === anime.id));
  const disliked = Boolean(dislikes.find((x) => x === anime.id));

  const setLiked = (value) => {
    const newLocalUser = {
      ...localUser,
      likes: value ? add(likes, anime) : remove(likes, anime),
      dislikes: value ? remove(dislikes, anime) : dislikes,
    };

    setLocalUser(newLocalUser);
    SaveToFirestore(user, newLocalUser);
  };

  const setDisliked = (value) => {
    const newLocalUser = {
      ...localUser,
      likes: value ? remove(likes, anime) : likes,
      dislikes: value ? add(dislikes, anime) : remove(dislikes, anime),
    };

    setLocalUser(newLocalUser);
    SaveToFirestore(user, newLocalUser);
  };

  return {
    liked,
    disliked,
    setLiked,
    setDisliked,
  };
}

// Adds `anime` to `list`, if not already present.  Always returns a new list.
function add(list, anime) {
  if (list.find((x) => x === anime.id)) {
    return [...list];
  } else {
    return [...list, anime.id];
  }
}

// Removes an `anime` from `list` if it is present. Always returns a new list.
function remove(list, anime) {
  return list.filter((x) => x !== anime.id);
}
