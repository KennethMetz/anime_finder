import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function ClickAndEdit({ data, canEdit, update, index, ml }) {
  const [editDesc, setEditDesc] = useState(false);
  const [editedDesc, setEditedDesc] = useState(data);

  function saveDesc() {
    update(editedDesc, index);
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
            pb: 1,
            pl: 0,
            ml: ml ? 6 : 0,
            cursor: canEdit ? "pointer" : "unset",
          }}
          onClick={canEdit ? handleDescToggle : undefined}
        >
          {data?.length > 0 ? data : "Tell us a bit about this list..."}
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
            placeholder="Tell us a bit about this list..."
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
