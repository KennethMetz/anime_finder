import { useMemo } from "react";
import Avatar from "@mui/material/Avatar";
import { getAvatarSrc } from "./Avatars";

export default function SearchAvatars({ item }) {
  const avatarSrc = useMemo(() => getAvatarSrc(item?.avatar), [item?.avatar]);

  return <Avatar alt={item.name} src={avatarSrc}></Avatar>;
}
