import * as React from "react";
import Svg, { Path } from "react-native-svg";

function MapIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={19}
      height={20}
      viewBox="0 0 19 20"
      fill="none"
      {...props}
    >
      <Path
        d="M6.83 16.64L1.5 17.87V3.1l5.33-1.23m0 14.77V1.87m0 14.77l5.34 1.23m-5.34-16l5.34 1.23m0 14.77V3.1m0 14.77l5.33-1.23V1.87L12.17 3.1"
        stroke="#479AFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default MapIcon;
