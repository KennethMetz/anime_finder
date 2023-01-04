import "../Styles/App.css";

import { useContext, useEffect, useState } from "react";
import { LocalUserContext } from "./LocalUserContext";
import { RecommendedList } from "./RecommendedList";

export default function RecommendContent(input) {
  let [recommendation, setRecommendation] = useState([]);
  const [localUser, setLocalUser] = useContext(LocalUserContext);
  let [loadingRecs, setLoadingRecs] = useState(true);

  async function getContent(input) {
    try {
      let data = {
        history: [{ animeId: input.movies.id, status: "COMPLETED" }],
        amount: 8,
      };
      if (localUser["likes"].length > 0) {
        for (let i = 0; i < localUser["likes"].length; i++) {
          data["history"].push({
            animeId: localUser["likes"][i].id,
            status: "COMPLETED",
          });
        }
      }
      if (localUser["dislikes"].length > 0) {
        for (let i = 0; i < localUser["dislikes"].length; i++) {
          data["history"].push({
            animeId: localUser["dislikes"][i].id,
            status: "DROPPED",
          });
        }
      }
      // console.log(data);
      let response = await fetch(
        `https://api-jet-lfoguxrv7q-uw.a.run.app/recommend`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      let responseJson = await response.json();
      let temp = [];
      responseJson.items.map((item, index) => temp.push(item.anime));
      setRecommendation(temp);
      setLoadingRecs(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getContent(input);
  }, [input]);

  useEffect(() => {
    // console.log(recommendation);
  }, [recommendation]);

  return (
    <div>
      {loadingRecs ? <div id="loading"></div> : ""}
      <RecommendedList movies={recommendation} />
    </div>
  );
}
