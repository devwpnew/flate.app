import useFilterProp from "../../../hooks/filter/useFilterProp";

import Dropdown from "../../ui/dropdown/dropdown";
import RInputCheckbox from "../../ui/input/rInputCheckbox";
import RInputRange from "../../ui/input/rInputRange";

import { colors } from "../../ui/config";

export default function RFilterField({
  type,
  isCanClearFilter,
  propTitle,
  propName,
  propMulti,
  onValueChange,
  isSuccess,
  ...props
}) {
  const options = useFilterProp(propName);

  if (type === "range") {
    return (
      <RInputRange
        isSuccess={isSuccess}
        name={propName}
        isNumberFormat={true}
        onChangeText={onValueChange}
        style={{
          fontSize: 14,
          color: isSuccess ? colors["black"] : colors["grey-medium"],
        }}
        placeholder={propTitle}
        placeholderTextColor={colors["grey-medium"]}
        {...props}
      />
    );
  }

  if (type === "checkbox") {
    return (
      <RInputCheckbox
        isSuccess={isSuccess}
        placeholder={propTitle}
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
      <Dropdown
        isSuccess={isSuccess}
        name={propName}
        placeholder={propTitle}
        multiselect={propMulti}
        isLoading={options.isLoading}
        options={options.data}
        onValueChange={onValueChange}
        placeholderColor="grey-medium"
        {...props}
      />
    </>
  );
}
