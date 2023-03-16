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
  const navigate = useNavigate();
  const theme = useTheme();

  const smallDevice = useMediaQuery(theme.breakpoints.down("sm"));

  const isPathActive = location.pathname === path;

  const internalOnClick = (e) => {
    if (onClick) {
      onClick();
    } else if (path) {
      navigate(path);
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
      bottom: "-4px",
      margin: "0 auto",
      left: 0,
      right: 0,
      width: "100%",
      background: theme.palette.primary.main,
    },
  };

  return (
    <Link to={path}>
      {smallDevice ? (
        <IconButton tabIndex="-1" sx={iconStyle} onClick={internalOnClick}>
          {icon}
        </IconButton>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          {alwaysShowIcon && icon}
          <Typography onClick={internalOnClick} sx={tabStyle}>
            {text}
          </Typography>
        </Box>
      )}
    </Link>
  );
}
