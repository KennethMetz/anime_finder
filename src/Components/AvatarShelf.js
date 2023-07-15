import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

import { CaretLeft, CaretRight } from "phosphor-react";
import { useState } from "react";
import AvatarIcon from "./AvatarIcon";

export default function AvatarShelf({ items }) {
  items = items ?? [];

  const [selected, setSelected] = useState();
  const [startIndex, setStartIndex] = useState(0);
  const theme = useTheme();

  const threeSeventy = useMediaQuery("(min-width:370px)");
  const fourSeventy = useMediaQuery("(min-width:470px)");
  const fiveSixty = useMediaQuery("(min-width:560px)");
  const sixSeventy = useMediaQuery("(min-width:670px)");
  const sevenSeventy = useMediaQuery("(min-width:770px)");
  const eightSeventy = useMediaQuery("(min-width:870px)");
  const nineSixty = useMediaQuery("(min-width:960px)");
  const tenSixty = useMediaQuery("(min-width:1060px)");
  const elevenFifty = useMediaQuery("(min-width:1150px)");
  const lg = useMediaQuery(theme.breakpoints.up("lg"));

  const hasPrevious = startIndex > 0;

  const itemsPerPage = lg
    ? 11
    : elevenFifty && !hasPrevious
    ? 11
    : elevenFifty && hasPrevious
    ? 10
    : tenSixty && !hasPrevious
    ? 10
    : tenSixty && hasPrevious
    ? 9
    : nineSixty && !hasPrevious
    ? 9
    : nineSixty && hasPrevious
    ? 8
    : eightSeventy && !hasPrevious
    ? 8
    : eightSeventy && hasPrevious
    ? 7
    : sevenSeventy && !hasPrevious
    ? 7
    : sevenSeventy && hasPrevious
    ? 6
    : sixSeventy && !hasPrevious
    ? 6
    : sixSeventy && hasPrevious
    ? 5
    : fiveSixty && !hasPrevious
    ? 5
    : fiveSixty && hasPrevious
    ? 4
    : fourSeventy && !hasPrevious
    ? 4
    : fourSeventy && hasPrevious
    ? 3
    : threeSeventy && !hasPrevious
    ? 3
    : 2;

  const columns = 12;
  const breakpoints = { xs: 12 / itemsPerPage };

  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  const hasNext = startIndex < items.length - itemsPerPage;

  const onChangeSelected = (index, value) => {
    if (value) {
      setSelected(index);
    } else if (!value && selected === index) {
      setSelected(undefined);
    }
  };

  const onClickNext = (e) => {
    setStartIndex(
      Math.min(startIndex + itemsPerPage, items.length - itemsPerPage)
    );
    e.preventDefault();
  };

  const onClickPrevious = (e) => {
    setStartIndex(Math.max(startIndex - itemsPerPage, 0));
    e.preventDefault();
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        alignItems: "center",
        marginTop: "0px",
        marginBottom: "21px",
        position: "relative",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          visibility: hasPrevious ? "visible" : "hidden",
          marginLeft: hasPrevious ? "0px" : "-48px",
          top: "calc(68% - 24px)",
          zIndex: 1,
          borderRadius: "24px",
        }}
      >
        <IconButton onClick={onClickPrevious} color="inherit">
          <CaretLeft size={24} />
        </IconButton>
      </Paper>

      <Grid container spacing={2} columns={columns}>
        {currentItems.map((avatar, index) => (
          <AvatarIcon
            key={avatar}
            avatar={avatar}
            onChangeSelected={(v) => onChangeSelected(index, v)}
          />
        ))}
      </Grid>

      <Paper
        elevation={4}
        sx={{
          position: "absolute",
          visibility: hasNext ? "visible" : "hidden",
          right: "0px",
          top: "calc(50% - 20px)",
          zIndex: 1,
          borderRadius: "24px",
        }}
      >
        <IconButton onClick={onClickNext} color="inherit">
          <CaretRight size={24} />
        </IconButton>
      </Paper>
    </Stack>
  );
}
