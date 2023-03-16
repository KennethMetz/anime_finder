import { async } from "@firebase/util";
import {
  Autocomplete,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { APISearch } from "./APICalls";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MagnifyingGlass } from "phosphor-react";

export default function TitleAutocomplete({ search, setShowSearch }) {
  const navigate = useNavigate();
  let location = useLocation();

  let [value, setValue] = useState(null);
  let [inputValue, setInputValue] = useState(search ?? "");

  let [options, setOptions] = useState([]);
  let [loading, setLoading] = useState(false);

  let [open, setOpen] = useState(false);
  const closePopper = () => setOpen(false);
  const openPopper = () => setOpen(true);

  let focusElement = useRef(null);

  function onSubmit(key, input) {
    if (key === "Enter") {
      navigate("/search", { state: input });
      closePopper();
    }
    if (key === "Escape") setShowSearch(false);
  }

  useEffect(() => {
    (async () => {
      //Clear options when user deletes input field
      if (inputValue && inputValue.length === 0) {
        setLoading(true);
        setOptions([]);
      } else setOptions(await APISearch(inputValue));
    })();
  }, [inputValue]);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (newValue !== null) {
            setInputValue("");
            navigate(`/anime/${newValue.id}`, { state: newValue });
          }
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          openPopper();
        }}
        forcePopupIcon={false}
        fullWidth={true}
        filterSelectedOptions
        options={options}
        handleHomeEndKeys={true}
        open={open}
        openOnFocus={true}
        clearOnBlur={false}
        blurOnSelect
        onBlur={(e) => {
          setShowSearch(false);
        }}
        getOptionLabel={(option) => option.display_name || ""}
        renderOption={(props, options) => (
          <Box
            component="li"
            sx={{
              "& > img": {
                mr: 2,
                flexShrink: 0,
                borderRadius: "8px",
              },
              fontFamily: "interMedium",
              fontSize: "1rem",
            }}
            {...props}
          >
            <img
              width="35"
              src={options.image_large || options.image_small}
              alt=""
            />
            {options.display_name}
          </Box>
        )}
        loading={loading}
        loadingText="Enter anime title (ie. Naruto)"
        sx={{ width: "450px", height: "46px" }}
        renderInput={(params) => (
          <TextField
            {...params}
            autoFocus
            placeholder="Search"
            onKeyDown={(e) => {
              onSubmit(e.key, params["inputProps"]["value"]);
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Search">
                    <IconButton
                      onClick={(e) => {
                        onSubmit("Enter", inputValue);
                      }}
                      aria-label="search"
                      ref={focusElement}
                    >
                      <MagnifyingGlass size={28} />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
            sx={{
              ".MuiOutlinedInput-root": {
                borderRadius: "28px",
                paddingLeft: "18px",
                paddingTop: "4px",
                height: "46px",
                fontSize: "1rem",
                fontFamily: "interMedium",
              },
              ".MuiInputLabel-root": {
                paddingLeft: "18px",
              },
            }}
          />
        )}
      ></Autocomplete>
    </div>
  );
}
