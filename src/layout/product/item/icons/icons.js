import * as React from "react";
import Svg, { Defs, G, LinearGradient, Path, Stop } from "react-native-svg";

export function PView(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={15}
      height={10}
      viewBox="0 0 15 10"
      fill="none"
      {...props}
    >
      <Path
        d="M13.718 4.33a1 1 0 010 1.34C12.668 6.8 10.278 9 7.488 9c-2.79 0-5.18-2.2-6.23-3.33a1 1 0 010-1.34C2.308 3.2 4.698 1 7.488 1c2.79 0 5.18 2.2 6.23 3.33z"
        stroke="#A1A8B0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.488 7a2 2 0 100-4 2 2 0 000 4z"
        stroke="#A1A8B0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function PFav(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={10}
      viewBox="0 0 12 10"
      fill="none"
      {...props}
    >
      <Path
        d="M5.771 9L1.703 5.315c-2.21-2.21 1.04-6.456 4.068-3.021 3.03-3.435 6.265.825 4.068 3.021L5.771 9z"
        stroke="#A1A8B0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function PPremium({ variant = "white", ...props }) {
  return (
    <>
      {variant === "gradient" ? (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={17}
          height={14}
          viewBox="0 0 17 14"
          fill="none"
          {...props}
        >
          <Path
            d="M16.5 3.308L12.808 7 8.5.846 4.192 7 .5 3.308v8a1.846 1.846 0 001.846 1.846h12.308a1.846 1.846 0 001.846-1.846v-8z"
            fill="url(#paint0_linear_1_1023)"
          />
          <Defs>
            <LinearGradient
              id="paint0_linear_1_1023"
              x1={8.5}
              y1={0.846191}
              x2={8.5}
              y2={13.1539}
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#479AFF" />
              <Stop offset={1} stopColor="#1DDA9B" />
            </LinearGradient>
          </Defs>
        </Svg>
      ) : (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={14}
          viewBox="0 0 16 14"
          fill="none"
          {...props}
        >
          <Path
            d="M16 3.308L12.308 7 8 .846 3.692 7 0 3.308v8a1.846 1.846 0 001.846 1.846h12.308A1.846 1.846 0 0016 11.308v-8z"
            fill="#fff"
          />
        </Svg>
      )}
    </>
  );
}

export function PEdit(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <G
        stroke={props?.color ? props.color : "#479AFF"}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M1 15h11.84M7.459 11.232l-3.23.582.539-3.273 7.244-7.223a1.075 1.075 0 011.529 0l1.14 1.141a1.079 1.079 0 010 1.529L7.46 11.232z" />
      </G>
    </Svg>
  );
}

export function PCollection(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={15}
      height={14}
      viewBox="0 0 15 14"
      fill="none"
      {...props}
    >
      <Path
        d="M7.5 4v6m-3-3h6M14 7A6.5 6.5 0 111 7a6.5 6.5 0 0113 0z"
        stroke="#479AFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function PMoney(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={15}
      height={15}
      viewBox="0 0 15 15"
      fill="none"
      {...props}
    >
      <Path
        d="M9.5 8.005c2.485 0 4.5-.896 4.5-2 0-1.105-2.015-2-4.5-2S5 4.9 5 6.005c0 1.104 2.015 2 4.5 2z"
        stroke="#479AFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 6.005v6c0 1.1 2 2 4.5 2s4.5-.9 4.5-2v-6"
        stroke="#479AFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 9.005c0 1.1-2 2-4.5 2s-4.5-.9-4.5-2M9.4 2.005a6.77 6.77 0 00-3.9-1c-2.49 0-4.5.9-4.5 2 0 .59.58 1.12 1.5 1.5"
        stroke="#479AFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.5 10.505c-.92-.38-1.5-.91-1.5-1.5v-6M2.5 7.505c-.92-.38-1.5-.91-1.5-1.5"
        stroke="#479AFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function PMap(props) {
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
        d="M7 14A6.5 6.5 0 107 1a6.5 6.5 0 000 13z"
        stroke="#1A1F25"
        strokeOpacity={0.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.5 11l2-6-6 2L6 8.5 7.5 11z"
        stroke="#1A1F25"
        strokeOpacity={0.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
