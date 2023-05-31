import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLocation } from "react-router-dom";

export default function ClickAndEdit({
  data,
  placeholder,
  label,
  canEdit,
  onSave,
  styling,
}) {
  placeholder = placeholder ?? "Enter some text...";

  const location = useLocation();
  const theme = useTheme();

  const [editDesc, setEditDesc] = useState(false);
  const [editedDesc, setEditedDesc] = useState(data);

  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // TO-DO:
  // Provide truncated name/description for lengthy entries so they
  // don't break layout.

  function saveDesc() {
    onSave(editedDesc);
  }

  function handleDescToggle(e) {
    setEditDesc(!editDesc);
    if (e?.key === "Enter") e.preventDefault();
  }

  useEffect(() => {
    setEditDesc(false);
  }, [location]);

  return (
    <div style={{ display: "flex", flex: "1" }}>
      {!editDesc ? (
        <Box sx={{ display: "flex", flex: "1" }}>
          <Tooltip
            title={canEdit ? label : ""}
            placement="bottom"
            PopperProps={{
              modifiers: [{ name: "offset", options: { offset: [0, -10] } }],
            }}
          >
            <Typography
              sx={{
                fontSize: styling?.fontSize ?? "1rem",
                fontWeight: styling?.fontWeight,
                color:
                  data?.length > 0 ? "unset" : theme.palette.text.secondary,
                pb: styling?.pb ?? 1,
                pl: 0,
                ml: 0,
                cursor: canEdit ? "pointer" : "unset",
              }}
              tabIndex={canEdit ? "0" : "-1"}
              onClick={canEdit ? handleDescToggle : undefined}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleDescToggle(e);
              }}
            >
              {data?.length > 0 ? data : canEdit ? placeholder : ""}
            </Typography>
          </Tooltip>
        </Box>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: "1",
          }}
        >
          <TextField
            name="Desc"
            id="Desc"
            size="small"
            variant="outlined"
            autoComplete="off"
            color="text"
            placeholder={placeholder}
            autoFocus
            multiline
            fullWidth={true}
            value={editedDesc}
            onClick={(e) => e.preventDefault()}
            onChange={(e) => {
              setEditedDesc(e.target.value);
            }}
            sx={{ mb: 2 }}
            InputProps={{
              style: {
                padding: "10px 10px 10px 5px",
                lineHeight: "1.5",
              },
            }}
            inputProps={{
              style: {
                maxWidth: "none",
                fontWeight: styling?.fontWeight,
                fontSize: smallScreen
                  ? styling?.fontSize?.xs ?? styling?.fontSize ?? "1rem"
                  : styling?.fontSize?.md ?? styling?.fontSize ?? "1rem",
              },
            }}
          ></TextField>
          <Button
            size="small"
            variant="outlined"
            color="inherit"
            onClick={(e) => {
              saveDesc();
              handleDescToggle();
            }}
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
}
