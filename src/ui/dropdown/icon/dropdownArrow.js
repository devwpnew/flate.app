import * as React from "react";
import Svg, { Path } from "react-native-svg";

function DropdownArrow({ isExpanded, ...props }) {
  return (
    <Svg
      pointerEvents="none"
      style={{
        transform: isExpanded ? [{ scaleX: -1 }, { scaleY: -1 }] : [],
      }}
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={6}
      viewBox="0 0 12 6"
      fill="none"
      {...props}
    >
      <Path
        d="M1 .5l4.73 4.88A.37.37 0 006 5.5a.36.36 0 00.27-.12L11 .5"
        stroke="#A1A8B0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default DropdownArrow;
