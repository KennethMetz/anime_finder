import useAnimeList from "./useAnimeList";

export default function useProfileWithAnime(profile) {
  // ON RE-RENDER OLD PROFILE IS PRESENT IN THIS FUNCTION
  let allAnimeInLists = [];

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
    likes:
      profile?.likes?.map((id) => lookup.get(id)).filter((item) => !!item) ??
      [],
    dislikes:
      profile?.dislikes?.map((id) => lookup.get(id)).filter((item) => !!item) ??
      [],
    top8:
      profile?.top8?.map((id) => lookup.get(id)).filter((item) => !!item) ?? [],
    lists:
      profile?.lists?.map((list) => ({
        ...list,
        anime: list.anime
          .map((item, index) => lookup.get(item))
          .filter((item) => !!item),
      })) ?? [],
  };

  return [result, isLoading, error];
}
