import spike from "../Styles/images/userAvatars/spike.jpg";
import faye from "../Styles/images/userAvatars/faye.jpg";
import jet from "../Styles/images/userAvatars/jetblack.jpg";
import julia from "../Styles/images/userAvatars/julia.jpg";
import ein from "../Styles/images/userAvatars/ein.jpg";
import vicious from "../Styles/images/userAvatars/vicious.jpg";

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

import anya from "../Styles/images/userAvatars/anya.jpg";
import loid from "../Styles/images/userAvatars/loid.jpg";
import yor from "../Styles/images/userAvatars/yor.jpg";
import yuri from "../Styles/images/userAvatars/yuri.jpg";
import bond from "../Styles/images/userAvatars/bond.jpg";

import gon from "../Styles/images/userAvatars/gon.jpg";
import killua from "../Styles/images/userAvatars/killua.jpg";
import kurapika from "../Styles/images/userAvatars/kurapika.jpg";
import leorio from "../Styles/images/userAvatars/leorio.jpg";
import hisoka from "../Styles/images/userAvatars/hisoka.jpg";

import sailor1 from "../Styles/images/userAvatars/sailor1.jpg";
import sailor2 from "../Styles/images/userAvatars/sailor2.jpg";
import sailor3 from "../Styles/images/userAvatars/sailor3.jpg";
import sailor4 from "../Styles/images/userAvatars/sailor4.jpg";
import sailor5 from "../Styles/images/userAvatars/sailor5.jpg";
import sailormoon from "../Styles/images/userAvatars/sailormoon.160.jpg";

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
import satsuki from "../Styles/images/userAvatars/satsuki.jpg";
import mako from "../Styles/images/userAvatars/mako.jpg";

// The mapping that will be built of name: url.
const imageMapping = {};

// Registers a list of {name, url} image definitions in the mapping.
function registerImages(images) {
  images.forEach((image) => (imageMapping[image.name] = image.url));
}

const cowboyBebop = [
  { name: "spike", url: spike },
  { name: "faye", url: faye },
  { name: "jet", url: jet },
  { name: "julia", url: julia },
  { name: "ein", url: ein },
  { name: "vicious", url: vicious },
];

const narutoAvatars = [
  { name: "naruto", url: naruto },
  { name: "sakura", url: sakura },
  { name: "sasuke", url: sasuke },
  { name: "itachi", url: itachi },
  { name: "kakashi", url: kakashi },
  { name: "jiriaya", url: jiriaya },
  { name: "mightguy", url: mightguy },
  { name: "rocklee", url: rocklee },
  { name: "choji", url: choji },
  { name: "ino", url: ino },
];

const onePiece = [
  { name: "luffy", url: luffy },
  { name: "franky", url: franky },
  { name: "sanji", url: sanji },
  { name: "usopp", url: usopp },
  { name: "tonytony", url: tonytony },
  { name: "charlotte", url: charlotte },
];

const spyxfamily = [
  { name: "anya", url: anya },
  { name: "loid", url: loid },
  { name: "yor", url: yor },
  { name: "yuri", url: yuri },
  { name: "bond", url: bond },
];

const hunterxhunter = [
  { name: "gon", url: gon },
  { name: "killua", url: killua },
  { name: "kurapika", url: kurapika },
  { name: "leorio", url: leorio },
  { name: "hisoka", url: hisoka },
];

const sailorMoonAvatars = [
  { name: "sailor1", url: sailor1 },
  { name: "sailor2", url: sailor2 },
  { name: "sailor3", url: sailor3 },
  { name: "sailor4", url: sailor4 },
  { name: "sailor5", url: sailor5 },
  { name: "sailormoon", url: sailormoon },
];

const cyberpunk = [
  { name: "davidAngry", url: davidAngry },
  { name: "lucySmoking", url: lucySmoking },
  { name: "rebecca", url: rebecca },
  { name: "mainegf", url: mainegf },
  { name: "pilar", url: pilar },
  { name: "maine", url: maine },
  { name: "kiwi", url: kiwi },
  { name: "lucy", url: lucy },
  { name: "david", url: david },
];

const killLaKill = [
  { name: "ryuko", url: ryuko },
  { name: "satsuki", url: satsuki },
  { name: "mako", url: mako },
];

registerImages(cowboyBebop);
registerImages(narutoAvatars);
registerImages(onePiece);
registerImages(spyxfamily);
registerImages(hunterxhunter);
registerImages(sailorMoonAvatars);
registerImages(cyberpunk);
registerImages(killLaKill);

const nameMapper = (item) => item.name;

/**
 * Lists of avatar names, grouped by show.
 */
export const avatars = {
  cowboyBebop: cowboyBebop.map(nameMapper),
  naruto: narutoAvatars.map(nameMapper),
  onePiece: onePiece.map(nameMapper),
  spyXFamily: spyxfamily.map(nameMapper),
  hunterXHunter: hunterxhunter.map(nameMapper),
  sailorMoon: sailorMoonAvatars.map(nameMapper),
  cyberpunk: cyberpunk.map(nameMapper),
  killLaKill: killLaKill.map(nameMapper),
};

/**
 * Converts avatar names to urls for display.
 * @param {string} avatar The name of the avatar to convert.
 * @returns The url for the avatar, suitable for passing to `src` attributes.
 */
export function getAvatarSrc(avatar) {
  return imageMapping[avatar];
}
