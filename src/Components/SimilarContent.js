import useSimilarAnime from "../Hooks/useSimilarAnime";
import { RecommendedList } from "./RecommendedList";

export default function SimilarContent({ animeId, amount }) {
  const [similar, loading, error] = useSimilarAnime(animeId, amount);

  return (
    <div>
      {loading ? <div id="loading"></div> : ""}
      <RecommendedList movies={similar ?? []} />
    </div>
  );
}
