import "../Styles/LandingPage.css";

import { useTheme } from "@mui/material";
import { Box, Button, Grid, Icon, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import AnimeMosaic from "../Styles/images/animeMosaic2.opt.jpg";
import BlackBackground from "../Styles/images/BlackBackground.svg";
import BlackSunburst from "../Styles/images/BlackSunburst.svg";
import EdwardGIF from "../Styles/images/edwardGIF.mp4";
import BebopCrew from "../Styles/images/BebopCrew.opt.jpg";
import SpikeAndJet from "../Styles/images/spikeAndJet.opt.jpg";
import { MagnifyingGlass, ShareNetwork, User } from "phosphor-react";
import LandingPageHeader from "./LandingPageHeader";

export default function LandingPage() {
  const theme = useTheme();

  return (
    <div>
      <LandingPageHeader />
      {/********************Start of Section #1 (Black Background)*******************/}
      <Box
        component="img"
        alt=""
        src={BlackBackground}
        sx={{
          position: "absolute",
          top: "68px",
          width: "100%",
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
          width: "100%",
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
          width: "100%",
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
          <span className="rainbow_text_animated">giant computer brain</span> to
          help you decide which anime to watch next, based on your interests.
        </Typography>
        <Link to="/onboarding" tabIndex="-1">
          <Button
            variant="contained"
            size="large"
            sx={{
              width: {
                xs: "230px",
                fourHundred: "297px",
              },
              minHeight: "48px",
              marginTop: "48px",
            }}
          >
            Let's Get Started!
          </Button>
        </Link>
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
        <Link to="/login" tabIndex="-1">
          <Button
            variant="contained"
            size="large"
            color="inherit"
            sx={{
              width: {
                xs: "230px",
                fourHundred: "297px",
              },
              color: theme.palette.common.black,
              backgroundColor: theme.palette.common.white,
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
              elevation={0}
              sx={{
                maxWidth: "350px",
                minHeight: "500px",
                background: theme.palette.custom.subtleCardBg,
                borderRadius: "24px",
                marginRight: "10px",
                marginLeft: "10px",
              }}
            >
              <div
                style={{
                  maxWidth: "350px",
                  height: "245px",
                  borderTopLeftRadius: "24px",
                  borderTopRightRadius: "24px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    borderTopLeftRadius: "24px",
                    borderTopRightRadius: "24px",
                    position: "absolute",
                    top: "0",
                    right: "0",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <video
                    style={{}}
                    loop
                    autoplay="autoplay"
                    muted
                    src={EdwardGIF}
                  />
                </div>
              </div>
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
              elevation={0}
              sx={{
                maxWidth: "350px",
                minHeight: "500px",
                background: theme.palette.custom.subtleCardBg,
                borderRadius: "24px",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              <Box
                component="div"
                sx={{
                  maxWidth: "350px",
                  height: "245px",
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
                  margin: "0px 34px 0px 27px",
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
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                maxWidth: "350px",
                minHeight: "500px",
                background: theme.palette.custom.subtleCardBg,
                borderRadius: "24px",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              <Box
                component="div"
                sx={{
                  backgroundImage: `url(${SpikeAndJet})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  maxWidth: "350px",
                  height: "245px",
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
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </Container>
    </div>
  );
}
