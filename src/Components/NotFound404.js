import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import EdwardMLLogo from "./EdwardMLLogo";
import { Link, useLocation } from "react-router-dom";
import EdGif from "../Styles/images/edGivingUp.gif";
import { House } from "phosphor-react";

export function NotFound404() {
  const theme = useTheme();
  const location = useLocation();

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
          <div style={{ display: "flex" }}>
            <Link to="/home" style={{ flexShrink: 1 }}>
              <EdwardMLLogo />
            </Link>
          </div>
        </Grid>
        <Grid
          item
          xs={3}
          sm={3}
          md={2.5}
          textAlign="center"
          sx={{ display: "flex", justifyContent: "right" }}
        >
          <Link to="/home" style={{ width: "100%" }}>
            <Button
              variant="contained"
              size="large"
              sx={{ fontSize: "0.875rem", mr: 2, p: 2 }}
            >
              <House size={24} /> Home
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Typography
        variant="h1"
        sx={{
          textAlign: "center",

          fontSize: {
            sm: "8rem",
            xs: "5rem",
          },
        }}
      >
        404
      </Typography>
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
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
        variant="h6"
        sx={{
          textAlign: "center",

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
