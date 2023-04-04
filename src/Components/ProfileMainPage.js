import { Grid, Typography } from "@mui/material";
import NoResultsImage from "./NoResultsImage";
import WatchlistTile from "./WatchlistTile";
import { slugifyListName } from "../Util/ListUtil";
import { useContext } from "react";
import ProfilePageContext from "./ProfilePageContext";

export default function ProfileMainPage() {
  const { profile, isLoading } = useContext(ProfilePageContext);

  const subheadStyle = {
    fontFamily: "interBlack",
    fontSize: "22px",
    lineHeight: "27px",
    marginTop: "26px",
    marginBottom: "12px",
  };

  const bodyStyle = {
    fontFamily: "interMedium",
    fontSize: "16px",
  };

  // TODO Add a 'ghost' page for loading.
  if (isLoading) {
    return <></>;
  }

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
        <WatchlistTile
          userId={profile?.uid}
          listId="likes"
          name="Likes"
          items={profile?.likes}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <WatchlistTile
          userId={profile?.uid}
          listId="dislikes"
          name="Dislikes"
          items={profile?.dislikes}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3" sx={subheadStyle}>
          Watchlists
        </Typography>
      </Grid>
      {profile?.lists.map((list, index) => (
        <Grid item xs={12} md={6} key={index}>
          <WatchlistTile
            userId={profile?.uid}
            listId={slugifyListName(list.name)}
            name={list.name}
            items={list.anime}
          />
        </Grid>
      ))}
      {!profile?.lists?.length && (
        <Grid item xs={12}>
          <NoResultsImage />
        </Grid>
      )}
    </Grid>
  );
}
