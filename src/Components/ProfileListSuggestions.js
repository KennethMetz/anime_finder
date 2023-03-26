import AnimeShelf from "./AnimeShelf";
import { useRecommendations } from "./APICalls";

export default function ProfileListSuggestions({ items, amount }) {
  const history = buildHistory(items, amount);
  const { data: suggested } = useRecommendations(history);

  return (
    <div>
      <AnimeShelf items={suggested ?? []} />
    </div>
  );
}

function buildHistory(items, amount) {
  return {
    history: items.map((item) => ({ animeId: item.id, status: "COMPLETED" })),
    amount: amount ?? 6,
  };
}
