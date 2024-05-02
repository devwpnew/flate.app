import * as React from "react";
import Svg, { Path } from "react-native-svg";

function FileIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={18}
      viewBox="0 0 16 18"
      fill="none"
      {...props}
    >
      <Path
        d="M7.154 7.462v4.307M5 9.615h4.308m5.23 6.154A1.23 1.23 0 0113.309 17H2.23A1.23 1.23 0 011 15.77V2.23A1.23 1.23 0 012.23 1h6.155l6.154 6.154v8.615z"
        stroke="#479AFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default FileIcon;
