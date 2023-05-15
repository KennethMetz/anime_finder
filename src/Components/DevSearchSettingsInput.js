import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
} from "@mui/material";
import { useContext } from "react";
import DevSearchSettingsContext from "./DevSearchSettingsContext";
import DevSearchSettingsCorporaInput from "./DevSearchSettingsCorporaInput";

const backendOptions = [
  {
    name: "semantic-search",
    corpora: ["description", "review"],
    key: "semanticSearch",
  },
  { name: "algolia", corpora: ["anime"], key: "algolia" },
];

export default function DevSearchSettingsInput() {
  const [settings, setSettings] = useContext(DevSearchSettingsContext);

  const selectionBackendOption = backendOptions.find(
    (item) => item.name === settings.backend
  );
  const selectedSettings = settings[selectionBackendOption.key];

  const onChangeBackend = (event) => {
    setSettings({ ...settings, backend: event.target.value });
  };

  const onChangeCorpora = (newValue) => {
    setSettings({
      ...settings,
      [selectionBackendOption.key]: {
        ...settings[selectionBackendOption.key],
        corpora: newValue,
      },
    });
  };

  const onChangePageSize = (event) => {
    setSettings({
      ...settings,
      itemsPerPage: event.target.value,
    });
  };

  return (
    <Box sx={{ maxWidth: "100%" }}>
      <FormControl sx={{ display: "block" }}>
        <FormLabel id="backend-group-label">Backend</FormLabel>
        <RadioGroup
          row
          aria-labelledby="backend-group-label"
          name="row-radio-buttons-group"
          value={settings.backend}
          onChange={onChangeBackend}
        >
          {backendOptions.map((option) => (
            <FormControlLabel
              value={option.name}
              control={<Radio />}
              label={option.name}
            />
          ))}
        </RadioGroup>
      </FormControl>
      {false && (
        <DevSearchSettingsCorporaInput
          options={selectionBackendOption.corpora}
          selected={selectedSettings.corpora}
          setSelected={onChangeCorpora}
        />
      )}
      <FormControl>
        <FormLabel id="backend-group-label">
          Page Size: {settings.itemsPerPage}
        </FormLabel>
        <Slider
          sx={{ mt: 2, mb: 2, minWidth: "250px" }}
          marks
          step={5}
          min={5}
          max={40}
          value={settings.itemsPerPage}
          onChange={onChangePageSize}
        />
      </FormControl>
    </Box>
  );
}
