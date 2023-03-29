import "../Styles/Header.css";

import { Link } from "react-router-dom";
import { Container, Grid } from "@mui/material";

import { useState } from "react";
import TitleAutocomplete from "./TitleAutocomplete";
import { MagnifyingGlass, House, User } from "phosphor-react";
import DropMenu from "./DropMenu";
import { useTheme } from "@mui/material/styles";
import EdwardMLLogo from "./EdwardMLLogo";
import HeaderTab from "./HeaderTab";

function Header() {
  const theme = useTheme();

  const [showSearch, setShowSearch] = useState(false);

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
                xs={7.5}
                sx={{
                  marginY: 0.75,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <HeaderTab text="Home" icon={<House />} path="/home" />
                <HeaderTab text="Profile" icon={<User />} path="/profile" />
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
            xs={2}
            sm={1.25}
            md={2.5}
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
