import "../Styles/Header.css";

import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

import { useState } from "react";
import TitleAutocomplete from "./TitleAutocomplete";
import { MagnifyingGlass, House, User, Bell } from "phosphor-react";
import DropMenu from "./DropMenu";
import EdwardMLLogo from "./EdwardMLLogo";
import HeaderTab from "./HeaderTab";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import NotificationDropMenu from "./NotificationDropMenu";

function Header() {
  const [user] = useAuthState(auth);
  const theme = useTheme();

  const [showSearch, setShowSearch] = useState(false);

  const isMobileWidth = useMediaQuery(theme.breakpoints.down("sm"));

  const showMobileSearch = isMobileWidth && showSearch;

  const toggleSearch = (e) => {
    setShowSearch(true);
    e?.preventDefault();
  };

  return (
    <div
      className="header"
      style={{
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={0}
          sx={{
            alignItems: "center",
            paddingBottom: 0,
          }}
        >
          {showMobileSearch ? (
            <Grid item xs={12} sx={{ margin: "11px 0" }}>
              <TitleAutocomplete setShowSearch={setShowSearch} />
            </Grid>
          ) : (
            <>
              <Grid item md={2.5} sm={4.75} xs={2.5}>
                <Link to="/home">
                  <EdwardMLLogo />
                </Link>
              </Grid>
              {!showSearch ? (
                <>
                  <Grid
                    item
                    md={7}
                    sm={6}
                    xs={5.5}
                    sx={{
                      marginY: 0.75,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <HeaderTab text="Home" icon={<House />} path="/home" />
                    <HeaderTab
                      text="Profile"
                      icon={<User />}
                      path={user ? `/profile/${user.uid}` : "/login"}
                    />
                    <HeaderTab
                      text="Search"
                      icon={<MagnifyingGlass />}
                      alwaysShowIcon
                      onClick={toggleSearch}
                    />
                  </Grid>
                </>
              ) : (
                <Grid item md={7} sm={6} xs={7.5} sx={{ marginY: 0.75 }}>
                  <TitleAutocomplete setShowSearch={setShowSearch} />
                </Grid>
              )}
              <Grid
                item
                xs={4}
                sm={1.25}
                md={2.5}
                textAlign="right"
                sx={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                }}
              >
                <NotificationDropMenu />
                <DropMenu />
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default Header;
