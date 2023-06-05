import { useSearchParams } from "react-router-dom";

// QueryString key.  Genre will be stored in query as `?genre=Action`.
const key = "genre";

/**
 * A hook that provides access to the selected genre filter from the url.
 *
 * @returns A list of `[genre, setGenre]`, where `genre` is the selected genre
 * string, or else `null`, and `setGenre` is a setter that will update the
 * selected genre string.
 */
export default function useGenreFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const genre = searchParams.get(key);

  const setGenre = (newValue) => {
    setSearchParams(
      (prev) => {
        if (newValue) {
          prev.set(key, newValue);
        } else {
          prev.delete(key);
        }
        return prev;
      },
      { replace: true }
    );
  };

  return [genre, setGenre];
}
