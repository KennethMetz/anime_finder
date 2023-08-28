import Box from "@mui/material/Box";
import { RxnTypes } from "../Util/ReactionUtil";
import useReactionState from "../Hooks/useReactionState";
import EmojiReactionChipNew from "./EmojiReactionChipNew";

export default function EmojiReactionChips({ rxnTarget, countDoc }) {
  const [userRxns, updateUserRxns] = useReactionState(rxnTarget);

  return (
    <Box sx={{ display: "flex" }}>
      {RxnTypes.map((rxnType) => (
        <EmojiReactionChipNew
          key={rxnType.key}
          userRxns={userRxns}
          updateUserRxns={updateUserRxns}
          countDoc={countDoc}
          rxnTarget={rxnTarget}
          rxnType={rxnType}
        />
      ))}
    </Box>
  );
}
