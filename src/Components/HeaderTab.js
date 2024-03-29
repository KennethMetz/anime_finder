import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";
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

  const disableLink = (e) => {
    if (!path) e.preventDefault();
  };

  const iconStyle = {
    color: theme.palette.text.primary,
    "&:hover": {
      color: { smallDevice } ? "primary.main" : "inherit",
    },
  };

  const tabStyle = {
    fontWeight: 600,
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
    <Link to={path} onKeyDown={onKeyDown} onClick={disableLink}>
      {smallDevice ? (
        <IconButton tabIndex={-1} sx={iconStyle} onClick={internalOnClick}>
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
