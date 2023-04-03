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
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "@mui/material";
import TitleAutocomplete from "./TitleAutocomplete";
import { Container } from "@mui/system";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { PopulateFromFirestore } from "./Firestore";
import { LocalUserContext } from "./LocalUserContext";
import EdAndEinGif from "../Styles/images/ein-ed-compressed.gif";

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const [user, loading] = useAuthState(auth);

  const [localUser, setLocalUser] = useContext(LocalUserContext);
  let [loadingSR, setLoadingSR] = useState(true);
  let [search, setSearch] = useState(location.state);
  let [searchResults, setSearchResults] = useState(false);

  const fourHundred = useMediaQuery(theme.breakpoints.up("fourHundred"));

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
                dense
                onClick={() => {
                  navigate(`/anime/${item.id}`, { state: item });
                }}
                key={index}
              >
                <ListItemAvatar>
                  <Avatar
                    variant="square"
                    alt={item.display_name}
                    src={item.image_large}
                    sx={{ height: "56px", borderRadius: "8px" }}
                  ></Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={item.display_name}
                  primaryTypographyProps={{
                    fontFamily: "interSemiBold",
                    fontSize: "1rem",
                  }}
                />
              </ListItemButton>
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontFamily: "interSemiBold", fontSize: "1.1rem" }}
            >
              Your search for "
              <span style={{ color: theme.palette.primary.main }}>
                {" "}
                {search}
              </span>{" "}
              " did not return any results.
            </Typography>{" "}
            <Paper
              elevation={0}
              sx={{
                background: theme.palette.custom.subtleCardBg,
                borderRadius: "24px",
                padding: 1.0,
                mt: 4,
              }}
            >
              <Box
                component="div"
                sx={{
                  width: {
                    fourHundred: "350px",
                    xs: "300px",
                  },
                  height: {
                    fourHundred: "250px",
                    xs: "200px",
                  },
                  backgroundImage: `url(${EdAndEinGif})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "24px",
                }}
              />
            </Paper>
            <Typography
              sx={{ fontFamily: "interSemiBold", fontSize: "1.1rem", mt: 4 }}
            >
              Please try again!
            </Typography>{" "}
          </div>
        )}
        <div className="gap" />
      </Container>
    </div>
  );
}
