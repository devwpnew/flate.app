import React from "react";
import RModal from "../rModal";
import FormAddRc from "../../../template/user/form/formAddRc";
import Title from "../../heading/title";
import { View } from "react-native";

export default function ModalAddRc({ setModalVisible, modalVisible }) {
  return (
    <>
      <RModal
        closeOnlyByButton={true}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      >
        <Title>Добавить ЖК</Title>
        <View style={{ zIndex: 100 }}>
          <FormAddRc />
        </View>
      </RModal>
    </>
  );
}
