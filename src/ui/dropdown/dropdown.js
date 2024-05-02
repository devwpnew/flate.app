import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect, useCallback } from "react";

import InputInnerMultiSelect from "./part/inputInnerMultiSelect";
import InputInnerSelect from "./part/inputInnerSelect";
import InputWrapper from "./part/inputWrapper";
import { useSelector } from "react-redux";
import Paragraph from "../text/paragraph";

const truncateString = (str, num) => {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
};

const multiselectText = (arr, title) => {
  const str = truncateString(arr.map((option) => option?.name).join(", "), 16);

  if (str) {
    return str;
  }
};

const selectItems = (options) => {
  return options.map((op) => {
    const obj = {
      label: op.name.toString(),
      value: op.id.toString(),
    };
    return obj;
  });
};

const getPlaceholder = (selectedOption, title, multiselect) => {
  if (multiselect) {
    return multiselectText(selectedOption, title);
  }

  if (selectedOption?.name) {
    const placeholder = {
      label: selectedOption.name,
      value: selectedOption.id,
    };
    return placeholder;
  }

  if (title) {
    return {
      label: title,
      value: "",
    };
  }
};

export default function Dropdown({
  name,
  title,

  leftWidth = 80,
  left = null,
  rightWidth = 80,
  right = null,
  color = "white",

  isPlaceholder = true,
  placeholder,
  placeholderColor = "black",
  placeholderSize = "md",

  shadow = true,
  rounded = false,
  multiselectSearch = false,
  multiselect = false,
  multiselectSingle = false,
  isRequired = false,
  isValid = true,
  isSuccess = false,
  isLoading = false,
  isCanRemoveSelected = false,

  onValueChange,
  onValuePress,
  value,
  initialValue,

  options,
  emptyOption,
  style = {},
  ...props
}) {
  const filter = useSelector((state) => state.filterGlobalFields.value);
  const route = useRoute();
  const navigation = useNavigation();

  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    multiselect ? [] : emptyOption
  );

  const placeholderValue = useCallback(() => {
    const nPlaceholder = getPlaceholder(
      selectedOption,
      placeholder,
      multiselect
    );

    if (nPlaceholder) {
      return nPlaceholder;
    } else {
      return placeholder;
    }
  }, [placeholder, selectedOption, title, multiselect]);

  // console.log(selectedOption, name);

  const setOptions = (value) => {
    if (isLoading) return;

    if (multiselect) {
      const openedArOptions = [];

      options.map((op) => {
        if (op?.children) {
          const children = op?.children.map((child) => {
            openedArOptions.push(child);
          });
        }
        openedArOptions.push(op);
      });

      let selectedArr = [];

      if (Array.isArray(value)) {
        selectedArr = value.map((id) =>
          openedArOptions.find((option) => option.id == id)
        );
      }

      setSelectedOption(selectedArr);
      return selectedArr;
    } else {
      if (!value && value != 0) {
        const selected = options.find((option) => option.id == value);
        setSelectedOption(selected);
      }

    }
  };

  const onOptionPress = (value) => {
    if (isLoading) return;

    if (multiselect) {
      if (!selectedOption.includes(value)) {
        const newOptions = [...selectedOption, value];
        const ids = newOptions.map((option) => option.value);

        setSelectedOption(newOptions);
        onValueChange({ value: ids, name: name });
        if (onValuePress) {
          onValuePress({ value: id, name: name });
        }
      } else {
        const filtered = selectedOption.filter((option) => option !== value);
        const ids =
          filtered.length > 0 ? filtered.map((option) => option.id) : [];

        setSelectedOption(filtered);
        onValueChange({ value: ids, name: name });
        if (onValuePress) {
          onValuePress({ value: id, name: name });
        }
      }
    } else {
      setSelectedOption(value);
      onValueChange({ value: value.id, name: name });
      if (onValuePress) {
        onValuePress({ value: value.id, name: name });
      }
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    if (multiselect && route?.params?.name === name) {
      setSelectedOption(route.params.selectedOptions);

      console.log(route?.params?.name, "route?.params?.name");

      if (onValueChange) {
        const ids = route.params.selectedOptions.map((op) => op.value);
        console.log({ value: ids, name: name });
        onValueChange({ value: ids, name: name });
      }
    }
  }, [route]);

  // useEffect(() => {
  //   if (filter?.section_relation) {
  //     setSelectedOption([]);
  //   }
  // }, [filter?.section_relation]);

  useEffect(() => {
    if (!options || isLoading) return;

    if (multiselect) {
      // if (isRequired) {
      //   const initialSelectedArr = setOptions([options[0]]);
      //   if (name && onValueChange && initialSelectedArr) {
      //     const ids = initialSelectedArr.map((option) => option.id);
      //     onValueChange({ value: ids, name: name });
      //   }
      // }

      // if (initialValue) {
      const initialSelectedArr = setOptions(initialValue);

      // if (name && onValueChange && initialSelectedArr) {
      // const ids = initialSelectedArr.map((option) => option?.id);
      // if (ids) {
      //   onValueChange({ value: ids, name: name });
      // }
      // }
      // }

      if (value) {
        const initialSelectedArr = setOptions(value);
        if (name && onValueChange && initialSelectedArr) {
          const ids = initialSelectedArr.map((option) => option.id);
          onValueChange({ value: ids, name: name });
        }
      }
    } else {
      // if (isRequired) {
      //   const initialSelected = setOptions(options[0].id);
      //   if (onValueChange && initialSelected) {
      //     onValueChange({ value: initialSelected.id, name: name });
      //   }
      // }

      if (initialValue || initialValue == 0) {
        const initialSelected = setOptions(initialValue);

        console.log(initialValue);

        // if (onValueChange && initialSelected) {
        //   onValueChange({ value: initialSelected.id, name: name });
        // }
      }

      if (value || value == 0) {
        const initialSelected = setOptions(value);
        if (onValueChange && initialSelected) {
          onValueChange({ value: initialSelected.id, name: name });
        }
      }
    }
  }, [isLoading, options, value, initialValue]);

  const inputProps = {
    onOptionPress: onOptionPress,
    isLoading: isLoading,
    style: style,
    loaderVariant: left ? "left" : "center",
    isPlaceholder: isPlaceholder,
    placeholder: placeholderValue(),
    placeholderColor: isSuccess ? "black" : placeholderColor,
    placeholderSize: placeholderSize,
    isArrowExpanded: isExpanded,
    name: name,
  };

  const inputWrapperProps = {
    isLoading: isLoading,
    isRequired: isRequired,
    color: color,
    shadow: shadow,
    rounded: rounded,
    style: style,
    isSuccess: isSuccess,
    isValid: isValid,
    left: left,
    leftWidth: leftWidth,
    right: right,
    rightWidth: rightWidth,
  };

  const navigateProps = {
    ...route?.params,
    to:
      route.name === "Add" || route.name === "EditPage" ? route.name : "Search",
    slug:
      route.name === "Add" || route.name === "EditPage"
        ? "add"
        : route.params?.slug,
    title: placeholder,
    name: name ? name : "",
    options: options,
    selectedOptions: selectedOption,
    multiselectSearch: multiselectSearch,
    multiselectSingle: multiselectSingle,
  };

  return (
    <>
      <InputWrapper {...inputWrapperProps}>
        {multiselect && options && (
          <InputInnerMultiSelect
            onPress={() => navigation.navigate("Select", navigateProps)}
            options={options}
            {...inputProps}
            {...props}
          />
        )}

        {!multiselect && options && (
          <InputInnerSelect
            isCanRemoveSelected={isCanRemoveSelected}
            items={selectItems(options)}
            value={initialValue}
            {...inputProps}
            {...props}
          />
        )}
      </InputWrapper>
    </>
  );
}
