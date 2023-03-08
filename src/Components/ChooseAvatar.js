import { Typography } from "@mui/material";
import david from "../Styles/images/userAvatars/david_martinez.160.jpg";
import sailormoon from "../Styles/images/userAvatars/sailormoon.160.jpg";
import ryuko from "../Styles/images/userAvatars/ryuko.160.jpg";

import naruto from "../Styles/images/userAvatars/naruto.160.jpg";
import kakashi from "../Styles/images/userAvatars/kakashi.160.jpg";
import mightguy from "../Styles/images/userAvatars/mightguy.jpg";
import sasuke from "../Styles/images/userAvatars/sasuke.jpg";
import itachi from "../Styles/images/userAvatars/itachi.jpg";
import sakura from "../Styles/images/userAvatars/sakura.jpg";

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

import AvatarShelf from "./AvatarShelf";

export default function ChooseAvatar() {
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
      <Typography
        sx={{
          fontFamily: "interMedium",
          pl: 1,
          fontSize: "0.75rem",
          marginTop: "-20px",
        }}
      >
        Naruto:
      </Typography>
      <AvatarShelf items={narutoOriginal} />
      <Typography
        sx={{
          fontFamily: "interMedium",
          pl: 1,
          fontSize: "0.75rem",
          marginTop: "-20px",
        }}
      >
        One Piece:
      </Typography>
      <AvatarShelf items={onePiece} />
      <Typography
        sx={{
          fontFamily: "interMedium",
          pl: 1,
          fontSize: "0.75rem",
          marginTop: "-20px",
        }}
      >
        Misc:
      </Typography>
      <AvatarShelf items={avatars} />
    </div>
  );
}

const avatars = [david, ryuko, sailormoon];

const narutoOriginal = [naruto, sakura, sasuke, itachi, kakashi, mightguy];

const onePiece = [luffy, franky, sanji, usopp, tonytony, charlotte];

const cowboyBebop = [spike, faye, jet, julia, ein, vicious];
