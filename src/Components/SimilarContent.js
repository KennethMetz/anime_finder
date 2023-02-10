import useSimilarAnime from "../Hooks/useSimilarAnime";
import AnimeShelf from "./AnimeShelf";

export default function SimilarContent({ animeId, amount }) {
  const [similar, loading, error] = useSimilarAnime(animeId, amount);

  return (
    <div>
      <AnimeShelf items={similar ?? []} />
    </div>
  );
}
