import Svg, { Rect, Path } from "react-native-svg";

import { Dimensions, Image, TouchableOpacity, View } from "react-native";

import Paragraph from "../../text/paragraph";
import CloseIcon from "../../icons/closeIcon";

const { width } = Dimensions.get("window");

export default function ScreenStory({ isInvert, title, route, navigation }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Image
        width={50}
        height={50}
        style={{ borderRadius: 100, width: 50, height: 50 }}
        source={route.params.image}
      />

      <Paragraph
        numberOfLines={1}
        color={isInvert ? "white" :"black"}
        size="md"
        style={{ fontFamily: "Manrope_600SemiBold", width: width - 140 }}
      >
        {title}
      </Paragraph>

      <TouchableOpacity style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 15 }} onPress={navigation.goBack}>
        <CloseIcon isInvert={isInvert} />
      </TouchableOpacity>
    </View>
  );
}
