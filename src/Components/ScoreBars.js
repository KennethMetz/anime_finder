import { Box, LinearProgress, Typography } from "@mui/material";

export default function ScoreBars({ scores }) {
  return (
    <>
      {scores.map((score) => (
        <Box key={score.name} sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              fontFamily: "interMedium",
              fontSize: "16px",
              mb: "4px",
              width: "104px",
              flexShrink: 0,
            }}
          >
            {score.name}
          </Typography>
          <LinearProgress
            variant="determinate"
            // Map the [0, 1] scores to [0.2, 1] for positive vibes.
            value={(score.value * 0.8 + 0.2) * 100}
            sx={{ height: 8, borderRadius: 4, flexGrow: 1 }}
          />
        </Box>
      ))}
    </>
  );
}
