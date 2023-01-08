import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import LikeButtons from "./LikeButtons";

const url =
  "https://api-jet-lfoguxrv7q-uw.a.run.app/anime?sort=most_rated&page_size=5";

export default function Sandbox() {
  const [anime, setAnime] = useState();

  useEffect(() => {
    async function fetchData() {
      let response = await fetch(url, { mode: "cors" });
      let responseJson = await response.json();
      setAnime(responseJson.items);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <Container maxwidth="sm">
        <div className="gap" />

        <h1>Dev Sandbox</h1>

        <h4>Like Buttons</h4>
        {!anime && <div>Loading...</div>}
        {anime &&
          anime.map((a) => (
            <div key={a.id}>
              <div>{a.display_name}</div>
              <LikeButtons anime={a} />
            </div>
          ))}
      </Container>
    </div>
  );
}
