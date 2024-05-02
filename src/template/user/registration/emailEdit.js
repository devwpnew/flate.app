import API from "../../../../api/service/api";
import { useState } from "react";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";

import RInput from "../../../ui/input/rInput";
import Paragraph from "../../../ui/text/paragraph";

export default function EmailEdit({ onValueChange, ...props }) {
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
    <>
      <RInput
        isValid={"email"}
        color="grey-light"
        name="email"
        onChangeText={emailChangeHandler}
        {...props}
      />
      
      {!isCanEmailSent && email?.length > 0 && (
        <Paragraph style={{ textAlign: "center" }} color="blue">
          Пожалуйста введите корректный e-mail адрес
        </Paragraph>
      )}

      {isCanEmailSent && emailSent == false && (
        <TouchableOpacity onPress={sendEmailConfirm}>
          <Paragraph style={{ textAlign: "center" }} color="blue">
            Отправить письмо с подтверждением
          </Paragraph>
        </TouchableOpacity>
      )}

      {emailError && (
        <Paragraph style={{ textAlign: "center" }} color="blue">
          {emailError}
        </Paragraph>
      )}

      {emailSent == true && (
        <Paragraph style={{ textAlign: "center" }} color="blue">
          Отправлено
        </Paragraph>
      )}
    </>
  );
}
