import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { useConfirm } from "material-ui-confirm";
import { CaretLeft, HandsClapping, Heart, Trash, X } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
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
import ReviewContainer from "./ReviewContainer";
import { auth } from "./Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import EmojiReactionChip from "./EmojiReactionChip";
import { GetListReactions } from "./Firestore";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

export default function ProfileListPage() {
  const navigate = useNavigate();
  const confirm = useConfirm();
  const theme = useTheme();
  const [user, loading, error] = useAuthState(auth);
  const [listRxns, setListRxns] = useState({
    emojis: { applause: [], heart: [], trash: [] },
  });

  const {
    profile,
    animeObjects,
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

  let items = [];
  let itemsIds = [];
  let name = "";
  let desc = "";
  let index = null;
  let typeName = "";
  let updateFn;
  let deleteFn;
  let deletableList = false;
  let listHasDesc = false;
  let showSuggestions = false;

  useEffect(() => {
    GetListReactions(`${userId}+${listId}`, setListRxns);
  }, [listId]);

  const sevenHundredFifty = useMediaQuery(
    theme.breakpoints.up("sevenHundredFifty")
  );

  if (isLoading) {
    return <ProfileListPageGhost />;
  }
  if (listId.toLowerCase() === "likes") {
    items = animeObjects?.likes;
    itemsIds = profile.likes;
    name = "Likes";
    typeName = "Watch History";
    updateFn = (newItems) => updateLikes(newItems);
  } else if (listId.toLowerCase() === "dislikes") {
    items = animeObjects?.dislikes;
    itemsIds = profile.dislikes;
    name = "Dislikes";
    typeName = "Watch History";
    updateFn = (newItems) => updateDislikes(newItems);
  } else if (findListWithId(profile.lists, listId)) {
    listHasDesc = true;
    const list = findListWithId(profile.lists, listId);
    index = profile.lists.indexOf(list);
    items = animeObjects?.lists[index]?.anime;
    itemsIds = profile.lists[index]?.anime;
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
    const newItems = [...itemsIds];
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

    const newItems = [...itemsIds];
    const reorderedItem = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem[0]);
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
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "8px",
          marginBottom: "8px",
        }}
      >
        <Grid
          item
          sevenHundredFifty={6}
          xs={10}
          sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
        >
          <Typography variant="h3" sx={{ ...headStyle, margin: 0 }}>
            {name}
          </Typography>
          <Typography variant="body1" sx={subtitleStyle}>
            {getSubtitleText(typeName, items)}
          </Typography>
        </Grid>
        <Grid
          item
          sevenHundredFifty={5.25}
          xs={12}
          order={{ xs: 4, sevenHundredFifty: 2 }}
          sx={{
            textAlign: {
              xs: "left",
              sevenHundredFifty: "right",
            },
          }}
        >
          <EmojiReactionChip
            docId={`${userId}+${listId}`}
            item={listRxns}
            setItem={setListRxns}
            emoji={<HandsClapping size={24} />}
            reaction="applause"
            type="list"
          ></EmojiReactionChip>
          <EmojiReactionChip
            docId={`${userId}+${listId}`}
            item={listRxns}
            setItem={setListRxns}
            emoji={<Heart size={24} />}
            reaction="heart"
            type="list"
          ></EmojiReactionChip>
          <EmojiReactionChip
            docId={`${userId}+${listId}`}
            item={listRxns}
            setItem={setListRxns}
            emoji={<Trash size={24} />}
            reaction="trash"
            type="list"
          ></EmojiReactionChip>
        </Grid>
        <Grid
          item
          xs={2}
          sevenHundredFifty={0.75}
          order={{ xs: 2, sevenHundredFifty: 3 }}
          sx={{ textAlign: "right" }}
        >
          <ProfileListDropMenu
            onDelete={onDelete}
            isOwnProfile={isOwnProfile}
            deletableList={deletableList}
            userId={userId}
            listId={listId}
          />
        </Grid>

        {listHasDesc && (
          <Grid item xs={12} order={{ xs: 3, sevenHundredFifty: 4 }}>
            <ClickAndEdit
              data={desc}
              canEdit={isOwnProfile}
              onSave={onDescSave}
              placeholder={"Tell us a bit about this list..."}
            />
          </Grid>
        )}
      </Grid>
      {/* Items */}
      {items && (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="watchlist">
            {(provided) => (
              <List {...provided.droppableProps} ref={provided.innerRef}>
                {items[0] &&
                  items?.map((animeItem, animeIndex) => (
                    <Draggable
                      key={animeItem.id}
                      draggableId={animeItem.display_name ?? animeItem.name}
                      index={animeIndex}
                      isDragDisabled={!isOwnProfile}
                    >
                      {(provided) => (
                        <ProfileListItem
                          key={animeItem.id}
                          item={animeItem}
                          isOwnProfile={isOwnProfile}
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
      )}
      {items === [] && <NoResultsImage />}
      {/*Suggestions*/}
      {showSuggestions && (
        <>
          <Typography variant="h5" style={subheadStyle}>
            Suggested
          </Typography>
          <ProfileListSuggestions items={items} amount={12} />
        </>
      )}

      {/* Comments */}
      <ReviewContainer
        user={user}
        docId={`${userId}+${listId}`}
        type={"comments"}
      />
    </Box>
  );
}

function findListWithId(lists, id) {
  return lists.find((list) => list.id === id);
}

function getSubtitleText(typeName, items) {
  if (!items) return "";

  const strings = [];
  strings.push(typeName);
  strings.push(getItemsText(items));
  return strings.join(" • ");
}

function getItemsText(items) {
  if (!items.length) {
    return "No items";
  }

  if (items.length == 1) {
    return "1 item";
  }

  return `${items.length} items`;
}
