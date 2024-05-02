import { useState } from "react";
import { useSelector } from "react-redux";
import { View } from "react-native";

import api from "../../../../api/service/api";
import tw from "../../../../lib/tailwind";

import Button from "../../../ui/button/button";
import DText from "../../../ui/text/dText";
import DModal from "../../../ui/modal/dModal";

import Radio from "../../../ui/checkbox/radio";
import Preloader from "../../../ui/preloader/preloader";
import InputArea from "../../../ui/input/inputArea";
import { useNavigation } from "@react-navigation/native";

const options = [
  { id: "0", name: "Уже продано" },
  { id: "1", name: "Неверная цена" },
  { id: "2", name: "Неверное описание или фото" },
  { id: "3", name: "Не дозвониться" },
  { id: "4", name: "Другая причина" },
];

export default function ReportButton({ product }) {
  const navigation = useNavigation();

  const user = useSelector((state) => state.userLogin.value);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [openUserModerationModal, setOpenUserModerationModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [reportMsg, setReportMsg] = useState("");

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const sendReport = async () => {
    setIsLoading(true);

    const selectedReportOption = selectedOption.id;

    let text = selectedReportOption.name;

    if (reportMsg) {
      text = reportMsg;
    }

    console.log({
      window_host: "https://flate.pro",
      status: selectedOption.id,
      product: product.id,
      user_id: user.id,
      text: text,
    });

    // const res = await api.add.report({
    //   window_host: "https://flate.pro",
    //   status: selectedOption.id,
    //   product: product.id,
    //   user_id: user.id,
    //   text: text,
    // });

    setIsLoading(false);

    // console.log(res, "res");

    // if (res?.itemId) {
    //   setIsSuccess(true);
    // }
  };

  const openReportModal = () => {
    if (user && Object.keys(user).length > 0) {
      if (user.user_group?.id === 6) {
        setOpenUserModerationModal(true);
        return;
      }
      setModalVisible(true);
    } else {
      navigation.navigate("Login");
    }
  };
  
  console.log(selectedOption, 'selectedOption');

  return (
    <>
      <Button
        type={"red"}
        style={tw`h-[39px] w-full`}
        onPress={openReportModal}
      >
        Пожаловаться
      </Button>

      <DModal setModalVisible={setModalVisible} modalVisible={modalVisible}>
        {isSuccess ? (
          <>
            <DText style={tw`text-center text-primary text-2xl font-bold mb-8`}>
              Спасибо!
            </DText>

            <DText style={tw`mb-5`}>
              <DText style={tw`text-lg text-center`}>
                Сообщение отправлено
              </DText>
            </DText>
          </>
        ) : (
          <>
            <DText style={tw`text-center text-primary text-2xl font-bold mb-8`}>
              Жалоба на объявление
            </DText>

            <View style={tw`w-full`}>
              <Radio
                options={options}
                selectedOption={selectedOption}
                onSelect={setSelectedOption}
              />
            </View>

            {selectedOption.id == "4" && (
              <InputArea
                onChangeText={(v) => setReportMsg(v.value)}
                placeholder="Ваше сообщение"
              />
            )}

            {isLoading ? (
              <Preloader style={tw`w-1/3 h-[31px] mr-auto mt-3`} />
            ) : (
              <Button
                onPress={() => sendReport()}
                style={tw`w-1/3 h-[31px] mr-auto mt-3`}
              >
                Отправить
              </Button>
            )}
          </>
        )}
      </DModal>

      <DModal
        modalVisible={openUserModerationModal}
        setModalVisible={setOpenUserModerationModal}
      >
        <DText style={tw`text-lg font-bold mb-[10px]`}>
          Ваш аккаунт на модерации!
        </DText>

        <DText style={tw`text-lg text-center`}>
          После одобрения, вам будут доступны все возможности и функции. Обычно
          это занимает не более часа.
        </DText>
      </DModal>
    </>
  );
}
