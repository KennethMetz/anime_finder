import "../Styles/Search.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext, useMemo, Fragment } from "react";
import Box from "@mui/material/Box";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import useTheme from "@mui/material/styles/useTheme";
import Container from "@mui/material/Container";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { PopulateFromFirestore } from "./Firestore";
import { LocalUserContext } from "./LocalUserContext";
import EdAndEinGif from "../Styles/images/ein-ed-compressed.gif";
import { useAPISearch } from "./APICalls";
import BreathingLogo from "./BreathingLogo";
import SearchGhost from "./SearchGhost";
import HandleDialog from "./HandleDialog";
import SearchAvatars from "./SearchAvatars";
import SearchResultsBanner from "./SearchResultsBanner";

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const [user, loading] = useAuthState(auth);

  const [localUser, setLocalUser] = useContext(LocalUserContext);
  let [search, setSearch] = useState(location.state ?? null);

  // To-Do: Handle loading/error states from API call
  const {
    data: searchResults,
    isLoading: searchLoading,
    isFetching: searchFetching,
    error: apiError,
  } = useAPISearch(search, 10);

  const loadingSearch = searchLoading || searchFetching;

  const [indexOfUsers, setIndexOfUsers] = useState();

  useEffect(() => {
    setSearch(location.state);
  }, [location]);

  // Locates where to place the "USERS" banner
  useEffect(() => {
    setIndexOfUsers(undefined);
    for (let i = 0; i < searchResults.length; i++) {
      if (searchResults[i].uid) {
        setIndexOfUsers(i);
        return;
      }
    }
  }, [searchResults]);

  useEffect(() => {
    if (loading) {
      // trigger a loading screen?
      return;
    }
    if (user) {
      PopulateFromFirestore(user, localUser, setLocalUser);
    }
  }, [user, loading]);

  if (loading) {
    return <BreathingLogo type={"fullPage"} />;
  }

  return (
    <div className="jsxWrapper">
      {/* Below ensure the following: localUser has been loaded, user is not 
      on a guest account, and they do NOT have a handle.*/}
      {localUser.uid && !user.isAnonymous && !localUser.handle && (
        <HandleDialog user={user} />
      )}
      <Container maxWidth="sm">
        <Typography variant="h3" style={{ textAlign: "center" }}>
          Search Results:
        </Typography>
        <Divider></Divider>
        <div className="gap" style={{ marginTop: "30px" }}></div>
        {/****** GHOST CARD LOADING STATE *******/}
        {(!searchResults || loadingSearch) && <SearchGhost />}{" "}
        {/****** SEARCHES WITH >0 RESULTS *******/}
        {searchResults?.length > 0 && (
          <div className="column">
            {searchResults[0].id && <SearchResultsBanner text={"TITLES"} />}
            {searchResults.map((item, index) => (
              <Fragment key={item.uid || item.id}>
                {index === indexOfUsers && (
                  <SearchResultsBanner text={"USERS"} />
                )}

                <ListItemButton
                  dense
                  onClick={() => {
                    item.id
                      ? navigate(`/anime/${item.id}`, { state: item })
                      : navigate(`/profile/${item.uid}`, { state: item });
                  }}
                >
                  <ListItemAvatar>
                    {item.id && (
                      <Avatar
                        variant="square"
                        alt={item.display_name}
                        src={item.image_large}
                        sx={{ height: "56px", borderRadius: "8px" }}
                      ></Avatar>
                    )}
                    {item.uid && <SearchAvatars item={item} />}
                  </ListItemAvatar>

                  <ListItemText
                    primary={item.display_name ?? item.name}
                    primaryTypographyProps={{
                      fontWeight: 600,
                    }}
                    secondary={item.uid ? `@${item.handle}` : null}
                  />
                </ListItemButton>
              </Fragment>
            ))}
          </div>
        )}
        {/******* SEARCHES WITH 0 RESULTS *******/}
        {searchResults.length === 0 && !loadingSearch && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
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
            <Typography sx={{ fontWeight: 600, fontSize: "1.1rem", mt: 4 }}>
              Please try again!
            </Typography>{" "}
          </div>
        )}
        <div className="gap" />
      </Container>
    </div>
  );
}
