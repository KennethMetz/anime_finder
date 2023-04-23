import { useQuery } from "@tanstack/react-query";

const fiveMinutesMs = 1000 * 60 * 5;

const apiUrl = `https://api-jet-lfoguxrv7q-uw.a.run.app`;

export async function APISearch(inputValue) {
  let response = await fetch(`${apiUrl}/anime/search?query=${inputValue}`, {
    mode: "cors",
  });
  await handleErrors(response);
  let responseJson = await response.json();
  let temp = [];
  responseJson.items.map((item, index) => temp.push(item));
  return temp;
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
      let response = await fetch(fullUrl, { mode: "cors" });
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
    { staleTime: fiveMinutesMs, keepPreviousData: true }
  );
}

export async function getRandomAnimeListing(randomPage, randomItem) {
  let tempItem = [];
  for (let k = 0; k < 6; k++) {
    let response = await fetch(`${apiUrl}/anime?page=${randomPage[k]}`, {
      mode: "cors",
    });
    await handleErrors(response);
    let responseJson = await response.json();
    console.assert(responseJson.items.length === 10, "LIST IS LESS THAN 10");
    tempItem = [...tempItem, responseJson.items[randomItem[k]]];
  }
  return tempItem;
}
