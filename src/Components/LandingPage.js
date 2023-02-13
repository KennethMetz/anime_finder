import "../Styles/LandingPage.css";

import { useTheme } from "@emotion/react";
import { Box, Button, Grid, Icon, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import EdwardMLLogo from "./EdwardMLLogo";
import AnimeMosaic from "../Styles/images/animeMosaic2.svg";
import BlackBackground from "../Styles/images/BlackBackground.svg";
import BlackSunburst from "../Styles/images/BlackSunburst.svg";
import EdwardGIF from "../Styles/images/edwardGIF.gif";
import BebopCrew from "../Styles/images/BebopCrew.jpg";
import SpikeAndJet from "../Styles/images/spikeAndJet.png";
import { MagnifyingGlass, ShareNetwork, User } from "phosphor-react";
import logo from "../Styles/images/logo.svg";

export default function LandingPage() {
  const theme = useTheme();

  return (
    <div>
      {/*****************************HEADER**************************/}
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
          spacing={1}
          sx={{
            alignItems: "center",
            paddingBottom: 0,
          }}
        >
          <Grid item md={9} sm={9} xs={9}>
            <div className="logo" style={{ height: "68px" }}>
              <Link to="/home" style={{ display: "flex" }}>
                <img src={logo} alt="" />
                <Box
                  component="div"
                  sx={{ display: { xs: "none", fiveHundred: "flex" } }}
                >
                  <h2
                    className="appName"
                    style={{
                      color: theme.palette.day.text,
                      paddingLeft: "10px",
                      display: {
                        xs: "none",
                        fiveHundred: "block",
                      },
                    }}
                  >
                    Edward
                  </h2>
                  <h2
                    className="appName"
                    style={{ color: theme.palette.day.primary }}
                  >
                    ML
                  </h2>
                </Box>
              </Link>
            </div>

            <div></div>
          </Grid>
          <Grid
            item
            xs={3}
            textAlign="right"
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Link to="/login">
              <Button
                variant="contained"
                size="large"
                sx={{
                  textTransform: "none",
                  minWidth: "93px",
                  minHeight: "48px",
                  fontFamily: "interExtraBold",
                  fontSize: ".875rem",
                  borderRadius: "24px",
                  color: "white",
                  marginRight: "18px",
                }}
              >
                Try it
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="outlined"
                size="large"
                sx={{
                  textTransform: "none",
                  minWidth: "93px",
                  minHeight: "48px",
                  fontFamily: "interExtraBold",
                  fontSize: ".875rem",
                  borderRadius: "24px",
                  borderColor: "#474747",
                  color: "black",
                  backgroundColor: "white",

                  "&:hover, &:focus": {
                    color: "#fff",
                    backgroundColor: "#474747",
                    borderColor: "#474747",
                  },
                }}
              >
                Login
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
      {/********************Start of Section #1 (Black Background)*******************/}
      <Box
        component="img"
        alt=""
        src={BlackBackground}
        sx={{
          position: "absolute",
          top: "68px",
          width: "100vw",
          height: "747px",
          objectFit: "cover",
          zIndex: "0",
        }}
      ></Box>
      <Box
        component="img"
        alt=""
        src={AnimeMosaic}
        sx={{
          opacity: 0.19,
          width: "100vw",
          height: "747px",
          position: "absolute",
          top: "68px",
          objectFit: "cover",
          zIndex: "0",
        }}
      ></Box>
      <Box
        component="img"
        alt=""
        src={BlackSunburst}
        sx={{
          position: "absolute",
          width: "100vw",
          height: "747px",
          top: "68px",
          zIndex: "0",
        }}
      ></Box>
      {/**********End of background layers**********/}
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            marginTop: {
              xs: "80px",
              sm: "145px",
            },
            fontFamily: "montserrat",
            fontSize: {
              xs: "3rem",
              sm: "4.0rem",
            },
            color: "white",
            zIndex: "1",
            maxWidth: "550px",
            textAlign: "center",
          }}
        >
          Find your next favorite anime
        </Typography>
        <Typography
          sx={{
            marginTop: "27px",
            fontFamily: "interMedium",
            fontSize: { xs: "1.1rem", sm: "1.5rem" },
            color: "white",
            zIndex: "1",
            maxWidth: "600px",
            textAlign: "center",
          }}
        >
          EdwardML uses its{" "}
          <span className="ranbow rainbow_text_animated">
            giant computer brain
          </span>{" "}
          to help you decide which anime to watch next, based on your interests.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            textTransform: "none",
            width: {
              xs: "230px",
              fourHundred: "297px",
            },
            minHeight: "48px",
            marginTop: "48px",
            fontFamily: "interSemiBold",
            fontSize: "1rem",
            borderRadius: "24px",
            backgroundColor: theme.palette.day.primary,
          }}
          onClick={() => {}}
        >
          Let's Get Started!
        </Button>
        <Typography
          sx={{
            marginTop: "17px",
            marginBottom: "10px",
            fontFamily: "interMedium",
            fontSize: "1.0rem",
            color: "white",
            zIndex: "1",
            maxWidth: "600px",
            textAlign: "center",
          }}
        >
          Been here before?
        </Typography>
        <Link to="/login" style={{}}>
          <Button
            variant="outlined"
            size="large"
            sx={{
              textTransform: "none",
              width: {
                xs: "230px",
                fourHundred: "297px",
              },
              minHeight: "48px",
              fontFamily: "interSemiBold",
              fontSize: "1rem",
              borderRadius: "24px",
              borderColor: "#474747",
              color: "black",
              backgroundColor: "white",

              "&:hover, &:focus": {
                color: "#fff",
                backgroundColor: "#474747",
                borderColor: "#474747",
              },
            }}
          >
            Login
          </Button>
        </Link>
        {/******************Start of Section #2 (white background)****************/}
        <Grid
          container
          spacing={6}
          justifyContent="space-evenly"
          sx={{
            position: "absolute",
            top: "875px",
            maxWidth: "1200px",
          }}
        >
          {/******************************Card #1****************************/}
          <Grid
            item
            xs={12}
            sevenHundredFifty={6}
            elevenHundred={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Paper
              sx={{
                width: "350px",
                height: "500px",
                background: "#F2F2F2",
                borderRadius: "24px",
              }}
            >
              <Box
                component="img"
                alt=""
                src={EdwardGIF}
                sx={{
                  width: "350px",
                  borderTopLeftRadius: "24px",
                  borderTopRightRadius: "24px",
                }}
              ></Box>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "24px 0px 27px",
                }}
              >
                <Icon
                  sx={{
                    width: "40px",
                    height: "40px",
                    margin: "0px 20px 0px 10px",
                  }}
                >
                  <MagnifyingGlass size={35} />
                </Icon>
                <Typography
                  sx={{
                    fontFamily: "montserratBold",
                    fontSize: "1.5rem",
                    marginRight: "15px",
                    lineHeight: "1.25",
                  }}
                >
                  Search for anime you like
                </Typography>
              </div>
              <Typography
                sx={{
                  fontFamily: "interMedium",
                  fontSize: "1rem",
                  margin: "0px 34px 20px 27px",
                }}
              >
                Search through EdwardML’s library to build your personal taste
                profile. Save your progress and return later to discover even
                more content picked for you.{" "}
              </Typography>{" "}
            </Paper>
          </Grid>
          {/******************************Card #2****************************/}
          <Grid
            item
            xs={12}
            sevenHundredFifty={6}
            elevenHundred={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Paper
              sx={{
                width: "350px",
                height: "500px",
                background: "#F2F2F2",
                borderRadius: "24px",
              }}
            >
              <Box
                component="div"
                sx={{
                  width: "350px",
                  height: "243px",
                  backgroundImage: `url(${BebopCrew})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderTopLeftRadius: "24px",
                  borderTopRightRadius: "24px",
                }}
              ></Box>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "24px 0px 27px",
                }}
              >
                <Icon
                  sx={{
                    width: "40px",
                    height: "40px",
                    margin: "0px 20px 0px 10px",
                  }}
                >
                  <ShareNetwork size={35} />
                </Icon>
                <Typography
                  sx={{
                    fontFamily: "montserratBold",
                    fontSize: "1.5rem",
                    marginRight: "20px",
                    lineHeight: "1.25",
                  }}
                >
                  Explore similar titles{" "}
                </Typography>
              </div>
              <Typography
                sx={{
                  fontFamily: "interMedium",
                  fontSize: "1rem",
                  margin: "0px 34px 20px 27px",
                }}
              >
                Edward understands anime relationships and can help you discover
                new content similar to your existing favorites.
              </Typography>{" "}
            </Paper>
          </Grid>
          {/******************************Card #3****************************/}
          <Grid
            item
            xs={12}
            sevenHundredFifty={6}
            elevenHundred={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Paper
              sx={{
                width: "350px",
                height: "500px",
                background: "#F2F2F2",
                borderRadius: "24px",
              }}
            >
              <Box
                component="div"
                sx={{
                  backgroundImage: `url(${SpikeAndJet})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "350px",
                  height: "243px",
                  borderTopLeftRadius: "24px",
                  borderTopRightRadius: "24px",
                }}
              ></Box>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "24px 0px 27px",
                }}
              >
                <Icon
                  sx={{
                    width: "40px",
                    height: "40px",
                    margin: "0px 20px 0px 10px",
                  }}
                >
                  <User size={35} />
                </Icon>
                <Typography
                  sx={{
                    fontFamily: "montserratBold",
                    fontSize: "1.5rem",
                    marginRight: "15px",
                    lineHeight: "1.25",
                  }}
                >
                  Get personalized recs{" "}
                </Typography>
              </div>
              <Typography
                sx={{
                  fontFamily: "interMedium",
                  fontSize: "1rem",
                  margin: "0px 34px 20px 27px",
                }}
              >
                Edward learns your personal taste profile and can make new
                suggestions that are just for you.
              </Typography>{" "}
            </Paper>
            <div
              style={{
                height: "60px",
              }}
            ></div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
