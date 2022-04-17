import { Avatar, Box } from "@vikadata/components";
import React from "react";

export const ItemBox = ({ item }) => {
  const avatarSrc = item.avatar && item.avatar?.flat()[0] ? item.avatar.flat()[0].url : undefined;

  return (
    <Box
      display='flex'
      alignItems='center'
      onDoubleClick={() => item.expandRecord({ recordIds: [item.id] })}
    >
      <Avatar src={avatarSrc} alt={item.person}>{item.person[0]}</Avatar>
      <span>{item.content}</span>
    </Box>
  )
}