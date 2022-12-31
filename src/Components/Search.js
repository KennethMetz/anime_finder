import "../Styles/Search.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { GenericList } from "./GenericList";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "@mui/material";
import TitleAutocomplete from "./TitleAutocomplete";

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();

  let [loading, setLoading] = useState(true);
  let [search, setSearch] = useState(location.state);
  let [searchResults, setSearchResults] = useState(false);

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

  useEffect(() => {
    searchContent();
    setLoading(false);
  }, [search]);

  return (
    <div className="jsxWrapper">
      <h1 className="appTitle">EdwardML</h1>

      {/* <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          console.log(search);
        }}
      ></input> */}
      <br></br>

      {TitleAutocomplete(search)}

      {/* <h4>{location.state.name}</h4> */}
      {loading ? <div id="loading"></div> : ""}

      {searchResults ? (
        <div className="column">
          <div>ANIME BASED ON YOUR SEARCH</div>
          <List>
            {searchResults.map((item, index) => (
              <ListItemButton
                onClick={() => {
                  navigate("/detailedview", { state: item });
                }}
                key={index}
              >
                <ListItemAvatar>
                  <Avatar alt={item.name} src={item.image_large}></Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} />
              </ListItemButton>
            ))}
          </List>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
