import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import NoResultsImage from "./NoResultsImage";
import WatchlistTile from "./WatchlistTile";
import { slugifyListName } from "../Util/ListUtil";
import { useContext, useEffect } from "react";
import ProfilePageContext from "./ProfilePageContext";
import ProfileMainPageGhost from "./ProfileMainPageGhost";
import ProfileSidebar from "./ProfileSidebar";
import { useAnimeObjects } from "./APICalls";
import { AnimeObjectsContext } from "./AnimeObjectsContext";
import useProfileWithAnime from "../Hooks/useProfileWithAnime";

export default function ProfileMainPage() {
  const { profile, animeObjects, isLoading } = useContext(ProfilePageContext);
  // const [animeObjects, setAnimeObjects] = useContext(AnimeObjectsContext);

  // const [animeObjects, isLoadingAnime, error] = useProfileWithAnime(profile);
  // useAnimeObjects(profile)
  //   .then((result) => setAnimeObjects(result.data))
  //   .catch((error) => console.log(error));

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

  // To-do: Error screen on error.

  if (isLoading) {
    return <ProfileMainPageGhost />;
  }

  return (
    <Grid container>
      <Grid item xs={12} md={4}>
        <ProfileSidebar />
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid
          container
          columnSpacing={2}
          sx={{ paddingLeft: { xs: 0, md: "45px" } }}
        >
          <Grid item xs={12}>
            <Typography variant="h3" sx={{ ...subheadStyle }}>
              History
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <WatchlistTile
              userId={profile?.uid}
              listId="likes"
              name="Likes"
              items={animeObjects?.likes}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <WatchlistTile
              userId={profile?.uid}
              listId="dislikes"
              name="Dislikes"
              items={animeObjects?.dislikes}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h3" sx={subheadStyle}>
              Watchlists
            </Typography>
          </Grid>
          {animeObjects?.lists.map((list, index) => (
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
      </Grid>
    </Grid>
  );
}
