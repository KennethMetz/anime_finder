import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { useConfirm } from "material-ui-confirm";
import { CaretLeft, X } from "phosphor-react";
import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { slugifyListName } from "../Util/ListUtil";
import NoResultsImage from "./NoResultsImage";
import ProfileListItem from "./ProfileListItem";
import ProfileListPageGhost from "./ProfileListPageGhost";
import ProfileListSuggestions from "./ProfileListSuggestions";
import ProfilePageContext from "./ProfilePageContext";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import ClickAndEdit from "./ClickAndEdit";
import ProfileListDropMenu from "./ProfileListDropMenu";

export default function ProfileListPage() {
  const navigate = useNavigate();
  const confirm = useConfirm();

  const {
    profile,
    isOwnProfile,
    isLoading,
    updateLikes,
    updateDislikes,
    updateList,
    deleteList,
    updateListDesc,
  } = useContext(ProfilePageContext);

  const params = useParams();
  const userId = params.userId;
  const listId = params.listId;

  const isListOwner = isOwnProfile;

  if (isLoading) {
    return <ProfileListPageGhost />;
  }

  let items = [];
  let name = "";
  let desc = "";
  let index = null;
  let typeName = "";
  let updateFn;
  let deleteFn;
  let deletableList = false;
  let listHasDesc = false;
  let showSuggestions = false;

  if (listId.toLowerCase() === "likes") {
    items = profile.likes;
    name = "Likes";
    typeName = "Watch History";
    updateFn = (newItems) => updateLikes(newItems);
  } else if (listId.toLowerCase() === "dislikes") {
    items = profile.dislikes;
    name = "Dislikes";
    typeName = "Watch History";
    updateFn = (newItems) => updateDislikes(newItems);
  } else if (findListWithSlug(profile.lists, listId)) {
    listHasDesc = true;
    const list = findListWithSlug(profile.lists, listId);
    console.log(list);
    index = profile.lists.indexOf(list);
    items = list.anime;
    name = list.name;
    typeName = "Watchlist";
    desc = list.desc;
    updateFn = (newItems) =>
      updateList(index, { ...list, anime: newItems, desc: desc });
    deleteFn = () => deleteList(index);
    deletableList = true;
    showSuggestions = true;
  }

  // Extracts index from <ClickAndEdit/>.
  const onDescSave = (newDesc) => updateListDesc(newDesc, index);

  // Removes item at `index` from this list.
  const onRemove = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    updateFn(newItems);
  };

  // Deletes this list.
  const onDelete = () => {
    confirm({
      title: "Delete Watchlist?",
      content: "Deleting a watchlist is permanent. There is no undo.",
      titleProps: { sx: { fontFamily: "interExtraBold" } },
      contentProps: { sx: { fontFamily: "interMedium" } },
      confirmationText: "Delete",
      cancellationButtonProps: { color: "inherit" },
      cancellationText: "Cancel",
    }).then(() => {
      deleteFn();
      navigate(`/profile/${userId}`);
    });
  };

  // Saves reordered list for drag-and-drop functionality
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    console.log(result.source.index);
    console.log(result.destination.index);

    const newItems = [...items];
    const reorderedItem = newItems.splice(result.source.index, 1);
    console.log(reorderedItem);
    newItems.splice(result.destination.index, 0, reorderedItem[0]);
    console.log(newItems);
    updateFn(newItems);
  }

  const headStyle = {
    fontFamily: "interBlack",
    fontSize: { xs: "1.66rem", md: "2.5rem" },
  };

  const subheadStyle = {
    fontFamily: "interBlack",
    fontSize: "22px",
    lineHeight: "27px",
    marginTop: "26px",
    marginBottom: "12px",
  };

  const subtitleStyle = {
    fontFamily: "interSemiBold",
    fontSize: "16px",
  };

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "8px",
          marginBottom: "8px",
        }}
      >
        <Link to={`/profile/${userId}`}>
          <IconButton color="inherit" sx={{ marginRight: "8px" }}>
            <CaretLeft />
          </IconButton>
        </Link>
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <Typography variant="h3" sx={{ ...headStyle, margin: 0 }}>
            {name}
          </Typography>
          <Typography variant="body1" sx={subtitleStyle}>
            {getSubtitleText(typeName, items)}
          </Typography>
        </Box>
        <ProfileListDropMenu
          onDelete={onDelete}
          isListOwner={isListOwner}
          deletableList={deletableList}
        />
      </Box>
      {listHasDesc && (
        <ClickAndEdit
          data={desc}
          isListOwner={isListOwner}
          onSave={onDescSave}
          ml={true}
          placeholder={"Tell us a bit about this list..."}
        />
      )}
      {/* Items */}
      {items?.length > 0 ? (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="watchlist">
            {(provided) => (
              <List {...provided.droppableProps} ref={provided.innerRef}>
                {items.map((animeItem, animeIndex) => (
                  <Draggable
                    key={animeItem.id}
                    draggableId={animeItem.display_name}
                    index={animeIndex}
                    isDragDisabled={!isOwnProfile}
                  >
                    {(provided) => (
                      <ProfileListItem
                        key={animeItem.id}
                        item={animeItem}
                        isListOwner={isListOwner}
                        onRemove={() => onRemove(animeIndex)}
                        provided={provided}
                        index={animeIndex}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <NoResultsImage />
      )}
      {/*Suggestions*/}
      {showSuggestions && (
        <>
          <Typography variant="h5" style={subheadStyle}>
            Suggested
          </Typography>
          <ProfileListSuggestions items={items} amount={12} />
        </>
      )}
    </Box>
  );
}

function findListWithSlug(lists, slug) {
  return lists.find((list) => slugifyListName(list.name) === slug);
}

function getSubtitleText(typeName, items) {
  const strings = [];
  strings.push(typeName);
  strings.push(getItemsText(items));
  return strings.join(" • ");
}

function getItemsText(items) {
  if (!items || !items.length) {
    return "No items";
  }

  if (items.length == 1) {
    return "1 item";
  }

  return `${items.length} items`;
}
