import "../Styles/Profile.css";

import { Container, Grid } from "@mui/material";
import { matchPath, useLocation } from "react-router-dom";
import ProfileListPage from "./ProfileListPage";
import ProfileMainPage from "./ProfileMainPage";
import ProfileSidebar from "./ProfileSidebar";
import { useContext, useEffect } from "react";
import { LocalUserContext } from "./LocalUserContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { PopulateFromFirestore } from "./Firestore";
import { auth } from "./Firebase";

export default function Profile() {
  const location = useLocation();

  const [localUser, setLocalUser] = useContext(LocalUserContext);

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (user) PopulateFromFirestore(user, localUser, setLocalUser);
  }, [user, loading]);

  const isListPage = matchPath(
    { path: "/profile/list/:listId" },
    location.pathname
  );

  return (
    <Container maxWidth="lg">
      <Grid container sx={{ paddingTop: { xs: "25px", md: "50px" } }}>
        <Grid item xs={12} md={3} sx={{ marginBottom: "24px" }}>
          <ProfileSidebar />
        </Grid>
        <Grid item xs={12} md={9}>
          {isListPage ? <ProfileListPage /> : <ProfileMainPage />}
        </Grid>
      </Grid>
    </Container>
  );
}
