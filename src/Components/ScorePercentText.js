import Typography from "@mui/material/Typography";
import { mapScoreValue } from "../Util/ScoreUtil";
import { useEffect, useState } from "react";
import {
  useSpring,
  animated,
  useReducedMotion,
  Globals,
} from "@react-spring/web";

export default function ScorePercentText({ scores }) {
  const reducedMotion = useReducedMotion();

  const score = scores.find((s) => s.name === "For You");

  let [percent, setPercent] = useState(0);

  // Removes animation effect for users who've opted out of them via their OS
  useEffect(() => {
    Globals.assign({ skipAnimation: reducedMotion });
  }, []);

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
