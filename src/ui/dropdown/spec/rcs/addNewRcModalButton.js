import { TouchableOpacity } from "react-native";
import DText from "../../../text/dText";
import DModal from "../../../modal/dModal";
import AddNewRcForm from "./addNewRcForm";
import { useState } from "react";
import tw from "../../../../../lib/tailwind";

export default function addNewRcModalButton({ onNewRcAdded }) {
  const [isShowModal, setIsShowModal] = useState(false);

  const onNewRcAddedModalHandler = () => {
    setIsShowModal(false);
    onNewRcAdded();
  };

  return (
    <>
      <TouchableOpacity style={tw`py-2.5`} onPress={() => setIsShowModal(true)}>
        <DText style={tw`text-bluedeep text-center font-semibold`}>
          + Добавить новый ЖК
        </DText>
      </TouchableOpacity>

      <DModal
        closeOnlyByButton={true}
        modalVisible={isShowModal}
        setModalVisible={setIsShowModal}
      >
        <AddNewRcForm onNewRcAdded={onNewRcAddedModalHandler} />
      </DModal>
    </>
  );
}
