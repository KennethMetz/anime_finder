import { useParams } from "react-router-dom";
import DetailedView from "./DetailedView";

// This is just a wrapper that keys the DetailedView component by animeId, to
// cause component re-instantiation when the user loads new anime pages.
export default function DetailedViewPage() {
  const params = useParams();
  const animeId = params.animeId;
  return <DetailedView key={animeId} />;
}
