import { useState } from "react";
import DropdownItem from "./dropdownItem";
import DModal from "../../modal/dModal";
import { ScrollView } from "react-native";

export default function DropdownLadderItem({
  options,
  id,
  item,
  onPress,
  multiselect,
  selectedOption,
}) {
  const [selectedParent, setSelectedParent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [children, setChildren] = useState([]);

  const onParentOptionPress = (name) => {
    const option = options.find((item) => item?.name === name);

    if (option?.children) {
      setChildren(option.children);
      setModalVisible(true);
      setSelectedParent(option);
    } else {
      if (option) {
        onPress(option);
      }
    }
  };

  const onChildOptionPress = (name) => {
    const option = children.find((item) => item?.name === name);

    if (option) {
      onPress(option);
    }
  };

  return (
    <>
      <DropdownItem
        id={id}
        item={item}
        onPress={onParentOptionPress}
        multiselect={false}
        selectedOption={selectedParent}
      />

      <DModal
        transparent={true}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        contentStyle={{
          width: "90%",
          backgroundColor: "#fff",
          marginTop: 50,
          marginBottom: 50,
          borderRadius: 10,
        }}
      >
        <ScrollView style={{ width: "100%", marginTop: 50, marginBottom: 50 }}>
          {children &&
            children.map((child) => {
              return (
                <DropdownItem
                  id={child.id}
                  key={child.id}
                  item={child.name}
                  onPress={onChildOptionPress}
                  multiselect={multiselect}
                  selectedOption={selectedOption}
                />
              );
            })}
        </ScrollView>
      </DModal>
    </>
  );
}
