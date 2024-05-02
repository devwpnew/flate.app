import React from "react";
import DModal from "../dModal";
import { TouchableOpacity } from "react-native";
import DText from "../../text/dText";
import { View } from "react-native";
import DropdownItem from "../../dropdown/item/dropdownItem";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import { setFilterGlobalFields } from "../../../store/global/filter/filterGlobalFields";

export default function ModalDropdown({
  setModalVisible,
  modalVisible,
  name,
  options,
  required,
  multiselect,
  onValueRemove,
  selectedOption,
  setSelectedOption,
  isCanClearFilter,
  onValueChange,
}) {
  const filter = useSelector((state) => state.filterGlobalFields.value);
  const dispatch = useDispatch();

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

  const handleOptionRemove = (value) => {
    if (onValueRemove) {
      onValueRemove({ value: value, name: name });
      setModalVisible(false);
    }
  };

  const clearDropdown = () => {
    if (multiselect) {
      setSelectedOption([]);
    } else {
      setSelectedOption(emptyOption);
    }

    if (isCanClearFilter) {
      if (filter[name]) {
        const newFilter = { ...filter };
        delete newFilter[name];

        dispatch(setFilterGlobalFields(newFilter));
      }
    }
  };

  const onOptionPress = (name) => {
    const option = options.find((item) => item?.name === name);
    handleOptionSelect(option);
  };

  return (
    <DModal setModalVisible={setModalVisible} modalVisible={modalVisible}>
      {!required && (
        <TouchableOpacity onPress={clearDropdown}>
          <DText style={{ textAlign: "center", color: "#4BA5F8" }}>
            Сбросить
          </DText>
        </TouchableOpacity>
      )}

      <View style={styles.listContainer}>
        {options && options.map((option) => {
          if (!option) return;

          return (
            <DropdownItem
              id={option.id}
              key={option.id}
              item={option.name}
              handleOptionRemove={onValueRemove && handleOptionRemove}
              onPress={onOptionPress}
              multiselect={multiselect}
              selectedOption={selectedOption}
            />
          );
        })}
      </View>
    </DModal>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    borderRadius: 4,
    zIndex: 2,
    width: "100%",
  },
});
