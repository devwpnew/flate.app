import Svg, { Path, Defs, Stop, LinearGradient, G } from "react-native-svg";

export function HomeIcon({ active }) {
  return (
    <>
      {active ? (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={15}
          viewBox="0 0 16 15"
          fill="none"
        >
          <Path
            d="M7.911.132a.5.5 0 01.678 0l6.656 6.14a1.577 1.577 0 01.505 1.165v5.986A1.577 1.577 0 0114.173 15H2.327A1.577 1.577 0 01.75 13.423V7.435h.002L7.91.132z"
            fill="url(#paint0_linear_858_426)"
          />
          <Defs>
            <LinearGradient
              id="paint0_linear_858_426"
              x1={8.25001}
              y1={0}
              x2={8.25001}
              y2={15}
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#479AFF" />
              <Stop offset={1} stopColor="#1DDA9B" />
            </LinearGradient>
          </Defs>
        </Svg>
      ) : (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={15}
          viewBox="0 0 16 15"
          fill="none"
        >
          <Path
            opacity={0.5}
            d="M7.911.132a.5.5 0 01.678 0l6.656 6.14a1.577 1.577 0 01.505 1.165v5.986A1.577 1.577 0 0114.173 15H2.327A1.577 1.577 0 01.75 13.423V7.435h.002L7.91.132z"
            fill="#A1A8B0"
          />
        </Svg>
      )}
    </>
  );
}

export function SearchIcon({ active }) {
  return (
    <>
      {active ? (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={15}
          viewBox="0 0 16 15"
          fill="none"
        >
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M.25 6.766a6.766 6.766 0 1112.394 3.756l2.219 2.219a1.324 1.324 0 01-1.872 1.871l-2.219-2.218A6.766 6.766 0 01.25 6.766z"
            fill="url(#paint0_linear_836_2764)"
          />
          <Defs>
            <LinearGradient
              id="paint0_linear_836_2764"
              x1={7.75006}
              y1={0}
              x2={7.75006}
              y2={15}
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#479AFF" />
              <Stop offset={1} stopColor="#1DDA9B" />
            </LinearGradient>
          </Defs>
        </Svg>
      ) : (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={15}
          viewBox="0 0 16 15"
          fill="none"
          opacity="0.5"
        >
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M.25 6.766a6.766 6.766 0 1112.394 3.756l2.219 2.219a1.324 1.324 0 01-1.872 1.871l-2.219-2.218A6.766 6.766 0 01.25 6.766z"
            fill="#A1A8B0"
          />
        </Svg>
      )}
    </>
  );
}

export function ItemsIcon() {
  return (
    <>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={15}
        viewBox="0 0 16 15"
        fill="none"
      >
        <Path
          d="M8.713 1.697C8.713.76 9.473 0 10.41 0h3.393C14.74 0 15.5.76 15.5 1.697V5.09c0 .938-.76 1.697-1.697 1.697H10.41c-.937 0-1.696-.76-1.696-1.697V1.697z"
          fill="url(#paint0_linear_1397_2065)"
        />
        <Path
          d="M8.713 9.91c0-.938.76-1.697 1.697-1.697h3.393c.937 0 1.697.76 1.697 1.697v3.393c0 .937-.76 1.697-1.697 1.697H10.41c-.937 0-1.696-.76-1.696-1.697V9.91z"
          fill="url(#paint1_linear_1397_2065)"
        />
        <Path
          d="M.5 9.91c0-.938.76-1.697 1.697-1.697H5.59c.938 0 1.697.76 1.697 1.697v3.393c0 .937-.76 1.697-1.697 1.697H2.197C1.26 15 .5 14.24.5 13.303V9.91z"
          fill="url(#paint2_linear_1397_2065)"
        />
        <Path
          d="M.5 3.394c0-.469.38-.849.848-.849h5.09a.848.848 0 110 1.697h-5.09A.848.848 0 01.5 3.394z"
          fill="url(#paint3_linear_1397_2065)"
        />
        <Path
          d="M3.894 6.787a.848.848 0 01-.849-.848V.849a.848.848 0 011.697 0v5.09c0 .468-.38.848-.848.848z"
          fill="url(#paint4_linear_1397_2065)"
        />
        <Defs>
          <LinearGradient
            id="paint0_linear_1397_2065"
            x1={8}
            y1={0}
            x2={8}
            y2={15}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#479AFF" />
            <Stop offset={1} stopColor="#1DDA9B" />
          </LinearGradient>
          <LinearGradient
            id="paint1_linear_1397_2065"
            x1={8}
            y1={0}
            x2={8}
            y2={15}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#479AFF" />
            <Stop offset={1} stopColor="#1DDA9B" />
          </LinearGradient>
          <LinearGradient
            id="paint2_linear_1397_2065"
            x1={8}
            y1={0}
            x2={8}
            y2={15}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#479AFF" />
            <Stop offset={1} stopColor="#1DDA9B" />
          </LinearGradient>
          <LinearGradient
            id="paint3_linear_1397_2065"
            x1={8}
            y1={0}
            x2={8}
            y2={15}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#479AFF" />
            <Stop offset={1} stopColor="#1DDA9B" />
          </LinearGradient>
          <LinearGradient
            id="paint4_linear_1397_2065"
            x1={8}
            y1={0}
            x2={8}
            y2={15}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#479AFF" />
            <Stop offset={1} stopColor="#1DDA9B" />
          </LinearGradient>
        </Defs>
      </Svg>
    </>
  );
}

export function FavoritesIcon({ active }) {
  return (
    <>
      {active ? (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={20}
          height={15}
          viewBox="0 0 20 15"
          fill="none"
        >
          <Path
            d="M10.256 15L2.299 8.09C-2.025 3.946 4.33-4.013 10.256 2.426c5.924-6.439 12.252 1.548 7.957 5.666L10.256 15z"
            fill="url(#paint0_linear_1026_2370)"
          />
          <Defs>
            <LinearGradient
              id="paint0_linear_1026_2370"
              x1={10.25}
              y1={0}
              x2={10.25}
              y2={15}
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#479AFF" />
              <Stop offset={1} stopColor="#1DDA9B" />
            </LinearGradient>
          </Defs>
        </Svg>
      ) : (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={20}
          height={15}
          viewBox="0 0 20 15"
          fill="none"
        >
          <Path
            opacity={0.5}
            d="M10.256 15L2.299 8.09C-2.025 3.946 4.33-4.013 10.256 2.426c5.924-6.439 12.252 1.548 7.957 5.666L10.256 15z"
            fill="#A1A8B0"
          />
        </Svg>
      )}
    </>
  );
}

export function MoreIcon({ active }) {
  return (
    <>
      {active ? (
        <Svg
          width={27}
          height={14}
          viewBox="0 0 27 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M3.75 10a3 3 0 100-6 3 3 0 000 6z"
            fill="url(#paint0_linear_91_2753)"
          />
          <Path
            d="M13.75 10a3 3 0 100-6 3 3 0 000 6z"
            fill="url(#paint1_linear_91_2753)"
          />
          <Path
            d="M23.75 10a3 3 0 100-6 3 3 0 000 6z"
            fill="url(#paint2_linear_91_2753)"
          />
          <Defs>
            <LinearGradient
              id="paint0_linear_91_2753"
              x1={3.75}
              y1={4}
              x2={3.75}
              y2={10}
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#479AFF" />
              <Stop offset={1} stopColor="#1DDA9B" />
            </LinearGradient>
            <LinearGradient
              id="paint1_linear_91_2753"
              x1={13.75}
              y1={4}
              x2={13.75}
              y2={10}
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#479AFF" />
              <Stop offset={1} stopColor="#1DDA9B" />
            </LinearGradient>
            <LinearGradient
              id="paint2_linear_91_2753"
              x1={23.75}
              y1={4}
              x2={23.75}
              y2={10}
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#479AFF" />
              <Stop offset={1} stopColor="#1DDA9B" />
            </LinearGradient>
          </Defs>
        </Svg>
      ) : (
        <Svg
          width={27}
          height={15}
          viewBox="0 0 27 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <G opacity={0.5} fill="#A1A8B0">
            <Path d="M3.75 10a3 3 0 100-6 3 3 0 000 6zM13.75 10a3 3 0 100-6 3 3 0 000 6zM23.75 10a3 3 0 100-6 3 3 0 000 6z" />
          </G>
        </Svg>
      )}
    </>
  );
}

export function LkIcon({ active }) {
  return (
    <>
      {active ? (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={15}
          height={15}
          viewBox="0 0 15 15"
          fill="none"
        >
          <Path
            d="M7.75 7.5a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
            fill="url(#paint0_linear_1_1060)"
          />
          <Path
            d="M14.88 15A7.488 7.488 0 00.62 15h14.26z"
            fill="url(#paint1_linear_1_1060)"
          />
          <Defs>
            <LinearGradient
              id="paint0_linear_1_1060"
              x1={7.74972}
              y1={0}
              x2={7.74972}
              y2={15}
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#479AFF" />
              <Stop offset={1} stopColor="#1DDA9B" />
            </LinearGradient>
            <LinearGradient
              id="paint1_linear_1_1060"
              x1={7.74972}
              y1={0}
              x2={7.74972}
              y2={15}
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#479AFF" />
              <Stop offset={1} stopColor="#1DDA9B" />
            </LinearGradient>
          </Defs>
        </Svg>
      ) : (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={15}
          height={15}
          viewBox="0 0 15 15"
          fill="none"
        >
          <G opacity={0.5} fill="#A1A8B0">
            <Path d="M7.75 7.5a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5zM14.88 15A7.488 7.488 0 00.62 15h14.26z" />
          </G>
        </Svg>
      )}
    </>
  );
}

export function CollectionIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={15}
      viewBox="0 0 16 15"
      fill="none"
      {...props}
    >
      <Path
        opacity={0.5}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.53 1.28v4.436h4.436V1.28H1.53zM.25 1.212C.25.542.793 0 1.462 0h4.573c.67 0 1.212.543 1.212 1.212v4.573c0 .67-.543 1.212-1.212 1.212H1.462C.792 6.997.25 6.454.25 5.785V1.212zm8.003.572a.64.64 0 01.64-.64h5.717a.64.64 0 010 1.28H8.893a.64.64 0 01-.64-.64zm0 3.43a.64.64 0 01.64-.64h5.717a.64.64 0 010 1.28H8.893a.64.64 0 01-.64-.64zM1.53 9.283v4.435h4.436V9.285H1.53zm-1.28-.07c0-.668.543-1.211 1.212-1.211h4.573c.67 0 1.212.543 1.212 1.212v4.573c0 .67-.543 1.212-1.212 1.212H1.462C.792 15 .25 14.457.25 13.788V9.215zm8.003.573a.64.64 0 01.64-.64h5.717a.64.64 0 010 1.28H8.893a.64.64 0 01-.64-.64zm0 3.43a.64.64 0 01.64-.64h5.717a.64.64 0 010 1.28H8.893a.64.64 0 01-.64-.64z"
        fill="#1A1F25"
        fillOpacity={0.5}
      />
    </Svg>
  )
}