import { createContext } from "react";

const ProfilePageContext = createContext({
  profile: undefined,
  animeObjects: undefined,
  profileUserId: undefined,
  isOwnProfile: false,
  isLoading: false,
  updateDisplayName: (name) => {},
  updateBio: (bio) => {},
  updateAvatar: (avatar) => {},
  updateLikes: (likes) => {},
  updateDislikes: (dislikes) => {},
  updateList: (list) => {},
  updateSavedList: (userId, listId) => {},
  deleteList: (index) => {},
  updateTop8: (top8) => {},
});

export default ProfilePageContext;
