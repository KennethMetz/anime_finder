import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

import AnimeCard from "./AnimeCard";

import "react-horizontal-scrolling-menu/dist/styles.css";
import "../Styles/ScrollShelf.css";

export default function AnimeShelfNew({ items }) {
  // If no items, create a 'ghost' list of nulls.
  items = items ?? new Array(6).fill(null);

  return (
    <ScrollMenu
      wrapperClassName={"scrollWrapper"}
      scrollContainerClassName={"scrollContainer"}
    >
      {items.map((item, index) => (
        <Box
          key={index}
          sx={{
            width: { xs: "164px", sm: "178px" },
            aspectRatio: "0.7",
            mr: 2,
          }}
        >
          {item ? (
            <AnimeCard anime={item} />
          ) : (
            <Skeleton
              variant="rounded"
              sx={{ height: "100%", borderRadius: "8px" }}
            />
          )}
        </Box>
      ))}
    </ScrollMenu>
  );
}
