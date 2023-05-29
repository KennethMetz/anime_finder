import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

export default function ScoreBars({ scores }) {
  const [multiplier, setMultiplier] = useState(0);

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
        <Box key={score.name} sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip title={score.description}>
            <Typography
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
            title={Math.floor((score.value * 0.8 + 0.2) * 100 * multiplier)}
          >
            <LinearProgress
              variant="determinate"
              // Map the [0, 1] scores to [0.2, 1] for positive vibes.
              value={(score.value * 0.8 + 0.2) * 100 * multiplier}
              sx={{ height: 8, borderRadius: 4, flexGrow: 1 }}
            />
          </Tooltip>
        </Box>
      ))}
    </>
  );
}
