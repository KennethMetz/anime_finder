import { useQuery } from "@tanstack/react-query";

const fiveSecondsMs = 1000 * 5;
const fiveMinutesMs = 1000 * 60 * 5;

const apiUrl = `https://api-jet-lfoguxrv7q-uw.a.run.app`;

export function useAPISearch(inputValue, itemsReturned) {
  let queryResults = [];
  return useQuery({
    queryKey: ["search:" + inputValue],
    queryFn: async () => {
      // Searches through anime titles
      let response = await fetch(
        `${apiUrl}/anime/search?query=${inputValue}&page_size=${itemsReturned}`,
        {
          mode: "cors",
        }
      );
      await handleErrors(response);
      let responseJson = await response.json();
      queryResults = [...responseJson.items];
      // Searches through user names
      response = await fetch(
        `${apiUrl}/profile/search?query=${inputValue}&page_size=${itemsReturned}`,
        {
          mode: "cors",
        }
      );
      await handleErrors(response);
      responseJson = await response.json();
      queryResults = [...queryResults, ...responseJson.items];
      return queryResults;
    },
    staleTime: fiveMinutesMs,
    placeholderData: [],
  });
}

export async function APIHeartbeat() {
  let response = await fetch(`${apiUrl}/`, { mode: "cors" });
  await handleErrors(response);
  return await response.json();
}

export async function APIGetAnime(animeId) {
  let response = await fetch(`${apiUrl}/anime/${animeId}`, { mode: "cors" });
  await handleErrors(response);
  return await response.json();
}

export async function APIGetSimilarAnime(animeId, amount) {
  let response = await fetch(
    `${apiUrl}/anime/${animeId}/similar?amount=${amount ?? 8}`,
    { mode: "cors" }
  );
  await handleErrors(response);
  const responseJson = await response.json();
  return responseJson.items.map((item) => item.anime);
}

export async function APIGetAnimeAnalysis(animeId, history) {
  let response = await fetch(`${apiUrl}/anime/${animeId}/analyze`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ history }),
  });
  await handleErrors(response);
  const responseJson = await response.json();
  return responseJson;
}

async function handleErrors(response) {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message);
  }
}

//***************TanStack Query Functions***************
export function useHeartbeat() {
  return useQuery(["heartbeat"], async () => APIHeartbeat(), {
    staleTime: fiveSecondsMs,
  });
}

export function useAnimeHR(selectedGenre) {
  return useGetTitles(
    `${apiUrl}/anime?sort=highest_rated&page_size=24${selectedGenre}`
  );
}

export function useAnimeMC(selectedGenre) {
  return useGetTitles(
    `${apiUrl}/anime?sort=most_completed&page_size=24${selectedGenre}`
  );
}

export function useAnimeMPTW(selectedGenre) {
  return useGetTitles(
    `${apiUrl}/anime?sort=most_planned_to_watch&page_size=24${selectedGenre}`
  );
}

export function useAnimeMH() {
  return useGetTitles(
    `${apiUrl}/anime?sort=most_planned_to_watch&page_size=24&page=101`
  );
}

export function useAnimeTN(selectedGenre) {
  return useGetTitles(
    `${apiUrl}/anime?sort=most_popular_now&page_size=24${selectedGenre}`
  );
}

export function useAnimeRND() {
  const url = `${apiUrl}/anime?sort=random&page_size=6`;
  return useQuery(
    [url],
    async () => {
      let response = await fetch(url, { mode: "cors" });
      await handleErrors(response);
      let responseJson = await response.json();
      return responseJson.items;
    },
    {
      staleTime: fiveMinutesMs,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );
}

export function useGetTitles(fullUrl) {
  return useQuery(
    [fullUrl],
    async () => {
      let response = await fetch(fullUrl, { mode: "cors" });
      await handleErrors(response);
      let responseJson = await response.json();
      return responseJson.items;
    },
    { staleTime: fiveMinutesMs }
  );
}

export function useProfile(userID) {
  const fullUrl = `${apiUrl}/profile/${userID}`;
  return useQuery(
    [fullUrl],
    async () => {
      if (!userID) return {};
      let response = await fetch(fullUrl, { mode: "cors" });
      await handleErrors(response);
      let responseJson = await response.json();
      return responseJson;
    },
    { staleTime: fiveMinutesMs }
  );
}

export function useGetProfiles(ids) {
  const requestBody = { ids };
  const fullUrl = `${apiUrl}/profile/get`;
  return useQuery(
    [fullUrl + ids],
    async () => {
      let response = await fetch(fullUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      await handleErrors(response);
      let responseJson = await response.json();

      return responseJson;
    },
    { staleTime: fiveMinutesMs }
  );
}

export function useRecommendations(viewHistory) {
  return useQuery(
    ["Recommendations", viewHistory],
    async () => {
      let response = await fetch(`${apiUrl}/recommend`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(viewHistory),
      });
      await handleErrors(response);
      let responseJson = await response.json();
      let temp = [];
      responseJson.items.map((item, index) => temp.push(item.anime));
      return temp;
    },
    {
      staleTime: fiveMinutesMs,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
}

export async function APIGetAnimeList(ids) {
  const requestBody = { ids };

  let response = await fetch(`${apiUrl}/anime/get`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  await handleErrors(response);
  let responseJson = await response.json();
  return responseJson;
}
