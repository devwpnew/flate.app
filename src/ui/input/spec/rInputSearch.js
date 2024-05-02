import api from "../../../../api/service/api";

import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import Svg, { Path } from "react-native-svg";

import RInput from "../rInput";
import DModal from "../../modal/dModal";

import FilterButton from "../../../layout/category/filterButton";
import SearchableItem from "./item/searchableItem";

export default function RInputSearch({
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
  containerBgStyle = {},
  ...props
}) {
  const initialQuery = {
    name: name,
    value: initialValue ? initialValue : "",
  };

  const [rcs, setRcs] = useState([]);

  const navigation = useNavigation();

  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    name: name,
    value: "",
  });
  const [searchModalShow, setSearchModalShow] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    setSearchQuery({
      name: name,
      value: initialValue ? initialValue : "",
    });
  }, [initialValue]);

  useEffect(() => {
    async function fetchRcsData() {
      setIsSearchLoading(true);
      try {
        const query = {
          window_host: "https://flate.pro/",
          sort: {
            id: "asc",
          },
          limit: "all",
        };

        if (cityId) {
          query["filter"] = {};
          query["filter"]["city_link"] = cityId;
        }

        const rcsArr = await api.get.rcs(query);

        if (rcsArr && rcsArr?.length > 0) {
          setRcs(rcsArr);
        }
      } catch (e) {
        console.log(e);
      }

      setIsSearchLoading(false);
    }
    fetchRcsData();
  }, [cityId]);

  useEffect(() => {
    const filteredOptions =
      searchQuery.value === "" && searchQuery?.value?.length >= 3
        ? rcs
        : rcs.filter((rc) => {
            if (searchQuery.value) {
              return rc.name
                .toLowerCase()
                .replace(/\s+/g, "")
                .includes(searchQuery.value.toLowerCase().replace(/\s+/g, ""));
            }
          });

    setFilteredOptions(filteredOptions);
  }, [searchQuery.value]);

  const onSearchInput = (v) => {
    setSearchQuery(v);
    setSearchModalShow(true);
  };

  const loadRc = (option) => {
    if (!rcs || rcs?.length === 0) return;

    const rc = rcs.find((rc) => rc.id == option.value);

    navigation.push("SearchPage", {
      title: rc.name,
      filter: { rc_link: rc.id },
    });
  };

  const onItemPress = (v) => {
    if (onValueChange) {
      if (v && v.value && rcs && rcs?.length > 0) {
        const selected = rcs.find((rc) => rc.id == v.value);

        if (selected) {
          setSearchQuery({ name: name, value: selected.name });
        }
        onValueChange(v);
      } else {
        setSearchQuery({ name: name, value: "" });
        onValueChange(v);
      }
    } else {
      loadRc(v);
      setSearchQuery(initialQuery);
    }
    setSearchModalShow(false);
  };

  const isIos = Platform.OS === "ios";

  return (
    <View style={{ flex: 1 }}>
      <RInput
        numberOfLines={1}
        inputMode="search"
        returnKeyType={"search"}
        enterKeyHint={"search"}
        isLoading={isSearchLoading}
        onPressIn={(e) => {
          e.preventDefault();
          setSearchModalShow(true);
        }}
        onChangeText={onSearchInput}
        value={searchQuery.value}
        leftWidth={isHideSearch ? leftWidth : 15}
        left={
          isHideSearch ? (
            left &&
            !searchQuery.value && (
              <TouchableOpacity onPress={() => setSearchModalShow(true)}>
                {left}
              </TouchableOpacity>
            )
          ) : (
            <SearchIcon onPress={() => setSearchModalShow((prev) => !prev)} />
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
            <TouchableOpacity onPress={() => setSearchModalShow(true)}>
              {right}
            </TouchableOpacity>
          ) : (
            <FilterButton />
          )
        }
        rightWidth={isHideFilter ? rightWidth : 15}
        name={name}
        shadow={shadow}
        containerBgStyle={containerBgStyle}
        {...props}
      />

      <DModal
        containerStyle={{ padding: 0, paddingTop: 50 }}
        contentStyle={{ width: "100%", padding: 20 }}
        animationType="slide"
        transparent={false}
        position="top"
        setModalVisible={(isShow) => {
          setSearchModalShow(isShow);
          setSearchQuery(initialQuery);
          if (onValueChange) {
            onValueChange({ name: name, value: null });
          }
        }}
        onShow={() => {
          if (Platform.OS === "android" && this?.textInput) {
            this.textInput.focus();
          }
        }}
        modalVisible={searchModalShow}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <View
            style={{
              marginTop: 30,
              height: "100%",
            }}
          >
            <RInput
              getRef={(input) => {
                if (input?.current) {
                  this.textInput = input.current;
                }
              }}
              rounded={true}
              autoFocus={autoFocus}
              isLoading={isSearchLoading}
              onChangeText={onSearchInput}
              value={searchQuery.value}
              leftWidth={15}
              left={<SearchIcon />}
              rightWidth={15}
              shadow={shadow}
              color="grey-light"
              placeholder="Поиск по ЖК"
              name={name}
            />

            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="always"
            >
              {filteredOptions.map((rc) => (
                <SearchableItem
                  isHasCheck={false}
                  name={name}
                  option={rc}
                  key={rc.id}
                  onPress={onItemPress}
                />
              ))}

              {isCanAddRc &&
                searchQuery?.value &&
                searchQuery?.value?.length > 0 && (
                  <>
                    <SearchableItem
                      name={name}
                      option={{ name: "+ Добавить новый ЖК", id: "add-rc" }}
                      // onPress={() => setIsModalAddRcShow(true)}
                      onPress={() => {
                        setSearchModalShow(false);
                        navigation.navigate("AddRc");
                      }}
                      color="blue"
                    />
                    {/* <ModalAddRc setModalVisible={setIsModalAddRcShow} modalVisible={IsModalAddRcShow} /> */}
                  </>
                )}
            </ScrollView>
          </View>
        </View>
      </DModal>
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
