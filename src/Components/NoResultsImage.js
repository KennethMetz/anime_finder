import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Spike from "../Styles/images/distraughtSpike2.webp";

export default function NoResultsImage({ noImage, tile }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: !tile ? "center" : "flex-start",
      }}
    >
      <Typography
        sx={{
          color: "text.secondary",
          marginBottom: "14px",
        }}
      >
        Nothing to see here...
      </Typography>
      {!noImage && !tile && (
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
      {!noImage && tile && (
        <Grid container columnSpacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              alt=""
              sx={{
                background: `url(${Spike})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                borderRadius: "16px",
                width: "100%",
                height: "142.56px",
              }}
            ></Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
