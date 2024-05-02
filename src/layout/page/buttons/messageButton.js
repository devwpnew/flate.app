import React, { useState } from "react";
import { Pressable, Linking } from "react-native";
import tw from "../../../../lib/tailwind";
import Svg, { Path } from "react-native-svg";
import Button from "../../../ui/button/button";
import DText from "../../../ui/text/dText";
import DModal from "../../../ui/modal/dModal";

import getProductPhone from "../../../../helpers/formatters/product/getProductPhone";
import getProductUrl from "../../../../helpers/formatters/product/getProductUrl";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function MessageButton({ product }) {
  const navigation = useNavigation();
  
  const user = useSelector((state) => state.userLogin.value);

  const [openUserModerationModal, setOpenUserModerationModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const openWaUrl = () => {
    if (user && Object.keys(user).length > 0) {
      if (user.user_group?.id === 6) {
        setOpenUserModerationModal(true);

        return;
      }

      const productHref = `https://flate.pro/${getProductUrl(product)}`;

      const phone = getProductPhone(product).replace(/[^0-9]/g, "");
      const message = `Здравствуйте, нужна дополнительная информация по вашему объявлению:\n\n${productHref}\n\n`;
      const encodedMessage = encodeURIComponent(message).replace(/%20/g, "+");
      const link = `https://wa.me/${phone}/?text=${encodedMessage}`;

      Linking.openURL(link);
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <>
      <Button
        type="green"
        onPress={openWaUrl}
        icon={
          <Svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M18 9.02779C18.0032 10.2743 17.712 11.504 17.15 12.6167C16.4836 13.95 15.4592 15.0714 14.1915 15.8554C12.9237 16.6394 11.4628 17.055 9.97221 17.0556C8.72567 17.0588 7.49599 16.7676 6.38332 16.2056L1 18L2.79444 12.6167C2.23243 11.504 1.94119 10.2743 1.94444 9.02779C1.94502 7.53723 2.36058 6.07627 3.14456 4.80854C3.92855 3.54081 5.05001 2.51639 6.38332 1.85003C7.49599 1.28802 8.72567 0.996777 9.97221 1.00003H10.4444C12.413 1.10863 14.2723 1.93952 15.6664 3.33361C17.0605 4.7277 17.8914 6.58702 18 8.55557V9.02779Z"
              stroke="#fff"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </Svg>
        }
        iconContainerStyle={tw`mr-2.5`}
      >
        Написать в WhatsApp
      </Button>

      {/* <Button
        onPress={() => {
          Linking.openURL(`tel:${phone}`);
        }}
        icon={
          <Svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M18 9.02779C18.0032 10.2743 17.712 11.504 17.15 12.6167C16.4836 13.95 15.4592 15.0714 14.1915 15.8554C12.9237 16.6394 11.4628 17.055 9.97221 17.0556C8.72567 17.0588 7.49599 16.7676 6.38332 16.2056L1 18L2.79444 12.6167C2.23243 11.504 1.94119 10.2743 1.94444 9.02779C1.94502 7.53723 2.36058 6.07627 3.14456 4.80854C3.92855 3.54081 5.05001 2.51639 6.38332 1.85003C7.49599 1.28802 8.72567 0.996777 9.97221 1.00003H10.4444C12.413 1.10863 14.2723 1.93952 15.6664 3.33361C17.0605 4.7277 17.8914 6.58702 18 8.55557V9.02779Z"
              stroke="#4BA5F8"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </Svg>
        }
        iconContainerStyle={tw`mr-2.5`}
        type={"white"}
      >
        Написать
      </Button> */}

      <DModal modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <DText style={tw`text-lg font-bold mb-[30px]`}>Написать</DText>
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
