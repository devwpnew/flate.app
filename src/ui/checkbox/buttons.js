import tw from "../../../lib/tailwind";
import { View } from "react-native";
import DText from "../text/dText";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import Button from "../button/button";
import ButtonActive from "../button/buttonActive";
import Preloader from "../preloader/preloader";
import { useEffect } from "react";

export default function Buttons({
  title,
  name,
  multiselect,
  isLoading,
  options,
  onValueChange,
  initialValue,
  ...props
}) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (option) => {
    setSelected(option);
    onValueChange({ value: option.id, name: name });
  };

  useEffect(() => {
    const initialValueCheck =
      typeof initialValue === "number" ? initialValue.toString() : initialValue;

    if (!initialValueCheck || !options || options.length === 0) return;

    const id = initialValue;
    const value = options.find((op) => op.id == id);

    setSelected(value);

    if (onValueChange) {
      onValueChange({ value: id, name: name });
    }
  }, [initialValue, options, isLoading]);

  return (
    <>
      <View style={tw`w-full flex flex-row flex-wrap gap-2.5`}>
        {isLoading ? (
          <>
            {[1, 2, 3].map((option) => {
              return <Preloader key={option} style={tw`w-[23%] h-[40px]`} />;
            })}
          </>
        ) : (
          <>
            {options &&
              options.map((option, index) => {
                if (!option) return;

                return (
                  <Button
                    key={option.id + index}
                    style={tw`w-[23%]`}
                    onPress={() => handleSelect(option)}
                    type={selected?.id == option.id ? "blue" : "white"}
                  >
                    {option.name}
                  </Button>
                );
              })}
          </>
        )}
      </View>
    </>
  );
}
