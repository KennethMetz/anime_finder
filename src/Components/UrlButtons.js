import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { Fragment, useContext } from "react";
import AppSettingsContext from "./AppSettingsContext";
// TODO convert logo images to svg so they can be dynamically colored.
import crunchyroll from "../Styles/images/icons8-crunchyroll.png";
import funimation from "../Styles/images/icons8-funimation.png";
import netflix from "../Styles/images/icons8-netflix.png";
import crunchyrollDarkMode from "../Styles/images/icons8-crunchyroll.white.png";
import funimationDarkMode from "../Styles/images/icons8-funimation.white.png";
import netflixDarkMode from "../Styles/images/icons8-netflix.white.png";

export default function UrlButtons({ anime }) {
  const [appSettings] = useContext(AppSettingsContext);
  const darkMode = appSettings.darkMode;

  const urls = anime.urls.filter(
    (url) =>
      url.includes("crunchyroll") ||
      url.includes("funimation") ||
      url.includes("netflix")
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {urls.length > 0 && (
        <Typography
          sx={{ ml: 2, fontFamily: "interMedium", fontSize: "0.9rem" }}
        >
          Watch on:
        </Typography>
      )}
      {urls.map((url) => (
        <Fragment key={url}>
          {url.includes("crunchyroll") && (
            <UrlButton
              title="Crunchyroll"
              link={url}
              image={darkMode ? crunchyrollDarkMode : crunchyroll}
            />
          )}
          {url.includes("funimation") && (
            <UrlButton
              title="Funimation"
              link={url}
              image={darkMode ? funimationDarkMode : funimation}
            />
          )}
          {url.includes("netflix") && (
            <UrlButton
              title="Netflix"
              link={url}
              image={darkMode ? netflixDarkMode : netflix}
            />
          )}
        </Fragment>
      ))}
    </Box>
  );
}

function UrlButton({ title, link, image }) {
  return (
    <Tooltip title={title}>
      <IconButton
        color="inherit"
        component="a"
        href={link}
        target="_blank"
        sx={{ ml: 1, border: "2px solid" }}
        rel="noopener"
      >
        <Box component="img" src={image} alt={title} sx={{ height: 24 }} />
      </IconButton>
    </Tooltip>
  );
}
