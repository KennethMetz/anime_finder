import { APIGetSimilarAnime } from "../Components/APICalls";
import { useQuery } from "@tanstack/react-query";

const fiveMinutesMs = 1000 * 60 * 5;

/**
 * A hook that provides similar anime data for the given `animeId`.
 * @param {string} animeId The anime id to get similar anime for.
 * @param {number} amount An optional integer indicating the number of similar
 * titles to return.
 * @returns A list of `[similarAnime, loading, error]`, where `similarAnime` is
 * a list of Anime objects, or `undefined`.
 */
export default function useSimilarAnime(animeId, amount) {
  const result = useQuery(
    ["anime", animeId, "similar", amount],
    () => APIGetSimilarAnime(animeId, amount),
    { staleTime: fiveMinutesMs }
  );

  return [result.data, result.isLoading, result.error];
}
