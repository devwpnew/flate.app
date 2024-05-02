import {
  Linking,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";

import Paragraph from "../../../ui/text/paragraph";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function BannerItem({
  style = {},
  isGradient,
  variant = "horizontal",
  heading,
  link,
  onPress,
  url,
  image,
  headingColor = "white",
  linkColor = "white",
}) {
  const openUrl = (path) => {
    Linking.openURL(`https://flate.pro${path}`).catch((error) =>
      console.log("Не удалось открыть ссылку", error)
    );
  };

  const getGradient = () => {
    let colors = [];

    if (isGradient) {
      if (Platform.OS === "ios") {
        colors = ["#1A1F25", "##1a1f2500"];
      } else {
        colors = ["#1A1F25", "transparent"];
      }
    }

    return colors.length > 0 ? colors : null;
  };

  const colors = getGradient();

  const getGradientProps = () => {
    if (isGradient) {
      return {
        start: [0, 0],
        end: [1, 0],
        colors: colors,
      };
    }

    return {};
  };

  const gradientProps = getGradientProps();
  // console.log(gradientProps, 'gradientProps')
  return (
    <>
      <TouchableOpacity
        onPress={url ? () => openUrl(url) : onPress}
        style={{
          ...styles.itemContainer,
          width: variant === "vertical" ? "100%" : width / 1.3,
          ...style,
        }}
      >
        <ImageBackground
          style={{
            flex: 1,
            position: "relative",
            width: "100%",
            height: width / 1.3 / 2.5,
            overflow: "hidden",
          }}
          imageStyle={{
            resizeMode: "cover",
            height: "100%",
            position: "absolute",
            right: "45%",
            bottom: "45%",
          }}
          // style={styles.imageBackground}
          source={image}
          resizeMode="cover"
          objectFit="cover"
        >
          <LinearGradient
            style={{ flex: 1, padding: 20 }}
            colors={
              isGradient
                ? ["#1A1F25", "rgba(26, 31, 37, 0.00)"]
                : ["transparent", "transparent"]
            }
            start={[0, 0]}
            end={[1, 0]}
          >
            <Paragraph
              numberOfLines={3}
              style={styles.heading}
              color={headingColor}
              size="md"
            >
              {heading}
            </Paragraph>
            <Paragraph style={styles.link} color={linkColor} size="sm">
              {link} 
              {/* → */}
            </Paragraph>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    overflow: "hidden",
    borderRadius: 20,
  },
  heading: {
    width: "58%",
    height: 58,
    marginBottom: 10,
  },
  link: {
    width: "58%",
  },
  imageBackground: {
    padding: 0,
    height: width / 1.3 / 2.5,
  },
});
