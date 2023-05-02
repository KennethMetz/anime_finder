import useAnimeList from "./useAnimeList";

export default function useProfileWithAnime(profile) {
  const allAnimeInLists = [];

  for (let i = 0; i < profile?.lists?.length; i++) {
    if (profile?.lists[i]?.anime)
      allAnimeInLists.push(...profile.lists[i].anime);
  }
  const ids = profile?.uid
    ? [
        ...profile?.likes,
        ...profile?.dislikes,
        ...allAnimeInLists,
        ...profile?.top8,
      ]
    : undefined;

  const {
    data: animeLists,
    isLoading: isLoading,
    error: error,
  } = useAnimeList(ids);

  // Early out if there is no data.
  if (!animeLists) return [animeLists, isLoading, error];

  // Create map of ID to anime.
  const lookup = new Map();

  animeLists.forEach((anime, index) => {
    if (!anime) return;
    lookup.set(anime.id, anime);
  });

  // Replace anime IDs with full objects.
  const result = {
    likes: mapIdsToObjects(profile?.likes, lookup),
    dislikes: mapIdsToObjects(profile?.dislikes, lookup),
    top8: mapIdsToObjects(profile?.top8, lookup),
    lists:
      profile?.lists?.map((list) => ({
        ...list,
        anime: mapIdsToObjects(list.anime, lookup),
      })) ?? [],
  };

  return [result, isLoading, error];
}

// Helper function to map a list of `ids` to a list of anime objects, using
// the id -> anime object map `lookup`.
function mapIdsToObjects(ids, lookup) {
  if (!ids) {
    return [];
  }

  return ids.map((id) => lookup.get(id)).filter((item) => !!item);
}
