import { View, Dimensions } from "react-native";
import { colors } from "../config";
import { useCallback, useEffect } from "react";

import useDynamicWidth from "../../../hooks/useDynamicWidth";
import { useNavigation } from "@react-navigation/native";

export default function PaginationStoryItem({
  maxItemWidth,
  isActive,
  isLast,
  duration = 1000,
}) {
  const navigation = useNavigation();

  const dynamicItemWidth = useDynamicWidth(maxItemWidth, duration, [isActive]);

  // если последний слайд и таймер вышел
  useEffect(() => {
    if (isLast && dynamicItemWidth && isActive) {
      setTimeout(() => {
        if (dynamicItemWidth === maxItemWidth) {
          navigation.navigate("Home");
        }
      }, 1000);
    }
  }, [isLast, dynamicItemWidth]);

  return (
    <>
      <View
        style={{
          width: maxItemWidth,
          backgroundColor: colors["black"],
          height: 2,
        }}
      >
        {isActive && (
          <View
            style={{
              width: dynamicItemWidth,
              backgroundColor: "#fff",
              height: 2,
            }}
          ></View>
        )}
      </View>
    </>
  );
}
