import useSimilarAnime from "../Hooks/useSimilarAnime";
import AnimeGrid from "./AnimeGrid";

export default function SimilarContent({ animeId, amount }) {
  const [similar, loading, error] = useSimilarAnime(animeId, amount);

  return (
    <div>
      {loading ? <div id="loading"></div> : ""}
      <AnimeGrid items={similar ?? []} />
    </div>
  );
}
