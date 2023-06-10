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
import CircularProgress from "@mui/material/CircularProgress";

export default function TitleAutocomplete({ search, setShowSearch }) {
  const navigate = useNavigate();
  let location = useLocation();

  let [value, setValue] = useState(null);
  let [inputValue, setInputValue] = useState(search ?? "");

  let [searchTerm, setSearchTerm] = useState("");

  let [open, setOpen] = useState(false);
  const closePopper = () => setOpen(false);
  const openPopper = () => setOpen(true);

  let focusElement = useRef(null);

  // To-Do: Handle error state from API call
  const {
    data: options,
    isLoading: searchLoading,
    error: apiError,
    isFetching: searchFetching,
  } = useAPISearch(searchTerm);

  const loading = searchLoading || searchFetching;

  function onSubmit(key, input) {
    if (key === "Enter") {
      navigate("/search", { state: input });
      closePopper();
    }
    if (key === "Escape") setShowSearch(false);
  }
  const debouncedSearch = useCallback(
    debounce((value) => {
      const normalizedSearchTerm = value?.toLowerCase();
      setSearchTerm(normalizedSearchTerm); // Triggers APISearch call by changing TanStack query key
    }, 200),
    []
  );

  const handleInput = (event, newInputValue) => {
    setInputValue(newInputValue);
    debouncedSearch(newInputValue);
  };

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
        filterOptions={(x) => x}
        options={options}
        handleHomeEndKeys={true}
        openOnFocus={true}
        onOpen={openPopper}
        onClose={closePopper}
        clearOnBlur={false}
        blurOnSelect
        onBlur={(e) => {
          setShowSearch(false);
        }}
        loading={loading}
        loadingText="Loading..."
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
                <InputAdornment
                  position="end"
                  sx={{
                    width: "64px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  {loading && <CircularProgress size={20} />}
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
