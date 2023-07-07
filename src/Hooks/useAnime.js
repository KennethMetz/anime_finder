import { useEffect, useState } from "react";
import { APIGetAnime } from "../Components/APICalls";
import { useQuery } from "@tanstack/react-query";

const fiveMinutesMs = 1000 * 60 * 5;

/**
 * A hook that provides anime data for the given `animeId`.
 * @param {string} animeId The anime id to get data for.
 * @param {Anime} cachedAnime An optional anime object from a previous response
 *  that may be correct.  If provided and with matching id, this anime will be
 *  used instead of calling the API.
 * @returns A list of `[anime, loading, error]`.
 */
export default function useAnime(animeId, cachedAnime) {
  const result = useQuery(
    ["anime", animeId],
    async () => {
      // Skip for null animeIds.
      if (!animeId) {
        return null;
      }
      // Use cachedAnime if it matches.
      if (cachedAnime?.id.toString() === animeId) {
        return cachedAnime;
      }

      return await APIGetAnime(animeId);
    },
    { staleTime: fiveMinutesMs }
  );

  return [result.data, result.isLoading, result.error];
}
