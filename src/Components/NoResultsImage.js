import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Spike from "../Styles/images/distraughtSpike2.webp";

export default function NoResultsImage({ noImage }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontFamily: "interMedium",
          fontSize: "1rem",
          color: "text.secondary",
          marginBottom: "14px",
        }}
      >
        Nothing to see here...
      </Typography>
      {noImage ? (
        ""
      ) : (
        <Box
          component="img"
          src={Spike}
          alt=""
          sx={{
            borderRadius: "16px",
            width: "80%",
            maxWidth: "355px",
          }}
        ></Box>
      )}
    </div>
  );
}
