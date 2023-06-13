import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { useMemo } from "react";
import { getAvatarSrc } from "./Avatars";
import ListItemText from "@mui/material/ListItemText";

export default function RenderedOptions({ props, options }) {
  const avatarSrc = useMemo(
    () => getAvatarSrc(options?.avatar),
    [options?.avatar]
  );

  return (
    <Box
      component="li"
      key={options.uid || options.id}
      sx={{
        "& > img": {
          mr: 2,
          flexShrink: 0,
          borderRadius: "8px",
        },
      }}
      {...props}
    >
      {options.id && (
        <img
          width="35"
          src={options.image_large || options.image_small || avatarSrc}
          alt=""
        />
      )}
      {options.uid && (
        <Avatar
          sx={{ mr: 2, width: { xs: "35px" }, height: { xs: "35px" } }}
          src={avatarSrc}
        ></Avatar>
      )}
      <ListItemText
        primary={options.display_name ?? options.name}
        secondary={options.uid ? `@${options.handle}` : null}
      />
    </Box>
  );
}
