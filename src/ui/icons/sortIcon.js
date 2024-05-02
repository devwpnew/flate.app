import { Path, Rect, Svg } from "react-native-svg";

export default function SortIcon({ order, ...props }) {
  return (
    <>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={40}
        viewBox="0 0 40 40"
        fill="none"
        {...props}
      >
        <Rect width={40} height={40} rx={20} fill="#ECF2F8" />
        <Path
          d="M13 24l3 3m0 0l3-3m-3 3V14m5 3l3-3m0 0l3 3m-3-3v13"
          stroke="#6F7882"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </>
  );
}
