import React from "react";
import PaginationStoryItem from "./paginationStoryItem";
import { View,Dimensions } from "react-native";


const { width, height } = Dimensions.get("window");


export default function PaginationStory({
  duration = 10000,
  slidesCount,
  currentSlide,
}) {
  const template = [];
  const gap = slidesCount > 1 ? 12 : 0;
  const container = width - 40
  const maxItemWidth = container / slidesCount - gap
  
  for (let i = 0; i < slidesCount; i++) {
    template.push(
      <>
        <PaginationStoryItem
          duration={duration}
          maxItemWidth={maxItemWidth}
          isActive={currentSlide === i}
          isLast={i + 1 === slidesCount}
        />
      </>
    );
  }

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 6,
        marginTop: 0,
      }}
    >
      {template}
    </View>
  );
}
