import { useSelector } from "react-redux";
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from "react-native-svg";

import { TouchableOpacity, Dimensions } from "react-native";

import RInputSearch from "../../input/spec/rInputSearch";
import { userHandler } from "../../../../helpers/user/user";
import RInputSearchPlaceholder from "../../input/spec/rInputSearchPlaceholder";

const { width } = Dimensions.get("screen");

const isSmallDevice = width < 390;

export default function ScreenHome({ title, route, navigation }) {
  const user = useSelector((state) => state.userLogin.value);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={40}
          height={40}
          viewBox="0 0 40 40"
          fill="none"
        >
          <Path
            d="M5.76 11.521h28.48a5.741 5.741 0 004.066-1.693A5.742 5.742 0 0040 5.76a5.742 5.742 0 00-1.694-4.068A5.743 5.743 0 0034.24 0H0v5.76c0 1.583.649 3.023 1.693 4.068a5.743 5.743 0 004.068 1.693z"
            fill="#1A1A1A"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20 40h20V20a5.742 5.742 0 00-1.693-4.067 5.742 5.742 0 00-4.067-1.694 5.742 5.742 0 00-4.068 1.694A5.743 5.743 0 0028.48 20v8.479h-8.495a5.743 5.743 0 00-4.051 1.693 5.743 5.743 0 00-1.693 4.063c0 1.534.609 2.987 1.693 4.071A5.742 5.742 0 0020 40z"
            fill="url(#paint0_linear_296_4752)"
          />
          <Path
            d="M19.983 25.76h5.777V20a5.741 5.741 0 00-1.693-4.067A5.741 5.741 0 0020 14.239H5.76a5.742 5.742 0 00-4.067 1.694A5.743 5.743 0 000 20c0 1.583.649 3.023 1.693 4.067a5.743 5.743 0 004.068 1.694h14.222zM5.95 28.1a5.93 5.93 0 00-4.201 1.75A5.93 5.93 0 000 34.05V40h5.95c1.635 0 3.122-.67 4.2-1.749a5.93 5.93 0 001.75-4.196V34.046a5.931 5.931 0 00-1.75-4.196 5.93 5.93 0 00-4.2-1.75z"
            fill="#1A1A1A"
          />
          <Defs>
            <LinearGradient
              id="paint0_linear_296_4752"
              x1={17.9438}
              y1={36.1579}
              x2={36.2961}
              y2={18.0811}
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#6FC" />
              <Stop offset={1} stopColor="#479AFF" />
            </LinearGradient>
          </Defs>
        </Svg>
      </TouchableOpacity>

      {user && Object.keys(user).length > 0 ? (
        <RInputSearch
          shadow={false}
          isCanAddRc={false}
          color="grey-light"
          placeholder="Поиск по ЖК"
          name={"jk-search"}
          placeholderTextColor={"#6F7882"}
          style={{
            fontSize: isSmallDevice ? 11 : 13,
            fontFamily: "Manrope_600SemiBold",
          }}
        />
      ) : (
        <RInputSearchPlaceholder
          shadow={false}
          isCanAddRc={false}
          color="grey-light"
          placeholder="Поиск по ЖК"
          name={"jk-search"}
          placeholderTextColor={"#6F7882"}
          style={{
            fontSize: isSmallDevice ? 11 : 13,
            fontFamily: "Manrope_600SemiBold",
          }}
        />
      )}

      <TouchableOpacity
        style={{ marginLeft: "auto" }}
        onPress={() => {
          userHandler(navigation, user, () => {
            navigation.navigate("Settings");
          });
        }}
      >
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={40}
          height={40}
          viewBox="0 0 40 40"
          fill="none"
        >
          <Rect width={40} height={40} rx={20} fill="#ECF2F8" />
          <Path
            d="M20 19.363A3.681 3.681 0 1020 12a3.681 3.681 0 000 7.363zM27 26.726a7.351 7.351 0 00-14 0h14z"
            stroke="#1A1F25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </TouchableOpacity>
    </>
  );
}
