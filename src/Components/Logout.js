import React from "react";
import { Link } from "react-router-dom";
import spike from "../Styles/images/spike-tile.png";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import EdwardMLLogo from "./EdwardMLLogo";

export default function Logout() {
  const theme = useTheme();

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid
        container
        spacing={0}
        sx={{
          alignItems: "center",
          paddingBottom: 0,
        }}
      >
        <Grid item md={9.5} sm={9} xs={9}>
          <div className="logo">
            <Link to="/" style={{ display: "flex" }}>
              <EdwardMLLogo />
            </Link>
          </div>

          <div></div>
        </Grid>
        <Grid
          item
          xs={3}
          sm={3}
          md={2.5}
          textAlign="right"
          sx={{ display: "flex", justifyContent: "right" }}
        >
          <Link to="/login" style={{ width: "100%" }}>
            <Button
              variant="contained"
              size="large"
              sx={{ fontSize: "0.875rem" }}
            >
              Login
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={0}
        sx={{
          justifyContent: "center",
          paddingBottom: 0,
        }}
      >
        <Grid
          item
          xs={12}
          sevenHundredFifty={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: {
                xs: "2.5rem",
                sevenHundredFifty: "3rem",
              },
              textAlign: "center",
              marginBottom: "30px",
              marginTop: "30px",
            }}
          >
            Logout Complete.
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontSize: {
                xs: "1.5rem",
                sevenHundredFifty: "1.75rem",
              },
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            See You Space Cowboy...
          </Typography>
        </Grid>

        <Grid
          item
          xs={0}
          sevenHundredFifty={6}
          sx={{
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            flexWrap: "nowrap",
          }}
        >
          <Box
            component="img"
            src={spike}
            alt=""
            sx={{
              height: {
                xs: "600px",
                sevenHundredFifty: "600px",
              },
            }}
          />
        </Grid>
      </Grid>
      <div className="gap"></div>
    </Container>
  );
}
