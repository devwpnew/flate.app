import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

export function AddIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <Path d="M8 1v14M1 8h14" stroke="#1479F5" strokeLinecap="round" />
    </Svg>
  );
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <Path
        d="M8 1v14M1 8h14"
        stroke="url(#paint0_linear_3_2807)"
        strokeLinecap="round"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_3_2807"
          x1={8}
          y1={1}
          x2={8}
          y2={15}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#479AFF" />
          <Stop offset={1} stopColor="#1DDA9B" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
