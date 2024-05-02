import Title from "../../../ui/heading/title";
import Paragraph from "../../../ui/text/paragraph";

import LoginTopDecoration from "./loginTopDecoration";

export default function LoginTop() {
  return (
    <>
      <LoginTopDecoration />

      <Title style={{ marginBottom: 20 }} color="black" size={"lg"}>
        Вход или регистрация
      </Title>
      <Paragraph
        style={{
          marginBottom: 42,
          fontFamily: "Manrope_500Medium",
          textAlign: "center",
        }}
        color="grey-dark"
        size={"md"}
      >
        Введите ваш номер. Запомните 4 последних цифры номера, с которого мы
        позвоним для авторизации
      </Paragraph>
    </>
  );
}
