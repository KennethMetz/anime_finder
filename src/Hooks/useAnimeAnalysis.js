import { useQuery } from "@tanstack/react-query";
import { useContext, useMemo } from "react";
import { APIGetAnimeAnalysis } from "../Components/APICalls";
import { LocalUserContext } from "../Components/LocalUserContext";

export default function useAnimeAnalysis(animeId) {
  const [localUser] = useContext(LocalUserContext);

  // Build view history once.
  const history = useMemo(
    () => [
      ...localUser["likes"].map((anime) => ({
        animeId: anime.id,
        status: "COMPLETED",
      })),
      ...localUser["dislikes"].map((anime) => ({
        animeId: anime.id,
        status: "DROPPED",
      })),
    ],
    []
  );

  const { data, isLoading, error } = useQuery(
    ["anime", animeId, "analysis"],
    () => {
      return APIGetAnimeAnalysis(animeId, history);
    }
  );

  return [data, isLoading, error];
}
