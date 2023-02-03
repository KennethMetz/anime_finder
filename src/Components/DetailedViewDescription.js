import { Box, Button } from "@mui/material";
import { useState } from "react";

export default function DetailedViewDescription({ text }) {
  const [expanded, setExpanded] = useState(false);

  const shortText = text.split("\n")[0];
  const canShorten = shortText.length < text.length && text.length > 400;

  if (!canShorten) {
    return <Box component="span">{text}</Box>;
  }

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box component="span">{expanded ? text : shortText}</Box>
        <Box sx={{ mt: 0, ml: -1 }}>
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
