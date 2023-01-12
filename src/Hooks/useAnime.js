import { useEffect, useState } from "react";
import { APIGetAnime } from "../Components/APICalls";

/**
 * A hook that provides anime data for the given `animeId`.
 * @param {string} animeId The anime id to get data for.
 * @param {Anime} cachedAnime An optional anime object from a previous response
 *  that may be correct.  If provided and with matching id, this anime will be
 *  used instead of calling the API.
 * @returns A list of `[anime, loading, error]`.
 */
export default function useAnime(animeId, cachedAnime) {
  const [fetchedAnime, setFetchedAnime] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    // Don't load if we have the right data already.
    if (cachedAnime?.id.toString() === animeId) {
      return;
    }
    if (fetchedAnime?.id.toString() === animeId) {
      return;
    }
    // Otherwise, fetch anime from API.
    setFetchedAnime(undefined);
    setError(undefined);
    APIGetAnime(animeId)
      .then((data) => setFetchedAnime(data))
      .catch((err) => setError(err));
  }, [animeId, fetchedAnime, cachedAnime]);

  let result = undefined;
  if (cachedAnime?.id.toString() === animeId) {
    result = cachedAnime;
  } else if (fetchedAnime?.id.toString() === animeId) {
    result = fetchedAnime;
  }

  const loading = !result && !error;

  return [result, loading, error];
}
