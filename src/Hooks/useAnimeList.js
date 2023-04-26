import { useQuery } from "@tanstack/react-query";
import { APIGetAnimeList } from "../Components/APICalls";

const fiveMinutesMs = 1000 * 60 * 5;

export default function useAnimeList(ids) {
  // To-do: Sort ids

  return useQuery(
    ["anime", ...ids],
    async () => {
      const response = await APIGetAnimeList(ids);
      return response.items;
    },
    { staleTime: fiveMinutesMs, keepPreviousData: true }
  );
}
