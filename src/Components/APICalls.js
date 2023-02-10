import { useQuery } from "@tanstack/react-query";

const fiveMinutesMs = 1000 * 60 * 5;

export async function APISearch(inputValue) {
  try {
    let response = await fetch(
      `https://api-jet-lfoguxrv7q-uw.a.run.app/anime/search?query=${inputValue}`,
      { mode: "cors" }
    );
    let responseJson = await response.json();
    let temp = [];
    responseJson.items.map((item, index) => temp.push(item));
    return temp;
  } catch (error) {
    console.log(error);
  }
}

export async function APIGetAnime(animeId) {
  let response = await fetch(
    `https://api-jet-lfoguxrv7q-uw.a.run.app/anime/${animeId}`,
    { mode: "cors" }
  );
  await handleErrors(response);
  return await response.json();
}

export async function APIGetSimilarAnime(animeId, amount) {
  let response = await fetch(
    `https://api-jet-lfoguxrv7q-uw.a.run.app/anime/${animeId}/similar` +
      `?amount=${amount ?? 8}`,
    { mode: "cors" }
  );
  await handleErrors(response);
  const responseJson = await response.json();
  return responseJson.items.map((item) => item.anime);
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
    `https://api-jet-lfoguxrv7q-uw.a.run.app/anime?sort=highest_rated&page_size=24${selectedGenre}`
  );
}

export function useAnimeMC(selectedGenre) {
  return useGetTitles(
    `https://api-jet-lfoguxrv7q-uw.a.run.app/anime?sort=most_completed&page_size=24${selectedGenre}`
  );
}

export function useAnimeMPTW(selectedGenre) {
  return useGetTitles(
    `https://api-jet-lfoguxrv7q-uw.a.run.app/anime?sort=most_rated&page_size=24${selectedGenre}`
  );
}

export function useAnimeMH() {
  return useGetTitles(
    `https://api-jet-lfoguxrv7q-uw.a.run.app/anime?sort=most_planned_to_watch&page_size=24&page=101`
  );
}

export function useGetTitles(url) {
  return useQuery(
    [url],
    async () => {
      let response = await fetch(url, { mode: "cors" });
      let responseJson = await response.json();
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return responseJson.items;
    },
    { staleTime: fiveMinutesMs }
  );
}

export function useRecommendations(viewHistory) {
  return useQuery(
    ["Recommendations", viewHistory],
    async () => {
      let response = await fetch(
        `https://api-jet-lfoguxrv7q-uw.a.run.app/recommend`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(viewHistory),
        }
      );
      let responseJson = await response.json();
      let temp = [];
      responseJson.items.map((item, index) => temp.push(item.anime));
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return temp;
    },
    { staleTime: fiveMinutesMs }
  );
}
