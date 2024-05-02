import React from "react";
import {
  Dimensions,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
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
import DText from "../../ui/text/dText";
export default function PostDescription({ description }) {
  return (
    <View style={tw`mb-5`}>
      <View style={tw`px-[15px]`}>
        <View style={tw`mb-2.5`}>
          <DText style={tw`text-xl font-bold mb-5`}>Описание</DText>
          <DText style={tw`text-sm leading-6`}>
            <DText>{description.replace(/"\n"/g, "")}</DText>
          </DText>
        </View>
      </View>
    </View>
  );
}
