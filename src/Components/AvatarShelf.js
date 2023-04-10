import {
  Box,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useState } from "react";
import AvatarIcon from "./AvatarIcon";

export default function AvatarShelf({ items }) {
  items = items ?? [];

  const [selected, setSelected] = useState();
  const [startIndex, setStartIndex] = useState(0);
  const theme = useTheme();

  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  const sevenHundredFifty = useMediaQuery(
    theme.breakpoints.up("sevenHundredFifty")
  );
  const fiveHundred = useMediaQuery(theme.breakpoints.up("fiveHundred"));
  const fourHundred = useMediaQuery(theme.breakpoints.up("fourHundred"));

  const md = useMediaQuery(theme.breakpoints.up("md"));
  const lg = useMediaQuery(theme.breakpoints.up("lg"));

  const itemsPerPage = md ? 8 : sm ? 5 : fiveHundred ? 4 : fourHundred ? 3 : 2;

  const columns = 12;
  const breakpoints = { xs: 12 / itemsPerPage };

  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  const hasPrevious = startIndex > 0;
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
