import { Grid, Typography } from "@mui/material";
import NoResultsImage from "./NoResultsImage";
import WatchlistTile from "./WatchlistTile";
import { slugifyListName } from "../Util/ListUtil";
import { useContext } from "react";
import { LocalUserContext } from "./LocalUserContext";

export default function ProfileMainPage() {
  const [localUser, setLocalUser] = useContext(LocalUserContext);

  const subheadStyle = {
    fontFamily: "interBlack",
    fontSize: "22px",
    lineHeight: "27px",
    marginTop: "26px",
    marginBottom: "12px",
  };

  return (
    <Grid
      container
      columnSpacing={2}
      sx={{ paddingLeft: { xs: 0, md: "45px" } }}
    >
      <Grid item xs={12}>
        <Typography variant="h3" sx={{ ...subheadStyle, marginTop: 0 }}>
          History
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <WatchlistTile listId="likes" name="Likes" items={localUser.likes} />
      </Grid>
      <Grid item xs={12} md={6}>
        <WatchlistTile
          listId="dislikes"
          name="Dislikes"
          items={localUser.dislikes}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3" sx={subheadStyle}>
          Watchlists
        </Typography>
      </Grid>
      {localUser?.lists.map((list, index) => (
        <Grid item xs={12} md={6} key={index}>
          <WatchlistTile
            listId={slugifyListName(list.name)}
            name={list.name}
            items={list.anime}
          />
        </Grid>
      ))}
      {!localUser?.lists?.length && (
        <Grid item xs={12}>
          <NoResultsImage />
        </Grid>
      )}
    </Grid>
  );
}
