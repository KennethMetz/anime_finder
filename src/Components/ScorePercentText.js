import Typography from "@mui/material/Typography";
import { mapScoreValue } from "../Util/ScoreUtil";
import { useEffect, useMemo, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

export default function ScorePercentText({ scores }) {
  useEffect(() => {
    console.log(scores);
  }, [scores]);

  const score = scores.find((s) => s.name === "For You");

  let [percent, setPercent] = useState(0);

  useEffect(() => {
    setPercent(mapScoreValue(score?.value));
  }, [score?.value]);

  const props = useSpring({ percent });

  if (!score) return;

  return (
    <Typography variant="h2" sx={{ textAlign: "center", mb: 2 }}>
      <animated.div>{props.percent.to((x) => x.toFixed(0))}</animated.div>
    </Typography>
  );
}
