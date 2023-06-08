import { Box, TextField } from "@mui/material";
import { useContext, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DevSearchSettingsContext from "./DevSearchSettingsContext";

const placeholders = [
  "An anime about baking bread",
  "A show about kids training to be ninja",
  "A cyberpunk show set in space",
  "An anime with a great soundtrack",
  "A relaxing show to watch after a hard day",
];

export default function DevSearchInput() {
  const [settings, setSettings] = useContext(DevSearchSettingsContext);

  const navigate = useNavigate();
  const [params] = useSearchParams();

  const searchQuery = params.get("query");

  const [text, setText] = useState(searchQuery ?? "");

  const placeholder = useMemo(
    () => placeholders[Math.floor(Math.random() * placeholders.length)],
    []
  );

  const onSubmit = (e) => {
    e.preventDefault();
    navigate(`/dev-search?query=${text}`);
  };

  return (
    <Box
      id="form"
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {settings.backend === "semantic-search" && (
        <>
          <Box
            sx={{
              display: "block",
              fontFamily: "interMedium",
              mb: 2,
            }}
          >
            What kind of show would you like to watch?
          </Box>
          <TextField
            id="search-input"
            placeholder={`ex: ${placeholder}`}
            variant="outlined"
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{
              maxWidth: "500px",
              "& input": {
                maxWidth: "unset",
              },
            }}
          />
        </>
      )}
      {settings.backend === "algolia" && (
        <>
          <Box
            sx={{
              display: "block",
              fontFamily: "interMedium",
              mb: 2,
            }}
          >
            Use me like a regular search box:
          </Box>
          <TextField
            id="search-input"
            placeholder="e.g. Sasuke, Naruto, Bebop"
            variant="outlined"
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{
              maxWidth: "500px",
              "& input": {
                maxWidth: "unset",
                borderRadius: "20px",
              },
            }}
          />
        </>
      )}
    </Box>
  );
}
