const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const logger = require("firebase-functions/logger");
const { onDocumentDeleted } = require("firebase-functions/v2/firestore");

initializeApp();

exports.onAnimeReviewDeleted = onDocumentDeleted(
  "/animeData/{animeId}/reviews/{documentId}",
  (event) => {
    const db = getFirestore();

    logger.info(
      "Deleting reactions for deleted anime review: ",
      event.data.ref.path
    );

    // Delete all reactions.
    return db.recursiveDelete(
      db.collection(event.data.ref.path + "/reactions")
    );
  }
);

exports.onWatchlistReviewDeleted = onDocumentDeleted(
  "/watchlistData/{watchlistId}/reviews/{documentId}",
  (event) => {
    const db = getFirestore();

    logger.info(
      "Deleting reactions for deleted watchlist review: ",
      event.data.ref.path
    );

    // Delete all reactions.
    return db.recursiveDelete(
      db.collection(event.data.ref.path + "/reactions")
    );
  }
);
