import { async } from "@firebase/util";
import {
  Autocomplete,
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

export default function TitleAutocomplete(search) {
  const navigate = useNavigate();
  let location = useLocation();

  let [value, setValue] = useState(null);
  let [inputValue, setInputValue] = useState(search ?? "");

  let [options, setOptions] = useState([]);
  let [loading, setLoading] = useState(false);

  let focusElement = useRef(null);

  function onSubmit(key, input) {
    if (key === "Enter") {
      focusElement.current.focus(); //removes focus, so the options list will close
      focusElement.current.blur(); //removes focus, so the options list will close
      navigate("/search", { state: input });
    }
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
        }}
        forcePopupIcon={false}
        fullWidth={true}
        filterSelectedOptions
        options={options}
        handleHomeEndKeys={true}
        openOnFocus={true}
        clearOnBlur={false}
        getOptionLabel={(option) => option.display_name || ""}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        loading={loading}
        loadingText="Enter anime title (ie. Naruto)"
        sx={{ width: "450px", height: "46px" }}
        renderInput={(params) => (
          <TextField
            {...params}
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
