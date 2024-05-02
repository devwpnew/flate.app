import Svg, { Rect, Path } from "react-native-svg";

import { Dimensions, TouchableOpacity } from "react-native";

import Paragraph from "../../text/paragraph";

const { width } = Dimensions.get("window");

export default function ScreenDefault({
  isTransparent,
  isInvert,
  title,
  route,
  navigation,
}) {
  const isCanGoBack = navigation.canGoBack();

  const handleBack = () => {
    if (route.params?.isCantGoBack) {
      navigation.navigate("Profile");

      return;
    }

    if (isCanGoBack) {
      navigation.goBack();
    } else {
      navigation.navigate("Home");
    }
  };

  return (
    <>
      <TouchableOpacity onPress={handleBack}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={40}
          height={40}
          viewBox="0 0 40 40"
          fill="none"
        >
          <Rect width={40} height={40} rx={20} fill="#ECF2F8" />
          <Path
            d="M22.302 14l-6.15 6.15a.481.481 0 000 .7l6.15 6.15"
            stroke="#1A1F25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </TouchableOpacity>

      {isTransparent ? (
        <Paragraph
          numberOfLines={1}
          size="lg"
          style={{ fontFamily: "Manrope_700Bold", width: width - 100, color: "transparent" }}
        >
          {title}
        </Paragraph>
      ) : (
        <Paragraph
          numberOfLines={1}
          color={isInvert ? "white" : "black"}
          size="lg"
          style={{ fontFamily: "Manrope_700Bold", width: width - 100 }}
        >
          {title}
        </Paragraph>
      )}
    </>
  );
}
