import API from "../../../../../api/service/api";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";

import { PEdit } from "../icons/icons";
import RModal from "../../../../ui/modal/rModal";
import Btn from "../../../../ui/button/btn";
import Title from "../../../../ui/heading/title";

import { colors } from "../../../../ui/config";

export default function EditProduct({
  color,
  modalVisible,
  setModalVisible,
  style,
  published,
  productId,
  cb,
}) {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const sendToArchive = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("id", productId);
    formData.append("published", "2");

    const res = await API.update.product(formData);

    console.log(res, "res");

    setIsLoading(false);

    if (cb) {
      cb(productId, "archived");
    }

    setModalVisible(false);
  };

  const sendToActive = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("id", productId);
    formData.append("published", "0");

    const res = await API.update.product(formData);

    console.log(res, "res");

    setIsLoading(false);

    if (cb) {
      cb(productId, "activated");
    }

    setModalVisible(false);
  };

  const sendToDelete = async () => {
    Alert.alert("Вы уверены?", "Действие нельзя отменить", [
      {
        text: "Отмена",
        onPress: () => console.log("1"),
        style: "cancel",
      },
      { text: "Да", onPress: () => submitDelete() },
    ]);
  };

  const submitDelete = async () => {
    setIsLoading(true);

    const removeReq = await API.remove.product(productId);

    console.log(removeReq, "removeReq");

    setIsLoading(false);
    if (cb) {
      cb(productId, "deleted");
    }
    setModalVisible(false);
  };

  const edit = async () => {
    const product = await API.get.product.list({
      window_host: "https://flate.pro",
      filter: {
        id: productId,
      },
    });

    if (product && product.length > 0) {
      navigation.navigate("EditPage", {
        pName: product[0].name,
        product: product[0],
      });
    }

    setModalVisible(false);
  };

  const container = {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginTop: 20,
  };
  return (
    <>
      <TouchableOpacity
        style={style}
        onPress={() => setModalVisible((prev) => !prev)}
      >
        <PEdit color={color && colors[color]} />
      </TouchableOpacity>
      <RModal
        closeOnlyByButton={false}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      >
        <Title color={"grey-dark"} size="sm">
          Настройки
        </Title>

        <View style={container}>
          <Btn onPress={edit} isLoading={isLoading}>
            Редактировать
          </Btn>

          {published === "active" || published === "moderated" ? (
            <Btn
              isLoading={isLoading}
              onPress={sendToArchive}
              style={{ borderColor: colors["blue"] }}
              color="blue"
            >
              Снять с публикации
            </Btn>
          ) : (
            ""
          )}

          {published === "archive" && (
            <Btn
              isLoading={isLoading}
              onPress={sendToActive}
              style={{ borderColor: colors["blue"] }}
              color="blue"
            >
              Опубликовать
            </Btn>
          )}

          {published === "archive" && (
            <Btn isLoading={isLoading} onPress={sendToDelete} color="red">
              Удалить
            </Btn>
          )}
        </View>
      </RModal>
    </>
  );
}
