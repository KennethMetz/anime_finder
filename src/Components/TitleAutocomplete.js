import { async } from "@firebase/util";
import { Autocomplete, Box, IconButton, TextField } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { APISearch } from "./APICalls";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

export default function TitleAutocomplete(search) {
  const navigate = useNavigate();
  let location = useLocation();

  let [value, setValue] = useState(null);
  let [inputValue, setInputValue] = useState(search ?? "");

  let [options, setOptions] = useState([]);
  let [loading, setLoading] = useState(false);

  let focusElement = useRef(null);

  function onSubmit(e, input) {
    if (e.keyCode === 13) {
      if (location["pathname"] === "/search") {
        focusElement.current.focus(); //removes focus, so the options list will close
        focusElement.current.blur(); //removes focus, so the options list will close
      }
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
  console.log(options);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (newValue !== null) {
            setInputValue("");
            navigate("/detailedview", { state: newValue });
          }
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        forcePopupIcon={false}
        filterSelectedOptions
        options={options}
        handleHomeEndKeys={true}
        openOnFocus={true}
        clearOnBlur={false}
        getOptionLabel={(option) => option.display_name || ""}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        loading={loading}
        loadingText="Enter anime title (ie. Naruto)"
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            onKeyDown={(e) => {
              onSubmit(e, params["inputProps"]["value"]);
            }}
            label="Your Favorite Anime"
          />
        )}
      ></Autocomplete>
      <IconButton
        onClick={(e, params) => {
          onSubmit(e, params["inputProps"]["value"]);
        }}
        aria-label="search"
        size="large"
        ref={focusElement}
      >
        <SearchIcon />
      </IconButton>
    </div>
  );
}
