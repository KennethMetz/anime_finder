/**
 * EdwardML Reactions
 *
 * Using the reactions system, the user can 'react' to content.  The content
 * receiving a reaction is called the 'target'.  There are different types of
 * reactions, and the user can select to perform any subset of them on a
 * specific target.
 *
 * Key concepts:
 *
 * - UserRxns: a document holding the user's reaction states toward a target.
 *
 * - CountDoc: a document holding current reaction counts for a target.
 *
 * - RxnTarget: An object holding a description of the target of a reaction.
 *       Should be obtained ONLY via functions in this file.
 *
 * - RxnType: An object describing a type of reaction.  Should be obtained
 *       ONLY from const `RxnTypes` exported from this file.
 */

import { HandsClapping, Heart, Trash } from "phosphor-react";

/**
 * @typedef {Object} RxnTarget
 * @property {"review"|"list"|"listComment"} type The type of target.
 * @property {string} noun A noun to use in UI text.
 * @property {string} entityId A globally unique ID for this reaction target.
 * @property {string} rxnCollectionPath A path to the collection with userRxns.
 * @property {string} countDocPath A path to the document with reaction counts.
 * @property {string} ownerId The owner of this target.  They may be notified.
 * @property {RxnTargetNotifData} notifData Partial notification data that will
 *  be merged into Notifications sent about interactions with this target.
 */

/**
 * @typedef {Object} RxnTargetNotifData
 * @property {string} docId A unique id for the item acted on.
 * @property {"comments"|"list"|"reviews"} docType The type of item acted on.
 * @property {string|null} listId The id of the relevant list.
 * @property {string|null} listOwnerId The id of the relevant list owner.
 * @property {string|null} commentOwnerId The id of the relevant comment owner.
 */

/**
 * Build a `RxnTarget` for an anime review.
 * @param {number} animeId The id of the anime being reviewed.
 * @param {string} reviewAuthorId The uid of the author of the reivew.
 * @returns {RxnTarget} A `RxnTarget` for the specified anime review.
 */
export function getRxnTargetForAnimeReview(animeId, reviewAuthorId) {
  return {
    type: "review",
    noun: "review",
    entityId: `review-${animeId}-${reviewAuthorId}`,
    rxnCollectionPath: [
      "animeData",
      animeId,
      "reviews",
      reviewAuthorId,
      "reactions",
    ].join("/"),
    countDocPath: ["animeData", animeId, "reviews", reviewAuthorId].join("/"),
    ownerId: reviewAuthorId,
    notifData: {
      // docId needs to be just id because of a use in NotificationListItem.
      docId: animeId,
      docType: "reviews",
      listId: null,
      listOwnerId: null,
      commentOwnerId: null,
    },
  };
}

/**
 * Build a `RxnTarget` for a watchlist.
 * @param {string} listId The id of the list.
 * @param {string} listOwnerId The uid of the owner of the list.
 * @returns {RxnTarget} A `RxnTarget` for the specified watchlist.
 */
export function getRxnTargetForWatchlist(listId, listOwnerId) {
  return {
    type: "list",
    noun: "list",
    entityId: `list-${listOwnerId}${listId}`,
    rxnCollectionPath: [
      "watchlistData",
      listOwnerId + listId,
      "reactions",
    ].join("/"),
    countDocPath: ["watchlistData", listOwnerId + listId].join("/"),
    ownerId: listOwnerId,
    notifData: {
      docId: `list-${listOwnerId}${listId}`,
      docType: "list",
      listId,
      listOwnerId,
      commentOwnerId: null,
    },
  };
}

/**
 * Build a `RxnTarget` for a watchlist comment.
 * @param {string} listId The id of the list being commented on.
 * @param {string} listOwnerId The uid of the owner of the list.
 * @param {string} commentAuthorId The uid of the author of the comment.
 * @returns {RxnTarget} A `RxnTarget` for the specified watchlist comment.
 */
export function getRxnTargetForWatchlistComment(
  listId,
  listOwnerId,
  commentAuthorId
) {
  return {
    type: "listComment",
    noun: "comment",
    entityId: `listComment-${listOwnerId}${listId}-${commentAuthorId}`,
    rxnCollectionPath: [
      "watchlistData",
      listOwnerId + listId,
      "reviews",
      commentAuthorId,
      "reactions",
    ].join("/"),
    countDocPath: [
      "watchlistData",
      listOwnerId + listId,
      "reviews",
      commentAuthorId,
    ].join("/"),
    ownerId: commentAuthorId,
    notifData: {
      docId: `listComment-${listOwnerId}${listId}-${commentAuthorId}`,
      docType: "comments",
      listId,
      listOwnerId,
      commentOwnerId: commentAuthorId,
    },
  };
}

/**
 * @typedef {Object} RxnType
 * @property {"love"|"applaud"|"trash"} type The type of reaction.
 * @property {string} key The key for this type's value and count in firestore.
 * @property {string} verb A verb representing this action to use in UI text.
 * @property {JSX.Element} emoji The icon component to be shown on buttons.
 * @property {boolean} notifies Whether notifications should be sent.
 */

/** @type {RxnType[]} */
export const RxnTypes = Object.freeze([
  {
    type: "applaud",
    key: "applaud",
    verb: "Applaud",
    emoji: <HandsClapping />,
    notifies: true,
  },
  {
    type: "love",
    key: "love",
    verb: "Love",
    emoji: <Heart />,
    notifies: true,
  },
  {
    type: "trash",
    key: "trash",
    verb: "Disagree with",
    emoji: <Trash />,
    notifies: false,
  },
]);

/**
 * Builds a default UserRxns doc for the specified `rxnTarget`.
 * @param {RxnTarget} rxnTarget The RxnTarget to build the UserRxns for.
 * @returns {Object} A default UserRxns doc.
 */
export function getDefaultUserRxns(rxnTarget) {
  const userRxns = {
    uniqueTargetId: rxnTarget.entityId,
    ownerId: rxnTarget.ownerId,
  };
  for (const rxnType of RxnTypes) {
    userRxns[rxnType.key] = false;
  }
  return userRxns;
}

/**
 * Builds a default CountDoc doc.  The doc will contain one field `reactionCounts`
 * which contains a map of all reaction type keys to initial counts of 0.
 * @returns {Object} A default CountDoc doc.
 */
export function getDefaultCountDoc() {
  const reactionCounts = {};
  for (const rxnType of RxnTypes) {
    reactionCounts[rxnType.key] = 0;
  }
  return { reactionCounts };
}
