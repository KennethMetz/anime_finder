import { useQuery } from "@tanstack/react-query";
import { APIGetAnimeList } from "../Components/APICalls";

const fiveMinutesMs = 1000 * 60 * 5;

export default function useAnimeList(ids) {
  // To-do: Sort ids
  const conditionalQueryKey = ids ? ["anime", ...ids] : ["anime", "undefined"];

  return useQuery(
    conditionalQueryKey,
    async () => {
      if (ids === undefined) return null;
      const response = await APIGetAnimeList(ids);
      return response.items;
    },
    {
      staleTime: fiveMinutesMs,
      // keepPreviousData is used to handle cases when a user changes the
      // contents of a watchlist on a list page.
      keepPreviousData: true,
    }
  );
}
