import { StyleSheet, View, SafeAreaView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ScreenDefault from "./variants/screenDefault";
import ScreenHome from "./variants/screenHome";
import ScreenPage from "./variants/screenPage";
import ScreenProfile from "./variants/screenProfile";
import ScreenCategory from "./variants/screenCategory";
import ScreenSettings from "./variants/screenSettings";
import ScreenStory from "./variants/screenStory";
import ScreenAdv from "./variants/screenAdv";

import { colors } from "../config";
import Container from "../common/container";
import ScreenCollections from "./variants/screenCollections";

export default function ScreenHeader({
  variant = "default",
  title,
  route,
  style = {},
  color = "white",
  isInvert = false,
  url = null,
  isPage = false,
}) {
  const navigation = useNavigation();
  const props = { title: title, route: route, navigation: navigation };

  const variants = {
    home: <ScreenHome {...props} />,
    default: <ScreenDefault isInvert={isInvert} {...props} />,
    adv: <ScreenAdv {...props} />,
    page: <ScreenPage {...props} />,
    profile: <ScreenProfile {...props} />,
    category: <ScreenCategory {...props} />,
    notifications: <ScreenProfile variant="count" {...props} />,
    settings: <ScreenSettings {...props} />,
    story: <ScreenStory isInvert={isInvert} {...props} />,
    collections: <ScreenCollections isPage={isPage} {...props} />,
    "safe-bar": <ScreenDefault isTransparent={true} isInvert={isInvert} {...props} />,
  };
  return (
    <>
      {variant == "empty" ? (
        <></>
      ) : (
        <SafeAreaView
          style={{
            backgroundColor: isInvert ? "#000" : colors[color],
            ...style,
          }}
        >
          <Container>
            <View style={styles.container}>
              <View style={styles.row}>{variants[variant]}</View>
            </View>
          </Container>
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    minHeight: Platform.OS === "android" ? 90 : 40,
    position: "relative",
    zIndex: 10000,
  },
  row: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingBottom: 10,
  },
});
