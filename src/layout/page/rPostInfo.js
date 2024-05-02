import { View, StyleSheet, Dimensions } from "react-native";

import Paragraph from "../../ui/text/paragraph";
import { colors } from "../../ui/config";

const { width } = Dimensions.get("window");

export default function RPostInfo({ items }) {
  return (
      <View style={styles.wrapper}>
        {items?.map(({ text, icon }, index) => {
          const posCount = index + 1;

          let style = styles.item;

          if (posCount % 2 === 0) {
            style = { ...style, justifyContent: "center" };
          }

          if (posCount === items.length) {
            style = { ...style, justifyContent: "flex-end" };
          }

          return (
            <View key={index} style={style}>
              {icon}
              <Paragraph size="md" color="grey-medium">
                {text}
              </Paragraph>
            </View>
          );
        })}
      </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    gap: 20,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
