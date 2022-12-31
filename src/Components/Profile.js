import "../Styles/Profile.css";

import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "./Firebase";
import {
  query,
  collection,
  getDocs,
  where,
  document,
} from "firebase/firestore";
import TitleAutocomplete from "./TitleAutocomplete";
import { GenericList } from "./GenericList";
import { LocalUserContext } from "./LocalUserContext";
import {
  Avatar,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { SaveToFirestore } from "./Firestore";

export default function Profile() {
  const [localUser, setLocalUser] = useContext(LocalUserContext);

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  let [searchResults, setSearchResults] = useState(false);
  let [search, setSearch] = useState("");

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
      let responseJson = await response.json();
      setSearchResults(responseJson.items);
    } catch (error) {
      console.log(error);
    }
  }

  function sendToDetailedView(item) {
    navigate("/detailedview", { state: item });
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    fetchUserName();
  }, [user, loading]);

  useEffect(() => {
    searchContent();
    console.log(localUser);
  }, [search]);

  useEffect(() => {}, []);

  return (
    <div className="profile">
      <h1 className="appTitle">EdwardML</h1>
      {TitleAutocomplete()}
      <div className="profile__container">
        <h3>THE PROFILE OF</h3>
        <h4>{name}</h4>
      </div>
      <br></br>

      <h3>YOUR LIKES:</h3>
      <list>
        {localUser["likes"].map((item, index) => (
          // <div
          //   key={index}
          //   onClick={() => {
          //     sendToDetailedView(item);
          //   }}
          // >
          //   <li>{item.name}</li>
          // </div>
          <ListItem
            key={index}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => {
                  localUser["likes"].splice(index, 1);
                  setLocalUser({ ...localUser });
                  SaveToFirestore(user, localUser);
                }}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemButton
              onClick={() => {
                navigate("/detailedview", { state: item });
              }}
            >
              <ListItemAvatar>
                <Avatar alt={item.name} src={item.image_large}></Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </list>

      <Divider />
      <list>
        <h3>YOUR DISLIKES:</h3>
        {localUser["dislikes"].map((item, index) => (
          // <li key={index}>{item.name}</li>
          <ListItem
            key={index}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => {
                  localUser["dislikes"].splice(index, 1);
                  setLocalUser({ ...localUser });
                  SaveToFirestore(user, localUser);
                }}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemButton
              onClick={() => {
                navigate("/detailedview", { state: item });
              }}
            >
              <ListItemAvatar>
                <Avatar alt={item.name} src={item.image_large}></Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </list>
      <Divider />

      {/* <div>SEARCH TO ADD YOUR FAVORITES TO YOUR PROFILE</div>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          console.log(search);
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
      )}*/}
    </div>
  );
}
