import { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";

export default function ClickAndEdit({
  data,
  placeholder,
  canEdit,
  onSave,
  styling,
}) {
  placeholder = placeholder ?? "Enter some text...";

  const theme = useTheme();

  const [editDesc, setEditDesc] = useState(false);
  const [editedDesc, setEditedDesc] = useState(data);

  function saveDesc() {
    onSave(editedDesc);
  }

  function handleDescToggle(e) {
    setEditDesc(!editDesc);
    if (e?.key === "Enter") e.preventDefault();
  }

  return (
    <div>
      {!editDesc ? (
        <Typography
          sx={{
            fontWeight: styling?.fontWeight,
            fontSize: styling?.fontSize ?? "1rem",
            color: data?.length > 0 ? "unset" : theme.palette.text.secondary,
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
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            name="Desc"
            id="Desc"
            size="small"
            variant="filled"
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
              },
            }}
            inputProps={{
              style: {
                maxWidth: "none",
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
