import Svg, { Path } from "react-native-svg";

export default function ArrowIcon({ style }) {
  return (
    <Svg
      width="7"
      height="4"
      viewBox="0 0 7 4"
      xmlns="http://www.w3.org/2000/svg"
      style={style ? style : { fill: "#1F1F1F" }}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.83608 3.85993C3.65047 4.04669 3.34953 4.04669 3.16392 3.85993L0.139208 0.816411C-0.046403 0.629645 -0.046403 0.326839 0.139208 0.140074C0.32482 -0.0466914 0.625755 -0.0466914 0.811367 0.140074L3.22158 2.56527L3.77842 2.56527L6.18863 0.140074C6.37424 -0.0466917 6.67518 -0.0466917 6.86079 0.140074C7.0464 0.326839 7.0464 0.629645 6.86079 0.81641L3.83608 3.85993Z"
      />
    </Svg>
  );
}
