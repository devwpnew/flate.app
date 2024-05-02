import React, { useEffect, useState } from "react";
import Preloader from "../../ui/preloader/preloader";
import { View, FlatList, StyleSheet } from "react-native";
import SearchIcon from "../icons/searchIcon";
import DropdownItem from "./item/dropdownItem";
import InputIcon from "../input/inputIcon";
import tw from "../../../lib/tailwind";
import DText from "../text/dText";

const dropdownHeight = 44;

const DropdownInput = ({
  style,
  options,
  onItemPress,
  isLoading,
  multiselect,
  selectedOption,
  emptyFallback,
}) => {
  const [isShowEmptyFallback, setIsShowEmptyFallback] = useState(false);
  const [initialList, setInitialList] = useState([]);
  const [list, setList] = useState([]);
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!options) return;

    setInitialList(options.slice().map((item) => item.name));
  }, []);

  useEffect(() => {
    if (!query) return;

    const filteredList = initialList.filter(
      (item) =>
        query.length === 0 || item.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredList.length > 0) {
      setIsShowEmptyFallback(false);
      setList(filteredList);
    } else {
      setIsShowEmptyFallback(true);
    }
  }, [query]);

  const handleChangeText = (obj) => {
    setQuery(obj.value);
  };

  const onPress = (name) => {
    const option = options.find((item) => item.name === name);
    onItemPress(option);

    if (!multiselect) {
      setIsExpanded(false);
    }
  };

  return (
    <View style={style}>
      <View style={styles.wrapper}>
        {!isLoading ? (
          <>
            <View style={styles.container}>
              <InputIcon
                buttonProps={{
                  onPress: () => {
                    setIsExpanded((prev) => !prev);
                  },
                }}
                inputProps={{
                  style: { borderColor: "transparent" },
                  value: query,
                  onChangeText: handleChangeText,
                  onFocus: () => setIsExpanded(true),
                  placeholder: "Введите название",
                  autoFocus: true,
                }}
                icon={
                  <SearchIcon
                    style={{ marginLeft: 30 }}
                    onPress={() => setIsExpanded(false)}
                  />
                }
              />

              {isExpanded && (
                <>
                  {isShowEmptyFallback ? (
                    <>{emptyFallback}</>
                  ) : (
                    <FlatList
                      style={styles.listContainer}
                      data={list}
                      renderItem={({ item, index }) => {
                        if (index >= 8) return;

                        return (
                          <DropdownItem
                            id={item + index}
                            item={item}
                            onPress={onPress}
                            multiselect={multiselect}
                            selectedOption={selectedOption}
                          />
                        );
                      }}
                    />
                  )}
                </>
              )}
            </View>
          </>
        ) : (
          <Preloader style={styles.wrapper} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: dropdownHeight,
  },
  container: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    position: "relative",
    zIndex: 1,
    height: "100%",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  buttonText: {
    fontSize: 16,
    width: "100%",
    padding: 8,
  },
  icon: {
    padding: 10,
    width: 20,
    height: 20,
    marginLeft: 35,
    opacity: 0.6,
  },
  listContainer: {
    marginTop: 8,
    borderRadius: 4,
    position: "absolute",
    top: dropdownHeight,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    zIndex: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listItem: {
    padding: 12,
  },
});

export default DropdownInput;
