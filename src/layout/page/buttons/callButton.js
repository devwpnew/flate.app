import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Linking } from "react-native";
import tw from "../../../../lib/tailwind";
import Svg, { Path } from "react-native-svg";
import Button from "../../../ui/button/button";
import H2 from "../../../ui/heading/h2";
import DText from "../../../ui/text/dText";
import DModal from "../../../ui/modal/dModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setFilterVisibility } from "../../../store/global/filter/filterVisibility";

export default function CallButton({ phone, ...props }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const user = useSelector((state) => state.userLogin.value);

  const [openUserModerationModal, setOpenUserModerationModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const makePhoneCall = (phoneNumber) => {
    Linking.openURL(`tel:+${phoneNumber.replace(/[^0-9]/g, "")}`).catch(
      (error) => console.log("Не удалось совершить звонок", error)
    );
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
      <Button
        {...props}
        onPress={() => makePhoneCall(phone)}
        icon={
          <Svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M12.3329 13.0848L13.7976 11.6201C13.9936 11.424 14.2429 11.2897 14.5145 11.234C14.7862 11.1782 15.0682 11.2033 15.3257 11.3063L17.1094 12.0203C17.3723 12.1255 17.5977 12.307 17.7564 12.5415C17.9152 12.776 18 13.0527 18 13.3359V16.5797C18.0005 16.7725 17.9616 16.9634 17.8857 17.1406C17.8098 17.3179 17.6986 17.4778 17.5588 17.6105C17.419 17.7433 17.2536 17.8461 17.0726 17.9127C16.8917 17.9794 16.6991 18.0083 16.5066 17.9979C4.00325 17.2198 1.47801 6.6298 1.00918 2.57452C0.986475 2.37626 1.006 2.17545 1.06647 1.98528C1.12694 1.79511 1.22699 1.6199 1.36003 1.47117C1.49307 1.32244 1.6561 1.20356 1.83838 1.12235C2.02066 1.04114 2.21807 0.999448 2.41762 1.00001H5.60393C5.8871 0.999996 6.16378 1.08483 6.39827 1.24357C6.63277 1.40231 6.81432 1.62767 6.91951 1.89057L7.63289 3.67432C7.73584 3.9318 7.76097 4.21382 7.70518 4.48545C7.64939 4.75707 7.51513 5.00635 7.31903 5.20241L5.85436 6.66707C5.85436 6.66707 6.66647 12.3766 12.3329 13.0848Z"
              stroke="#4BA5F8"
              stroke-width="1.6"
            />
          </Svg>
        }
        iconContainerStyle={tw`mr-2.5`}
        type={"white"}
      >
        Позвонить
      </Button>

      <DModal modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <TouchableOpacity onPress={() => makePhoneCall(phone)}>
          <H2 style={tw`mb-5`}>{phone}</H2>
        </TouchableOpacity>

        <View style={tw`mb-5`}>
          <DText style={tw`text-lg text-center`}>
            Скажите продавцу, что нашли это объявление на FLATE.PRO.
          </DText>
        </View>

        <Button
          style={{ height: 40, width: 60 }}
          onPress={() => {
            makePhoneCall(phone);
            setModalVisible(false);
          }}
          // onPress={() => setModalVisible(false)}
        >
          ОК
        </Button>
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
