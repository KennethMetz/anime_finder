import IconButton from "@mui/material/IconButton";
import { CaretLeft } from "phosphor-react";
import { useNavigate } from "react-router-dom";

export default function BackButton({ sx }) {
  const navigate = useNavigate();

  const onClick = (e) => {
    navigate(-1);
    e.stopPropogation();
  };

  return (
    <IconButton color="inherit" sx={sx} onClick={onClick}>
      <CaretLeft />
    </IconButton>
  );
}
