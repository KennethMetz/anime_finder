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
    if (getMatchingAnime(animeId, [cachedAnime, fetchedAnime])) {
      return;
    }
    // Don't send API request if sent an empty animeId param.
    if (!animeId) return;
    // Otherwise, fetch anime from API.
    setFetchedAnime(undefined);
    setError(undefined);
    APIGetAnime(animeId)
      .then((data) => {
        if (getMatchingAnime(animeId, [data])) {
          setFetchedAnime(data);
        } else {
          throw new Error("Bad anime data returned by API.");
        }
      })
      .catch((err) => setError(err));
  }, [animeId, fetchedAnime, cachedAnime]);

  const result = getMatchingAnime(animeId, [cachedAnime, fetchedAnime]);

  let loading = !result && !error;

  // Override loading state if told to ignore API request.
  if (!animeId) loading = false;

  return [result, loading, error];
}

// Returns the anime in `animeList` that matches `animeId`, or else undefined.
// `animeList` can contain undefined elements.
function getMatchingAnime(animeId, animeList) {
  return animeList.find((anime) => anime?.id.toString() === animeId);
}
