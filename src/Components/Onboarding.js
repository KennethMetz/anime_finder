import "../Styles/App.css";
import "../Styles/Onboarding.css";

import { Link, useNavigate } from "react-router-dom";
import * as React from "react";

import { useEffect, useContext } from "react";
import { LocalUserContext } from "./LocalUserContext";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import OnboardingButton from "./OnboardingButton";
import OnboardingAnimeGrid from "./OnboardingAnimeGrid";
import OnboardingHeader from "./OnboardingHeader";
import CowboyBebop from "../Styles/images/onboarding/cowboybebop.jpg";
import AttackOnTitan from "../Styles/images/onboarding/attackontitan.jpg";
import Gintama from "../Styles/images/onboarding/gintama.jpg";
import Haikyu from "../Styles/images/onboarding/haikyu.jpg";
import Jojos from "../Styles/images/onboarding/jojos.jpg";
import Naruto from "../Styles/images/onboarding/naruto.jpg";
import Ponyo from "../Styles/images/onboarding/ponyo.jpg";
import SailorMoon from "../Styles/images/onboarding/sailormoon.jpg";
import SwordArtOnline from "../Styles/images/onboarding/swordartonline.jpg";
import NoGameNoLife from "../Styles/images/onboarding/nogamenolife.jpg";
import HtmlPageTitle from "./HtmlPageTitle";

export default function Onboarding() {
  const [localUser, setLocalUser] = useContext(LocalUserContext);

  const [user] = useAuthState(auth);

  const theme = useTheme();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    // Let anonymous users register accounts and
    // redirect existing authorized users
    if (!user.isAnonymous) navigate("/home");
  }, [user, localUser]);

  return (
    <div className="App">
      <HtmlPageTitle title={"Getting Set Up"} />
      <OnboardingHeader />
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            marginTop: "30px",
            marginBottom: "23px",
          }}
        >
          Let's Get Started
        </Typography>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Pick at least one item you like
        </Typography>
        <OnboardingAnimeGrid items={onboardingAnime} large onboarding />
        <br />
        {localUser["likes"] && localUser["likes"].length < 1 ? (
          <OnboardingButton disabled={true} />
        ) : (
          <OnboardingButton />
        )}
      </Container>
    </div>
  );
}

const onboardingAnime = [
  {
    description:
      "Crime is timeless. By the year 2071, humanity has expanded across the galaxy, filling the surface of other planets with settlements like those on Earth. These new societies are plagued by murder, drug use, and theft, and intergalactic outlaws are hunted by a growing number of tough bounty hunters.\r\n\r\nSpike Spiegel and Jet Black pursue criminals throughout space to make a humble living. Beneath his goofy and aloof demeanor, Spike is haunted by the weight of his violent past. Meanwhile, Jet manages his own troubled memories while taking care of Spike and the Bebop, their ship. The duo is joined by the beautiful con artist Faye Valentine, odd child Edward Wong Hau Pepelu Tivrusky IV, and Ein, a bioengineered Welsh Corgi.\r\n\r\nWhile developing bonds and working to catch a colorful cast of criminals, the Bebop crew's lives are disrupted by a menace from Spike's past. As a rival's maniacal plot continues to unravel, Spike must choose between life with his newfound family or revenge for his old wounds.\r\n\r\n[Written by MAL Rewrite]",
    display_name: "Cowboy Bebop",
    duration: "24 min. per ep.",
    end_date: "1999-04-24",
    episodes: 26,
    format: "TV",
    genres: ["Action", "Award Winning", "Sci-Fi"],
    id: 1,
    image_large: "https://cdn.myanimelist.net/images/anime/4/19644.jpg",
    image_hardcoded: CowboyBebop,
    image_small:
      "https://cdn.myanimelist.net/r/50x70/images/anime/4/19644.jpg?s=bb1e96eb0a0224a57aa45443eab92575",
    localized_titles: [
      {
        language: "en",
        title: "Cowboy Bebop",
      },
      {
        language: "ja",
        title: "カウボーイビバップ",
      },
    ],
    name: "Cowboy Bebop",
    start_date: "1998-04-03",
    studios: ["Sunrise"],
    urls: [
      "http://anison.info/data/program/1628.html",
      "http://www.cowboy-bebop.net/",
      "http://www.sunrise-inc.co.jp/international/works/detail.php?cid=41",
      "http://www.sunrise-inc.co.jp/works/list/detail.php?cid=240",
      "http://www.sunrise-inc.co.jp/works/list/detail.php?cid=41",
      "https://cal.syoboi.jp/tid/538/time",
      "https://en.wikipedia.org/wiki/Cowboy_Bebop",
      "https://ja.wikipedia.org/wiki/カウボーイビバップ",
      "https://ko.wikipedia.org/wiki/카우보이_비밥",
      "https://myanimelist.net/anime/1",
      "https://myanimelist.net/anime/17205",
      "https://myanimelist.net/anime/4037",
      "https://www.allcinema.net/cinema/88862",
      "https://www.amazon.com/dp/B06XMQW3FS",
      "https://www.animenewsnetwork.com/encyclopedia/anime.php?id=13",
      "https://www.crunchyroll.com/series/GYVNXMVP6",
      "https://www.funimation.com/shows/cowboy-bebop",
      "https://zh.wikipedia.org/wiki/星際牛仔",
    ],
  },
  {
    description:
      "Moments prior to Naruto Uzumaki's birth, a huge demon known as the Kyuubi, the Nine-Tailed Fox, attacked Konohagakure, the Hidden Leaf Village, and wreaked havoc. In order to put an end to the Kyuubi's rampage, the leader of the village, the Fourth Hokage, sacrificed his life and sealed the monstrous beast inside the newborn Naruto.\r\n\r\nNow, Naruto is a hyperactive and knuckle-headed ninja still living in Konohagakure. Shunned because of the Kyuubi inside him, Naruto struggles to find his place in the village, while his burning desire to become the Hokage of Konohagakure leads him not only to some great new friends, but also some deadly foes.\r\n\r\n[Written by MAL Rewrite]",
    display_name: "Naruto",
    duration: "23 min. per ep.",
    end_date: "2007-02-08",
    episodes: 220,
    format: "TV",
    genres: ["Action", "Adventure", "Fantasy"],
    id: 20,
    image_large: "https://cdn.myanimelist.net/images/anime/13/17405.jpg",
    image_hardcoded: Naruto,
    image_small:
      "https://cdn.myanimelist.net/r/50x70/images/anime/13/17405.jpg?s=59241469eb470604a792add6fbe7cce6",
    localized_titles: [
      {
        language: "en",
        title: "Naruto",
      },
      {
        language: "ja",
        title: "ナルト",
      },
    ],
    name: "Naruto",
    start_date: "2002-10-03",
    studios: ["Pierrot"],
    urls: [
      "http://anison.info/data/program/5605.html",
      "http://pierrot.jp/title/naruto/",
      "http://www.tv-tokyo.co.jp/anime/naruto2002/",
      "https://cal.syoboi.jp/tid/210/time",
      "https://en.wikipedia.org/wiki/Naruto",
      "https://ja.wikipedia.org/wiki/NARUTO_-ナルト-_(アニメ)",
      "https://myanimelist.net/anime/20",
      "https://myanimelist.net/anime/594",
      "https://myanimelist.net/anime/761",
      "https://www.allcinema.net/cinema/240120",
      "https://www.amazon.com/dp/B0011ULL60",
      "https://www.animenewsnetwork.com/encyclopedia/anime.php?id=1825",
      "https://www.animenewsnetwork.com/encyclopedia/anime.php?id=3499",
      "https://www.animenewsnetwork.com/encyclopedia/anime.php?id=3994",
      "https://www.crunchyroll.com/series/GY9PJ5KWR",
      "https://www.funimation.com/shows/naruto-2/",
      "https://www.netflix.com/title/70205012",
    ],
  },
  {
    description:
      "A goldfish sneaks away from home and floats off on the back of a jellyfish. After getting stuck in a glass jar, she drifts to the shore where she is freed by Sousuke, a five-year-old boy who lives with his mother Lisa in a house by the sea while his father Koichi works on a fishing boat. After healing a cut on Sousuke's finger by licking it, the goldfish is named Ponyo by her new friend.\r\n\r\nUnknown to Sousuke, Ponyo already has a name and a family. Her father Fujimoto, a sorcerer who forsook his humanity to live underwater, searches frantically for his daughter Brunhilde. When found and captured, Ponyo rejects her birth name and declares that she wants to become a human. Using the power received from Sousuke's blood, she grows arms and legs and escapes to the surface once more. But the magic released into the ocean causes an imbalance in nature, causing the Moon to start falling out of orbit and the tides to grow dangerously stronger. Reunited with Ponyo, Sousuke must pass an ancient test to restore order in the world and let his companion live on as a human.\r\n\r\n[Written by MAL Rewrite]",
    display_name: "Ponyo",
    duration: "1 hr. 40 min.",
    end_date: "2008-07-19",
    episodes: 1,
    format: "Movie",
    genres: ["Adventure", "Award Winning", "Fantasy"],
    id: 2890,
    image_large: "https://cdn.myanimelist.net/images/anime/7/8970.jpg",
    image_hardcoded: Ponyo,
    image_small:
      "https://cdn.myanimelist.net/r/50x70/images/anime/7/8970.jpg?s=e1fd12295a736cd1a2c26cad2bef535b",
    localized_titles: [
      {
        language: "en",
        title: "Ponyo",
      },
      {
        language: "ja",
        title: "崖の上のポニョ",
      },
    ],
    name: "Gake no Ue no Ponyo",
    start_date: "2008-07-19",
    studios: ["Studio Ghibli"],
    urls: [
      "http://anison.info/data/program/9575.html",
      "http://www.ghibli.jp/ponyo/",
      "https://cal.syoboi.jp/tid/1864/time",
      "https://en.wikipedia.org/wiki/Ponyo",
      "https://ja.wikipedia.org/wiki/崖の上のポニョ",
      "https://myanimelist.net/anime/2890",
      "https://www.allcinema.net/cinema/327529",
      "https://www.animenewsnetwork.com/encyclopedia/anime.php?id=7814",
      "https://www.imdb.com/title/tt0876563",
      "https://www.netflix.com/title/70106454",
    ],
  },
  {
    description:
      "Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called Titans, forcing humans to hide in fear behind enormous concentric walls. What makes these giants truly terrifying is that their taste for human flesh is not born out of hunger but what appears to be out of pleasure. To ensure their survival, the remnants of humanity began living within defensive barriers, resulting in one hundred years without a single titan encounter. However, that fragile calm is soon shattered when a colossal Titan manages to breach the supposedly impregnable outer wall, reigniting the fight for survival against the man-eating abominations.\r\n\r\nAfter witnessing a horrific personal loss at the hands of the invading creatures, Eren Yeager dedicates his life to their eradication by enlisting into the Survey Corps, an elite military unit that combats the merciless humanoids outside the protection of the walls. Eren, his adopted sister Mikasa Ackerman, and his childhood friend Armin Arlert join the brutal war against the Titans and race to discover a way of defeating them before the last walls are breached.\r\n\r\n[Written by MAL Rewrite]",
    display_name: "Attack on Titan",
    duration: "24 min. per ep.",
    end_date: "2013-09-29",
    episodes: 25,
    format: "TV",
    genres: ["Action", "Award Winning", "Drama", "Suspense"],
    id: 16498,
    image_large: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
    image_hardcoded: AttackOnTitan,
    image_small:
      "https://cdn.myanimelist.net/r/50x70/images/anime/10/47347.jpg?s=29949c6e892df123f0b0563e836d3d98",
    localized_titles: [
      {
        language: "en",
        title: "Attack on Titan",
      },
      {
        language: "ja",
        title: "進撃の巨人",
      },
    ],
    name: "Shingeki no Kyojin",
    start_date: "2013-04-07",
    studios: ["Wit Studio"],
    urls: [
      "http://anison.info/data/program/15934.html",
      "http://lain.gr.jp/mediadb/media/3968",
      "http://shingeki.tv/season1/",
      "http://www.funimation.com/shows/attack-on-titan",
      "http://www.production-ig.co.jp/works/shingeki-no-kyojin",
      "https://cal.syoboi.jp/tid/2935/time",
      "https://en.wikipedia.org/wiki/Attack_on_Titan",
      "https://ja.wikipedia.org/wiki/進撃の巨人",
      "https://myanimelist.net/anime/16498",
      "https://myanimelist.net/anime/19285",
      "https://myanimelist.net/anime/19391",
      "https://www.allcinema.net/cinema/344548",
      "https://www.amazon.com/dp/B00L23U3JW",
      "https://www.animenewsnetwork.com/encyclopedia/anime.php?id=14950",
      "https://www.crunchyroll.com/series/GR751KNZY",
      "https://www.funimation.com/shows/attack-on-titan",
    ],
  },
  {
    description:
      "Sixteen sentient races inhabit Disboard, a world overseen by Tet, the One True God. The lowest of the sixteen—Imanity—consists of humans, a race with no affinity for magic. In a place where everything is decided through simple games, humankind seems to have no way out of their predicament—but the arrival of two outsiders poses a change.\r\n\r\nOn Earth, stepsiblings Sora and Shiro are two inseparable shut-ins who dominate various online games under the username \"Blank.\" While notorious on the internet, the pair believe that life is merely another dull game. However, after responding to a message from an unknown user, they are suddenly transported to Disboard. The mysterious sender turns out to be Tet, who informs them about the world's absolute rules. After Tet leaves, Sora and Shiro begin their search for more information and a place to stay, taking them to Elkia—Imanity's only remaining kingdom.\r\n\r\nThere, the duo encounters Stephanie Dola, an emotional girl vying for the kingdom's sovereignty. In desperation, she attempts to regain her father's throne, but her foolhardiness makes her goal unachievable. Inspired by the girl's motivation and passion, Sora and Shiro decide to aid Stephanie in getting Elkia back on its feet, ultimately aiming to become the new rulers of the enigmatic realm.\r\n\r\n[Written by MAL Rewrite]",
    display_name: "No Game, No Life",
    duration: "23 min. per ep.",
    end_date: "2014-06-25",
    episodes: 12,
    format: "TV",
    genres: ["Comedy", "Fantasy", "Ecchi"],
    id: 19815,
    image_large: "https://cdn.myanimelist.net/images/anime/1074/111944.jpg",
    image_hardcoded: NoGameNoLife,

    image_small:
      "https://cdn.myanimelist.net/r/50x70/images/anime/1074/111944.jpg?s=3d63ffec8cd2a7f1e00e8dc15ef534f5",
    localized_titles: [
      {
        language: "en",
        title: "No Game, No Life",
      },
      {
        language: "ja",
        title: "ノーゲーム・ノーライフ",
      },
    ],
    name: "No Game No Life",
    start_date: "2014-04-09",
    studios: ["Madhouse"],
    urls: [
      "http://anison.info/data/program/16993.html",
      "http://ngnl.jp/tv/",
      "https://cal.syoboi.jp/tid/3322/time",
      "https://en.wikipedia.org/wiki/No_Game_No_Life",
      "https://ja.wikipedia.org/wiki/ノーゲーム・ノーライフ",
      "https://myanimelist.net/anime/19815",
      "https://myanimelist.net/anime/24991",
      "https://myanimelist.net/anime/51157",
      "https://twitter.com/ngnl_anime",
      "https://www.allcinema.net/cinema/348104",
      "https://www.amazon.com/dp/B07K6Z228R",
      "https://www.animenewsnetwork.com/encyclopedia/anime.php?id=15784",
      "https://www.hidive.com/tv/no-game-no-life",
      "https://www.imdb.com/title/tt3431758",
      "https://www.netflix.com/title/80052669",
      "https://www.themoviedb.org/tv/60808",
    ],
  },
  {
    description:
      "Edo is a city that was home to the vigor and ambition of samurai across the country. However, following feudal Japan's surrender to powerful aliens known as the \"Amanto,\" those aspirations now seem unachievable. With the once-influential shogunate rebuilt as a puppet government, a new law is passed that promptly prohibits all swords in public. \r\n\r\nEnter Gintoki Sakata, an eccentric silver-haired man who always carries around a wooden sword and maintains his stature as a samurai despite the ban. As the founder of Yorozuya, a small business for odd jobs, Gintoki often embarks on endeavors to help other people—though usually in rather strange and unforeseen ways. \r\n\r\nAssisted by Shinpachi Shimura, a boy with glasses supposedly learning the way of the samurai; Kagura, a tomboyish girl with superhuman strength and an endless appetite; and Sadaharu, their giant pet dog who loves biting on people's heads, the Yorozuya encounter anything from alien royalty to scuffles with local gangs in the ever-changing world of Edo.\r\n\r\n[Written by MAL Rewrite]",
    display_name: "Gintama",
    duration: "24 min. per ep.",
    end_date: "2010-03-25",
    episodes: 201,
    format: "TV",
    genres: ["Action", "Comedy", "Sci-Fi"],
    id: 918,
    image_large: "https://cdn.myanimelist.net/images/anime/10/73274.jpg",
    image_hardcoded: Gintama,

    image_small:
      "https://cdn.myanimelist.net/r/50x70/images/anime/10/73274.jpg?s=ed42453c10ba12b03b1600d02725a174",
    localized_titles: [
      {
        language: "en",
        title: "Gintama",
      },
      {
        language: "ja",
        title: "銀魂",
      },
    ],
    name: "Gintama",
    start_date: "2006-04-04",
    studios: ["Sunrise"],
    urls: [
      "http://anison.info/data/program/8036.html",
      "http://www.j-gintama.com/",
      "https://cal.syoboi.jp/tid/2762/time",
      "https://cal.syoboi.jp/tid/4437/time",
      "https://cal.syoboi.jp/tid/853/time",
      "https://en.wikipedia.org/wiki/Gin_Tama",
      "https://ja.wikipedia.org/wiki/よりぬき銀魂さん",
      "https://ja.wikipedia.org/wiki/銀魂_(アニメ)",
      "https://myanimelist.net/anime/10643",
      "https://myanimelist.net/anime/2951",
      "https://myanimelist.net/anime/6945",
      "https://myanimelist.net/anime/918",
      "https://www.allcinema.net/cinema/324863",
      "https://www.animenewsnetwork.com/encyclopedia/anime.php?id=23119",
      "https://www.animenewsnetwork.com/encyclopedia/anime.php?id=6072",
      "https://www.animenewsnetwork.com/encyclopedia/anime.php?id=6236",
      "https://www.crunchyroll.com/series/GYQ4MKDZ6",
    ],
  },
  {
    description:
      "Ever since having witnessed the \"Little Giant\" and his astonishing skills on the volleyball court, Shouyou Hinata has been bewitched by the dynamic nature of the sport. Even though his attempt to make his debut as a volleyball regular during a middle school tournament went up in flames, he longs to prove that his less-than-impressive height ceases to be a hindrance in the face of his sheer will and perseverance.\r\n\r\nWhen Hinata enrolls in Karasuno High School, the Little Giant's alma mater, he believes that he is one step closer to his goal of becoming a professional volleyball player. Although the school only retains a shadow of its former glory, Hinata's conviction isn't shaken until he learns that Tobio Kageyama—the prodigy who humiliated Hinata's middle school volleyball team in a crushing defeat—is now his teammate.\r\n\r\nTo fulfill his desire of leaving a mark on the realm of volleyball—so often regarded as the domain of the tall and the strong—Hinata must smooth out his differences with Kageyama. Only when Hinata learns what it takes to be a part of a team will he be able to join the race to the top in earnest.\r\n\r\n[Written by MAL Rewrite]",
    display_name: "Haikyu!!",
    duration: "24 min. per ep.",
    end_date: "2014-09-21",
    episodes: 25,
    format: "TV",
    genres: ["Sports"],
    id: 20583,
    image_large: "https://cdn.myanimelist.net/images/anime/7/76014.jpg",
    image_hardcoded: Haikyu,

    image_small:
      "https://cdn.myanimelist.net/r/50x70/images/anime/7/76014.jpg?s=ef5c00cb929dcd690c87f56e6d1b0c8a",
    localized_titles: [
      {
        language: "en",
        title: "Haikyu!!",
      },
      {
        language: "ja",
        title: "ハイキュー!!",
      },
    ],
    name: "Haikyuu!!",
    start_date: "2014-04-06",
    studios: ["Production I.G"],
    urls: [
      "http://anison.info/data/program/16958.html",
      "http://www.j-haikyu.com/anime/index.html",
      "http://www.production-ig.co.jp/works/haikyu/",
      "https://cal.syoboi.jp/tid/3380/time",
      "https://en.wikipedia.org/wiki/Haikyū!!",
      "https://ja.wikipedia.org/wiki/ハイキュー!!",
      "https://myanimelist.net/anime/20583",
      "https://twitter.com/animehaikyu_com",
      "https://www.allcinema.net/cinema/347289",
      "https://www.animenewsnetwork.com/encyclopedia/anime.php?id=15683",
      "https://www.crunchyroll.com/series/GY8VM8MWY",
    ],
  },
  {
    description:
      "The year is 1868; English nobleman George Joestar and his son Jonathan become indebted to Dario Brando after being rescued from a carriage incident. What the Joestars don't realize, however, is that Dario had no intention of helping them; he believed they were dead and was trying to ransack their belongings. After Dario's death 12 years later, George—hoping to repay his debt—adopts his son, Dio. \r\n\r\nWhile he publicly fawns over his new father, Dio secretly plans to steal the Joestar fortune. His first step is to create a divide between George and Jonathan. By constantly outdoing his foster brother, Dio firmly makes his place in the Joestar family. But when Dio pushes Jonathan too far, Jonathan defeats him in a brawl. \r\n\r\nYears later, the two appear to be close friends to the outside world. But trouble brews again when George falls ill, as Jonathan suspects that Dio is somehow behind the incident—and it appears he has more tricks up his sleeve.\r\n\r\n[Written by MAL Rewrite]",
    display_name: "JoJo's Bizarre Adventure (2012)",
    duration: "24 min. per ep.",
    end_date: "2013-04-06",
    episodes: 26,
    format: "TV",
    genres: ["Action", "Adventure", "Supernatural"],
    id: 14719,
    image_large: "https://cdn.myanimelist.net/images/anime/3/40409.jpg",
    image_hardcoded: Jojos,

    image_small:
      "https://cdn.myanimelist.net/r/50x70/images/anime/3/40409.jpg?s=eade1f76434383f5af5243cc52d50316",
    localized_titles: [
      {
        language: "en",
        title: "JoJo's Bizarre Adventure (2012)",
      },
      {
        language: "ja",
        title: "ジョジョの奇妙な冒険",
      },
    ],
    name: "JoJo no Kimyou na Bouken (TV)",
    start_date: "2012-10-06",
    studios: ["David Production"],
    urls: [
      "http://anison.info/data/program/15315.html",
      "http://jojo-animation.com/fb_bt/",
      "https://cal.syoboi.jp/tid/2732/time",
      "https://en.wikipedia.org/wiki/JoJo's_Bizarre_Adventure_(TV_series)",
      "https://ja.wikipedia.org/wiki/ジョジョの奇妙な冒険",
      "https://myanimelist.net/anime/14719",
      "https://twitter.com/anime_jojo",
      "https://www.allcinema.net/cinema/343752",
      "https://www.animenewsnetwork.com/encyclopedia/anime.php?id=14445",
      "https://www.crunchyroll.com/series/GYP8DP1MY",
      "https://www.funimation.com/shows/jojos-bizarre-adventure/",
      "https://www.netflix.com/title/80179831",
    ],
  },
  {
    description:
      "Usagi Tsukino is an average student and crybaby klutz who constantly scores low on her tests. Unexpectedly, her humdrum life is turned upside down when she saves a cat with a crescent moon on its head from danger. The cat, named Luna, later reveals that their meeting was not an accident: Usagi is destined to become Sailor Moon, a planetary guardian with the power to protect the Earth. Given a special brooch that allows her to transform, she must use her new powers to save the city from evil energy-stealing monsters sent by the malevolent Queen Beryl of the Dark Kingdom.\r\n\r\nBut getting accustomed to her powers and fighting villains are not the only things she has to worry about. She must find the lost princess of the Moon Kingdom, the other Sailor Guardians, and the Legendary Silver Crystal in order to save the planet from destruction.\r\n\r\n[Written by MAL Rewrite]",
    display_name: "Sailor Moon",
    duration: "24 min. per ep.",
    end_date: "1993-02-27",
    episodes: 46,
    format: "TV",
    genres: ["Fantasy", "Romance"],
    id: 530,
    image_large: "https://cdn.myanimelist.net/images/anime/1440/92258.jpg",
    image_hardcoded: SailorMoon,

    image_small:
      "https://cdn.myanimelist.net/r/50x70/images/anime/1440/92258.jpg?s=dc170c736a2b70dda78e68076f582cc2",
    localized_titles: [
      {
        language: "en",
        title: "Sailor Moon",
      },
      {
        language: "ja",
        title: "美少女戦士セーラームーン",
      },
    ],
    name: "Bishoujo Senshi Sailor Moon",
    start_date: "1992-03-07",
    studios: ["Toei Animation"],
    urls: [
      "http://anison.info/data/program/1123.html",
      "http://sailormoon.channel.or.jp/",
      "http://www.viz.com/anime/streaming/sailor-moon",
      "https://cal.syoboi.jp/tid/1707/time",
      "https://en.wikipedia.org/wiki/Sailor_Moon",
      "https://ja.wikipedia.org/wiki/美少女戦士セーラームーン_(テレビアニメ)",
      "https://myanimelist.net/anime/530",
      "https://myanimelist.net/anime/8756",
      "https://www.allcinema.net/cinema/89060",
      "https://www.amazon.com/dp/B00MSEK5Z6",
      "https://www.animenewsnetwork.com/encyclopedia/anime.php?id=363",
      "https://www.imdb.com/title/tt0114327",
      "https://www.imdb.com/title/tt21446808",
    ],
  },
  {
    description:
      "Ever since the release of the innovative NerveGear, gamers from all around the globe have been given the opportunity to experience a completely immersive virtual reality. Sword Art Online (SAO), one of the most recent games on the console, offers a gateway into the wondrous world of Aincrad, a vivid, medieval landscape where users can do anything within the limits of imagination. With the release of this worldwide sensation, gaming has never felt more lifelike.\r\n\r\nHowever, the idyllic fantasy rapidly becomes a brutal nightmare when SAO's creator traps thousands of players inside the game. The \"log-out\" function has been removed, with the only method of escape involving beating all of Aincrad's one hundred increasingly difficult levels. Adding to the struggle, any in-game death becomes permanent, ending the player's life in the real world.\r\n\r\nWhile Kazuto \"Kirito\" Kirigaya was fortunate enough to be a beta-tester for the game, he quickly finds that despite his advantages, he cannot overcome SAO's challenges alone. Teaming up with Asuna Yuuki and other talented players, Kirito makes an effort to face the seemingly insurmountable trials head-on. But with difficult bosses and threatening dark cults impeding his progress, Kirito finds that such tasks are much easier said than done.\r\n\r\n[Written by MAL Rewrite]",
    display_name: "Sword Art Online",
    duration: "23 min. per ep.",
    end_date: "2012-12-23",
    episodes: 25,
    format: "TV",
    genres: ["Action", "Adventure", "Fantasy", "Romance"],
    id: 11757,
    image_large: "https://cdn.myanimelist.net/images/anime/11/39717.jpg",
    image_hardcoded: SwordArtOnline,

    image_small:
      "https://myanimelist.cdn-dena.com/r/50x70/images/anime/11/39717.jpg?s=5908e8051487fb8468d5fca779f8f00d",
    localized_titles: [
      {
        language: "en",
        title: "Sword Art Online",
      },
      {
        language: "ja",
        title: "ソードアート・オンライン",
      },
    ],
    name: "Sword Art Online",
    start_date: "2012-07-08",
    studios: ["A-1 Pictures"],
    urls: [
      "http://anison.info/data/program/15012.html",
      "http://lain.gr.jp/mediadb/media/3395",
      "http://www.swordart-online.net/aincrad/",
      "http://www.swordart-online.net/fairy/",
      "http://www.swordart-onlineusa.com/",
      "https://cal.syoboi.jp/tid/2588/time",
      "https://en.wikipedia.org/wiki/Sword_Art_Online",
      "https://ja.wikipedia.org/wiki/ソードアート・オンライン",
      "https://myanimelist.net/anime/11757",
      "https://myanimelist.net/anime/16099",
      "https://twitter.com/sao_anime",
      "https://twitter.com/SwordArtUSA",
      "https://www.allcinema.net/cinema/341426",
      "https://www.animenewsnetwork.com/encyclopedia/anime.php?id=13858",
      "https://www.crunchyroll.com/series/GR49G9VP6",
      "https://www.funimation.com/shows/sword-art-online/",
      "https://www.netflix.com/title/70302573",
    ],
  },
];
