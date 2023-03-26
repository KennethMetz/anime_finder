import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function HeaderTab({
  icon,
  text,
  path,
  onClick,
  alwaysShowIcon,
}) {
  const location = useLocation();
  const theme = useTheme();

  const smallDevice = useMediaQuery(theme.breakpoints.down("sm"));

  const isPathActive = location.pathname?.startsWith(path);

  const internalOnClick = (e) => {
    if (onClick) {
      onClick();
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && onClick) {
      onClick();
      e.preventDefault();
    }
  };

  const iconStyle = {
    color: theme.palette.text.primary,
    "&:hover": {
      color: { smallDevice } ? "primary.main" : "inherit",
    },
  };

  const tabStyle = {
    fontFamily: "interSemiBold",
    fontSize: "1.125rem",
    marginLeft: alwaysShowIcon ? 0.75 : 0,
    "&:hover": {
      color: "primary.main",
    },
    "&:after": {
      display: isPathActive ? "block" : "none",
      position: "absolute",
      content: "''",
      height: "4px",
      borderRadius: "2px",
      bottom: "0px",
      margin: "0 auto",
      left: 0,
      right: 0,
      width: "100%",
      background: theme.palette.primary.main,
    },
  };

  return (
    <Link to={path} onKeyDown={onKeyDown}>
      {smallDevice ? (
        <IconButton tabIndex="-1" sx={iconStyle} onClick={internalOnClick}>
          {icon}
        </IconButton>
      ) : (
        <Box
          onClick={internalOnClick}
          sx={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          {alwaysShowIcon && icon}
          <Typography sx={tabStyle}>{text}</Typography>
        </Box>
      )}
    </Link>
  );
}
