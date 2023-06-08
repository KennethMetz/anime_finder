import { useContext, useState } from "react";
import DevSearchSettingsContext from "./DevSearchSettingsContext";
import { Box, Button } from "@mui/material";

export default function DevSearchBackendDetails() {
  const [settings, setSettings] = useContext(DevSearchSettingsContext);

  const [show, setShow] = useState(false);

  const isSemanticSearch = settings.backend === "semantic-search";
  const isAlgoliaSearch = settings.backend === "algolia";

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <Box sx={{ mb: 4 }}>
      {show && isSemanticSearch && (
        <span>
          Semantic search looks through chunks of anime descriptions or reviews
          to find text similar to the query in semantic meaning. It determines
          semantic meaning by obtaining an embedding of the query from the
          OpenAI API and performing a vector search for text chunks with similar
          embeddings.
          <br />
          <br />I find it works best when you enter descriptive text, and
          misfires the most when the text chunks it has in the vector db are
          short. (The show "Claymore" comes up a lot because it ended up with a
          chunk like "This show is really cool". I tried to be smart while
          chunking the documents, but I still have some room to improve. This
          one might do cool things with longer queries (like, multiple
          setences), but I have capped the query length at 100 chars for now.)
          <br />
          <br />
          The vector db does offer search filtering but so far it is{" "}
          <em>super</em> slow, even though I only have indexed like ~100k dox
          chunks. It may be faster if I host the vector db somewhere <br />
          <br /> My next tasks here are to:
          <ul>
            <li>
              Improve text chunking to remove small, super-general or ambiguous
              chunks
            </li>
            <li>Index more reviews for a larger corpus</li>
            <li>Improve results by de-duping</li>
            <li>
              Improve result ranking based on the number of chunks matched for a
              show, etc. Right now, a single reviewer saying "This is the best
              show ever" will probably make that show rank quite high for "The
              best show ever"
            </li>
          </ul>
        </span>
      )}
      {show && isAlgoliaSearch && (
        <span>
          Algolia search uses a more standard search index to check show titles
          and descriptions for matches on the query. It can't be as smart about
          matching meaning or intention, but it has pretty good typo tolerance
          (user types "ghpst" instead of "ghost", etc). It usually returns no
          results for a long sentence query like "A show about the philosophy of
          what it means to be human." But it can handle queries for non-title
          things like "Sasuke" and does ok. If I indexed character names here
          explicitly, it could handle that case even better. I could also add
          genre (or studio) as a filterable facet to allow more search
          filtering.
          <br />
          <br />
          My next tasks here are to:
          <ul>
            <li>Index reviews to allow these to be searchable.</li>
            <li>Index anime genres, studios, character names</li>
            <li>
              Improve result ranking by taking into account popularity of shows,
              etc
            </li>
          </ul>
        </span>
      )}
      <Button onClick={toggleShow}>
        {show ? "Hide" : "Show"} backend description
      </Button>
    </Box>
  );
}
