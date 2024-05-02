import { TouchableOpacity, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";

import DText from "../../text/dText";
import CrossIcon from "../../icons/crossIcon";

export default function DropdownItem({
  id,
  item,
  handleOptionRemove,
  onPress,
  multiselect,
  selectedOption,
  style,
}) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!selectedOption) return;

    if (multiselect) {
      const checkIsActive = selectedOption.find(
        (option) => option.name === item
      );
      setIsActive(checkIsActive);
    } else {
      setIsActive(item === selectedOption.name);
    }
  }, [selectedOption]);

  return (
    <TouchableOpacity
      style={style ? style : styles.itemWrapper}
      onPress={() => onPress(item)}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: handleOptionRemove ? 20 : 0,
        }}
      >
        <>
          {multiselect ? (
            <>
              <View style={styles.checkboxContainer}>
                <View style={styles.checkbox}>
                  {isActive && <View style={styles.checkboxInner} />}
                </View>
              </View>

              <DText style={{ color: isActive ? "#4BA5F8" : "#1F1F1F" }}>
                {item}
              </DText>
            </>
          ) : (
            <DText style={{ color: isActive ? "#4BA5F8" : "#1F1F1F" }}>
              {item}
            </DText>
          )}
        </>
        {handleOptionRemove && (
          <TouchableOpacity onPress={() => handleOptionRemove(item)}>
            <CrossIcon />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemWrapper: {
    padding: 12,
    width: "100%",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 17,
    height: 17,
    borderWidth: 1,
    borderColor: "#c4c4c4",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: "#4BA5F8",
    borderRadius: 2,
  },
  label: {
    fontSize: 16,
  },
});
