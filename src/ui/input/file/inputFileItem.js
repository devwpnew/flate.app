import Svg, { Path } from "react-native-svg";
import { TouchableOpacity } from "react-native";

import { colors } from "../../config";

export default function InputFileItem({
  isActive,
  style,
  onClose,
  children,
  ...props
}) {
  return (
    <TouchableOpacity
      style={{
        ...style,
        position: "relative",
        // opacity: isActive ? 1 : 0.5,
        borderRadius: 10,
        overflow: "hidden",
      }}
      {...props}
    >
      <TouchableOpacity
        onPress={onClose}
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          zIndex: 10,
          margin: 6,
          padding: 10,
          borderRadius: 9999,
          backgroundColor: "rgba(26, 31, 37, 0.50)",
        }}
      >
        <DelIcon />
      </TouchableOpacity>

      {children}
    </TouchableOpacity>
  );
}

function DelIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={15}
      viewBox="0 0 14 15"
      fill="none"
      {...props}
    >
      <Path
        d="M11.5 6.02l-1 8h-7l-1-8m-1.5-2h12m-8.54-.29V2a1 1 0 011-1h3a1 1 0 011 1v2"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
