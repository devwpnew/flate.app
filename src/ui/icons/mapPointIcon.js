import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function MapPointIcon(props) {
  return (
    <Svg
      width={22}
      height={24}
      viewBox="0 0 22 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G
        clipPath="url(#clip0_201_1340)"
        filter="url(#filter0_d_201_1340)"
        stroke="#4BA5F8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M17 6.667c0 4.666-6 8.666-6 8.666s-6-4-6-8.666a6 6 0 1112 0z" />
        <Path d="M11 8.667a2 2 0 100-4 2 2 0 000 4z" />
      </G>
      <Defs>
        <ClipPath id="clip0_201_1340">
          <Path fill="#fff" transform="translate(4)" d="M0 0H14V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default MapPointIcon;
