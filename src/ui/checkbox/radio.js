import {
  TouchableOpacity,
  StyleSheet,
  View,
  Switch,
  Platform,
} from "react-native";

import DText from "../text/dText";
import { colors } from "../config";
import InputWrapper from "../dropdown/part/inputWrapper";
import Paragraph from "../text/paragraph";

export default function Radio({ options, selectedOption, onSelect }) {
  const wrapperProps = {
    color: "white",
    shadow: false,
    rounded: false,
    style: {},
    isSuccess: false,
    isValid: true,
    left: null,
    leftWidth: 0,
    right: null,
    rightWidth: 0,
  };

  return (
    <View>
      {options.map((option) => {
        const isToggled = option.id == selectedOption.id;

        return (
          <TouchableOpacity
            key={option.id}
            style={{ marginBottom: 10 }}
            onPress={() => {
              onSelect(option);
            }}
          >
            <InputWrapper {...wrapperProps}>
              <View style={{ paddingVertical: 14, flex: 1 }}>
                <Paragraph
                  color={isToggled ? "black" : "grey-medium"}
                  size={"md"}
                >
                  {option.name}
                </Paragraph>

                <Switch
                  style={styles.switch}
                  thumbStyle={{
                    height: 1,
                  }}
                  trackColor={{
                    false: colors["grey-light"],
                    true: colors["green-dark"],
                  }}
                  thumbColor={isToggled ? colors["white"] : colors["white"]}
                  onValueChange={() => {
                    return;
                  }}
                  value={isToggled}
                />
              </View>
            </InputWrapper>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 14,
    width: "100%",
  },
  option: {
    width: 17,
    height: 17,
    borderRadius: 999,
    backgroundColor: "#fff",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#c4c4c4",
  },
  selectedOption: {
    borderWidth: 5,
    borderColor: "#4BA5F8",
  },
  optionText: {
    fontSize: 14,
  },
  switch:
    Platform.OS === "ios"
      ? {
          position: "absolute",
          right: -6,
          top: 10,
          transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
          shadowColor: "rgba(111, 120, 130, 0.35)",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 1,
          shadowRadius: 6,
          elevation: 6,
          margin: 0,
          padding: 0,
          zIndex: -1
        }
      : {
          position: "absolute",
          right: -6,
          top: 0,
          shadowColor: "rgba(111, 120, 130, 0.35)",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 1,
          shadowRadius: 6,
          elevation: 6,
          margin: 0,
          padding: 0,
          zIndex: -1
        },
});
