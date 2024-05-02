import { Alert, TouchableOpacity, View } from "react-native";

import RModal from "../rModal";
import FormEditCollectionsProduct from "../../../layout/form/formEditCollectionsProduct";
import api from "../../../../api/service/api";

export default function ModalEditProductCollections({
  onDelete,
  onEditComission,
  productId,
  comission,
  modalVisible,
  setModalVisible,
}) {
  const onCollectionProductDelete = () => {
    Alert.alert(`Вы уверены?`, `Убрать объект из подборки?`, [
      {
        text: "Да",
        onPress: deleteAction,
      },
      {
        text: "Отмена",
      },
    ]);
  };

  const deleteAction = async () => {
    try {
      const deleteRes = await api.selections.product.delete({
        productId: productId,
      });

      if (deleteRes && onDelete) {
        onDelete({
          id: productId,
          response: deleteRes,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onSave = () => {
    setModalVisible(false);
  };

  return (
    <>
      <RModal
        closeButtonStyle={{
          display: "none",
        }}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      >
        <FormEditCollectionsProduct
          onEditComission={onEditComission}
          productId={productId}
          comission={comission}
          onDelete={onCollectionProductDelete}
          onSave={onSave}
        />
      </RModal>
    </>
  );
}
