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

async function handleErrors(response) {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message);
  }
}
