export async function APISearch(inputValue) {
  try {
    let response = await fetch(
      `https://api-jet-lfoguxrv7q-uw.a.run.app/anime/search?query=${inputValue}`,
      { mode: "cors" }
    );
    let responseJson = await response.json();
    let temp = [];
    responseJson.items.map((item, index) => temp.push(item));
    //   responseJson.items.map((item, index) => fullTempInfo.push(item));
    //   setOptionsInfo(fullTempInfo);
    console.log(temp);
    return temp;
  } catch (error) {
    console.log(error);
  }
}
