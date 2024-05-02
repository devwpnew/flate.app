import { Path, Svg } from "react-native-svg";

export default function ViewsIcon({ ...props }) {
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
        d="M13.742 4.33a1 1 0 010 1.34C12.692 6.8 10.302 9 7.512 9c-2.79 0-5.18-2.2-6.23-3.33a1 1 0 010-1.34C2.332 3.2 4.722 1 7.512 1c2.79 0 5.18 2.2 6.23 3.33z"
        stroke="#A1A8B0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.512 7a2 2 0 100-4 2 2 0 000 4z"
        stroke="#A1A8B0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
