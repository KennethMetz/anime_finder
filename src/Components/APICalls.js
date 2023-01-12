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
  try {
    let response = await fetch(
      `https://api-jet-lfoguxrv7q-uw.a.run.app/anime/${animeId}`,
      { mode: "cors" }
    );
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log(error);
  }
}
