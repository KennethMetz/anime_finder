import { async } from "@firebase/util";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { useState, useEffect, useRef, useCallback } from "react";
import { useAPISearch } from "./APICalls";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MagnifyingGlass } from "phosphor-react";
import debounce from "@mui/material/utils/debounce";

export default function TitleAutocomplete({ search, setShowSearch }) {
  const navigate = useNavigate();
  let location = useLocation();

  let [value, setValue] = useState(null);
  let [inputValue, setInputValue] = useState(search ?? "");

  let [searchTerm, setSearchTerm] = useState("");

  let [options, setOptions] = useState([]);
  let [loading, setLoading] = useState(false);

  let [open, setOpen] = useState(false);
  const closePopper = () => setOpen(false);
  const openPopper = () => setOpen(true);

  let focusElement = useRef(null);

  // To-Do: Handle loading/error states from API call
  const {
    data: searchOptions,
    isLoading: searchLoading,
    error: apiError,
  } = useAPISearch(searchTerm);

  function onSubmit(key, input) {
    if (key === "Enter") {
      navigate("/search", { state: input });
      closePopper();
    }
    if (key === "Escape") setShowSearch(false);
  }

  // Prevents popper from showing "No Results" during loading state and while there's no search term
  useEffect(() => {
    if (!searchLoading && inputValue.length > 0) openPopper();
    else closePopper();
  }, [searchOptions]);

  const debouncedSearch = useCallback(
    debounce((value) => {
      const normalizedSearchTerm = value?.toLowerCase();
      setSearchTerm(normalizedSearchTerm); // Triggers APISearch call by changing TanStack query key
    }, 450),
    []
  );

  const handleInput = (event, newInputValue) => {
    setInputValue(newInputValue);
    debouncedSearch(newInputValue);
  };

  // Prevents options being set to undefined while APISearch request is being sent
  useEffect(() => {
    if (searchOptions) {
      setOptions(searchOptions);
    }
  }, [searchOptions]);

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
        onInputChange={handleInput}
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
