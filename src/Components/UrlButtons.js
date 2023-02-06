import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { Fragment } from "react";
import crunchyroll from "../Styles/images/icons8-crunchyroll.png";
import funimation from "../Styles/images/icons8-funimation.png";
import netflix from "../Styles/images/icons8-netflix.png";

export default function UrlButtons({ anime }) {
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
            <UrlButton title="Crunchyroll" link={url} image={crunchyroll} />
          )}
          {url.includes("funimation") && (
            <UrlButton title="Funimation" link={url} image={funimation} />
          )}
          {url.includes("netflix") && (
            <UrlButton title="Netflix" link={url} image={netflix} />
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
        component="a"
        href={link}
        sx={{ ml: 1, border: "2px solid #000" }}
      >
        <Box component="img" src={image} alt={title} sx={{ height: 24 }} />
      </IconButton>
    </Tooltip>
  );
}
