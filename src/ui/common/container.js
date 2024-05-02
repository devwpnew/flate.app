import { View, StyleSheet } from "react-native";

export default function Container({ style, children }) {
  return <View style={{ ...styles.container, ...style }}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});
