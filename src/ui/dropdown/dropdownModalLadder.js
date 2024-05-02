import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

import Button from "../button/button";
import Preloader from "../preloader/preloader";
import ArrowIcon from "../icons/arrowIcon";
import DText from "../text/dText";
import DropdownItem from "./item/dropdownItem";
import DModal from "../modal/dModal";
import { useDispatch, useSelector } from "react-redux";
import { setFilterGlobalFields } from "../../store/global/filter/filterGlobalFields";
import { useMemo } from "react";
import DropdownLadderItem from "./item/dropdownLadderItem";
import { ScrollView } from "react-native";
import tw from "../../../lib/tailwind";

function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}

const multiselectText = (arr) => {
  const str = truncateString(arr.map((option) => option.name).join(", "), 16);

  if (str) {
    return str;
  } else {
    return "Не выбрано";
  }
};

const DropdownModalLadder = ({
  isCanClearFilter,
  emptyOption = {
    name: "Не выбрано",
    id: "",
  },
  required,
  value,
  initialValue,
  name,
  multiselect,
  topTitle,
  icon,
  style,
  isLoading,
  options,
  fireOnValueChangeOnLoad = true,
  onValueChange,
  arrowStyle,
  container,
  selectedValueContainer,
  selectedValueTextContainer,
  selectedValueTextContainerText,
}) => {
  const filter = useSelector((state) => state.filterGlobalFields.value);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);

  const [selectedOption, setSelectedOption] = useState(
    multiselect ? [] : emptyOption
  );

  useEffect(() => {
    if (!options) return;

    if (multiselect) {
      // if (required) {
      //   setSelectedOption([options[0]]);
      // }

      if (initialValue) {
        const children = [];

        options.map((op) => {
          if (op?.children) {
            children.push(...op.children);
          }
        });

        const initialSelectedArr = initialValue.map((id) =>
          children.find((option) => option.id == id)
        );

        if (initialSelectedArr) {
          setSelectedOption(initialSelectedArr);
        }

        if (name && onValueChange && initialSelectedArr) {
          // const ids = initialSelectedArr.map((option) => option.id);
          // if(ids) {
          //   onValueChange({ value: ids, name: name });
          // }
        }
      }

      // if (value) {
      //   const initialSelectedArr = value.map((id) =>
      //     options.find((option) => option.id == id)
      //   );
      //   setSelectedOption(initialSelectedArr);

      //   if (
      //     name &&
      //     onValueChange &&
      //     initialSelectedArr &&
      //     fireOnValueChangeOnLoad
      //   ) {
      //     const ids = initialSelectedArr.map((option) => option.id);
      //     onValueChange({ value: ids, name: name });
      //   }
      // }
    } else {
      if (required) {
        setSelectedOption(options[0]);
      }

      if (initialValue || initialValue == 0) {
        const children = [];

        options.map((op) => {
          if (op?.children) {
            children.push(...op.children);
          }
        });

        const initialSelected = children.find(
          (option) => option.id == initialValue
        );

        setSelectedOption(initialSelected);

        if (onValueChange && initialSelected && fireOnValueChangeOnLoad) {
          onValueChange({ value: initialSelected.id, name: name });
        }
      }

      if (value || (value == 0 && fireOnValueChangeOnLoad)) {
        const initialSelected = options.find((option) => option.id == value);

        setSelectedOption(initialSelected);

        if (onValueChange && initialSelected) {
          onValueChange({ value: initialSelected.id, name: name });
        }
      }
    }
  }, [initialValue, options, value]);

  const handleOptionSelect = (value) => {
    if (multiselect) {
      if (!selectedOption.includes(value)) {
        const newOptions = [...selectedOption, value];
        const ids = newOptions.map((option) => option.id);

        setSelectedOption(newOptions);

        onValueChange({ value: ids, name: name });
      } else {
        const filtered = selectedOption.filter((option) => option !== value);
        const ids =
          filtered.length > 0 ? filtered.map((option) => option.id) : [];

        setSelectedOption(filtered);
        onValueChange({ value: ids, name: name });
      }
    } else {
      setSelectedOption(value);
      onValueChange({ value: value.id, name: name });
      setModalVisible(false);
    }
  };

  const clearDropdown = () => {
    if (multiselect) {
      setSelectedOption([]);
    } else {
      setSelectedOption({});
    }

    if (isCanClearFilter) {
      if (filter[name]) {
        const newFilter = { ...filter };
        delete newFilter[name];

        dispatch(setFilterGlobalFields(newFilter));
      }
    }
  };

  const parentOptions = useMemo(() => {
    if (!options) return [];

    const filtered = options.filter((area) => area?.children.length > 0);
    return filtered;
  }, [options]);

  return (
    <View style={style}>
      <View style={container ? container : styles.container}>
        {!isLoading ? (
          <>
            {topTitle && <Text style={styles.topTitle}>{topTitle}</Text>}

            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={
                selectedValueContainer
                  ? selectedValueContainer
                  : {
                      ...styles.selectedValueContainer,
                      borderColor: modalVisible ? "#4BA5F8" : "#E5E7EB",
                    }
              }
            >
              <View
                style={
                  selectedValueTextContainer
                    ? selectedValueTextContainer
                    : styles.selectedValueTextContainer
                }
              >
                {icon && icon}

                <DText
                  style={
                    selectedValueTextContainerText
                      ? selectedValueTextContainerText
                      : styles.selectedValueTextContainerText
                  }
                >
                  {multiselect
                    ? multiselectText(selectedOption)
                    : selectedOption?.name}
                </DText>

                <View
                  style={{
                    backgroundColor: "#fff",
                    transform: modalVisible ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <ArrowIcon style={arrowStyle} />
                </View>
              </View>
            </TouchableOpacity>

            <DModal
              setModalVisible={setModalVisible}
              modalVisible={modalVisible}
            >
              <ScrollView style={styles.listContainer}>
                <DText style={tw`font-bold text-center mb-2.5 text-xl`}>
                  Выберите район
                </DText>

                {parentOptions &&
                  parentOptions.map((option) => {
                    if (!option) return;

                    return (
                      <DropdownLadderItem
                        id={option.id}
                        key={option.id}
                        options={options}
                        item={option.name}
                        onPress={handleOptionSelect}
                        onOptionSelect={handleOptionSelect}
                        multiselect={multiselect}
                        selectedOption={selectedOption}
                      />
                    );
                  })}

                {!required && (
                  <TouchableOpacity onPress={clearDropdown}>
                    <DText
                      style={{
                        textAlign: "center",
                        color: "#4BA5F8",
                        marginTop: 15,
                      }}
                    >
                      Сбросить
                    </DText>
                  </TouchableOpacity>
                )}
              </ScrollView>
            </DModal>
          </>
        ) : (
          <Preloader style={styles.container} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    height: 42,
  },
  topTitle: {
    position: "absolute",
    top: -6,
    left: 10,
    fontSize: 12,
    zIndex: 5,
    backgroundColor: "#fff",
    color: "#666666",
  },
  selectedValueContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 4,
    borderWidth: 1,
    height: "100%",
  },
  selectedValueTextContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    // backgroundColor: "#fff",
  },
  selectedValueTextContainerText: {
    fontSize: 14,
  },
  optionItem: {
    padding: 10,
  },
  optionText: {
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0, 0.5)",
  },
  modalContent: {
    position: "relative",
    backgroundColor: "#fff",
    width: "90%",
    padding: 15,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 8,
    borderRadius: 4,
    zIndex: 2,
    width: "100%",
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 15,
  },
});

export default DropdownModalLadder;
