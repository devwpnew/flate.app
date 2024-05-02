import RModal from "../rModal";
import FormEditCollectionsTitle from "../../../layout/form/formEditCollectionsTitle";

export default function ModalEditTitleCollections({
  modalVisible,
  setModalVisible,
  title,
  collectionId,
  onSaveForm,
}) {
  const onSave = (params) => {
    setModalVisible(false);
    onSaveForm(params);
  };

  return (
    <>
      <RModal setModalVisible={setModalVisible} modalVisible={modalVisible}>
        <FormEditCollectionsTitle
          onSave={onSave}
          collectionId={collectionId}
          title={title}
        />
      </RModal>
    </>
  );
}
