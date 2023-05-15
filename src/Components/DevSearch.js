import { Container, Typography } from "@mui/material";
import DevSearchSettingsProvider from "./DevSearchSettingsProvider";
import DevSearchInput from "./DevSearchInput";
import DevSearchResults from "./DevSearchResults";
import DevSearchSettingsInput from "./DevSearchSettingsInput";
import DevSearchBackendDetails from "./DevSearchBackendDetails";

export default function DevSearch() {
  return (
    <Container maxWidth="md" sx={{ mt: "50px" }}>
      <DevSearchSettingsProvider>
        <DevSearchHeader />
        <DevSearchSettingsInput />
        <DevSearchBackendDetails />
        <DevSearchInput />
        <DevSearchResults />
      </DevSearchSettingsProvider>
    </Container>
  );
}

function DevSearchHeader() {
  return (
    <Typography
      variant="h2"
      sx={{
        fontFamily: "interBlack",
        fontSize: "40px",
        mb: "1em",
        textAlign: "center",
      }}
    >
      Dev Search Sandbox
    </Typography>
  );
}
