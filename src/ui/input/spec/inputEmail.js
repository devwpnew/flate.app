import API from "../../../../api/service/api";
import { useSelector } from "react-redux";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Svg, Rect, Path } from "react-native-svg";
import tw from "../../../../lib/tailwind";

import Input from "../input";
import DText from "../../text/dText";

export default function InputEmail({ onValueChange, ...props }) {
  const user = useSelector((state) => state.userLogin.value);

  const [email, setEmail] = useState(user && user.email);

  const [isCanEmailSent, setIsCanEmailSent] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const sendEmailConfirm = async () => {
    setEmailError(false);

    const res = await API.set.userEmail({
      window_host: "https://flate.pro",
      user: user,
      email: email,
    });

    if (!res?.error) {
      setEmailSent(true);
    } else {
      setEmailError(res.error);
    }
  };

  const emailChangeHandler = (v) => {
    const text = v.value;
    setEmail(text);

    if (text.length > 0 && text.includes("@") && text.includes(".")) {
      setIsCanEmailSent(true);

      if (onValueChange) {
        onValueChange(text);
      }
    } else {
      setIsCanEmailSent(false);
    }
  };

  return (
    <View style={tw`relative`}>
      <Input
        keyboardType="email-address"
        tooltip={"Мы будем присылать \nвам только  важные уведомления"}
        topTitle={"Электронный адрес"}
        onChangeText={emailChangeHandler}
        name="email"
        initialValue={user && user.email}
        {...props}
      />

      {user?.email_confirmed ? (
        <Svg
          style={tw`absolute right-0 -top-[6px]`}
          width={12}
          height={12}
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Rect width={12} height={12} rx={6} fill="#2D842D" />
          <Path d="M3 6.222L4.92 8 9 4" stroke="#fff" strokeLinecap="round" />
        </Svg>
      ) : (
        <Svg
          style={tw`absolute right-0 -top-[6px]`}
          xmlns="http://www.w3.org/2000/svg"
          width={12}
          height={12}
          viewBox="0 0 12 12"
          fill="none"
        >
          <Rect width={12} height={12} rx={6} fill="#F4505B" />
          <Path
            d="M8.348 3.652a.52.52 0 00-.736 0L6 5.265 4.388 3.652a.52.52 0 10-.736.736L5.265 6 3.652 7.612a.52.52 0 10.736.736L6 6.735l1.612 1.613a.518.518 0 00.736 0 .52.52 0 000-.736L6.735 6l1.613-1.612a.52.52 0 000-.736z"
            fill="#fff"
          />
        </Svg>
      )}

      {!isCanEmailSent && (
        <DText style={tw`text-xs text-red pl-[3px]`}>
          Пожалуйста введите корректный e-mail адрес
        </DText>
      )}

      {isCanEmailSent && emailSent == false && (
        <TouchableOpacity onPress={sendEmailConfirm}>
          <DText style={tw`text-xs text-blue pl-[3px]`}>
            Отправить письмо с подтверждением
          </DText>
        </TouchableOpacity>
      )}

      {emailError && (
        <DText style={tw`text-xs text-red pl-[3px]`}>{emailError}</DText>
      )}

      {emailSent == true && (
        <DText style={tw`text-xs text-blue pl-[3px]`}>Отправлено</DText>
      )}
    </View>
  );
}
