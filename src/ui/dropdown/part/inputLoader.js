import React from "react";
import { View } from "react-native";
import Loader from "../../preloader/loader";
import { colors } from "../../config";

export default function InputLoader({ variant = "center", style }) {
  const loader = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: variant,
  };

  return (
    <>
      <View
        style={
          variant === "left"
            ? {
                ...loader,
                ...style,
              }
            : {
                ...loader,
                ...style,
              }
        }
      >
        <Loader color={colors.blue} size="lg" />
      </View>
    </>
  );
}
