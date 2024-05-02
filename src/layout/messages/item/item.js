import React from "react";
import {
  Dimensions,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import tw from "../../../../lib/tailwind";
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
import DText from "../../../ui/text/dText";
import UserAvatar from "../../profile/userAvatar";

export default function Item({ navigation }) {
  return (
    <View style={tw`flex-row items-center pb-[15px]`}>
      <View style={tw`relative max-w-[50px] w-full h-[50px]`}>
        <View style={tw`h-full rounded-full overflow-hidden`}>
          <Image
            style={tw`w-[50px] h-[50px] rounded`}
            source={require("../../../../assets/post-image.jpg")}
          />
        </View>
        <View
          style={tw`w-[24px] h-[24px] border rounded-full border-white absolute bottom-0 right-0`}
        >
          <UserAvatar />
        </View>
      </View>
      <View style={tw`flex flex-col ml-2.5 w-full flex-2`}>
        <View style={tw`flex flex-row items-center justify-between`}>
          <DText style={tw`font-bold mb-1 text-sm leading-4`}>Валентина</DText>

          <DText style={tw`text-grey `}>16:42</DText>
        </View>

        <DText style={tw`text-xs mb-2`}>ЖК «Карат Апатментс», 145 м2...</DText>

        <View style={tw`flex flex-row items-center justify-between`}>
          <DText style={tw`text-xs font-bold leading-3`}>
            Здесь будет крайнее сообщение...
          </DText>

          <View
            style={tw`bg-blue rounded-full p-1 min-w-5 absolute bottom-0 right-0`}
          >
            <DText style={tw`text-white  text-center`}>2</DText>
          </View>
        </View>
      </View>
    </View>
  );
}
