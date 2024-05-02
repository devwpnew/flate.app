import React from "react";
import { Path, Svg } from "react-native-svg";

export default function WsIcon({ ...props }) {
  return (
    <>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={19}
        height={20}
        viewBox="0 0 19 20"
        fill="none"
        {...props}
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.877 3.585A8.904 8.904 0 009.537.957c-4.94 0-8.96 4.02-8.962 8.961 0 1.58.412 3.122 1.196 4.481L.5 19.043l4.751-1.246a8.954 8.954 0 004.283 1.09h.004c4.939 0 8.96-4.02 8.962-8.961 0-2.395-.93-4.647-2.623-6.34zm-6.34 13.79h-.002a7.439 7.439 0 01-3.792-1.04l-.272-.16-2.82.739.753-2.749-.177-.282A7.432 7.432 0 012.088 9.92C2.09 5.812 5.432 2.47 9.541 2.47c1.99.001 3.86.777 5.266 2.185a7.404 7.404 0 012.18 5.27c-.002 4.107-3.344 7.45-7.45 7.45z"
          fill="#fff"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.624 11.795c-.224-.112-1.325-.654-1.53-.728-.206-.075-.355-.113-.504.112-.15.224-.579.728-.71.878-.13.15-.26.168-.485.056-.224-.112-.945-.349-1.8-1.112-.666-.593-1.116-1.327-1.246-1.551-.13-.224-.014-.345.098-.457.1-.1.224-.262.336-.392.112-.131.15-.225.224-.374.074-.15.037-.28-.019-.392-.056-.112-.504-1.215-.69-1.663-.182-.437-.367-.378-.504-.384a8.953 8.953 0 00-.43-.008.823.823 0 00-.597.28c-.205.224-.783.766-.783 1.868s.802 2.167.914 2.317c.112.15 1.58 2.411 3.826 3.381.534.23.951.369 1.276.472.537.17 1.025.146 1.41.088.43-.064 1.326-.541 1.512-1.064.187-.524.187-.972.13-1.065-.055-.094-.204-.15-.428-.262z"
          fill="#fff"
        />
      </Svg>
    </>
  );
}
