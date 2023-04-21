import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";

export default function SearchGhost() {
  return (
    <Container maxWidth="sm" style={{ paddingLeft: "16px" }}>
      <GhostListItem />
      <GhostListItem />
      <GhostListItem />
      <GhostListItem />
      <GhostListItem />
      <GhostListItem />
      <GhostListItem />
      <GhostListItem />
      <GhostListItem />
      <GhostListItem />
      <div className="gap" />
    </Container>
  );
}

function GhostListItem() {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 1.15 }}>
      <Skeleton variant="rounded" width={40} height={56} sx={{ mr: 2 }} />
      <Skeleton variant="text" width={250} />
    </Box>
  );
}
