import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Grid, Typography } from "@mui/material";
import logo from "../Styles/images/logo.svg";
import spike from "../Styles/images/spike-tile.jpg";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
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
            <Link to="/home" style={{ display: "flex" }}>
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
              sx={{
                textTransform: "none",
                width: "100%",
                minHeight: "48px",
                fontFamily: "interExtraBold",
                fontSize: "1rem",
                borderRadius: "24px",
                color: "white",
              }}
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
            sx={{
              fontFamily: "montserrat, Arial, Helvetica, sans-serif",
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
            sx={{
              fontFamily: "interSemiBold, Arial, Helvetica, sans-serif",
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
