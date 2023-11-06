import { useQuery } from "@tanstack/react-query";
import { useContext, useMemo } from "react";
import { APIGetAnimeAnalysis } from "../Components/APICalls";
import { LocalUserContext } from "../Components/LocalUserContext";

const fiveMinutesMs = 1000 * 60 * 5;

/**
 * A hook that provides anime analysis for the given `animeId`.
 * @param {string} animeId The anime id to get analysis for.
 * @returns A list of `[anime, loading, error, fetching]`.
 */
export default function useAnimeAnalysis(animeId, localUser) {
  // Build view history once.
  const history = useMemo(
    () => [
      ...localUser["likes"].map((anime) => ({
        animeId: anime,
        status: "COMPLETED",
      })),
      ...localUser["dislikes"].map((anime) => ({
        animeId: anime,
        status: "DROPPED",
      })),
    ],
    [localUser]
  );

  const { data, isLoading, error, isFetching } = useQuery(
    ["anime", animeId, "analysis", history, localUser.uid],
    () => {
      if (!localUser?.uid) return null; // Prevents call using blank watch history if registered/anonymous auth has not completed.
      return APIGetAnimeAnalysis(animeId, history);
    },
    {
      keepPreviousData: true,
      staleTime: fiveMinutesMs,
      refetchOnWindowFocus: false,
    }
  );

  return [data, isLoading, error, isFetching];
}
