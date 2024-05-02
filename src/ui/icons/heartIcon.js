import Svg, { Path } from "react-native-svg";

function HeartIcon({ variant = "white", isActive, ...props }) {
  return (
    <>
      {isActive ? (
        <>
          {variant === "black" ? (
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={21}
              height={17}
              viewBox="0 0 21 17"
              fill="#F23C34"
              {...props}
            >
              <Path
                d="M10.42 16.5L2.284 9.13C-2.138 4.708 4.362-3.782 10.42 3.087c6.058-6.869 12.528 1.65 8.136 6.043L10.42 16.5z"
                stroke="#1A1F25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          ) : (
            <Svg
              width={21}
              height={18}
              viewBox="0 0 21 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              {...props}
            >
              <Path
                d="M10.592 17L2.456 9.63c-4.422-4.422 2.078-12.912 8.136-6.043 6.058-6.869 12.529 1.65 8.136 6.043L10.593 17z"
                fill="#F23C34"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          )}
        </>
      ) : (
        <>
          {variant === "black" ? (
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={21}
              height={17}
              viewBox="0 0 21 17"
              fill="none"
              {...props}
            >
              <Path
                d="M10.42 16.5L2.284 9.13C-2.138 4.708 4.362-3.782 10.42 3.087c6.058-6.869 12.528 1.65 8.136 6.043L10.42 16.5z"
                stroke="#1A1F25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          ) : (
            <Svg
              width={21}
              height={18}
              viewBox="0 0 21 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              {...props}
            >
              <Path
                d="M10.592 17L2.456 9.63c-4.422-4.422 2.078-12.912 8.136-6.043 6.058-6.869 12.529 1.65 8.136 6.043L10.593 17z"
                fill="#fff"
                fillOpacity={0.5}
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          )}
        </>
      )}
    </>
  );
}

export default HeartIcon;
