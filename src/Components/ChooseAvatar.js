import { Typography, Button, Grid } from "@mui/material";
import { useState } from "react";
import { CaretDown } from "phosphor-react";

import david from "../Styles/images/userAvatars/david_martinez.160.jpg";
import davidAngry from "../Styles/images/userAvatars/david.jpg";
import lucy from "../Styles/images/userAvatars/LUCY.jpg";
import mainegf from "../Styles/images/userAvatars/mainegf.jpg";
import maine from "../Styles/images/userAvatars/maine.jpg";
import kiwi from "../Styles/images/userAvatars/kiwi.jpg";
import rebecca from "../Styles/images/userAvatars/rebecca.jpg";
import pilar from "../Styles/images/userAvatars/pilar.jpg";
import lucySmoking from "../Styles/images/userAvatars/lucySmoking.jpg";

import ryuko from "../Styles/images/userAvatars/ryuko.160.jpg";
import mako from "../Styles/images/userAvatars/mako.jpg";
import satsuki from "../Styles/images/userAvatars/satsuki.jpg";

import naruto from "../Styles/images/userAvatars/naruto.160.jpg";
import kakashi from "../Styles/images/userAvatars/kakashi.160.jpg";
import mightguy from "../Styles/images/userAvatars/mightguy.jpg";
import sasuke from "../Styles/images/userAvatars/sasuke.jpg";
import itachi from "../Styles/images/userAvatars/itachi.jpg";
import sakura from "../Styles/images/userAvatars/sakura.jpg";
import choji from "../Styles/images/userAvatars/choji.jpg";
import rocklee from "../Styles/images/userAvatars/rocklee.jpg";
import jiriaya from "../Styles/images/userAvatars/jiriaya.jpg";
import ino from "../Styles/images/userAvatars/ino.jpg";

import luffy from "../Styles/images/userAvatars/luffy.jpg";
import franky from "../Styles/images/userAvatars/franky.jpg";
import sanji from "../Styles/images/userAvatars/sanji.jpg";
import usopp from "../Styles/images/userAvatars/usopp.jpg";
import tonytony from "../Styles/images/userAvatars/tonytony.jpg";
import charlotte from "../Styles/images/userAvatars/charlotte.jpg";

import spike from "../Styles/images/userAvatars/spike.jpg";
import faye from "../Styles/images/userAvatars/faye.jpg";
import jet from "../Styles/images/userAvatars/jetblack.jpg";
import julia from "../Styles/images/userAvatars/julia.jpg";
import ein from "../Styles/images/userAvatars/ein.jpg";
import vicious from "../Styles/images/userAvatars/vicious.jpg";

import yuri from "../Styles/images/userAvatars/yuri.jpg";
import yor from "../Styles/images/userAvatars/yor.jpg";
import loid from "../Styles/images/userAvatars/loid.jpg";
import anya from "../Styles/images/userAvatars/anya.jpg";
import bond from "../Styles/images/userAvatars/bond.jpg";

import gon from "../Styles/images/userAvatars/gon.jpg";
import hisoka from "../Styles/images/userAvatars/hisoka.jpg";
import illumi from "../Styles/images/userAvatars/illumi.jpg";
import killua from "../Styles/images/userAvatars/killua.jpg";
import kurapika from "../Styles/images/userAvatars/kurapika.jpg";
import leorio from "../Styles/images/userAvatars/leorio.jpg";

import sailor1 from "../Styles/images/userAvatars/sailor1.jpg";
import sailor2 from "../Styles/images/userAvatars/sailor2.jpg";
import sailor3 from "../Styles/images/userAvatars/sailor3.jpg";
import sailor4 from "../Styles/images/userAvatars/sailor4.jpg";
import sailor5 from "../Styles/images/userAvatars/sailor5.jpg";
import sailormoon from "../Styles/images/userAvatars/sailormoon.160.jpg";

import AvatarShelf from "./AvatarShelf";

export default function ChooseAvatar() {
  let styling = {
    fontFamily: "interMedium",
    pl: 1,
    fontSize: "0.75rem",
    marginTop: "-20px",
  };

  let [seeMore, setSeeMore] = useState(false);
  const showSeeMoreButton = seeMore !== 2;

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
      <AvatarShelf items={cowboyBebop} />

      <Typography sx={styling}>Naruto:</Typography>
      <AvatarShelf items={narutoOriginal} />

      <Typography sx={styling}>One Piece:</Typography>
      <AvatarShelf items={onePiece} />

      {seeMore > 0 ? (
        <>
          <Typography sx={styling}>Spy x Family:</Typography>
          <AvatarShelf items={spyxfamily} />

          <Typography sx={styling}>Hunter x Hunter:</Typography>
          <AvatarShelf items={hunterxhunter} />

          <Typography sx={styling}>Sailor Moon:</Typography>
          <AvatarShelf items={sailormoonavatars} />
        </>
      ) : (
        ""
      )}

      {seeMore > 1 ? (
        <>
          <Typography sx={styling}>Cyberpunk: Edgerunners:</Typography>
          <AvatarShelf items={cyberpunk} />

          <Typography sx={styling}>Kill La Kill:</Typography>
          <AvatarShelf items={killLaKill} />
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

const killLaKill = [ryuko, satsuki, mako];

const narutoOriginal = [
  naruto,
  sakura,
  sasuke,
  itachi,
  kakashi,
  jiriaya,
  mightguy,

  rocklee,
  choji,
  ino,
];

const onePiece = [luffy, franky, sanji, usopp, tonytony, charlotte];

const cowboyBebop = [spike, faye, jet, julia, ein, vicious];

const spyxfamily = [anya, loid, yor, yuri, bond];

const hunterxhunter = [gon, killua, kurapika, leorio, illumi, hisoka];

const cyberpunk = [
  davidAngry,
  lucySmoking,
  rebecca,
  mainegf,
  pilar,
  maine,
  kiwi,
  lucy,
  david,
];

const sailormoonavatars = [
  sailor1,
  sailor2,
  sailor3,
  sailor4,
  sailor5,
  sailormoon,
];
