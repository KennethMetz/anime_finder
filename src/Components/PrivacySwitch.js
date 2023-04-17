import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { LockSimple, GlobeHemisphereWest } from "phosphor-react";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";

export function PrivacySwitch({ privateList, setPrivateList }) {
  return (
    <FormGroup>
      <FormControlLabel
        sx={{
          justifyContent: "center",
          mb: 2,
        }}
        control={
          <Switch
            checked={privateList}
            onClick={() => {
              setPrivateList((prev) => !prev);
            }}
          />
        }
        label={
          privateList ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <LockSimple size={20} />
              <Typography
                sx={{ fontFamily: "interMedium", fontSize: "1rem", ml: 0.5 }}
              >
                Private
              </Typography>{" "}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <GlobeHemisphereWest size={20} />{" "}
              <Typography
                sx={{ fontFamily: "interMedium", fontSize: "1rem", ml: 0.5 }}
              >
                Public
              </Typography>{" "}
            </div>
          )
        }
      />
    </FormGroup>
  );
}
