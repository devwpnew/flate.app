import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import api from "../../../../api/service/api";

import Radio from "../../../ui/checkbox/radio";

import Btn from "../../../ui/button/btn";
import RModal from "../../../ui/modal/rModal";
import Paragraph from "../../../ui/text/paragraph";
import Title from "../../../ui/heading/title";
import RInput from "../../../ui/input/rInput";
import { userModerationHandler } from "../../../../helpers/user/user";
import { setLogedIn } from "../../../store/global/user/userLogin";

const options = [
  { id: "0", name: "Уже продано" },
  { id: "1", name: "Неверная цена" },
  { id: "2", name: "Неверное описание или фото" },
  { id: "3", name: "Не дозвониться" },
  { id: "4", name: "Другая причина (Эксклюзив)" },
];

export default function RReportButton({ productId, ...props }) {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userLogin.value);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [openUserModerationModal, setOpenUserModerationModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [reportMsg, setReportMsg] = useState("");

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const sendReport = async () => {
    if (!productId) return;

    setIsLoading(true);

    // const selectedReportOption = selectedOption.id;

    let text = selectedOption.name;

    if (reportMsg) {
      text = reportMsg;
    }

    const res = await api.add.report({
      window_host: "https://flate.pro",
      status: selectedOption.id,
      product: productId,
      user_id: user.id,
      text: text,
    });

    setIsLoading(false);

    // console.log(res, "res");

    if (res?.itemId) {
      setIsSuccess(true);
    }
  };

  const openReportModal = async () => {
    if (user && Object.keys(user).length > 0) {
      if (user.user_group?.id === 6) {
        const userModeration = await userModerationHandler(user.id);

        if (userModeration) {
          dispatch(setLogedIn(userModeration));
          setModalVisible(true);
        } else {
          setOpenUserModerationModal(true);
        }

        return;
      }
      setModalVisible(true);
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <>
      <Btn {...props} onPress={openReportModal}>
        Пожаловаться
      </Btn>

      <RModal setModalVisible={setModalVisible} modalVisible={modalVisible}>
        {isSuccess ? (
          <>
            <Title style={{ marginBottom: 20 }} size="sm">
              Спасибо!
            </Title>

            <Paragraph size="lg">Сообщение отправлено</Paragraph>
          </>
        ) : (
          <>
            <Title style={{ marginBottom: 20 }} size="sm">
              Жалоба на объявление!
            </Title>

            <View style={{ width: "100%" }}>
              <Radio
                options={options}
                selectedOption={selectedOption}
                onSelect={handleSelect}
              />
            </View>

            {selectedOption.id == "4" && (
              <View style={{ marginBottom: 10 }}>
                <RInput
                  multiline={true}
                  style={{
                    fontSize: 13,
                    paddingBottom: 30,
                  }}
                  onChangeText={(v) => setReportMsg(v.value)}
                  placeholder={
                    "Если у вас эксклюзивный договор на продажу этого объекта – сообщите нам об этом. Не забудьте указать ваш телефон!"
                  }
                />
              </View>
            )}

            <Btn isLoading={isLoading} onPress={() => sendReport()}>
              Отправить
            </Btn>
          </>
        )}
      </RModal>
      <RModal
        modalVisible={openUserModerationModal}
        setModalVisible={setOpenUserModerationModal}
      >
        <Title style={{ marginBottom: 20 }} size="sm">
          Ваш аккаунт на модерации!
        </Title>

        <Paragraph size="lg">
          После одобрения, вам будут доступны все возможности и функции. Обычно
          это занимает не более часа.
        </Paragraph>
      </RModal>
    </>
  );
}
