import { Box, IconButton, List, Tooltip, Typography } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { CaretLeft, X } from "phosphor-react";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import { slugifyListName } from "../Util/ListUtil";
import { auth } from "./Firebase";
import { SaveToFirestore } from "./Firestore";
import { LocalUserContext } from "./LocalUserContext";
import NoResultsImage from "./NoResultsImage";
import ProfileListItem from "./ProfileListItem";

export default function ProfileListPage() {
  const navigate = useNavigate();
  const confirm = useConfirm();

  const [localUser, setLocalUser] = useContext(LocalUserContext);
  const [user, loading, error] = useAuthState(auth);

  const params = useParams();
  const listId = params.listId;

  let items = [];
  let name = "";
  let updateFn;
  let deleteFn;
  let canDelete = false;

  if (listId.toLowerCase() === "likes") {
    items = localUser.likes;
    name = "Likes";
    updateFn = (newLocalUser, newItems) => (newLocalUser.likes = newItems);
  } else if (listId.toLowerCase() === "dislikes") {
    items = localUser.dislikes;
    name = "Dislikes";
    updateFn = (newLocalUser, newItems) => (newLocalUser.dislikes = newItems);
  } else if (findListWithSlug(localUser.lists, listId)) {
    const list = findListWithSlug(localUser.lists, listId);
    const index = localUser.lists.indexOf(list);
    items = list.anime;
    name = list.name;
    updateFn = (newLocalUser, newItems) =>
      (newLocalUser.lists[index] = { ...list, anime: newItems });
    deleteFn = (newLocalUser) => newLocalUser.lists.splice(index, 1);
    canDelete = true;
  }

  // Removes item at `index` from this list.
  const onRemove = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    const newLocalUser = { ...localUser };
    updateFn(newLocalUser, newItems);
    setLocalUser(newLocalUser);
    SaveToFirestore(user, newLocalUser);
  };

  // Deletes this list.
  const onDelete = () => {
    confirm({
      title: "Delete Watchlist?",
      content: "Deleting a watchlist is permanent. There is no undo.",
      titleProps: { sx: { fontFamily: "interExtraBold" } },
      contentProps: { sx: { fontFamily: "interMedium" } },
    }).then(() => {
      const newLocalUser = { ...localUser };
      deleteFn(newLocalUser);
      setLocalUser(newLocalUser);
      SaveToFirestore(user, newLocalUser);
      navigate("/profile");
    });
  };

  const headStyle = {
    fontFamily: "interBlack",
    fontSize: { xs: "22px", md: "40px" },
    lineHeight: { xs: "27px", md: "49px" },
  };

  return (
    <Box sx={{ paddingLeft: { xs: 0, md: "45px" } }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "32px" }}>
        <Link to={"/profile"}>
          <IconButton color="inherit" sx={{ marginRight: "8px" }}>
            <CaretLeft />
          </IconButton>
        </Link>
        <Typography variant="h3" sx={{ ...headStyle, flexGrow: 1 }}>
          {name}
        </Typography>
        {canDelete && (
          <Tooltip title="Delete list">
            <IconButton
              size="large"
              variant="contained"
              color="inherit"
              sx={{ marginLeft: "0.75rem" }}
              onClick={onDelete}
            >
              <X />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* Items */}
      {items?.length > 0 ? (
        <List>
          {items.map((animeItem, animeIndex) => (
            <ProfileListItem
              key={animeItem.id}
              item={animeItem}
              onRemove={() => onRemove(animeIndex)}
            />
          ))}
        </List>
      ) : (
        <NoResultsImage />
      )}
    </Box>
  );
}

function findListWithSlug(lists, slug) {
  return lists.find((list) => slugifyListName(list.name) === slug);
}
