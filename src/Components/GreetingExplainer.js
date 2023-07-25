import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import useTheme from "@mui/material/styles/useTheme";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  Binoculars,
  CaretRight,
  ChatsCircle,
  FlyingSaucer,
  PuzzlePiece,
  X,
} from "phosphor-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function GreetingExplainer() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [showExplainer, setShowExplainer] = useState(true);

  const iconBoxStyling = {
    bgcolor: "primary.main",
    width: 60,
    height: 60,
    borderRadius: "50%",
    mr: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const iconGridStyling = {
    display: "flex",
    justifyContent: "right",
    alignItems: "top",
  };

  const iconPhosphorStyling = {
    size: 48,
    weight: "duotone",
    color: theme.palette.background.main,
  };

  const smallText = { fontSize: "0.875rem", marginTop: "6px" };

  if (showExplainer)
    return (
      <Box
        sx={{
          px: { xs: 2, md: 6 },
          py: { xs: 6, md: 6 },
          mx: { xs: 0, lg: 16 },
          mb: { xs: 8, md: 4 },
          backgroundColor: theme.palette.custom.greetingBg,
          borderRadius: "24px",
          position: "relative",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: { xs: 1, sm: 6 },
            right: { xs: 1, sm: 6 },
          }}
          onClick={() => setShowExplainer(false)}
        >
          <X size={24} />
        </IconButton>
        <Grid container rowSpacing={4} sx={{ display: "inline-flex" }}>
          {/* Title text */}
          <Grid item xs={12}>
            <Typography variant="h2" style={{ textAlign: "center" }}>
              Your personal anime guide
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ mb: 1, mx: { xs: 1, sm: 6, sevenHundredFifty: 16 } }}
          >
            <Typography variant="h4" style={{ textAlign: "center" }}>
              Use EdwardML's giant computer brain to help you decide which anime
              to watch next.
            </Typography>
          </Grid>

          {/* First row of icons/text */}
          <Grid
            item
            xs={4}
            fiveHundred={3}
            sevenHundredFifty={2}
            sx={{ ...iconGridStyling }}
          >
            <Box sx={{ ...iconBoxStyling }}>
              <FlyingSaucer {...iconPhosphorStyling} />
            </Box>
          </Grid>
          <Grid item xs={8} fiveHundred={9} sevenHundredFifty={4}>
            <Typography variant="h5">Discover</Typography>
            <Typography style={{ ...smallText }}>
              {" "}
              Edward understands anime relationships and will help you discover
              new content similar to your favorites.
            </Typography>
          </Grid>

          <Grid
            item
            xs={4}
            fiveHundred={3}
            sevenHundredFifty={2}
            sx={{ ...iconGridStyling }}
          >
            <Box sx={{ ...iconBoxStyling }}>
              <PuzzlePiece {...iconPhosphorStyling} />
            </Box>
          </Grid>
          <Grid item xs={8} fiveHundred={9} sevenHundredFifty={4}>
            <Typography variant="h5">Customize</Typography>
            <Typography style={{ ...smallText }}>
              Search through EdwardML’s library to build your personal taste
              profile. Save your progress and return later to discover even more
              content picked for you.
            </Typography>
          </Grid>

          {/* Second row of icons/text */}
          <Grid
            item
            xs={4}
            fiveHundred={3}
            sevenHundredFifty={2}
            sx={{ ...iconGridStyling }}
          >
            <Box sx={{ ...iconBoxStyling }}>
              <Binoculars {...iconPhosphorStyling} />
            </Box>
          </Grid>
          <Grid item xs={8} fiveHundred={9} sevenHundredFifty={4}>
            <Typography variant="h5">Explore</Typography>
            <Typography style={{ ...smallText }}>
              {" "}
              Get insight into any anime. Edward will let you know how likely
              you are to enjoy any title based on your taste profile.{" "}
            </Typography>
          </Grid>

          <Grid
            item
            xs={4}
            fiveHundred={3}
            sevenHundredFifty={2}
            sx={{ ...iconGridStyling }}
          >
            <Box sx={{ ...iconBoxStyling }}>
              <ChatsCircle {...iconPhosphorStyling} />
            </Box>
          </Grid>
          <Grid item xs={8} fiveHundred={9} sevenHundredFifty={4}>
            <Typography variant="h5">Socialize </Typography>
            <Typography style={{ ...smallText }}>
              {" "}
              Create watchlists and share them with your friends and family.
            </Typography>
          </Grid>
        </Grid>

        {/* CTA to register account */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            position: "relative",
          }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              width: "280px",
              mt: { xs: 3, md: 3 },
              fontSize: "0.875rem",
              position: "absolute",
              top: 0,
            }}
            onClick={(e) => {
              navigate("/register");
            }}
          >
            Register to save your profile!
            <Box
              sx={{
                bgcolor: "#fcfcfc",
                width: 26,
                height: 26,
                borderRadius: "50%",
                display: "flex",
                ml: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CaretRight size={24} color={theme.palette.primary.main} />
            </Box>
          </Button>
        </Box>
      </Box>
    );
}
