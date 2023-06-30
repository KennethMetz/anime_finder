import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { useMemo } from "react";
import { getAvatarSrc } from "./Avatars";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material";

export default function TitleAutocompleteOption({ props, options }) {
  const theme = useTheme();
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
        <Box
          alt={options.display_name}
          sx={{
            width: "35px",
            aspectRatio: "0.7",
            background: `url(${options?.image_large})` ?? avatarSrc,
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: "8px",
            overflow: "clip",
            backgroundColor: theme.palette.custom.missingAnimeCover,
            mr: 2,
          }}
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
