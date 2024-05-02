import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Linking } from "react-native";
import tw from "../../../../lib/tailwind";
import Svg, { Path } from "react-native-svg";
import Btn from "../../../ui/button/btn";
import H2 from "../../../ui/heading/h2";
import DText from "../../../ui/text/dText";
import RModal from "../../../ui/modal/rModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setFilterVisibility } from "../../../store/global/filter/filterVisibility";
import Paragraph from "../../../ui/text/paragraph";
import Title from "../../../ui/heading/title";
import { setLogedIn } from "../../../store/global/user/userLogin";
import { userModerationHandler } from "../../../../helpers/user/user";

export default function RCallButton({ phone, ...props }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const user = useSelector((state) => state.userLogin.value);

  const [openUserModerationModal, setOpenUserModerationModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const makePhoneCall = async (phoneNumber) => {
    if (user && Object.keys(user).length > 0) {
      if (user.user_group?.id === 6) {
        const userModeration = await userModerationHandler(user.id);

        if (userModeration) {
          dispatch(setLogedIn(userModeration));

          Linking.openURL(`tel:+${phoneNumber.replace(/[^0-9]/g, "")}`).catch(
            (error) => console.log("Не удалось совершить звонок", error)
          );
        } else {
          setOpenUserModerationModal(true);
          dispatch(setFilterVisibility(false));
        }

        return;
      }

      Linking.openURL(`tel:+${phoneNumber.replace(/[^0-9]/g, "")}`).catch(
        (error) => console.log("Не удалось совершить звонок", error)
      );
    } else {
      navigation.navigate("Login");
      dispatch(setFilterVisibility(false));
    }
  };

  const openModal = () => {
    if (user && Object.keys(user).length > 0) {
      if (user.user_group?.id === 6) {
        setOpenUserModerationModal(true);
        dispatch(setFilterVisibility(false));

        return;
      }

      setModalVisible(true);
    } else {
      navigation.navigate("Login");
      dispatch(setFilterVisibility(false));
    }
  };

  return (
    <>
      <Btn {...props} onPress={() => makePhoneCall(phone)} type={"white"}>
        Позвонить
      </Btn>

      <RModal modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <TouchableOpacity onPress={() => makePhoneCall(phone)}>
          <Title style={{ textAlign: "center", marginBottom: 20 }}>
            {phone}
          </Title>
        </TouchableOpacity>

        <Title size="sm" style={{ textAlign: "center", marginBottom: 20 }}>
          Скажите продавцу, что нашли это объявление на FLATE.PRO.
        </Title>

        <Btn
          onPress={() => {
            makePhoneCall(phone);
            setModalVisible(false);
          }}
        >
          ОК
        </Btn>
      </RModal>

      <RModal
        modalVisible={openUserModerationModal}
        setModalVisible={setOpenUserModerationModal}
      >
        <Title size="sm" style={{ marginBottom: 20 }}>
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

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0, 0.5)",
  },
  modalContent: {
    position: "relative",
    backgroundColor: "#fff",
    width: "90%",
    padding: 15,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 15,
  },
});
