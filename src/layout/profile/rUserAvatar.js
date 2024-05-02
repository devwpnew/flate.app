import React from "react";
import { View, Image, StyleSheet } from "react-native";

import tw from "../../../lib/tailwind";
import DText from "../../ui/text/dText";
import { colors } from "../../ui/config";
import Paragraph from "../../ui/text/paragraph";

export default function RUserAvatar({ avatar, name, emptyImage = false, style = {} }) {
  let source = null;

  if (avatar) {
    const uri = {
      uri: avatar?.includes("/upload/")
        ? "https://flate.pro/" + avatar
        : avatar,
    };
    source = uri;
  }

  if (emptyImage) {
    source = require("../../../assets/thumb-not-found-avatar.png");
  }

  return (
    <View style={{...styles.container, ...style}}>
      {source ? (
        <Image style={styles.image} source={source} />
      ) : (
        <>
          <Paragraph style={{ textAlign: "center" }} color="white" size="lg">
            {createAvatar(name)}
          </Paragraph>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    borderRadius: 9999,
    overflow: "hidden",
    width: 56,
    height: 56,
    backgroundColor: colors["blue"],
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

function createAvatar(name) {
  const avatarText = name?.toUpperCase().slice(0, 2);
  return avatarText;
}
