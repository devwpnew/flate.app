import { useNavigation } from "@react-navigation/native";

import { TouchableOpacity } from "react-native";
import { Path, Rect, Svg } from "react-native-svg";

export default function MapButton({
  style = {},
  renderIcon,
  stroke = "#1A1F25",
  iconStroke = "#1A1F25",
  fill = "none",
  filter,
}) {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        style={style}
        onPress={() => navigation.navigate("Map", { filter: filter })}
      >
        {renderIcon ? (
          renderIcon()
        ) : (
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={40}
            height={40}
            viewBox="0 0 40 40"
            fill={fill}
          >
            <Rect
              x={0.5}
              y={0.5}
              width={39}
              height={39}
              rx={19.5}
              stroke={stroke}
              strokeOpacity={0.1}
            />
            <Path
              d="M24.5 18c0 2.49-4.5 8.5-4.5 8.5s-4.5-6.01-4.5-8.5a4.5 4.5 0 119 0z"
              stroke={iconStroke}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M20 19.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
              stroke={iconStroke}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        )}
      </TouchableOpacity>
    </>
  );
}
