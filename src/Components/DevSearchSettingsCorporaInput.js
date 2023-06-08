import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";

export default function DevSearchSettingsCorporaInput({
  options,
  selected,
  setSelected,
}) {
  const isChecked = (corpus) => Boolean(selected.find((c) => c === corpus));

  const onChange = (corpus) => {
    if (selected.find((c) => c === corpus)) {
      setSelected(selected.filter((c) => c !== corpus));
    } else {
      setSelected([...selected, corpus]);
    }
  };

  return (
    <FormGroup>
      <FormLabel id="corpora-group-label">Corpora</FormLabel>
      {options.map((option) => (
        <FormControlLabel
          control={<Checkbox />}
          label={getCorpusName(option)}
          checked={isChecked(option)}
          onChange={(e) => onChange(option)}
        />
      ))}
    </FormGroup>
  );
}

function getCorpusName(corpus) {
  if (corpus === "description") {
    return "descriptions";
  }
  if (corpus === "review") {
    return "reviews";
  }
  return corpus;
}
