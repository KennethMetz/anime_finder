import { IconButton } from "@mui/material";
import { styled } from "@mui/system";

const StyledIconButton = styled(IconButton)((theme) => ({
  backgroundColor: theme.palette.custom.iconButtonBg,
}));

export default StyledIconButton;
