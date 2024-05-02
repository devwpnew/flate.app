import { View, StyleSheet, TouchableOpacity } from "react-native";
import InputBasic from "./inputBasic";

export default function InputIcon({ inputProps, icon, buttonProps, ...props }) {
  return (
    <View style={styles.button} {...props}>
      {icon && <TouchableOpacity {...buttonProps}>{icon}</TouchableOpacity>}

      <InputBasic {...inputProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
