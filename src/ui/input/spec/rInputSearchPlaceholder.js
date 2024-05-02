import { useNavigation } from "@react-navigation/native";

import { StyleSheet, View, TouchableOpacity, Platform } from "react-native";

import Svg, { Path } from "react-native-svg";

import RInput from "../rInput";
import FilterButton from "../../../layout/category/filterButton";

export default function RInputSearchPlaceholder({
  cityId,
  containerStyle,
  style,
  isHideSearch = false,
  isHideFilter = false,
  isCanAddRc = true,
  onValueChange,
  name,
  left = null,
  leftWidth = null,
  right = null,
  rightWidth,
  initialValue,
  autoFocus = true,
  shadow = false,
  ...props
}) {
  const navigation = useNavigation();

  const isIos = Platform.OS === "ios";
  const onSearchPressIn = () => {
    navigation.navigate("Login");
  };
  const onSearchInput = () => {
    navigation.navigate("Login");
  };
  const onSidesPress = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={{ flex: 1 }}>
      <RInput
        editable={false}
        numberOfLines={1}
        inputMode="search"
        returnKeyType={"search"}
        enterKeyHint={"search"}
        isLoading={false}
        onPressIn={(e) => {
          e.preventDefault();
          onSearchPressIn();
        }}
        onChangeText={onSearchInput}
        value={""}
        leftWidth={isHideSearch ? leftWidth : 15}
        left={
          isHideSearch ? (
            left &&
            !searchQuery.value && (
              <TouchableOpacity onPress={onSidesPress}>{left}</TouchableOpacity>
            )
          ) : (
            <SearchIcon onPress={onSidesPress} />
          )
        }
        style={
          style
            ? {
                paddingBottom: isIos ? 10 : 6,
                paddingTop: isIos ? 10 : 6,
                ...style,
              }
            : { paddingBottom: isIos ? 10 : 6, paddingTop: isIos ? 10 : 6 }
        }
        containerStyle={
          containerStyle ? containerStyle : styles.inputContainerStyle
        }
        right={
          isHideFilter ? (
            <TouchableOpacity onPress={onSidesPress}>{right}</TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onSidesPress}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={15}
                height={14}
                viewBox="0 0 15 14"
                fill="none"
              >
                <Path
                  d="M2.5 3.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM4 2h10M7.5 8.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1 7h5M9 7h5M12.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM11 12H1"
                  stroke="#1A1F25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>
          )
        }
        rightWidth={isHideFilter ? rightWidth : 15}
        name={name}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: 40,
    overflow: "hidden",
    position: "relative",
    zIndex: 10,
  },
  inputContainerStyle: {
    borderRadius: 100,
    backgroundColor: "#ECF2F8",
    overflow: "hidden",
    width: "100%",
    flex: Platform.OS == "ios" ? 1 : 0,
  },
});

export function SearchIcon({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={14}
        height={14}
        viewBox="0 0 14 14"
        fill="none"
      >
        <Path
          d="M6.287 11.573A5.287 5.287 0 116.287 1a5.287 5.287 0 010 10.573zM4.818 4.725a1.762 1.762 0 012.714-.27M13 13l-2.727-2.727"
          stroke="#6F7882"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
}
