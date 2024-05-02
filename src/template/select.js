import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, ScrollView } from "react-native";

import SearchableItem from "../ui/input/spec/item/searchableItem";
import Btn from "../ui/button/btn";
import Tab from "../ui/tabs/tab";
import Container from "../ui/common/container";
import { SearchIcon } from "../ui/input/spec/rInputSearch";
import RInput from "../ui/input/rInput";

import { colors } from "../ui/config";

const unique = (arr) => {
  const uniq = [];
  const obj = {};

  arr.map((el) => {
    obj[el.id] = el;
  });

  for (const [key, value] of Object.entries(obj)) {
    uniq.push(value);
  }

  return uniq;
};

export default function Select({ route }) {
  const navigation = useNavigation();

  // SEARCH
  const [searchQuery, setSearchQuery] = useState(null);
  const [filteredOptions, setFilteredOptions] = useState(route.params.options);

  useEffect(() => {
    if (searchQuery) {
      const filteredOptions =
        searchQuery.value >= 3
          ? route.params.options
          : route.params.options.filter((op) => {
              if (searchQuery.value) {
                return op.name
                  .toLowerCase()
                  .replace(/\s+/g, "")
                  .includes(
                    searchQuery.value.toLowerCase().replace(/\s+/g, "")
                  );
              } else {
                return route.params.options;
              }
            });
      setFilteredOptions(filteredOptions);
    }
  }, [searchQuery]);

  // SELECT
  const [selectedOptions, setSelectedOptions] = useState(() => {
    if (route.params?.selectedOptions) {
      return route.params.selectedOptions;
    } else {
      return [];
    }
  });

  const isChecked = (option, selectedOptions) => {
    let res = false;

    const optionId = option?.id ? option.id : option.value;

    const selectedIds = selectedOptions.map((op) => {
      if (op) {
        if (op.id) {
          return op.id;
        } else {
          return op.value;
        }
      }
    });

    res = selectedIds.includes(optionId);

    return res;
  };

  const filterSelected = (op, selectedOptions) => {
    if (Array.isArray(op)) {
      const filtered = selectedOptions.filter((selected) => {
        let check = true;

        op.map((option) => {
          if (option.value == selected.value) {
            check = false;
          }
        });

        return check;
      });

      return filtered;
    } else {
      const filtered = selectedOptions.filter((option) => {
        if (option.id) {
          return option.id != op.value;
        } else {
          return option.value != op.value;
        }
      });

      return filtered;
    }
  };

  const getPressedOption = (option) => {
    if (option?.parent) {
      const parent = route.params.options.find(
        (op) => op.value == option.parent
      );
      const child = parent.children.find((op) => op.value === option.value);
      return child;
    } else {
      return route.params.options.find((op) => op.value === option.value);
    }
  };

  const onPressItem = (op) => {
    if (route.params?.multiselectSingle) {
      let selected = {};

      if (op?.id) {
        selected = { name: op.name, value: op.id };
      } else {
        selected = op;
      }

      navigation.navigate(route.params.to, {
        ...route.params,
        to: "Search",
        slug: route.params?.slug,
        title: route.params?.title,
        name: route.params?.name,
        options: route.params?.options,
        selectedOptions: [selected],
      });

      return;
    }

    if (route.params?.multiselectSearch) {
      const pressedOption = getPressedOption(op);
      const pressedId = pressedOption?.value;

      if (!pressedId) return;

      if (pressedOption.children) {
        const isCheckedOption = selectedOptions.find(
          (selectedOp) => selectedOp.value == pressedId
        );

        if (isCheckedOption) {
          setSelectedOptions((prev) => {
            const newOptions = [pressedOption, ...pressedOption.children].map(
              (op) => {
                return { name: op.name, value: op.id };
              }
            );

            const filteredOptions = prev.filter((selected) => {
              let check = true;

              newOptions.map((option) => {
                if (option?.value == selected?.value) {
                  check = false;
                }
              });

              return check;
            });

            return filteredOptions;
          });

          return;
        }

        setSelectedOptions((prev) => {
          const newOptions = [pressedOption, ...pressedOption.children].map(
            (op) => {
              return { name: op.name, value: op.id };
            }
          );
          const mergedOptions = [...prev, ...newOptions];
          const uniqueOptions = mergedOptions.filter(
            (value, index, array) => array.indexOf(value) === index
          );

          return uniqueOptions;
        });
      } else {
        setSelectedOptions((prev) => {
          const newOption = {
            name: pressedOption.name,
            value: pressedOption.id,
          };

          if (prev.find((op) => op.value == newOption.value)) {
            return prev.filter((op) => op.value != newOption.value);
          }

          return [...prev, newOption];
        });
      }
    } else {
      const isCheckedValue = isChecked(op, selectedOptions);

      if (isCheckedValue) {
        const filteredSelectedOptions = filterSelected(op, selectedOptions);

        setSelectedOptions(filteredSelectedOptions);
        return;
      }

      setSelectedOptions((prev) => [...prev, op]);
    }
  };

  const onSaveSelect = () => {
    const formattedOptions = selectedOptions.map((op) => {
      if (op?.id) {
        return { name: op.name, value: op.id };
      } else {
        return op;
      }
    });

    navigation.navigate(route.params.to, {
      ...route.params,
      to: "Search",
      slug: route.params?.slug,
      title: route.params?.title,
      name: route.params?.name,
      options: route.params?.options,
      selectedOptions: formattedOptions,
    });
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: colors["grey-light"],
        }}
      >
        {filteredOptions.map((op) => {
          let isHasCheck = true;

          if (route.params?.multiselectSearch) {
            if (!op.parent_area) {
              isHasCheck = false;
            }
          }

          return (
            <SearchableItem
              isHasCheck={isHasCheck}
              key={op.id}
              multiselect={true}
              isChecked={isChecked(op, selectedOptions)}
              selectedOptions={selectedOptions}
              option={op}
              name={op.name}
              onPress={onPressItem}
            />
          );
        })}
      </ScrollView>

      {!route.params?.multiselectSingle && (
        <View style={{ backgroundColor: colors["grey-light"] }}>
          <Container>
            <Btn style={{ marginVertical: 40 }} onPress={onSaveSelect}>
              Сохранить
            </Btn>
          </Container>
        </View>
      )}
    </>
  );
}
