import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import EdwardMLLogo from "./EdwardMLLogo";
import { Link, useLocation } from "react-router-dom";
import EdGif from "../Styles/images/edGivingUp.gif";
import { CaretLeft, House } from "phosphor-react";

export function NotFound404() {
  const theme = useTheme();
  const location = useLocation();

  console.log(location);

  return (
    <Container maxWidth="lg">
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
          <Link to="/" style={{ width: "100%" }}>
            <Button
              variant="contained"
              size="large"
              sx={{ fontSize: "0.875rem" }}
            >
              <House size={24} style={{ marginRight: "10px" }} /> Home
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Typography
        sx={{
          textAlign: "center",
          fontFamily: "Montserrat",
          fontSize: {
            sm: "8rem",
            xs: "5rem",
          },
        }}
      >
        404
      </Typography>
      <Typography
        sx={{
          textAlign: "center",
          fontFamily: "MontserratBold",
          fontSize: {
            sm: "2.5rem",
            xs: "1.75rem",
          },
          mb: 4,
        }}
      >
        Uhh ohh...
      </Typography>
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
            background: theme.palette.text.primary,
            borderRadius: "24px",
            padding: 0.3,
          }}
        >
          <Box
            component="div"
            sx={{
              width: {
                sm: "540px",
                xs: "300px",
              },
              height: {
                sm: "405px",
                xs: "225px",
              },
              backgroundImage: `url(${EdGif})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "24px",
            }}
          />
        </Paper>
      </Grid>

      <Typography
        sx={{
          textAlign: "center",
          fontFamily: "MontserratBold",
          fontSize: {
            sm: "2.5rem",
            xs: "1.75rem",
          },
          mt: 4,
        }}
      >
        ...we don't know what happened either!
      </Typography>
    </Container>
  );
}
