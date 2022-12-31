import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../Styles/Dashboard.css";
import { auth, db, logout } from "./Firebase";
import {
  query,
  collection,
  getDocs,
  where,
  document,
} from "firebase/firestore";
import { LocalUserContext } from "./LocalUserContext";

import { GenericList } from "./GenericList";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  let [searchResults, setSearchResults] = useState(false);
  let [search, setSearch] = useState("");
  let [recommendation, setRecommendation] = useState([]);
  const [localUser, setLocalUser] = useContext(LocalUserContext);

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  async function searchContent() {
    try {
      let response = await fetch(
        `https://api-jet-lfoguxrv7q-uw.a.run.app/anime/search?query=${search}`,
        { mode: "cors" }
      );
      console.log(response);
      let responseJson = await response.json();
      // console.log(responseJson);
      setSearchResults(responseJson.items);
    } catch (error) {
      console.log(error);
    }
  }

  async function recommendContent() {
    console.log(localUser);

    let data = {
      history: [],
      amount: 10,
    };
    if (localUser["likes"].length > 0) {
      for (let i = 0; i < localUser["likes"].length; i++) {
        data["history"][i] = {
          animeId: localUser["likes"][i].id,
          status: "COMPLETED",
        };
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

    console.log(data);
    try {
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
      return responseJson;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    console.log(localUser);
    fetchUserName();
  }, [user, loading]);
  return (
    <div className="dashboard">
      <input
        type="button"
        onClick={recommendContent}
        value="RECOMMEND SHIT BASED ON MY PROFILE"
      />
      {recommendation ? (
        <div className="column">
          <div>ANIME YOU MAY LIKE</div>
          <GenericList movies={recommendation} />
        </div>
      ) : (
        ""
      )}
      <hr></hr>
      {/* <div>SEARCH TO ADD YOUR FAVORITES TO YOUR PROFILE</div>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          searchContent();
        }}
      ></input>
      <br></br>

      {searchResults ? (
        <div className="column">
          <div>ANIME BASED ON YOUR SEARCH</div>
          <GenericList movies={searchResults} />
        </div>
      ) : (
        ""
      )} */}
    </div>
  );
}
export default Dashboard;
