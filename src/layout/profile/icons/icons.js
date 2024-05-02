import * as React from "react";
import { View } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";

export function Share(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      {...props}
    >
      <Path
        d="M13.5 8v4.5a1 1 0 01-1 1h-11a1 1 0 01-1-1v-11a1 1 0 011-1H6m4 0h3.5m0 0V4m0-3.5L7 7"
        stroke="#1A1F25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function Edit(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      {...props}
    >
      <Path
        d="M.497 13.503h11m-5-3.5l-3 .54.5-3.04 6.73-6.71a.999.999 0 011.42 0l1.06 1.06a1 1 0 010 1.42l-6.71 6.73z"
        stroke={props?.color ? props.color : "#1A1F25"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function Delete(props) {
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
        d="M5.5 5a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zM5.5 12.5H1V11a4.5 4.5 0 016.73-3.91M14 9.26L9.76 13.5M9.76 9.26L14 13.5"
        stroke="#6F7882"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function Enter(props) {
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
        d="M10 10.5v2a1 1 0 01-1 1H2a1 1 0 01-1-1v-11a1 1 0 011-1h7a1 1 0 011 1v2M7 7h7M12 5l2 2-2 2"
        stroke="#6F7882"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function Items(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      {...props}
    >
      <Path
        d="M1 1.5v4a.5.5 0 00.5.5h4a.5.5 0 00.5-.5v-4a.5.5 0 00-.5-.5h-4a.5.5 0 00-.5.5zM8 1.5v4a.5.5 0 00.5.5h4a.5.5 0 00.5-.5v-4a.5.5 0 00-.5-.5h-4a.5.5 0 00-.5.5zM1 8.5v4a.5.5 0 00.5.5h4a.5.5 0 00.5-.5v-4a.5.5 0 00-.5-.5h-4a.5.5 0 00-.5.5zM8 8.5v4a.5.5 0 00.5.5h4a.5.5 0 00.5-.5v-4a.5.5 0 00-.5-.5h-4a.5.5 0 00-.5.5z"
        stroke="#6F7882"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function User(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={15}
      height={16}
      viewBox="0 0 15 16"
      fill="none"
      {...props}
    >
      <Path
        d="M7.5 8a3.418 3.418 0 100-6.837A3.418 3.418 0 007.5 8zM14 14.837a6.826 6.826 0 00-13 0h13z"
        stroke="#6F7882"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function Question(props) {
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
        d="M7.5.578V2.13m4.14-.072l-1.097 1.107M14 5.266h-1.553M3.36 2.058l1.097 1.107M1 5.266h1.553m8.57 2.754a3.622 3.622 0 10-5.238 3.229v1.78a.403.403 0 00.404.393h2.422a.404.404 0 00.404-.393v-1.811a3.622 3.622 0 002.008-3.198z"
        stroke="#6F7882"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function Favorites(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={15}
      height={12}
      viewBox="0 0 15 12"
      fill="none"
      {...props}
    >
      <Path
        d="M7.504 11.424L1.987 6.427C-1.01 3.43 3.397-2.328 7.504 2.33 11.612-2.328 16 3.449 13.021 6.427l-5.517 4.997z"
        stroke="#6F7882"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function Notifications(props) {
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
        d="M6 12.335a1.55 1.55 0 003 0M7.5.505a4.29 4.29 0 014.29 4.29c0 4.77 1.74 5.71 2.21 5.71H1c.48 0 2.21-.95 2.21-5.71A4.29 4.29 0 017.5.505z"
        stroke="#6F7882"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function Help(props) {
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
        d="M3.5 7V4.37A3.93 3.93 0 017.5.5a3.93 3.93 0 014 3.87V7m-2 5.25a2 2 0 002-2V8m-2 4.25a1.25 1.25 0 01-1.25 1.25h-1.5a1.25 1.25 0 010-2.5h1.5a1.25 1.25 0 011.25 1.25zM2 5.5h1a.5.5 0 01.5.5v3a.5.5 0 01-.5.5H2a1 1 0 01-1-1v-2a1 1 0 011-1zm11 4h-1a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5h1a1 1 0 011 1v2a1 1 0 01-1 1z"
        stroke="#6F7882"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function Contacts(props) {
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
        d="M8.5 13.5H2a1 1 0 01-1-1v-11a1 1 0 011-1h7.5m1.5 9h3M4 .5v13M6.5 4h2m2.5-.5l1.5-3 1.5 3V12a1.5 1.5 0 11-3 0V3.5z"
        stroke="#6F7882"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function Arrow({ variant = "1", isOpen, ...props }) {
  return (
    <View {...props}>
      {variant === "2" ? (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={15}
          height={8}
          viewBox="0 0 15 8"
          fill="none"
          style={{
            transform: [{ rotate: isOpen ? "180deg" : "0deg" }],
          }}
        >
          <Path
            d="M1 1l6.15 5.856A.48.48 0 007.5 7a.5.5 0 00.35-.144L14 1"
            stroke="#6F7882"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ) : (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={8}
          height={14}
          viewBox="0 0 8 14"
          fill="none"
          style={{
            transform: [{ rotate: isOpen ? "270deg" : "0deg" }],
          }}
        >
          <Path
            d="M.698.5l6.15 6.15a.48.48 0 010 .7L.698 13.5"
            stroke="#1A1F25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      )}
    </View>
  );
}

export function Sort(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      {...props}
    >
      <Rect rx={11} width={22} height={22} fill="#FFF" fillOpacity={1} />
      <Path
        d="M6.616 9.154l4.144-4.051a.334.334 0 01.37-.077.336.336 0 01.11.077l4.144 4.051m-8.768 3.692l4.144 4.052a.333.333 0 00.48 0l4.144-4.052"
        stroke="#A1A8B0"
        strokeOpacity={1}
        strokeWidth={1}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function Collections({ color }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
    >
      <Path
        d="M13 2H8m5 3H8m5 7H8m5-3H8M1 5.5v-4a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v4a.5.5 0 01-.5.5h-4a.5.5 0 01-.5-.5zm0 7v-4a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v4a.5.5 0 01-.5.5h-4a.5.5 0 01-.5-.5z"
        stroke={color ? color : "#6F7882"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function Remove(props) {
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
        d="M14 .5l-13 13m0-13l13 13"
        stroke="#1A1F25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function Analytics(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      {...props}
    >
      <Path
        d="M1 1v12h12M3.77 6.538l2.307 2.308 3.692-5.538L13 5.615"
        stroke="#1A1F25"
        strokeOpacity={0.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function Added(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={2}
      viewBox="0 0 16 2"
      fill="none"
      {...props}
    >
      <Path d="M1 1h14" stroke="#fff" strokeLinecap="round" />
    </Svg>
  );
}

export function Chat(props) {
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
        d="M4.75 7a.5.5 0 100-1 .5.5 0 000 1zM8 7a.5.5 0 100-1 .5.5 0 000 1zM11.25 7a.5.5 0 100-1 .5.5 0 000 1z"
        stroke="#1A1F25"
        strokeOpacity={0.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 12.5l-4 1 1-3v-9a1 1 0 011-1h10a1 1 0 011 1v10a1 1 0 01-1 1H5z"
        stroke="#1A1F25"
        strokeOpacity={0.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function Requests(props) {
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
        d="M8 3v3m-3 6.5l-4 1 1-3v-9a1 1 0 011-1h10a1 1 0 011 1v10a1 1 0 01-1 1H5zM8.5 9a.5.5 0 11-1 0 .5.5 0 011 0z"
        stroke="#1A1F25"
        strokeOpacity={0.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
