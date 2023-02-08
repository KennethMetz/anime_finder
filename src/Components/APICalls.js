import { useMediaQuery } from "@mui/material";

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
export function GetAnimeHR(selectedGenre, setState) {
  let { status, data, error, isFetching } = useGetTitles(
    `https://api-jet-lfoguxrv7q-uw.a.run.app/anime?sort=highest_rated&page_size=24${selectedGenre}`,
    selectedGenre,
    setState
  );
}

export function GetAnimeMC(selectedGenre, setState) {
  let { status, data, error, isFetching } = useGetTitles(
    `https://api-jet-lfoguxrv7q-uw.a.run.app/anime?sort=most_completed&page_size=24${selectedGenre}`,
    selectedGenre,
    setState
  );
}

export function GetAnimeMPTW(selectedGenre, setState) {
  let { status, data, error, isFetching } = useGetTitles(
    `https://api-jet-lfoguxrv7q-uw.a.run.app/anime?sort=most_rated&page_size=24${selectedGenre}`,
    selectedGenre,
    setState
  );
}

export function GetAnimeMH(selectedGenre, setState) {
  let { status, data, error, isFetching } = useGetTitles(
    `https://api-jet-lfoguxrv7q-uw.a.run.app/anime?sort=most_planned_to_watch&page_size=24&page=101`,
    null,
    setState
  );
}

export function useGetTitles(url, selectedGenre, setState) {
  return useMediaQuery([url, selectedGenre], async () => {
    let response = await fetch(url, { mode: "cors" });
    let responseJson = await response.json();
    console.log(responseJson.items);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    setState(responseJson.items);
    return responseJson.items;
  });
}
