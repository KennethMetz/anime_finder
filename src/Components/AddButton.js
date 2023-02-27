import { Button } from "@mui/material";

import useWatchlistState from "../Hooks/useWatchlistState";

export default function AddButton({ anime, list }) {
  const { included, setIncluded } = useWatchlistState(anime, list);

  const onClick = (e) => {
    setIncluded(!included);
    e.preventDefault();
  };
  const disabled = !anime;
  const weight = included ? "fill" : "regular";

  const buttonText = included ? "Remove" : "Add";

  //Theme colors are taken from the default "palette" theme and MUST have a child color titled "main"
  const buttonColor = included ? "primary" : "inherit";

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      color={buttonColor}
      sx={{ border: "0px solid" }}
    >
      {buttonText}
    </Button>
  );
}
