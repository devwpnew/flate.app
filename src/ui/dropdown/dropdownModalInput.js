import { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import DropdownInput from "./dropdownInput";

import Preloader from "../preloader/preloader";

import ArrowIcon from "../icons/arrowIcon";
import DText from "../text/dText";
import DModal from "../modal/dModal";
import { useDispatch, useSelector } from "react-redux";
import { setFilterGlobalFields } from "../../store/global/filter/filterGlobalFields";

function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}

const multiselectText = (arr) => {
  const str = truncateString(arr.map((option) => option?.name).join(", "), 16);

  if (str) {
    return str;
  } else {
    return "Выберите район";
  }
};

const DropdownModalInput = ({
  isCanClearFilter,
  emptyOption = {
    name: "Не выбрано",
    id: "",
  },
  emptyFallback,
  name,
  icon,
  topTitle,
  value,
  initialValue,
  required,
  style,
  isShowSelected = true,
  isLoading,
  options,
  onValueChange,
  multiselect,
  children,
  arrowStyle,
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
      if (required) {
        setSelectedOption([options[0]]);
      }

      if (initialValue) {
        const initialSelectedArr = initialValue.map((id) =>
          options.find((option) => option.id == id)
        );
        setSelectedOption(initialSelectedArr);

        // if (name && onValueChange && initialSelectedArr) {
        // const ids = initialSelectedArr.map((option) => option.id);
        // onValueChange({ value: ids, name: name });
        // }
      }

      if (value) {
        const initialSelectedArr = value.map((id) =>
          options.find((option) => option.id == id)
        );
        setSelectedOption(initialSelectedArr);

        if (name && onValueChange && initialSelectedArr) {
          const ids = initialSelectedArr.map((option) => option.id);
          onValueChange({ value: ids, name: name });
        }
      }
    } else {
      if (required) {
        setSelectedOption(options[0]);
      }

      if (initialValue || initialValue == 0) {
        const initialSelected = options.find(
          (option) => option.id == initialValue
        );

        setSelectedOption(initialSelected);

        if (onValueChange && initialSelected) {
          onValueChange({ value: initialSelected.id, name: name });
        }
      }

      if (value || value == 0) {
        const initialSelected = options.find((option) => option.id == value);

        setSelectedOption(initialSelected);

        if (onValueChange && initialSelected) {
          onValueChange({ value: initialSelected.id, name: name });
        }
      }
    }
  }, [options, value]);

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

  return (
    <View style={style}>
      <View style={styles.container}>
        {!isLoading ? (
          <>
            {topTitle && <DText style={styles.topTitle}>{topTitle}</DText>}

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

                {!isShowSelected ? (
                  <>{emptyOption.name}</>
                ) : (
                  <>
                    {typeof selectedOption.name !== "object" ? (
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
                    ) : (
                      <>{selectedOption.name}</>
                    )}
                  </>
                )}

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
              position="top"
              setModalVisible={setModalVisible}
              modalVisible={modalVisible}
            >
              <TouchableOpacity onPress={clearDropdown}>
                <DText style={{ textAlign: "center", color: "#4BA5F8" }}>
                  Сбросить
                </DText>
              </TouchableOpacity>

              <DropdownInput
                isLoading={false}
                options={options}
                onItemPress={handleOptionSelect}
                multiselect={multiselect}
                style={styles.input}
                selectedOption={selectedOption}
                emptyFallback={emptyFallback}
              />
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
    borderRadius: 10,
    borderWidth: 1,
    height: "100%",
  },
  selectedValueTextContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  selectedValueTextContainerText: {
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "start",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0, 0.5)",
  },
  modalContent: {
    position: "relative",
    backgroundColor: "#fff",
    width: "90%",
    marginTop: 50,
    padding: 15,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  optionItem: {
    padding: 10,
  },
  optionText: {
    fontSize: 14,
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 15,
  },
  input: { marginLeft: 15, marginRight: 15, marginTop: 30, marginBottom: 30 },
});

export default DropdownModalInput;
