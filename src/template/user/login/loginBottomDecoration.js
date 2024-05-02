import Svg, { Path } from "react-native-svg";

export default function LoginBottomDecoration() {
  return (
    <>
      <Svg
        style={{
          width: "100%",
          position: "absolute",
          right: -15,
          bottom: 30,
          zIndex: -1,
        }}
        xmlns="http://www.w3.org/2000/svg"
        width={195}
        height={171}
        viewBox="0 0 195 171"
        fill="none"
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.99 70.103L113 171 214.01 70.103c7.993-7.985 11.991-18.52 11.99-29.061.001-10.542-3.996-21.079-11.989-29.063C206.016 3.994 195.469.002 184.915.002c-10.552 0-21.1 3.993-29.093 11.977l-42.823 42.775-42.904-42.857C62.112 3.967 51.602.001 41.085 0 30.542 0 20.003 3.986 12.01 11.957 4.264 19.697 0 30.102 0 41.04c0 10.543 3.996 21.078 11.99 29.064z"
          fill="#fff"
        />
      </Svg>
    </>
  );
}
