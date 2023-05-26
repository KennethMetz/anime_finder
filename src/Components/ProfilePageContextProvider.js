import { useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useProfile } from "./APICalls";
import { auth } from "./Firebase";
import { SaveToFirestore } from "./Firestore";
import { LocalUserContext } from "./LocalUserContext";
import ProfilePageContext from "./ProfilePageContext";
import useProfileWithAnime from "../Hooks/useProfileWithAnime";

export default function ProfilePageContextProvider({ userId, children }) {
  const [user, loading] = useAuthState(auth);
  const { data: profile, isLoading: profileLoading } = useProfile(userId);
  const [localUser, setLocalUser] = useContext(LocalUserContext);

  const userOwnsProfile = user && profile && user.uid === profile.uid;
  const profileToUse = userOwnsProfile ? localUser : profile;

  const [animeObjects, isLoadingAnime, errorAnime] =
    useProfileWithAnime(profileToUse);

  const value = {
    profile: profileToUse,
    animeObjects: animeObjects,
    profileUserId: userId,
    isOwnProfile: userOwnsProfile,
    isLoading: loading || profileLoading || !localUser?.uid || isLoadingAnime,
    updateDisplayName: (name) => {
      throwIfNotOwner();
      const newLocalUser = { ...localUser, name };
      save(newLocalUser);
    },
    updateBio: (bio) => {
      throwIfNotOwner();
      const newLocalUser = { ...localUser, bio };
      save(newLocalUser);
    },
    updateAvatar: (avatar) => {
      throwIfNotOwner();
      const newLocalUser = { ...localUser, avatar };
      save(newLocalUser);
    },
    updateLikes: (likes) => {
      throwIfNotOwner();
      const newLocalUser = { ...localUser, likes };
      save(newLocalUser);
    },
    updateDislikes: (dislikes) => {
      throwIfNotOwner();
      const newLocalUser = { ...localUser, dislikes };
      save(newLocalUser);
    },
    updateList: (index, list) => {
      throwIfNotOwner();
      const newLocalUser = { ...localUser };
      newLocalUser.lists[index] = list;
      save(newLocalUser);
    },
    deleteList: (index) => {
      throwIfNotOwner();
      const newLocalUser = { ...localUser };
      newLocalUser.lists.splice(index, 1);
      save(newLocalUser);
    },
    updateTop8: (top8) => {
      throwIfNotOwner();
      const newLocalUser = { ...localUser, top8 };
      save(newLocalUser);
    },
    updateListDesc: (desc, index) => {
      throwIfNotOwner();
      const newLocalUser = { ...localUser };
      newLocalUser.lists[index].desc = desc;
      save(newLocalUser);
    },
    updateListTitle: (title, index) => {
      throwIfNotOwner();
      const newLocalUser = { ...localUser };
      newLocalUser.lists[index].name = title;
      save(newLocalUser);
    },
  };

  const throwIfNotOwner = () => {
    if (!userOwnsProfile) {
      throw new Error("Trying to edit a profile without ownership.");
    }
  };

  const save = (newLocalUser) => {
    setLocalUser(newLocalUser);
    SaveToFirestore(user, newLocalUser);
  };

  return (
    <ProfilePageContext.Provider value={value}>
      {children}
    </ProfilePageContext.Provider>
  );
}
