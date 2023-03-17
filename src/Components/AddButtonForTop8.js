import { Button } from "@mui/material";
import useTop8ListState from "../Hooks/useTop8ListState";

export default function AddButtonForTop8({ anime, list }) {
  const { included, setIncluded } = useTop8ListState(anime);

  const onClick = (e) => {
    setIncluded(!included);
    e.preventDefault();
  };
  const disabled = !anime || (list.length === 8 && !included);
  const variant = included ? "outlined" : "contained";

  let buttonText = undefined;
  if (included) buttonText = "Remove";
  else if (!included && list.length < 8) buttonText = "Add";
  else if (list.length >= 8) buttonText = "LIST FULL";

  //Theme colors are taken from the default "palette" theme and MUST have a child color titled "main"
  const buttonColor = included ? "inherit" : "primary";

  return (
    <Button
      variant={variant}
      size="small"
      onClick={onClick}
      disabled={disabled}
      color={buttonColor}
      sx={{}}
    >
      {buttonText}
    </Button>
  );
}
