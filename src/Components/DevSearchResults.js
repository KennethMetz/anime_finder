import { Box, CircularProgress } from "@mui/material";
import { APIAlgoliaSearch, APISemanticSearch } from "./APICalls";
import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DevSearchSettingsContext from "./DevSearchSettingsContext";
import DevSearchResult from "./DevSearchResult";

const sixtyMinutesMs = 1000 * 60 * 60;

export default function DevSearchResults() {
  const [params] = useSearchParams();

  const searchQuery = params.get("query");

  const [settings, setSettings] = useContext(DevSearchSettingsContext);

  const isSemanticSearch = settings.backend === "semantic-search";
  const isAlgoliaSearch = settings.backend === "algolia";

  const corpora = isSemanticSearch
    ? settings.semanticSearch.corpora
    : settings.algolia.corpora;

  const query = useQuery(
    [
      "dev-search",
      settings.backend,
      searchQuery,
      settings.itemsPerPage,
      corpora,
    ],
    async () => {
      if (!searchQuery || searchQuery === "") {
        return null;
      }
      if (isSemanticSearch) {
        return APISemanticSearch(searchQuery, settings.itemsPerPage, corpora);
      }
      if (isAlgoliaSearch) {
        return APIAlgoliaSearch(searchQuery);
      }
      throw "Unknown backend";
    },
    {
      staleTime: sixtyMinutesMs,
    }
  );

  return (
    <Box id="results">
      {query.isLoading && <CircularProgress />}
      {query.isError && <Box>Error!</Box>}
      {query.data !== null &&
        query.data !== undefined &&
        query.data.map((item) => <DevSearchResult result={item} />)}
    </Box>
  );
}
