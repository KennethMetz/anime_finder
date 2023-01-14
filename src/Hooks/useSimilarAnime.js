import { useEffect, useState } from "react";
import { APIGetSimilarAnime } from "../Components/APICalls";

/**
 * A hook that provides similar anime data for the given `animeId`.
 * @param {string} animeId The anime id to get similar anime for.
 * @param {number} amount An optional integer indicating the number of similar
 * titles to return.
 * @returns A list of `[similarAnime, loading, error]`, where `similarAnime` is
 * a list of Anime objects, or `undefined`.
 */
export default function useSimilarAnime(animeId, amount) {
  const [fetched, setFetched] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    // Don't load if we have the right data already.
    if (fetched) {
      return;
    }
    // Otherwise, fetch similar anime from API.
    setFetched(undefined);
    setError(undefined);
    APIGetSimilarAnime(animeId, amount)
      .then((data) => {
        if (data) {
          setFetched(data);
        } else {
          throw new Error("Bad similar anime data returned by API.");
        }
      })
      .catch((err) => setError(err));
  }, [animeId, amount, fetched]);

  const result = fetched;

  const loading = !fetched && !error;

  return [result, loading, error];
}
