import RModal from "../rModal";

import { useState } from "react";
import { useRoute } from "@react-navigation/native";

import FormAddCollections from "../../../layout/form/formAddCollections";
import FormCreateCollections from "../../../layout/form/formCreateCollections";
import FormCollections from "../../../layout/form/formCollections";

export default function ModalCreateCollections({
  templateName = "default",
  modalVisible,
  setModalVisible,
  productId,
}) {
  const route = useRoute();

  const [productCollectionId, setProductCollectionId] = useState(null);
  const [template, setTemplate] = useState(templateName);

  const reset = () => {
    setTemplate("default");
    setProductCollectionId(null);
  };

  const closeModal = () => {
    if (templateName === "default") {
      console.log(templateName);
      reset();
    }
    setModalVisible(false);
  };

  const changeProductCollectionComission = (id) => {
    if (!id) return;
    setProductCollectionId(id);
    setTemplate("add");
  };

  const showCreateTemplate = () => {
    setTemplate("create");
  };

  const showDefaultTemplate = () => {
    if (route.name === "Collections") {
      // closeModal();
      setModalVisible(false);
      return;
    }
    setTemplate("default");
  };

  function getTemplate() {
    if (template === "add") {
      return (
        <FormAddCollections
          productId={productCollectionId}
          onSave={() => reset()}
          onSkip={() => reset()}
        />
      );
    }

    if (template === "create") {
      return <FormCreateCollections onSave={showDefaultTemplate} />;
    }

    if (template === "default") {
      return (
        <FormCollections
          productId={productId}
          onItemPress={changeProductCollectionComission}
          onCreate={showCreateTemplate}
          onSave={closeModal}
        />
      );
    }
  }

  return (
    <>
      <RModal
        closeButtonStyle={
          template === "add" && {
            display: "none",
          }
        }
        setModalVisible={closeModal}
        modalVisible={modalVisible}
        closeOnlyByButton={false}
      >
        {getTemplate()}
      </RModal>
    </>
  );
}
