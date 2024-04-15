import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { useConfirm } from "material-ui-confirm";
import {
  GlobeHemisphereWest,
  HandsClapping,
  Heart,
  LockSimple,
  Trash,
} from "phosphor-react";
import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
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
import { GetCountDocFromFirestore } from "./Firestore";
import Grid from "@mui/material/Grid";
import useTheme from "@mui/material/styles/useTheme";
import HtmlPageTitle from "./HtmlPageTitle";
import EmojiReactionChips from "./EmojiReactionChips";
import { getRxnTargetForWatchlist } from "../Util/ReactionUtil";
import { formatDistanceToNowStrict, fromUnixTime } from "date-fns";
import { Timestamp } from "firebase/firestore";

export default function ProfileListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const confirm = useConfirm();
  const theme = useTheme();
  const [user, loading, error] = useAuthState(auth);

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
    updateListTitle,
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
  let updateFn, deleteFn;
  let importInfo = { time: null, accountName: null };
  let deletableList = false;
  let listHasDesc = false;
  let showSuggestions = false;
  let privateList = false;
  const [countDoc, setCountDoc] = useState();

  const rxnTarget = useMemo(
    () => getRxnTargetForWatchlist(listId, userId),
    [listId, userId]
  );

  useEffect(() => {
    GetCountDocFromFirestore(rxnTarget).then((doc) => setCountDoc(doc));
  }, [rxnTarget]);

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
    privateList = list.privateList;
    updateFn = (newItems) =>
      updateList(index, { ...list, anime: newItems, desc: desc });
    deleteFn = () => deleteList(index);
    deletableList = true;
    showSuggestions = true;
    if (profile.lists[index]?.syncData?.source) {
      importInfo.time = getImportTime(profile.lists[index]);
      importInfo.accountName = profile.lists[index].syncData.accountName;
    }
  }
  // Extracts index from <ClickAndEdit/>.
  const onDescSave = (newDesc) => updateListDesc(newDesc, index);
  const onListTitleSave = (newTitle) => updateListTitle(newTitle, index);

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
      titleProps: { sx: { fontWeight: 800 } },
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
    fontWeight: 900,
    fontSize: { xs: "1.66rem", md: "2.5rem" },
    pb: 0,
  };

  const subheadStyle = {
    marginTop: "26px",
    marginBottom: "12px",
  };

  const subtitleStyle = {
    fontWeight: 600,
  };

  return (
    <Box>
      <HtmlPageTitle title={name} />
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
          elevenHundred={8}
          sevenHundredFifty={6}
          xs={10}
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            overflow: "hidden",
          }}
        >
          <ClickAndEdit
            data={name}
            label={"Edit watchlist name"}
            placeholder="Watchlist Name"
            canEdit={isOwnProfile && typeName === "Watchlist"}
            styling={headStyle}
            onSave={onListTitleSave}
          />
          <div style={{ display: "flex" }}>
            <Typography variant="body1" sx={subtitleStyle}>
              {getSubtitleText(typeName, items)}
            </Typography>
            {isOwnProfile && <PrivacySymbol privateList={privateList} />}
          </div>
          {importInfo.time && (
            <Box sx={{ display: "flex", flexWrap: "wrap", mb: 1.5 }}>
              <Typography sx={{ whiteSpace: "pre-wrap" }}>
                {"Synced from "}
              </Typography>
              <Typography
                color="inherit"
                component="a"
                href={`https://myanimelist.net/profile/${importInfo.accountName}`}
                target="_blank"
                rel="noopener"
                sx={{
                  ...subtitleStyle,
                  cursor: "pointer",
                  whiteSpace: "pre-wrap",
                  "&:hover": { color: theme.palette.primary.main },
                }}
                tabIndex={0}
              >
                {`${importInfo.accountName} on MAL `}
              </Typography>
              <Typography>{`(${importInfo.time} ago)`}</Typography>
            </Box>
          )}
        </Grid>
        <Grid
          item
          elevenHundred={3.25}
          sevenHundredFifty={5.25}
          xs={12}
          order={{ xs: 4, sevenHundredFifty: 2 }}
          sx={{
            mt: { xs: 1, sevenHundredFifty: 0 },
            display: "flex",
            justifyContent: {
              xs: "left",
              sevenHundredFifty: "right",
            },
          }}
        >
          {!privateList && (
            <EmojiReactionChips rxnTarget={rxnTarget} countDoc={countDoc} />
          )}
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
            privateList={privateList}
          />
        </Grid>

        {listHasDesc && (
          <Grid item xs={12} order={{ xs: 3, sevenHundredFifty: 4 }}>
            <ClickAndEdit
              data={desc}
              label={"Edit watchlist description"}
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
      {items?.length === 0 && <NoResultsImage />}
      {/*Suggestions*/}
      {showSuggestions && (
        <>
          <Typography variant="h3" style={subheadStyle}>
            Suggested
          </Typography>
          <ProfileListSuggestions items={items} amount={12} />
        </>
      )}

      {/* Comments */}
      {!privateList && (
        <ReviewContainer
          user={user}
          docId={`${userId}${listId}`}
          type={"comments"}
          listOwnerId={userId}
          listId={listId}
        />
      )}
    </Box>
  );
}

function getImportTime(list) {
  if (!list?.syncData?.syncDate) return;
  const syncDate = list.syncData.syncDate;

  let date;
  if (typeof syncDate === "object" && syncDate instanceof Date) {
    date = syncDate;
  } else if (typeof syncDate === "object" && syncDate instanceof Timestamp) {
    date = fromUnixTime(syncDate.seconds);
  } else if (typeof syncDate === "string") {
    date = new Date(syncDate);
  } else {
    console.error(`Unknown syncDate type encountered: ${syncDate}`);
    return "";
  }

  return formatDistanceToNowStrict(date);
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

function PrivacySymbol({ privateList }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Typography sx={{ ml: "0.25em", mr: "0.25em" }}> • </Typography>
      <Tooltip title={privateList ? "Private list" : "Public list"}>
        {privateList ? (
          <LockSimple size={20} />
        ) : (
          <GlobeHemisphereWest size={20} />
        )}
      </Tooltip>
    </div>
  );
}
