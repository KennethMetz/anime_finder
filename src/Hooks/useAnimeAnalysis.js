import { useQuery } from "@tanstack/react-query";
import { useContext, useMemo } from "react";
import { APIGetAnimeAnalysis } from "../Components/APICalls";
import { LocalUserContext } from "../Components/LocalUserContext";

/**
 * A hook that provides anime analysis for the given `animeId`.
 * @param {string} animeId The anime id to get analysis for.
 * @returns A list of `[anime, loading, error, fetching]`.
 */
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
    [localUser]
  );

  const { data, isLoading, error, isFetching } = useQuery(
    ["anime", animeId, "analysis", history],
    () => {
      return APIGetAnimeAnalysis(animeId, history);
    },
    { keepPreviousData: true }
  );

  return [data, isLoading, error, isFetching];
}
