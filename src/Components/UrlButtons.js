import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import crunchyroll from "../Styles/images/crunchyroll.png";
import disneyPlus from "../Styles/images/disney_plus.png";
import funimation from "../Styles/images/funimation.png";
import google from "../Styles/images/google.png";
import hboMax from "../Styles/images/hbo_max.png";
import hulu from "../Styles/images/hulu.png";
import netflix from "../Styles/images/Netflix.png";
import prime from "../Styles/images/prime.png";

export default function UrlButtons({ anime }) {
  const buttonData = getButtonData(anime.urls);

  // Add a simple google link if there are none.
  if (!buttonData.length) {
    const encodedName = encodeURIComponent(anime.display_name);
    const googleUrl = `https://www.google.com/search?q=${encodedName}`;
    buttonData.push({ url: googleUrl, title: "Google It", image: google });
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {buttonData.map((data) => (
        <UrlButton
          key={data.url}
          title={data.title}
          link={data.url}
          image={data.image}
        />
      ))}
    </Box>
  );
}

// Maps a list of url strings to a list of button data objects:
// {url, title, image}.  Returns undefined for unsupported urls.
function getButtonData(urls) {
  return urls
    .map((url) => {
      if (url.includes("crunchyroll.com")) {
        return { url, title: "Crunchyroll", image: crunchyroll };
      } else if (url.includes("funimation.com")) {
        return { url, title: "Funimation", image: funimation };
      } else if (url.includes("netflix.com")) {
        return { url, title: "Netflix", image: netflix };
      } else if (url.includes("www.hulu.com")) {
        return { url, title: "Hulu", image: hulu };
      } else if (url.includes("www.disneyplus.com")) {
        return { url, title: "Disney+", image: disneyPlus };
      } else if (url.includes("www.amazon.com/gp/video/detail")) {
        return { url, title: "Amazon Prime", image: prime };
      } else if (url.includes("play.hbomax.com")) {
        return { url, title: "HBO Max", image: hboMax };
      } else if (url.includes("www.google.com")) {
        return { url, title: "Google It", image: google };
      } else {
        return undefined;
      }
    })
    .filter((data) => data !== undefined);
}

function UrlButton({ title, link, image }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 12px 8px 0",
      }}
    >
      <IconButton
        color="inherit"
        component="a"
        href={link}
        target="_blank"
        rel="noopener"
      >
        <Box component="img" src={image} alt={title} sx={{ height: 40 }} />
      </IconButton>
      <Typography>{title}</Typography>
    </Box>
  );
}
