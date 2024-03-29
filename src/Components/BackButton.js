import IconButton from "@mui/material/IconButton";
import { CaretLeft } from "phosphor-react";
import { useNavigate } from "react-router-dom";

export default function BackButton({ sx, link }) {
  const navigate = useNavigate();

  const onClick = (e) => {
    navigate(link ?? -1);
    e.stopPropagation();
  };

  return (
    <IconButton color="inherit" sx={sx} onClick={onClick}>
      <CaretLeft />
    </IconButton>
  );
}
