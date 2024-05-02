import React from "react";

import {
  Dimensions,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import tw from "../../../lib/tailwind";
import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from "react-native-svg";

import Main from "../../layout/main/main";
import Footer from "../../layout/main/footer";
import MessagesItem from "../../layout/messages/item/item";
import FallbackDevelopment from "../../ui/fallback/fallbackDevelopment";

export default function Messages({ navigation }) {
  const [text, onChangeText] = React.useState("Поиск по сообщениям");

  return (
    <Main>
      <View style={tw`flex flex-col items-center justify-center h-full`}>
        <FallbackDevelopment />
        <View style={tw`h-[70px]`}></View>
      </View>
      <Footer navigation={navigation} />
    </Main>
  );
}
