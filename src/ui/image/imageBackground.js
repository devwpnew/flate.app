import { Image } from "expo-image";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";

/**
 * Wraper around `expo-image` to be able to use it with children on android.
 * @see https://github.com/expo/expo/issues/22338
 */
export function ImageBackground({ children, ...props }) {
  const isAndroid = Platform.OS === "android";

  if (isAndroid) {
    return (
      <View style={styles.container}>
        <Image {...props} />
        <View style={[styles.chlidren, StyleSheet.absoluteFill, props.style]}>
          {children}
        </View>
      </View>
    );
  }

  return <Image {...props} children={children} />;
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  chlidren: {
    zIndex: 1,
  },
});
