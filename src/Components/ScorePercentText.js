import Typography from "@mui/material/Typography";
import { mapScoreValue } from "../Util/ScoreUtil";

export default function ScorePercentText({ scores }) {
  const score = scores.find((s) => s.name === "For You");

  let text = "";
  if (score) {
    const percent = mapScoreValue(score.value);
    text = `${percent}%`;
  }

  return (
    <Typography variant="h2" sx={{ textAlign: "center", mb: 2 }}>
      {text}
    </Typography>
  );
}
