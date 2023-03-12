import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { Fragment } from "react";
import crunchyroll from "../Styles/images/crunchyroll.png";
import funimation from "../Styles/images/funimation.png";
import netflix from "../Styles/images/netflix.png";

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 8px 8px 8px",
      }}
    >
      <IconButton
        color="inherit"
        component="a"
        href={link}
        target="_blank"
        rel="noopener"
      >
        <Box component="img" src={image} alt={title} sx={{ height: 48 }} />
      </IconButton>
      <Typography
        sx={{ fontFamily: "interMedium", fontSize: "16px", lineHeight: "21px" }}
      >
        {title}
      </Typography>
    </Box>
  );
}
