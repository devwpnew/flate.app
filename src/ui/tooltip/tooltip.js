import { TouchableOpacity, Dimensions } from "react-native";
import DText from "../text/dText";

export default function Tooltip({ onPress, isShow, text, ...params }) {
  const { width, height } = Dimensions.get("window");

  return (
    <>
      {isShow && text && (
        <TouchableOpacity onPress={onPress}>
          <DText {...params}>{text}</DText>
        </TouchableOpacity>
      )}

      {isShow && text && (
        <TouchableOpacity
          onPress={onPress}
          style={{
            backgroundColor: "transparent",
            position: "absolute",
            left: 0,
            top: 0,
            width: width,
            height: height,
            zIndex: 10,
          }}
        ></TouchableOpacity>
      )}
    </>
  );
}
