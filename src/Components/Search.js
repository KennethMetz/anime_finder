import "../Styles/Search.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { GenericList } from "./GenericList";
import {
  Avatar,
  Box,
  Divider,
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
import { Container } from "@mui/system";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { PopulateFromFirestore } from "./Firestore";
import { LocalUserContext } from "./LocalUserContext";

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, loading] = useAuthState(auth);

  const [localUser, setLocalUser] = useContext(LocalUserContext);
  let [loadingSR, setLoadingSR] = useState(true);
  let [search, setSearch] = useState(location.state);
  let [searchResults, setSearchResults] = useState(false);

  console.log(location.state);
  console.log(search);

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
    setSearch(location.state);
    searchContent();
    setLoadingSR(false);
  }, [search, location]);

  useEffect(() => {
    if (loading) {
      // trigger a loading screen?
      return;
    }
    if (user) {
      PopulateFromFirestore(user, localUser, setLocalUser);
    }
  }, [user, loading]);

  return (
    <div className="jsxWrapper">
      <Container maxWidth="sm">
        <h4 style={{ textAlign: "center" }}>Search Results:</h4>
        <Divider></Divider>
        {loadingSR ? <div id="loading"></div> : ""}
        <div className="gap" style={{ marginTop: "30px" }}></div>
        {searchResults[0] ? (
          <div className="column">
            {/* <div>SEARCH RESULTS BASED ON: "{search}" </div> */}

            {searchResults.map((item, index) => (
              <ListItemButton
                onClick={() => {
                  navigate(`/anime/${item.id}`, { state: item });
                }}
                key={index}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={item.display_name}
                    src={item.image_large}
                  ></Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={item.display_name}
                  primaryTypographyProps={{ fontFamily: "interSemiBold" }}
                />
              </ListItemButton>
            ))}
          </div>
        ) : (
          <Box>
            There were (0) matching results for the search term: "{search}"
          </Box>
        )}
        <div className="gap" />
      </Container>
    </div>
  );
}
