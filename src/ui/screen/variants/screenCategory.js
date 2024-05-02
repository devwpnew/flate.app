import { useSelector } from "react-redux";
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from "react-native-svg";

import { View, TouchableOpacity, StyleSheet } from "react-native";

import RInputSearch, { FilterIcon } from "../../input/spec/rInputSearch";
import FilterButton from "../../../layout/category/filterButton";
import MapButton from "../../../layout/category/mapButton";

export default function ScreenCategory({ title, route, navigation }) {
  const user = useSelector((state) => state.userLogin.value);
  console.log(route.name);
  return (
    <>
      <TouchableOpacity onPress={navigation.goBack}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={40}
          height={40}
          viewBox="0 0 40 40"
          fill="none"
        >
          <Rect width={40} height={40} rx={20} fill="#ECF2F8" />
          <Path
            d="M22.302 14l-6.15 6.15a.481.481 0 000 .7l6.15 6.15"
            stroke="#1A1F25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </TouchableOpacity>

      <RInputSearch
        shadow={false}
        color="grey-light"
        placeholder="Поиск по ЖК"
        name={"jk-search"}
        isCanAddRc={false}
        isHideFilter={true}
        placeholderTextColor={"#6F7882"}
        style={{ fontSize: 13, fontFamily: "Manrope_600SemiBold", flex: 0 }}
      />

      {route.name !== "SearchPage" && (
        <FilterButton style={{ marginLeft: "auto" }} isFilled={true} />
      )}
    </>
  );
}
