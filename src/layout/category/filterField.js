import tw from "../../../lib/tailwind";
import { View, Text } from "react-native-web";
import useFilterProp from "../../../hooks/filter/useFilterProp";

import DropdownModal from "../../ui/dropdown/dropdownModal";
import InputRange from "../../ui/input/inputRange";
import Buttons from "../../ui/checkbox/buttons";

export default function FilterField({
  type,
  isCanClearFilter,
  propTitle,
  propName,
  propMulti,
  onValueChange,
  ...props
}) {
  const options = useFilterProp(propName);

  if (type === "range") {
    return (
      <InputRange
        name={propName}
        isNumberFormat={true}
        onChangeText={onValueChange}
        {...props}
      />
    );
  }

  if (type === "checkbox") {
    return (
      <Buttons
        title={propTitle}
        name={propName}
        multiselect={propMulti}
        isLoading={options.isLoading}
        options={options.data}
        onValueChange={onValueChange}
        {...props}
      />
    );
  }

  return (
    <>
      <DropdownModal
        isCanClearFilter={true}
        name={propName}
        multiselect={propMulti}
        isLoading={options.isLoading}
        options={options.data}
        onValueChange={onValueChange}
        {...props}
      />
    </>
  );
}
