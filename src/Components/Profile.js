import "../Styles/Profile.css";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";
import { matchPath, useLocation, useParams } from "react-router-dom";
import ProfileListPage from "./ProfileListPage";
import ProfileMainPage from "./ProfileMainPage";
import { useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import BackButton from "./BackButton";
import { PopulateFromFirestore } from "./Firestore";
import { auth } from "./Firebase";
import ProfilePageContextProvider from "./ProfilePageContextProvider";
import { LocalUserContext } from "./LocalUserContext";
import ProfileUserBanner from "./ProfileUserBanner";
import ProfileUserBannerSmall from "./ProfileUserBannerSmall";

export default function Profile() {
  const location = useLocation();
  const params = useParams();
  const theme = useTheme();
  const userId = params.userId;

  const [localUser, setLocalUser] = useContext(LocalUserContext);

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (user) PopulateFromFirestore(user, localUser, setLocalUser);
  }, [user, loading]);

  const isListPage = matchPath(
    { path: "/profile/:userId/list/:listId" },
    location.pathname
  );

  const md = useMediaQuery(theme.breakpoints.up("md"));

  const compactSidebar = isListPage && !md;

  return (
    <ProfilePageContextProvider userId={params.userId}>
      <Container maxWidth="lg">
        <Grid container sx={{ paddingTop: { xs: "25px", md: "50px" } }}>
          <Grid item xs={12}>
            {isListPage ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <BackButton
                  sx={{ flexShrink: 0, mr: 1 }}
                  link={`/profile/${userId}`}
                />
                <ProfileUserBannerSmall />
              </Box>
            ) : (
              <ProfileUserBanner />
            )}
          </Grid>
          <Grid item xs={12}>
            {isListPage ? <ProfileListPage /> : <ProfileMainPage />}
          </Grid>
        </Grid>
      </Container>
    </ProfilePageContextProvider>
  );
}
