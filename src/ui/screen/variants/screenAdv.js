import Svg, { Rect, Path } from "react-native-svg";

import { Dimensions, TouchableOpacity } from "react-native";

import Paragraph from "../../text/paragraph";
import CloseIcon from "../../icons/closeIcon";

const { width } = Dimensions.get("window");

export default function ScreenAdv({ title, route, navigation }) {
  const isCanGoBack = navigation.canGoBack();

  const handleBack = () => {
    if (isCanGoBack) {
      navigation.goBack();
    } else {
      navigation.navigate("Home");
    }
  };

  return (
    <>
      {/* <Paragraph
        color={"black"}
        size="xl"
        style={{ fontFamily: "Manrope_700Bold", width: width - 40 }}
      >
        {title}
      </Paragraph> */}

      <TouchableOpacity style={{marginLeft: 'auto'}} onPress={handleBack}>
        <CloseIcon variant={"bolder"} />
      </TouchableOpacity>
    </>
  );
}
