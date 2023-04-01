import { Button, Container, Grid, Typography, useTheme } from "@mui/material";
import "css-doodle";
import "../Styles/NotFound404.css";
import { Link } from "react-router-dom";
import EdwardMLLogo from "./EdwardMLLogo";

export function NotFound404() {
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
              sx={{ fontSize: "0.875rem" }}
            >
              Login
            </Button>
          </Link>
        </Grid>
      </Grid>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vmin",
        }}
      >
        <div
          style={{
            textAlign: "center",
            position: "absolute",
            top: "25vh",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontFamily: "montserrat",
              fontSize: "6rem",
            }}
          >
            404{" "}
          </Typography>
          <Typography
            sx={{
              fontFamily: "montserratBold",
              fontSize: "3rem",
            }}
          >
            You seem lost...
          </Typography>
          <Link to="/home" style={{ width: "100%" }}>
            <Button variant="contained" size="large" sx={{ mt: 10 }}>
              GET ME OUT OF HERE!
            </Button>
          </Link>
        </div>
        <css-doodle class="doodle">
          {`
          :doodle {
            @grid: 50x1 / 100em
          }
          :container {
            perspective: 40vmin;
          }
          background: @multi(
            @r(60, 100), 
            radial-gradient(
              @p(${theme.palette.grey.main}, ${theme.palette.text.primary}, ${theme.palette.custom.subtleCardBg}, ${theme.palette.custom.subtleCardBg}) 15%,
              transparent 30%
            ) @r(100%) @r(100%) / @r(5%, 3%, 1) @lr() no-repeat
          );

          @size: 30%;
          @place-cell: center;
          
          transform-style: preserve-3d;
          animation: scale-up 30s linear infinite;
          animation-delay: calc(@i() * -1s);
        
          @keyframes scale-up {
            0% {
              opacity: 0;
              transform: translate3d(0, 0, 0) rotate(0);
            }
            5% { 
              opacity: 1; 
            }
            95% {
              transform:
                translate3d(0, 0, @r(300em, 300em))
                rotate(@r(-180deg, 180deg));
            }
            100% {
              opacity: 0;
              transform: translate3d(0, 0, 1em);
            }
          } 
          `}
        </css-doodle>
      </div>
    </Container>
  );
}
