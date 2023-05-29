import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import LikeButtons from "./LikeButtons";
import { useAnimeHR } from "./APICalls";
import { Typography } from "@mui/material";

export default function Sandbox() {
  const [anime, setAnime] = useState();
  const { data: animeHR } = useAnimeHR();

  useEffect(() => {
    setAnime(animeHR);
  }, []);

  const headerMargin = { mt: 1.3, mb: 1.3 };

  return (
    <div className="App">
      <Container maxwidth="sm">
        <div className="gap" />

        <Typography variant="h2" sx={{ mb: 5 }}>
          Dev Sandbox
        </Typography>

        <Typography variant="h1" sx={headerMargin}>
          Hero Header (h1)
        </Typography>

        <Typography variant="h2" sx={headerMargin}>
          Page Header (h2)
        </Typography>

        <Typography variant="h3" sx={headerMargin}>
          Section Header (h3)
        </Typography>

        <Typography variant="h4" sx={headerMargin}>
          Light Header (h4)
        </Typography>

        <Typography variant="h5" sx={headerMargin}>
          Subheader (h5)
        </Typography>

        <p>
          Moments prior to Naruto Uzumaki's birth, a huge demon known as the
          Kyuubi, the Nine-Tailed Fox, attacked Konohagakure, the Hidden Leaf
          Village, and wreaked havoc. In order to put an end to the Kyuubi's
          rampage, the leader of the village, the Fourth Hokage, sacrificed his
          life and sealed the monstrous beast inside the newborn Naruto.
        </p>

        <h4>Default Buttons</h4>
        {["small", "medium", "large"].map((size) => (
          <Box key={size} sx={{ mb: 2 }}>
            <Button variant="text" color="inherit" size={size}>
              Text
            </Button>{" "}
            <Button variant="outlined" color="inherit" size={size}>
              Outlined
            </Button>{" "}
            <Button variant="contained" color="inherit" size={size}>
              Contained
            </Button>{" "}
            <Button variant="text" color="primary" size={size}>
              Text
            </Button>{" "}
            <Button variant="outlined" color="primary" size={size}>
              Outlined
            </Button>{" "}
            <Button variant="contained" color="primary" size={size}>
              Contained
            </Button>{" "}
            <Button variant="text" size={size} disabled>
              Text
            </Button>{" "}
            <Button variant="outlined" size={size} disabled>
              Outlined
            </Button>{" "}
            <Button variant="contained" size={size} disabled>
              Contained
            </Button>
          </Box>
        ))}

        <h4>Like Buttons</h4>
        {!anime && <div>Loading...</div>}
        {anime &&
          anime.map((a) => (
            <div key={a.id}>
              <div>{a.display_name}</div>
              <LikeButtons anime={a} selected={true} />
            </div>
          ))}
      </Container>
    </div>
  );
}
