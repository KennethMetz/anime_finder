import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { mapScoreValue } from "../Util/ScoreUtil";

export default function ScoreBars({ scores }) {
  const [multiplier, setMultiplier] = useState(0);

  const smallerTopMargin = {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, -10],
        },
      },
    ],
  };

  // LinearProgress components animate changes in value.  To get them to
  // animate the bars to their initial positions, a multiplier is applied to
  // each score, starting at 0 and set to 1 after a very short delay.
  useEffect(() => {
    if (scores.length > 0 && multiplier === 0) {
      setTimeout(() => {
        setMultiplier(1);
      }, 100);
    }
  }, [scores]);

  return (
    <>
      {scores.map((score) => (
        <Box
          key={score.name}
          sx={{
            display: "flex",
            alignItems: "center",
            mb: score.name === "For You" ? 1.25 : 0,
          }}
        >
          <Tooltip
            title={score.description}
            arrow={true}
            PopperProps={{ ...smallerTopMargin }}
          >
            <Typography
              variant={score.name === "For You" ? "h5" : "body1"}
              sx={{
                mb: "4px",
                width: "104px",
                flexShrink: 0,
                cursor: "default",
              }}
            >
              {score.name}
            </Typography>
          </Tooltip>
          <Tooltip
            arrow={true}
            title={mapScoreValue(score.value) * multiplier}
            PopperProps={{ ...smallerTopMargin }}
          >
            <LinearProgress
              variant="determinate"
              value={mapScoreValue(score.value) * multiplier}
              sx={{ height: 8, borderRadius: 4, flexGrow: 1 }}
            />
          </Tooltip>
        </Box>
      ))}
    </>
  );
}
