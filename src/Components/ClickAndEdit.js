import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";

export default function ClickAndEdit({
  data,
  placeholder,
  canEdit,
  onSave,
  ml,
}) {
  placeholder = placeholder ?? "Enter some text...";

  const theme = useTheme();

  const [editDesc, setEditDesc] = useState(false);
  const [editedDesc, setEditedDesc] = useState(data);

  function saveDesc() {
    onSave(editedDesc);
  }

  function handleDescToggle() {
    setEditDesc(!editDesc);
  }

  return (
    <div>
      {!editDesc ? (
        <Box
          sx={{
            fontFamily: "interMedium",
            fontSize: "1rem",
            color: data?.length > 0 ? "unset" : theme.palette.text.secondary,
            pb: 1,
            pl: 0,
            ml: ml ? 6 : 0,
            cursor: canEdit ? "pointer" : "unset",
          }}
          onClick={canEdit ? handleDescToggle : undefined}
        >
          {data?.length > 0 ? data : canEdit ? placeholder : ""}
        </Box>
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
            value={editedDesc}
            onClick={(e) => e.preventDefault()}
            onChange={(e) => {
              setEditedDesc(e.target.value);
            }}
            sx={{ width: "100%", mb: 2 }}
            InputProps={{
              style: {
                padding: "10px 10px 10px 5px",
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
