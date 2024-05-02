import api from "../../../../api/service/api";

import { useNavigation } from "@react-navigation/native";
import DModal from "../dModal";
import { Platform, ScrollView, View } from "react-native";
import RInput from "../../input/rInput";
import SearchIcon from "../../icons/searchIcon";
import SearchableItem from "../../input/spec/item/searchableItem";
import { useEffect, useRef, useState } from "react";

export default function ModalSearchRc({
  isCanAddRc = false,
  name = "jk-search",
  initialValue,
  searchModalShow = false,
  setSearchModalShow,
  onValueChange,
}) {
  const inputRef = useRef(null);

  const [initialQuery, setInitialQuery] = useState({
    name: name,
    value: "",
  });

  const [rcs, setRcs] = useState([]);

  const navigation = useNavigation();

  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    setInitialQuery({
      name: name,
      value: initialValue ? initialValue : "",
    });

    setSearchQuery({
      name: name,
      value: initialValue ? initialValue : "",
    });
  }, [initialValue]);

  useEffect(() => {
    async function fetchRcsData() {
      setIsSearchLoading(true);

      const rcsArr = await api.get.rcs({
        window_host: "https://flate.pro/",
        sort: {
          id: "asc",
        },
        limit: "all",
      });

      if (rcsArr.length > 0) {
        setRcs(rcsArr);
      }

      setIsSearchLoading(false);
    }
    fetchRcsData();
  }, []);

  useEffect(() => {
    const filteredOptions =
      searchQuery.value === "" && searchQuery.value >= 3
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

  const loadRc = (option) => {
    const rc = rcs.find((rc) => rc.id == option.value);

    navigation.push("SearchPage", {
      title: rc.name,
      filter: { rc_link: rc.id },
    });
  };

  const onItemPress = (v) => {
    if (onValueChange) {
      onValueChange(v);

      const selected = rcs.find((rc) => rc.id == v.value);

      if (selected) {
        setSearchQuery({ name: name, value: selected.name });
      }
    } else {
      loadRc(v);
      setSearchQuery(initialQuery);
    }
    setSearchModalShow(false);
  };

  return (
    <>
      <DModal
        onShow={() => {
          if (Platform.OS === "android" && this?.textInput) {
            this.textInput.focus()
          }
        }}
        containerStyle={{ padding: 0, paddingTop: 50 }}
        contentStyle={{ width: "100%", padding: 20 }}
        animationType="slide"
        transparent={false}
        position="top"
        setModalVisible={(v) => {
          setSearchModalShow(v);
          setSearchQuery(initialQuery);

          if (onValueChange) {
            onValueChange({ name: name, value: null });
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
              autoFocus={true}
              isLoading={isSearchLoading}
              onChangeText={setSearchQuery}
              value={searchQuery.value}
              leftWidth={15}
              left={<SearchIcon />}
              rightWidth={15}
              shadow={false}
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

              {isCanAddRc && searchQuery.value.length > 0 && (
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
    </>
  );
}
