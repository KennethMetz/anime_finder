import slug from "slug";
import { CreateWatchlistDataEntry, generateId } from "../Components/Firestore";

const reservedSlugs = ["likes", "dislikes"];

/**
 * Slugify the specified list `name`.
 * @param {string} name The list name.
 * @returns A slugified version of the name.  Collisions with reserved slugs
 * are avoided.
 */
export function slugifyListName(name) {
  let result = slug(name);

  if (reservedSlugs.some((reservedSlug) => reservedSlug === result)) {
    result = result + "-1";
  }

  return result;
}

/**
 * Creates a new watchlist.
 * @param {string} name The list name.
 * @param {array} anime An array of animeIds.
 * @param {boolean} privateList Is this a private list.
 * @param {string} desc The users' description of the list.
 * @param {object} user The user auth object.
 * @param {object} localUser The localUser object.
 * @param {string} malList MAL list name or NULL if a custom watchlist.
 */
export function createNewWatchlist(
  name,
  anime,
  privateList,
  desc,
  user,
  localUser,
  malList
) {
  let listId = generateId();
  let temp = { ...localUser };

  // Build list object for a CUSTOM watchlist
  if (!malList) {
    temp.lists = [
      ...(temp.lists ?? []),
      {
        name: name,
        anime: anime ?? [],
        privateList: privateList,
        desc: desc,
        id: listId,
      },
    ];
  }
  // Build list object for an imported MAL watchlist
  else {
    const syncDate = new Date();
    temp.lists = [
      ...(temp.lists ?? []),
      {
        name: getMalListName(malList),
        anime: anime ?? [],
        privateList: privateList,
        desc: getMalListDesc(malList),
        id: listId,
        syncData: {
          source: getMalListSource(malList),
          syncDate,
        },
      },
    ];
  }

  // Only registered users have their watchlistData created and displayed on '/home'
  if (!privateList && !user.isAnonymous)
    CreateWatchlistDataEntry(user.uid, listId);

  return temp;
}

function getMalListName(listName) {
  if (listName === "completed") return "Completed on MAL";
  else if (listName === "dropped") return "Dropped on MAL";
  else if (listName === "on_hold") return "On Hold on MAL";
  else if (listName === "plan_to_watch") return "Plan to Watch on MAL";
  else if (listName === "watching") return "Watching on MAL";
}

function getMalListDesc(listName) {
  if (listName === "completed") return "My 'Completed' anime on MAL";
  else if (listName === "dropped") return "My 'Dropped' anime on MAL";
  else if (listName === "on_hold") return "My 'On Hold' anime on MAL";
  else if (listName === "plan_to_watch")
    return "My 'Plan to Watch' anime on MAL";
  else if (listName === "watching") return "My 'Watching' anime on MAL";
}

function getMalListSource(listName) {
  if (listName === "completed") return "mal/completed";
  else if (listName === "dropped") return "mal/dropped";
  else if (listName === "on_hold") return "mal/onHold";
  else if (listName === "plan_to_watch") return "mal/planToWatch";
  else if (listName === "watching") return "mal/watching";
}
