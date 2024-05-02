import { View, StyleSheet } from "react-native";
import { colors } from "../../config";
import { useEffect, useMemo, useState } from "react";

export default function InputContainer({
  color,
  shadow,
  rounded,
  isValid,
  isSuccess,
  children,
  style = {},
}) {
  const sBackground = useMemo(() => {
    let borderColorValue = "transparent";

    if (isSuccess) {
      borderColorValue = colors["green-dark"];
    }

    if (!isValid) {
      borderColorValue = "#FAD1D1";
    }

    let styles = {
      borderColor: borderColorValue,
      backgroundColor: isValid ? colors[color] : "#F8ECEC",
      borderRadius: 10,
      borderWidth: 1,
    };

    if (shadow) {
      styles = {
        ...styles,
        shadowColor: "#6F7882",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 2,
      };
    }

    return styles;
  }, [isSuccess, isValid]);

  const sContainer = shadow ? { ...styles.container } : {};
  const sContainerStyle = {
    ...sBackground,
    ...styles.bordered,
  };

  if (rounded) {
    sContainer.borderRadius = 100;
  }

  return (
    <>
      <View style={sContainer}>
        <View style={sContainerStyle}>
          <View style={{ ...styles.row, ...style }}>{children}</View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  container: {
    position: "relative",
  },
  bordered: {
    borderRadius: 10,
    borderWidth: 1,
  },
});
