import { Button } from "@mui/material/";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import useTheme from "@mui/material/styles/useTheme";
import { useState } from "react";

export default function ExpandableTags({ items, compactItems }) {
  compactItems = compactItems ?? 4;

  const theme = useTheme();

  const [expanded, setExpanded] = useState(false);

  const canShorten = items?.length > compactItems;

  const shownItems = expanded ? items : items?.slice(0, compactItems);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {shownItems?.map((item, index) => (
        <Box
          key={index}
          sx={{
            background: theme.palette.custom.subtleCardBg,
            borderRadius: "8px",
            mr: 2,
            mb: 1.5,
            px: 2,
            py: 1,
          }}
        >
          "{item}"
        </Box>
      ))}
      {canShorten && (
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
          {expanded ? "See less" : "See more"}
        </Link>
      )}
    </Box>
  );
}
