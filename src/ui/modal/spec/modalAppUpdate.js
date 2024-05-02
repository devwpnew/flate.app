import api from "../../../../api/service/api";

import { Linking, Platform } from "react-native";
import { useEffect, useState } from "react";
import * as Application from "expo-application";

import Btn from "../../button/btn";
import RModal from "../rModal";
import Title from "../../heading/title";
import Paragraph from "../../text/paragraph";

const curVersion = Application.nativeApplicationVersion;

export default function ModalAppUpdate() {
  const [data, setData] = useState({
    title: "Требуется обновление приложения",
    text: "Мы добавили суперудобную фичу, чтобы упростить тебе жизнь",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const link =
    Platform.OS === "ios"
      ? "https://apps.apple.com/ru/app/flate/id6458738854"
      : "https://play.google.com/store/apps/details?id=flate.pro";

  useEffect(() => {
    (async () => {
      const isNeedUpdate = await api.get.needUpdate(curVersion);
      const title = await api.get.setting("need_update_title");
      const text = await api.get.setting("need_update_desc");

      setData((prevData) => ({ ...prevData, title: title, text: text }));

      setModalVisible(isNeedUpdate);
    })();
  }, [curVersion]);


  return (
    <>
      <RModal
        modalVisible={modalVisible}
        setModalVisible={() => setModalVisible(true)}
        closeButtonStyle={{ display: "none" }}
      >
        <Title style={{ marginBottom: 20 }} size="sm">
          {data.title}
        </Title>

        <Paragraph style={{ marginBottom: 20 }} size="lg">
          {data.text}
        </Paragraph>

        <Btn onPress={() => Linking.openURL(link)}>Обновить</Btn>
      </RModal>
    </>
  );
}
