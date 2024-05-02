import api from "../../../api/service/api";

import { useRef, useState } from "react";
import { View, ScrollView, Alert, KeyboardAvoidingView } from "react-native";
import { useSelector } from "react-redux";

import Main from "../../layout/main/main";
import Footer from "../../layout/main/footer";

import Container from "../../ui/common/container";
import Btn from "../../ui/button/btn";
import Paragraph from "../../ui/text/paragraph";
import RInput from "../../ui/input/rInput";
import Wrapper from "../../layout/main/wrapper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Question({ navigation }) {
  const scrollViewRef = useRef(null);

  const user = useSelector((state) => state.userLogin.value);
  const [form, setForm] = useState({ user_id: user.id, status: 1 });
  const [status, setStatus] = useState("idle");

  const sendForm = async () => {
    setStatus("loading");

    if (!form.text || !form.text2) {
      setStatus("error");
      Alert.alert(
        "Ошибка!",
        "Пожалуйста заполните первые два поля и попробуйте снова",
        [{ text: "OK", onPress: () => setStatus("idle") }]
      );
    } else {
      const res = await api.add.task({
        window_host: "https://flate.pro",
        ...form,
      });

      if (res.itemId) {
        setStatus("success");

        Alert.alert("Спасибо!", "Ваше сообщение успешно отправлено!", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } else {
        setStatus("error");

        Alert.alert(
          "Произошла непредвиденная ошибка",
          "Проверьте все поля и попробуйте снова",
          [{ text: "OK", onPress: () => setStatus("idle") }]
        );
      }
    }
  };

  return (
    <Main>
      <KeyboardAwareScrollView
      keyboardDismissMode={"on-drag"}
      keyboardShouldPersistTaps={"always"}
        showsVerticalScrollIndicator={false}
        extraScrollHeight={50}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
      >
        <Wrapper>
          <Container>
            <Paragraph style={{ marginBottom: 30 }} size="lg">
              Нам важно, чтобы Flate стал лучшим помощником для агента. Будем
              рады услышать любую обратную связь и идеи для улучшения сервиса.
            </Paragraph>

            <Paragraph style={{ marginBottom: 10 }} size="md">
              Тема *
            </Paragraph>
            <View style={{ marginBottom: 30 }}>
              <RInput
                isValid={
                  status === "error" && !form?.text?.length > 0 ? false : true
                }
                shadow={true}
                color="white"
                name="text"
                onChangeText={(v) => setForm({ ...form, text: v.value })}
              />
            </View>
            <Paragraph style={{ marginBottom: 10 }} size="md">
              Что мы можем улучшить для вас? *
            </Paragraph>
            <View style={{ marginBottom: 30 }}>
              <RInput
                isValid={
                  status === "error" && !form?.text2?.length > 0 ? false : true
                }
                shadow={true}
                color="white"
                name="text2"
                onChangeText={(v) => setForm({ ...form, text2: v.value })}
                style={{ height: 100 }}
                multiline={true}
              />
            </View>
            <Paragraph style={{ marginBottom: 10 }} size="md">
              Как с вами связаться?
            </Paragraph>
            <View style={{ marginBottom: 30 }}>
              <RInput
                placeholder="Если это необходимо"
                shadow={true}
                color="white"
                name="text3"
                onChangeText={(v) => setForm({ ...form, text3: v.value })}
              />
            </View>
            <Btn isLoading={status === "loading"} onPress={sendForm}>
              Отправить
            </Btn>
          </Container>
        </Wrapper>
      </KeyboardAwareScrollView>
      <Footer scrollViewRef={scrollViewRef} navigation={navigation} />
    </Main>
  );
}
