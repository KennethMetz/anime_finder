import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import useTheme from "@mui/material/styles/useTheme";
import { useMemo, useState } from "react";

export default function ExpandableText({ text, sx }) {
  const theme = useTheme();

  const [expanded, setExpanded] = useState(false);

  const shortText = useMemo(() => getShortText(text), [text]);
  const canShorten = shortText?.length < text?.length;

  if (!canShorten) {
    return (
      <Box component="span" sx={sx}>
        {text}
      </Box>
    );
  }

  return (
    <>
      <Box sx={sx}>
        <Box component="span">{expanded ? text : shortText + "..."}</Box>{" "}
        <Box
          component="span"
          sx={{
            mt: 0,
            display: expanded ? "block" : "inline-block",
          }}
        >
          <Link
            color="inherit"
            variant="body1"
            underline="none"
            onClick={(e) => {
              setExpanded(!expanded);
              e.stopPropagation();
            }}
            component="button"
            sx={{
              fontWeight: 600,
              "&:hover": {
                color: theme.palette.primary.main,
              },
            }}
          >
            {expanded ? "Read less" : "Read more"}
          </Link>
        </Box>
      </Box>
    </>
  );
}

function getShortText(text) {
  let i = 550;
  while (i < text?.length && i > 0 && text[i] !== " " && text[i] !== ".") {
    i--;
  }
  return text?.slice(0, i);
}
