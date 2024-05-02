import React from "react";
import { View, Image } from "react-native";

import tw from "../../../lib/tailwind";
import DText from "../../ui/text/dText";

export default function UserAvatar({
  style = {},
  textStyle,
  avatar,
  name,
  emptyImage = false,
}) {
  return (
    <View style={style ? style : tw`rounded-full bg-bluelight2`}>
      <View style={tw`flex items-center justify-center w-full h-full`}>
        {avatar ? (
          <Image
            style={tw`w-full h-full rounded-full`}
            source={{
              uri: avatar.includes("/upload/")
                ? "https://flate.pro/" + avatar
                : avatar,
            }}
          />
        ) : (
          <>
            {emptyImage ? (
              <Image
                style={tw`w-[80px] h-[80px] rounded overflow-hidden`}
                source={require("../../../assets/thumb-not-found-avatar.png")}
              />
            ) : (
              <DText style={textStyle ? textStyle : tw`text-white text-3xl`}>
                {createAvatar(name)}
              </DText>
            )}
          </>
        )}
      </View>
    </View>
  );
}
function createAvatar(name) {
  const avatarText = name?.toUpperCase().slice(0, 2);
  return avatarText;
}
