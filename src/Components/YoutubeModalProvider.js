import { Box, Modal } from "@mui/material";
import { useState } from "react";
import YoutubeModalContext from "./YoutubeModalContext";

export default function YoutubeModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState();

  const value = {
    open: (src) => {
      setSrc(autoplaySrc(src));
      setOpen(true);
    },
    close: () => setOpen(false),
  };

  return (
    <YoutubeModalContext.Provider value={value}>
      {children}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "common.black",
            boxShadow: 24,
            p: 0,
          }}
        >
          <Box
            sx={{
              overflow: "hidden",
              position: "relative",
              width: "800px",
              maxWidth: "90vw",
              aspectRatio: "1.7778",
            }}
          >
            <iframe
              style={{
                left: 0,
                top: 0,
                height: "100%",
                width: "100%",
                position: "absolute",
              }}
              src={src}
              width="800"
              height="450"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube video"
            />
          </Box>
        </Box>
      </Modal>
    </YoutubeModalContext.Provider>
  );
}

function autoplaySrc(src) {
  // Append autoplay to youtube embeds.
  if (src.startsWith("https://www.youtube.com/embed") && !src.includes("?")) {
    return src + "?autoplay=1";
  }

  return src;
}
