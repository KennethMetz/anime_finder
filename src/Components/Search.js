import "../Styles/Search.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
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

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const [user, loading] = useAuthState(auth);

  const [localUser, setLocalUser] = useContext(LocalUserContext);
  let [search, setSearch] = useState("");

  // To-Do: Handle loading/error states from API call
  const {
    data: searchResults,
    loading: searchLoading,
    error: apiError,
  } = useAPISearch(search);

  useEffect(() => {
    setSearch(location.state);
  }, [location]);

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

        {!searchResults ? (
          <SearchGhost />
        ) : searchResults?.length > 0 ? (
          <div className="column">
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
                    fontWeight: 600,
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
