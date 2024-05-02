import { Path, Svg } from "react-native-svg";

export default function CloseIcon({ isInvert = false, variant, ...props }) {
  return (
    <>
      {variant === "bolder" ? (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={15}
          height={15}
          viewBox="0 0 15 15"
          fill="none"
          {...props}
        >
          <Path
            d="M14 1L1 14M1 1l13 13"
            stroke="#6F7882"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ) : (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={15}
          height={15}
          viewBox="0 0 15 15"
          fill="none"
          {...props}
        >
          <Path
            d="M14 1L1 14M1 1l13 13"
            stroke={isInvert ? "#fff" : "#6F7882"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      )}
    </>
  );
}
