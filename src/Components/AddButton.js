import Button from "@mui/material/Button";

import useWatchlistState from "../Hooks/useWatchlistState";

export default function AddButton({ anime, list }) {
  const { included, setIncluded } = useWatchlistState(anime, list);

  const onClick = (e) => {
    setIncluded(!included);
  };
  const disabled = !anime;
  const variant = included ? "outlined" : "contained";
  const buttonText = included ? "Remove" : "Add";

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
