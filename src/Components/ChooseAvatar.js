import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useState } from "react";
import { CaretDown } from "phosphor-react";

import { avatars } from "./Avatars";

import AvatarShelf from "./AvatarShelf";

export default function ChooseAvatar() {
  let styling = {
    fontFamily: "interMedium",
    pl: 1,
    fontSize: "0.75rem",
    marginTop: "-20px",
  };

  let [seeMore, setSeeMore] = useState(false);
  const showSeeMoreButton = seeMore !== 1;

  return (
    <div>
      <Typography sx={{ fontFamily: "interExtraBold", pl: 1, mb: 1 }}>
        Select an Avatar:
      </Typography>

      <Typography
        sx={{
          fontFamily: "interMedium",
          pl: 1,
          fontSize: "0.75rem",
        }}
      >
        Cowboy Bebop:
      </Typography>
      <AvatarShelf items={avatars.cowboyBebop} />

      <Typography sx={styling}>Naruto:</Typography>
      <AvatarShelf items={avatars.naruto} />

      <Typography sx={styling}>One Piece:</Typography>
      <AvatarShelf items={avatars.onePiece} />

      {seeMore > 0 ? (
        <>
          <Typography sx={styling}>Pokémon:</Typography>
          <AvatarShelf items={avatars.pokemon} />

          <Typography sx={styling}>Spy x Family:</Typography>
          <AvatarShelf items={avatars.spyXFamily} />

          <Typography sx={styling}>Hunter x Hunter:</Typography>
          <AvatarShelf items={avatars.hunterXHunter} />

          <Typography sx={styling}>Sailor Moon:</Typography>
          <AvatarShelf items={avatars.sailorMoon} />

          <Typography sx={styling}>Cyberpunk: Edgerunners:</Typography>
          <AvatarShelf items={avatars.cyberpunk} />

          <Typography sx={styling}>Kill La Kill:</Typography>
          <AvatarShelf items={avatars.killLaKill} />
        </>
      ) : (
        ""
      )}

      {showSeeMoreButton ? (
        <div className="row">
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => setSeeMore(seeMore + 1)}
            endIcon={<CaretDown />}
            sx={{ mb: 2 }}
          >
            {" "}
            See more
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
