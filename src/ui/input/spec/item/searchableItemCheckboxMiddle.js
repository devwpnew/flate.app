import { View } from "react-native";

import { colors } from "../../../config";

export default function SearchableItemCheckboxMiddle({ style }) {
  return (
    <>
      <View
        style={{
          ...style,
          width: 20,
          height: 20,
          borderColor: colors["blue"],
          backgroundColor: colors["blue"],
          borderRadius: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View
          style={{
            height: 3,
            borderRadius: 2,
            backgroundColor: colors["white"],
            width: "90%",
            marginTop: 6.6,
          }}
        ></View>
      </View>
    </>
  );
}
