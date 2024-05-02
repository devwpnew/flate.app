import React, { useState } from "react";
import { Pressable, Linking } from "react-native";
import tw from "../../../../lib/tailwind";
import Svg, { Path } from "react-native-svg";
import DText from "../../../ui/text/dText";
import DModal from "../../../ui/modal/dModal";

import getProductPhone from "../../../../helpers/formatters/product/getProductPhone";
import getProductUrl from "../../../../helpers/formatters/product/getProductUrl";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Btn from "../../../ui/button/btn";
import Paragraph from "../../../ui/text/paragraph";
import Title from "../../../ui/heading/title";
import { setLogedIn } from "../../../store/global/user/userLogin";
import { userModerationHandler } from "../../../../helpers/user/user";

export default function RMessageButton({ phone, product, ...props }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userLogin.value);

  const [openUserModerationModal, setOpenUserModerationModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const makeProductCall = () => {
    const productHref = `https://flate.pro/${getProductUrl(product)}`;

    const phone = getProductPhone(product).replace(/[^0-9]/g, "");
    const message = `Здравствуйте, нужна дополнительная информация по вашему объявлению:\n\n${productHref}\n\n`;
    const encodedMessage = encodeURIComponent(message).replace(/%20/g, "+");
    const link = `https://wa.me/${phone}/?text=${encodedMessage}`;

    Linking.openURL(link);
  };

  const makePhoneCall = () => {
    const url = "https://flate.pro/";
    const message = `Здравствуйте, нужна дополнительная информация по вашим объявлениям на:\n\n${url}\n\n`;

    const encodedMessage = encodeURIComponent(message).replace(/%20/g, "+");

    const link = `https://wa.me/${phone.replace(/[^0-9]/g, "")}/?text=${encodedMessage}`;
    Linking.openURL(link);
  };

  const handleProductCall = async () => {
    if (!product) return;

    if (user && Object.keys(user).length > 0) {
      if (user.user_group?.id === 6) {
        const userModeration = await userModerationHandler(user.id);

        if (userModeration) {
          dispatch(setLogedIn(userModeration));

          makeProductCall();
        } else {
          setOpenUserModerationModal(true);
        }

        return;
      }

      makeProductCall();
    } else {
      navigation.navigate("Login");
    }
  };

  const handlePhoneCall = async () => {
    if (!phone) return;

    if (user && Object.keys(user).length > 0) {
      if (user.user_group?.id === 6) {
        const userModeration = await userModerationHandler(user.id);

        if (userModeration) {
          dispatch(setLogedIn(userModeration));

          makePhoneCall();
        } else {
          setOpenUserModerationModal(true);
        }

        return;
      }

      makePhoneCall();
    } else {
      navigation.navigate("Login");
    }
  };

  const openWaUrl = async () => {
    if (phone) {
      handlePhoneCall();
    }

    if (product) {
      handleProductCall();
    }
  };

  return (
    <>
      <Btn {...props} onPress={openWaUrl}>
        <Paragraph size="md" color="white">
          WhatsApp
        </Paragraph>
      </Btn>

      <DModal modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <Title size="sm" style={{ marginBottom: 20 }}>
          Написать
        </Title>
        <Pressable
          style={tw`absolute top-5 right-5`}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M11.6337 0.365637C11.1461 -0.121879 10.3556 -0.121879 9.86894 0.365637L5.99973 4.23535L2.13052 0.365637C1.64301 -0.121879 0.85332 -0.121879 0.365804 0.365637C-0.121712 0.853153 -0.121712 1.64284 0.365804 2.13035L4.23501 5.9999L0.365637 9.8696C-0.121879 10.3571 -0.121879 11.1468 0.365637 11.6343C0.609311 11.878 0.928695 12 1.24808 12C1.56746 12 1.88718 11.8782 2.13052 11.6343L5.99973 7.76478L9.86894 11.6343C10.1126 11.878 10.432 12 10.7514 12C11.0708 12 11.39 11.8782 11.6338 11.6343C12.1213 11.1468 12.1213 10.3571 11.6338 9.8696L7.76444 6.00006L11.6337 2.13052C12.1212 1.643 12.1212 0.853153 11.6337 0.365637Z"
              fill="#ABABAB"
            />
          </Svg>
        </Pressable>
      </DModal>

      <DModal
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
      </DModal>
    </>
  );
}
