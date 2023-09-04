import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import NoResultsImage from "./NoResultsImage";
import WatchlistTile from "./WatchlistTile";
import ProfilePageContext from "./ProfilePageContext";
import ProfileMainPageGhost from "./ProfileMainPageGhost";
import ProfileSidebar from "./ProfileSidebar";
import HtmlPageTitle from "./HtmlPageTitle";
import ProfileImportDialog from "./ProfileImportDialog";

export default function ProfileMainPage() {
  const { profile, animeObjects, isOwnProfile, isLoading } =
    useContext(ProfilePageContext);

  const subheadStyle = {
    marginTop: "26px",
    marginBottom: "12px",
  };

  // To-do: Error screen on error.

  if (isLoading) {
    return <ProfileMainPageGhost />;
  }

  return (
    <Grid container>
      <HtmlPageTitle title={getHtmlTitle(profile, isOwnProfile)} />
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
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h3" sx={subheadStyle}>
              My Watchlists
            </Typography>
            {isOwnProfile && profile?.authProvider !== "anonymous" && (
              <ProfileImportDialog subheadStyle={subheadStyle} />
            )}
          </Grid>
          {animeObjects?.lists.map((list, index) => (
            <Grid item xs={12} md={6} key={index}>
              <WatchlistTile
                userId={profile?.uid}
                listId={list.id}
                name={list.name}
                items={list.anime}
              />
            </Grid>
          ))}
          {!profile?.lists?.length && (
            <Grid item xs={12}>
              <NoResultsImage tile={true} />
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography variant="h3" sx={subheadStyle}>
              Saved Watchlists
            </Typography>
          </Grid>
          {animeObjects?.savedLists?.map((list, index) => (
            <Grid item xs={12} md={6} key={index}>
              <WatchlistTile
                userId={list.userId}
                listId={list.listId}
                name={list.name}
                items={list.anime}
                creator={list.creatorName}
                creatorAvatar={list.creatorAvatar}
              />
            </Grid>
          ))}
          {!profile?.savedLists?.length && (
            <Grid item xs={12}>
              <NoResultsImage tile={true} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

function getHtmlTitle(profile, isOwnProfile) {
  if (isOwnProfile) {
    return "Your Profile";
  } else if (profile?.handle) {
    return `@${profile.handle}'s Profile`;
  } else {
    return "Profile";
  }
}
