import { View } from "react-native";
import tw from "../../../lib/tailwind";

import DText from "../text/dText";

export default function H2({ children, ...props }) {
  return (
    <View {...props}>
      <DText style={tw`text-primary text-xl font-bold pb-[4px]`}>
        {children}
      </DText>
    </View>
  );
}
