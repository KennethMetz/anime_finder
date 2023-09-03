import slug from "slug";

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

// TODO Centralize some code to create a list?
