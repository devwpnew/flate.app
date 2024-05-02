import { Dimensions, TouchableOpacity, StyleSheet, View } from "react-native";
import { colors } from "../config";

import Paragraph from "../text/paragraph";

const { width } = Dimensions.get("window");

export default function Tab({
  style,
  variant = "tabs",
  activeTab,
  onPress,
  text,
  badge,
  id,
}) {
  const handlePress = () => {
    if (onPress) {
      onPress(id);
    }
  };

  const tab = {
    backgroundColor: activeTab == id ? colors["black"] : colors["white"],
    borderWidth: 1,
    borderColor: activeTab == id ? colors["black"] : colors["black-10"],
  };

  const underscore = {
    borderBottomWidth: 2,
    borderColor: activeTab == id ? colors["black"] : colors["black-10"],
  };

  const tabStyle = style
    ? style
    : variant === "underscore"
    ? { ...styles.underscore, ...underscore }
    : { ...styles.tab, ...tab };

  function getTab() {
    if (variant === "underscore") {
      return (
        <TouchableOpacity onPress={() => handlePress()} style={tabStyle}>
          <Paragraph color={activeTab == id ? "black" : "grey-medium"} size="md">
            {text}
          </Paragraph>

          {badge && (
            <View style={styles.badge}>
              <Paragraph color={"grey-medium"} size="md">
                {badge}
              </Paragraph>
            </View>
          )}
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity onPress={() => handlePress()} style={tabStyle}>
        <Paragraph color={activeTab == id ? "white" : "grey-dark"} size="md">
          {text}
        </Paragraph>
      </TouchableOpacity>
    );
  }

  return <>{getTab()}</>;
}

const styles = StyleSheet.create({
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  underscore: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 12,
  },
  badge: {
    paddingVertical: 0,
    paddingHorizontal: 8,
    borderRadius: 999,
    overflow: "hidden",
    backgroundColor: colors["grey-light"],
  },
});
