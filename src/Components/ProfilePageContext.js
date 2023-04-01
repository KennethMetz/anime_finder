import { createContext } from "react";

const ProfilePageContext = createContext({
  profile: undefined,
  profileUserId: undefined,
  isOwnProfile: false,
  isLoading: false,
  updateBio: (bio) => {},
  updateAvatar: (avatar) => {},
  updateLikes: (likes) => {},
  updateDislikes: (dislikes) => {},
  updateList: (index, list) => {},
  deleteList: (index) => {},
  updateTop8: (top8) => {},
});

export default ProfilePageContext;
