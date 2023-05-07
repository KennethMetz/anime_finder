import { useEffect } from "react";
import { useGetProfiles, useProfile } from "../Components/APICalls";
import useAnimeList from "./useAnimeList";

export default function useProfileWithAnime(profile) {
  // Get all animeIds from *LISTS* into a single array.
  const allAnimeInLists = [];

  for (let i = 0; i < profile?.lists?.length; i++) {
    if (profile?.lists[i]?.anime)
      allAnimeInLists.push(...profile.lists[i].anime);
  }

  // Get all animeIds from *SAVEDLISTS* into a single array.

  // Create object that has the userId: [listId, listId, ...] for all saved lists
  let savedListIds = {};

  for (let i = 0; i < profile?.savedLists?.length; i++) {
    if (!savedListIds[profile?.savedLists[i]?.userId])
      savedListIds[profile?.savedLists[i]?.userId] = [];

    savedListIds[profile?.savedLists[i]?.userId].push(
      profile?.savedLists[i]?.listId
    );
  }

  // Make an array of all userIds then fetch full user profiles.
  let userIdArray = [];
  for (const [key, array] of Object.entries(savedListIds)) {
    userIdArray.push(key);
  }
  const { data: savedListProfileData } = useGetProfiles(userIdArray);
  const savedListProfiles = savedListProfileData?.items;

  // Build hashmap of every list each savedListProfile has
  let animeIdsHashmap = {}; // Saves the animeIds of each list
  let listNameHashmap = {}; // Saves the list name of each list
  let listCreatorHashmap = {}; // Saves the owner of each list
  let creatorAvatarHashmap = {}; // Saves the avatar of each lists owner

  for (let i = 0; i < savedListProfiles?.length; i++) {
    let profileId = savedListProfiles[i].uid;
    listCreatorHashmap[profileId] = savedListProfiles[i].name;
    creatorAvatarHashmap[profileId] = savedListProfiles[i].avatar;

    animeIdsHashmap[profileId + "likes"] = savedListProfiles[i].likes;
    animeIdsHashmap[profileId + "dislikes"] = savedListProfiles[i].dislikes;
    listNameHashmap[profileId + "likes"] = "Likes";
    listNameHashmap[profileId + "dislikes"] = "Dislikes";

    for (let j = 0; j < savedListProfiles[i]?.lists?.length; j++) {
      animeIdsHashmap[profileId + savedListProfiles[i].lists[j].id] =
        savedListProfiles[i].lists[j].anime;
      listNameHashmap[profileId + savedListProfiles[i].lists[j].id] =
        savedListProfiles[i].lists[j].name;
    }
  }

  let savedListsPopulated = {}; // Object each unique list and all animeIds it contains
  let allAnimeInSavedLists = []; // List of all animeIds (used for API call)

  if (savedListIds) {
    for (let [key, array] of Object.entries(savedListIds)) {
      for (let id of array) {
        savedListsPopulated[key + id] = animeIdsHashmap[key + id];
        let animeIds = animeIdsHashmap[key + id];
        if (animeIds) allAnimeInSavedLists.push(...animeIds);
      }
    }
  }

  // Get all animeObjects needed from API

  const ids = profile?.uid
    ? [
        ...profile?.likes,
        ...profile?.dislikes,
        ...allAnimeInLists,
        ...allAnimeInSavedLists,
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
    savedLists:
      profile?.savedLists?.map((list) => ({
        ...list,
        anime: mapIdsToObjects(
          savedListsPopulated[list.userId + list.listId],
          lookup
        ),
        name: listNameHashmap[list.userId + list.listId],
        creatorName: listCreatorHashmap[list.userId],
        creatorAvatar: creatorAvatarHashmap[list.userId],
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
