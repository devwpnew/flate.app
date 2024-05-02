import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { colors } from "../../../ui/config";

export default function ProductListWrapper({
  style = {},
  isPremium = false,
  children,
}) {
  function getTemplate() {
    if (isPremium) {
      return (
        <View style={{ ...style, backgroundColor: colors["grey-light"] }}>
          {children}
        </View>
      );

      // return (
      //   <LinearGradient
      //     colors={["rgba(71, 154, 255, 0.20)", "rgba(29, 218, 155, 0.20)"]}
      //     style={{ flex: 1, ...style }}
      //     start={{ x: 0, y: 0 }}
      //     end={{ x: 1, y: 1 }}
      //   >
      //     {children}
      //   </LinearGradient>
      // );
    }

    return <View style={style}>{children}</View>;
  }

  return <>{getTemplate()}</>;
}
