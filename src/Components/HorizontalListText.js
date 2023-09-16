import { Typography } from "@mui/material";
import { Fragment } from "react";

export default function HorizontalListText({ items, separator, sx }) {
  items = items || [];
  separator = separator || " • ";
  sx = sx || {};

  return (
    <Typography component={"div"} sx={{ display: "inline", ...sx }}>
      {items.map((item, index) => (
        <Fragment key={index}>
          {item}
          {index < items.length - 1 && separator}
        </Fragment>
      ))}
    </Typography>
  );
}
