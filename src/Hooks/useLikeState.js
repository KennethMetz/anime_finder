import { useContext } from "react";
import { LocalUserContext } from "../Components/LocalUserContext";

export default function useLikeState(anime) {
  const [localUser] = useContext(LocalUserContext);

  const liked = Boolean(localUser.likes.find((x) => x.id === anime.id));
  const disliked = Boolean(localUser.dislikes.find((x) => x.id === anime.id));

  return {
    liked,
    disliked,
  };
}
