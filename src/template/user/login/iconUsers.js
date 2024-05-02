import React from "react";
import { Defs, LinearGradient, Path, Stop, Svg } from "react-native-svg";

export default function IconUsers({ ...props }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={13}
      height={17}
      viewBox="0 0 13 17"
      fill="none"
      {...props}
    >
      <Path
        d="M6.4 6.9a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4z"
        fill="url(#paint0_linear_1_4993)"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 16.5c-1.32 0-1.98 0-2.39-.41-.41-.41-.41-1.07-.41-2.39s0-1.98.41-2.39c.41-.41 1.07-.41 2.39-.41s1.98 0 2.39.41c.41.41.41 1.07.41 2.39s0 1.98-.41 2.39c-.41.41-1.07.41-2.39.41zm.466-4.045a.466.466 0 10-.932 0v.779h-.779a.466.466 0 100 .932h.779v.779a.466.466 0 00.932 0v-.779h.779a.467.467 0 000-.932h-.778v-.779z"
        fill="url(#paint1_linear_1_4993)"
      />
      <Path
        d="M9.343 9.702a8.826 8.826 0 00-1.039.06c-.514.069-1.078.234-1.542.7-.466.464-.63 1.027-.7 1.542C6 12.466 6 13.03 6 13.63v.138c0 .6 0 1.164.062 1.627.048.36.144.745.358 1.104H6.4C0 16.5 0 14.888 0 12.9s2.866-3.6 6.4-3.6c1.06 0 2.062.145 2.943.402z"
        fill="url(#paint2_linear_1_4993)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_1_4993"
          x1={6.40008}
          y1={0.5}
          x2={6.40008}
          y2={16.5}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#479AFF" />
          <Stop offset={1} stopColor="#1DDA9B" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_1_4993"
          x1={6.40008}
          y1={0.5}
          x2={6.40008}
          y2={16.5}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#479AFF" />
          <Stop offset={1} stopColor="#1DDA9B" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_1_4993"
          x1={6.40008}
          y1={0.5}
          x2={6.40008}
          y2={16.5}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#479AFF" />
          <Stop offset={1} stopColor="#1DDA9B" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
