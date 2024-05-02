import { StyleSheet, Text, Dimensions } from "react-native";
import { colors } from "../config";

const { width } = Dimensions.get("screen");

const isSmallDevice = width < 390;

const sizes = {
  xl: "h1",
  lg: "h2",
  md: "h3",
  sm: "h4",
};

export default function Title({
  children,
  style = {},
  color = "black",
  size = "lg",
  ...props
}) {
  const title = sizes[size];

  return (
    <Text
      {...props}
      style={{ ...styles[title], ...{ color: colors[color] }, ...style }}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontFamily: "Manrope_700Bold",
    fontSize: isSmallDevice ? 32 : 33,
    fontStyle: "normal",
    fontWeight: "700",
  },
  h2: {
    fontFamily: "Manrope_700Bold",
    fontSize: isSmallDevice ? 25 : 26,
    fontStyle: "normal",
    fontWeight: "700",
  },
  h4: {
    fontFamily: "Manrope_700Bold",
    fontSize: isSmallDevice ? 19 : 20,
    fontStyle: "normal",
    fontWeight: "700",
  },
});
