import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";

import Paragraph from "../../text/paragraph";

export default function RDropdownItem({
  size = "lg",
  option,
  selectedOption,
  onOptionPress,
  multiselect,
}) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!selectedOption) return;

    if (multiselect) {
      const checkIsActive = selectedOption.find((o) => o.name === option.name);
      setIsActive(checkIsActive);
    } else {
      setIsActive(option.name === selectedOption.name);
    }
  }, [selectedOption]);

  return (
    <TouchableOpacity onPress={() => onOptionPress(option)}>
      <Paragraph color={isActive ? "blue-main" : "black "} size={size}>
        {option.name}
      </Paragraph>
    </TouchableOpacity>
  );
}
