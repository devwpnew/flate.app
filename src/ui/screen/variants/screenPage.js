import { Platform, Share } from "react-native";
import Svg, { Rect, Path } from "react-native-svg";

import { TouchableOpacity, View, Dimensions, StyleSheet } from "react-native";

import Paragraph from "../../text/paragraph";

export default function ScreenPage({ title, route, navigation }) {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const product = route.params.product;
  const url = `https://flate.pro/posts/${product.section_relation[0].slug}/${product.slug}`;
  const message = `Посмотрите объявление: ${product.name} в ${product.city_link.name}`;

  const params =
    Platform.OS === "android"
      ? {
          message: `${message}:\n\n${url}`,
          title: "Посмотрите объявление:",
        }
      : {
          message: `${message}:\n\n${url}`,
        };

  const share = async () => {
    console.log(url);

    try {
      const result = await Share.share(params);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={navigation.goBack}>
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

      <View
        style={{
          flex: 1,
        }}
      >
        <Paragraph
          numberOfLines={1}
          color="black"
          size="lg"
          style={{ fontFamily: "Manrope_700Bold" }}
        >
          {title}
        </Paragraph>
      </View>

      <TouchableOpacity style={{ marginLeft: "auto" }} onPress={share}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={40}
          height={40}
          viewBox="0 0 40 40"
          fill="none"
        >
          <Rect width={40} height={40} rx={20} fill="#ECF2F8" />
          <Path
            d="M14.423 22.423a2.423 2.423 0 100-4.846 2.423 2.423 0 000 4.846zM23.577 27a2.423 2.423 0 100-4.846 2.423 2.423 0 000 4.846zM23.577 17.846a2.423 2.423 0 100-4.846 2.423 2.423 0 000 4.846zM16.587 18.923l4.825-2.423M16.587 21.077l4.825 2.423"
            stroke="#1A1F25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </TouchableOpacity>
    </>
  );
}
