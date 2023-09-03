/**
 * EdwardML Notifications
 *
 * The notifications system allows users to be notified when other users
 * interact with content they created.
 *
 * Note that each Notification should be uniquely identified by a combination
 * of `interactorId` + `action` + `docId`, since this is used to delete
 * notifications if the user undoes the action that triggered it originally.
 */

/**
 * @typedef {Object} Notification
 * @property {string} interactorId The user causing this notif to be sent.
 * @property {"comment"|"love"|"applaud"|"trash"} action The action performed.
 * @property {string} docId A unique id for the item acted on.
 * @property {"comments"|"list"|"reviews"|null} docType The type of item acted
 *  on. `null` if the interactor commented on a watchlist.
 * @property {Date} time The time the action occurred.
 * @property {boolean} seen Whether the recipient has seen this notif.
 * @property {boolean} read Whether the recipient has read this notif.
 * @property {string|null} listId The id of the relevant list.
 * @property {string|null} listOwnerId The id of the relevant list owner.
 * @property {string|null} commentOwnerId The id of the relevant comment owner.
 */
