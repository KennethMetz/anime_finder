import { async } from "@firebase/util";
import { Autocomplete, Box, IconButton, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { APISearch } from "./APICalls";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import magnifyingGlass from "../Styles/images/search.svg";
import SearchIcon from "@mui/icons-material/Search";

export default function TitleAutocomplete(input) {
  const navigate = useNavigate();
  let location = useLocation();
  let [value, setValue] = useState();
  let [inputValue, setInputValue] = useState(input);
  let [options, setOptions] = useState([]);
  let [loading, setLoading] = useState(false);

  // console.log(value);
  // console.log(loading);

  useEffect(() => {
    (async () => {
      if (inputValue && inputValue.length === 0) {
        setLoading(true);
        setOptions([]);
      } else setOptions(await APISearch(inputValue));
    })();
    // console.log(inputValue);
    // console.log(loading);
  }, [inputValue]);

  return (
    <form
      onSubmit={() => {
        navigate("/search", { state: inputValue });
      }}
    >
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          console.log(newValue);
          navigate("/detailedview", { state: newValue });
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          console.log(inputValue);
        }}
        forcePopupIcon={false}
        //   filterSelectedOptions
        options={options}
        handleHomeEndKeys={true}
        openOnFocus={true}
        clearOnBlur={false}
        getOptionLabel={(option) => option.name || ""}
        // noOptionsText="Type a show/movie name for suggestions!"
        loading={loading}
        loadingText="Enter anime title (ie. Naruto)"
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Your Favorite Anime" />
        )}
      />
      <IconButton type="submit" aria-label="search" size="large">
        <SearchIcon />
      </IconButton>
    </form>
  );
}
