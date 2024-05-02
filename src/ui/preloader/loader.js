import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native";

import colors from "../config";

const sizes = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

export default function Loader({
  size = "small",
  color = "#479AFF",
  ...props
}) {
  const height = sizes[size];

  return <ActivityIndicator style={styles[height]} color={color} {...props} />;
}

const styles = StyleSheet.create({
  sm: {
    height: 16,
  },
  md: {
    height: 18,
  },
  lg: {
    height: 23,
  },
});
