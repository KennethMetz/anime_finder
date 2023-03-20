import { useContext } from "react";
import YoutubeModalContext from "../Components/YoutubeModalContext";

export default function useYoutubeModal() {
  const modal = useContext(YoutubeModalContext);

  return [modal.open, modal.close];
}
