import { StyleSheet, Text, Dimensions } from "react-native";
import { colors } from "../config";

const { width } = Dimensions.get("screen");

const isSmallDevice = width < 390;
const isLargeDevice = width > 419;

const sizes = {
  sm: "sm",
  md: "md",
  md2: "md2",
  lg: "lg",
  xl: "xl",
  xxl: "xxl",
};

export default function Paragraph({
  children,
  style = {},
  color = "black",
  size = "md",
  ...props
}) {
  const text = sizes[size];

  return (
    <Text
      {...props}
      style={{ ...styles[text], ...{ color: colors[color] }, ...style }}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  sm: {
    fontFamily: "Manrope_500Medium",
    fontSize: isSmallDevice ? 9 : isLargeDevice ? 11 : 10,
  },
  md: {
    fontFamily: "Manrope_500Medium",
    fontSize: isSmallDevice ? 13 : 14,
    // fontSize: isSmallDevice ? 12 : 13,
  },
  md2: {
    fontFamily: "Manrope_500Medium",
    fontSize: isSmallDevice ? 13 : 14,
  },
  lg: {
    fontFamily: "Manrope_500Medium",
    fontSize: isSmallDevice ? 15 : 16,
  },
  xl: {
    fontFamily: "Manrope_700Bold",
    fontSize: isSmallDevice ? 19 : 20,
  },
  xxl: {
    fontFamily: "Manrope_700Bold",
    fontSize: isSmallDevice ? 25 : 26,
  },
});
