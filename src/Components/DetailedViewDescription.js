import { Box, Button } from "@mui/material";
import { useMemo, useState } from "react";

export default function DetailedViewDescription({ text }) {
  const [expanded, setExpanded] = useState(false);

  const shortText = useMemo(() => getShortText(text), [text]);
  const canShorten = shortText.length < text.length;

  if (!canShorten) {
    return <Box component="span">{text}</Box>;
  }

  return (
    <>
      <Box sx={{}}>
        <Box component="span">{expanded ? text : shortText + "..."}</Box>
        <Box
          component="span"
          sx={{
            mt: 0,
            display: expanded ? "block" : "unset",
            ml: expanded ? -1 : 0,
          }}
        >
          <Button
            color="inherit"
            onClick={() => setExpanded(!expanded)}
            sx={{
              textTransform: "none",
              borderRadius: "18px",
              fontFamily: "interSemiBold",
            }}
          >
            {expanded ? "Read less" : "Read more"}
          </Button>
        </Box>
      </Box>
    </>
  );
}

function getShortText(text) {
  let i = 650;
  while (i < text.length && i > 0 && text[i] !== " " && text[i] !== ".") {
    i--;
  }
  return text.slice(0, i);
}
