import "../Styles/Header.css";

import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Icon,
  IconButton,
  ListItemSecondaryAction,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "./Firebase";
import { signOut } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { LocalUserContext } from "./LocalUserContext";
import TitleAutocomplete from "./TitleAutocomplete";
import {
  UserCircle,
  List,
  Palette,
  MagnifyingGlass,
  House,
  User,
} from "phosphor-react";
import DropMenu from "./DropMenu";
import { useTheme } from "@mui/material/styles";
import EdwardMLLogo from "./EdwardMLLogo";
import { Box } from "@mui/system";

function Header() {
  const [localUser, setLocalUser] = useContext(LocalUserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [user] = useAuthState(auth);

  const [showSearch, setShowSearch] = useState(false);

  let smallDevice = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {}, [user]);

  const toggleSearch = (e) => {
    setShowSearch(true);
  };

  function onSubmit(key) {
    if (key === "Enter") {
      toggleSearch();
    }
  }

  const iconStyle = {
    color: theme.palette.text.primary,
    "&:hover": {
      color: { smallDevice } ? "primary.main" : "inherit",
    },
  };

  const tabTypogStyle = {
    fontFamily: "interSemiBold",
    fontSize: "1.125rem",
    "&:hover": {
      color: "primary.main",
    },
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
          <Grid item lg={2.5} md={2.5} sm={4.75} xs={2.5}>
            <Link to="/home">
              <EdwardMLLogo />
            </Link>
          </Grid>
          {!showSearch ? (
            <>
              <Grid
                item
                lg={8.5}
                md={8.5}
                sm={6}
                xs={7.5}
                sx={{
                  marginY: 0.75,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <Link to="/home">
                  {smallDevice ? (
                    <IconButton tabIndex="-1" sx={iconStyle}>
                      <House size={24} />
                    </IconButton>
                  ) : (
                    <Typography
                      onClick={(e) => {
                        navigate("/home");
                      }}
                      sx={tabTypogStyle}
                    >
                      Home
                    </Typography>
                  )}
                </Link>
                <Link to="/profile">
                  {smallDevice ? (
                    <IconButton tabIndex="-1" sx={iconStyle}>
                      <User size={24} />
                    </IconButton>
                  ) : (
                    <Typography sx={tabTypogStyle}>Profile</Typography>
                  )}
                </Link>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                  onClick={toggleSearch}
                  tabIndex="0"
                  onKeyDown={(e) => {
                    onSubmit(e.key);
                  }}
                >
                  {smallDevice ? (
                    <IconButton tabIndex="-1" sx={iconStyle}>
                      <MagnifyingGlass size={24} />
                    </IconButton>
                  ) : (
                    <>
                      <MagnifyingGlass size={18} />
                      <Typography
                        sx={{
                          fontFamily: "interSemiBold",
                          fontSize: "1.125rem",
                          ml: 0.75,
                        }}
                      >
                        Search
                      </Typography>
                    </>
                  )}
                </Box>
              </Grid>{" "}
            </>
          ) : (
            <Grid item lg={8.5} md={8.5} sm={6} xs={7.5} sx={{ marginY: 0.75 }}>
              <TitleAutocomplete setShowSearch={setShowSearch} />
            </Grid>
          )}
          <Grid
            item
            xs={2}
            sm={1.25}
            md={1}
            textAlign="right"
            sx={{ display: "flex", justifyContent: "right" }}
          >
            {DropMenu()}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Header;
