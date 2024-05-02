import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View, ScrollView } from "react-native";

import { DragSortableView } from "react-native-drag-sort";

const { width } = Dimensions.get("window");

const parentWidth = width - 20;
const childrenWidth = width - 20;
const childrenHeight = 62;

const CollectionsSortable = ({
  onPress,
  onDataChange,
  onDragStart,
  onDragEnd,
  CollectionItem,
  collectionData = [],
}) => {
  const [data, setData] = useState(collectionData);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  useEffect(() => {
    setData(collectionData);
  }, [collectionData]);

  const handleDragStart = (startIndex, endIndex) => {
    setScrollEnabled(false);

    if (onDragStart) {
      onDragStart({ startIndex, endIndex });
    }
  };

  const handleDragEnd = (startIndex) => {
    setScrollEnabled(true);
    if (onDragEnd) {
      onDragEnd(data);
    }
  };

  const handleDataChange = (newData) => {
    if (newData.length !== data.length) {
      setData(newData);
    }
    if (onDataChange) {
      onDataChange(newData);
    }
  };

  const renderItem = (item, index) => {
    return (
      <View style={styles.item}>
        <View style={styles.children}>
          <CollectionItem onPress={() => onPress(item)} {...item} />
        </View>
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1, paddingHorizontal: 10 }}>
      <ScrollView
        ref={(scrollView) => (this.scrollView = scrollView)}
        scrollEnabled={scrollEnabled}
        style={styles.container}
      >
        <DragSortableView
          dataSource={data}
          parentWidth={parentWidth}
          childrenWidth={childrenWidth}
          childrenHeight={childrenHeight}
          scaleStatus={"scaleY"}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDataChange={handleDataChange}
          keyExtractor={(item) => item.id}
          onClickItem={(data, item, index) => {
            if (onPress) {
              onPress(item);
            }
          }}
          renderItem={renderItem}
        />

        <View style={{ height: 120 }}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: childrenWidth,
    height: childrenHeight,
  },
  children: {
    display: "flex",
    justifyContent: "center",
    width: childrenWidth,
    height: childrenHeight - 10,
    marginTop: 10,
  },
});

export default CollectionsSortable;
