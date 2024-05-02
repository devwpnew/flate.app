import API from "../../../api/service/api";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ScrollView,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { setLogedIn } from "../../store/global/user/userLogin";
import { setCity } from "../../store/global/user/userCity";
import { colors } from "../../ui/config";

import Wrapper from "../../layout/main/wrapper";
import Title from "../../ui/heading/title";
import RModal from "../../ui/modal/rModal";
import Btn from "../../ui/button/btn";
import RInput from "../../ui/input/rInput";

import Paragraph from "../../ui/text/paragraph";
import Dropdown from "../../ui/dropdown/dropdown";
import RUserAvatarLoad from "./profile/rUserAvatarLoad";
import EmailEdit from "./registration/emailEdit";
import DropdownPhone from "../../ui/dropdown/spec/dropdownPhone";
import Footer from "../../layout/main/footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { setFavorites } from "../../store/global/user/userFavorites";

export default function Registration({ navigation, route }) {
  const [IsKeyboardAvoidingViewEnabled, setKeyboardAvoidingViewEnabled] =
    useState(true);
  const [professionalConfirmationVisible, setProfessionalConfirmationVisible] =
    useState(false);

  const user = useSelector((state) => state.userLogin.value);
  const cities = useSelector((state) => state.cities.value.array);

  const dispatch = useDispatch();

  const [formErrorFields, setFormErrorFields] = useState([]);
  const [form, setForm] = useState({
    id: user.id,
    user_name: user?.user_name ? user.user_name : "",
    user_last_name: user?.user_last_name ? user.user_last_name : "",
    user_description: user?.user_description ? user.user_description : "",
    default_city: user?.default_city?.id ? user.default_city.id : "",
    professional_confirmation: user?.professional_confirmation
      ? user.professional_confirmation
      : "",
  });

  const [response, setResponse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const formSubmitHandler = async () => {
    setFormErrorFields([]);

    if (!form.user_name) {
      setFormErrorFields((prevFields) => [...prevFields, "user_name"]);
    }

    // if (!form.user_last_name) {
    //   setFormErrorFields((prevFields) => [...prevFields, "user_last_name"]);
    // }

    if (!form.default_city) {
      setFormErrorFields((prevFields) => [...prevFields, "default_city"]);
    }

    if (!form.professional_confirmation) {
      setFormErrorFields((prevFields) => [
        ...prevFields,
        "professional_confirmation",
      ]);
      // setFormErrorFields((prevFields) => [...prevFields, "user_description"]);
    }

    if (
      !form.id ||
      !form.professional_confirmation ||
      !form.user_name ||
      // !form.user_last_name ||
      !form.default_city
    ) {
      const errorT = (
        <>
          <Title style={{ marginBottom: 20, marginRight: 20 }} size="sm">
            Кажется, вы кое-что забыли...
          </Title>

          <Paragraph size="lg">
            Пожалуйста, заполните все поля! Это нужно, чтобы другие могли знать
            как к вам обращаться, а ссылки нужны только для нас, чтобы мы точно
            знали, что вы — агент! Не переживайте, они нигде не будут
            опубликованы.
          </Paragraph>
        </>
      );

      setResponse(errorT);
      setIsSuccess(false);
      return;
    }

    await updateUser();
  };

  const updateUser = async () => {
    try {
      setIsLoading(true);

      const formData = new FormData();

      for (let key in form) {
        formData.append(key, form[key]);
      }

      // console.log(formData, "formData");

      if (formData) {
        const updResponse = await API.update.user(formData);

        if (updResponse?.status) {
          const registerModerationIsOn = await API.get.setting(
            "register_moderation"
          );

          console.log({ registerModerationIsOn });
          console.log({ updResponse });

          if (registerModerationIsOn == "Y" && updResponse?.data?.itemId) {
            console.log({ platform: Platform.OS });

            const sendEmail = await API.sendEmailNotification.newUser(
              updResponse?.data?.itemId,
              Platform.OS
            );

            console.log({ sendEmail: sendEmail });
          }

          const successT = (
            <>
              <Title style={{ marginBottom: 20, marginRight: 20 }} size="sm">
                {route.name === "User"
                  ? "Изменения успешно сохранены"
                  : "Спасибо за регистрацию!"}
              </Title>

              {route.name !== "User" && (
                <Paragraph style={{ marginBottom: 20 }} size="lg">
                  После модерации, вам будут доступны все возможности и функции.
                  Обычно это занимает не более часа.
                </Paragraph>
              )}
            </>
          );

          const updatedUser = await API.get.user({
            window_host: "https://flate.pro",
            filter: {
              id: user.id,
            },
            sort: {
              id: "asc",
            },
            limit: 1,
          });

          if (updatedUser) {
            dispatch(setLogedIn(updatedUser));
            if (updatedUser?.default_city) {
              dispatch(setCity(updatedUser.default_city));
            }
          }

          setResponse(successT);
          setIsSuccess(true);
        } else {
          const errorT = (
            <>
              <Title style={{ marginBottom: 20, marginRight: 20 }} size="sm">
                {updResponse?.error ? updResponse.error : "Произошла ошибка"}
              </Title>

              <Paragraph style={{ marginBottom: 20 }} size="lg">
                Произошла ошибка при регистрации, проверьте все поля и
                попробуйте снова.
              </Paragraph>
            </>
          );

          setResponse(errorT);
          setIsSuccess(false);
          setIsLoading(false);
        }
      }

      setIsLoading(false);
    } catch (e) {
      console.log(e);

      const errorT = (
        <>
          <Title style={{ marginBottom: 20, marginRight: 20 }} size="sm">
            Произошла ошибка
          </Title>

          <Paragraph style={{ marginBottom: 20 }} size="lg">
            Произошла ошибка при регистрации, проверьте все поля и попробуйте
            снова.
          </Paragraph>
        </>
      );

      setResponse(errorT);
      setIsSuccess(false);
      setIsLoading(false);
    }
  };

  const validateFiled = (fieldName) => {
    return !formErrorFields.includes(fieldName);
  };

  const onOk = () => {
    setResponse(false);

    if (isSuccess) {
      if (route.name === "User") {
        navigation.navigate("Settings");
      } else {
        navigation.navigate("Home");
      }
    }
  };

  const onCloseModal = (v) => {
    if (isSuccess) {
      onOk();
    } else {
      setResponse(v);
    }
  };

  console.log(form);
  console.log(user);
  console.log(cities);

  const exitAccount = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");

      if (userToken) {
        await AsyncStorage.removeItem("userToken");
      }

      navigation.dispatch(CommonActions.navigate("Home"));

      // navigation.navigate("", {
      //   disallowBack: true,
      // });

      dispatch(setLogedIn({}));
      dispatch(setFavorites([]));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <KeyboardAwareScrollView
        keyboardDismissMode={"on-drag"}
        keyboardShouldPersistTaps={"always"}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        extraScrollHeight={Platform.OS === "android" ? 120 : 50}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
      >
        {/* <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        > */}
        <Wrapper>
          <View style={styles.container}>
            <RUserAvatarLoad style={{ marginBottom: 6 }} />
            <RInput
              initialValue={user?.user_name}
              isValid={validateFiled("user_name")}
              onFocus={() => setKeyboardAvoidingViewEnabled(false)}
              shadow={false}
              color="grey-light"
              left={
                <Paragraph color="grey-medium">
                  Имя
                  <Paragraph color="red"> *</Paragraph>
                </Paragraph>
              }
              name="user_name"
              onChangeText={(v) => setForm({ ...form, user_name: v.value })}
            />
            <RInput
              initialValue={user?.user_last_name}
              isValid={validateFiled("user_last_name")}
              onFocus={() => setKeyboardAvoidingViewEnabled(false)}
              shadow={false}
              color="grey-light"
              left={<Paragraph color="grey-medium">Фамилия</Paragraph>}
              name="user_last_name"
              onChangeText={(v) =>
                setForm({ ...form, user_last_name: v.value })
              }
            />
            <RInput
              initialValue={user?.user_agency}
              onFocus={() => setKeyboardAvoidingViewEnabled(false)}
              multiline={true}
              shadow={false}
              color="grey-light"
              left={<Paragraph color="grey-medium">Агентство</Paragraph>}
              placeholder={
                route.name !== "User"
                  ? "Если вы работаете на себя, укажите “Частный брокер”"
                  : ""
              }
              name="user_agency"
              onChangeText={(v) => setForm({ ...form, user_agency: v.value })}
            />
            <Dropdown
              initialValue={cities && user?.default_city?.id}
              shadow={false}
              isValid={validateFiled("default_city")}
              color="grey-light"
              options={cities}
              placeholderSize="lg"
              placeholder="Город"
              left={
                <Paragraph color="grey-medium">
                  Город
                  <Paragraph color="red"> *</Paragraph>
                </Paragraph>
              }
              name={"default_city"}
              isLoading={false}
              onValueChange={(v) => setForm({ ...form, default_city: v.value })}
            />

            {route.name !== "User" && (
              <>
                <View style={{ marginTop: 6 }}>
                  {!validateFiled("professional_confirmation") &&
                    !validateFiled("user_description") && (
                      <Paragraph color="red" style={{ marginBottom: 10 }}>
                        Заполните одно из полей
                      </Paragraph>
                    )}

                  <Paragraph
                    style={{
                      fontFamily: "Manrope_700Bold",
                      marginBottom: 10,
                    }}
                  >
                    FLATE - бизнес ассистент только для агентов.
                  </Paragraph>
                  <Paragraph style={{ fontFamily: "Manrope_700Bold" }}>
                    Пожалуйста, пришлите как можно больше информации о себе,
                    чтобы мы могли точно знать, что вы являетесь агентом.
                  </Paragraph>
                  <Paragraph
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      fontFamily: "OpenSans_400Regular_Italic",
                    }}
                  >
                    Например: ссылку на ваш профиль в агентстве недвижимости,
                    авито, Instagram, Циан, Домклик или YouTube. Ссылки нужны
                    только для нас. Не переживайте, они нигде не будут
                    опубликованы.
                  </Paragraph>
                  <Paragraph style={{ fontFamily: "Manrope_700Bold" }}>
                    Не ведёте социальные сети? Тогда расскажите коротко о вашей
                    деятельности, пожалуйста, напишите кратко о себе и укажите
                    телефон коллеги или АН, которые могут подтвердить, что вы -
                    Агент. <Paragraph color="red"> *</Paragraph>
                  </Paragraph>
                </View>

                {/* <Paragraph color="grey-medium">
                  Подтверждение профессиональной деятельности
                  <Paragraph color="red"> *</Paragraph>
                </Paragraph> */}

                <RInput
                  multiline={true}
                  isValid={validateFiled("professional_confirmation")}
                  onFocus={() => {
                    setKeyboardAvoidingViewEnabled(true);
                    setProfessionalConfirmationVisible(true);
                  }}
                  onBlur={() => {
                    if (!form.professional_confirmation) {
                      setProfessionalConfirmationVisible(false);
                    }
                  }}
                  shadow={false}
                  color="grey-light"
                  placeholder={"Подтверждение профессиональной деятельности"}
                  // leftWidth={professionalConfirmationVisible ? "0" : "10%"}
                  name="professional_confirmation"
                  onChangeText={(v) =>
                    setForm({ ...form, professional_confirmation: v.value })
                  }
                />

                <Paragraph style={{ marginTop: 6 }}>
                  <Paragraph style={{ fontFamily: "Manrope_700Bold" }}>
                    Расскажите коротко о вашей деятельности, если хотите.
                  </Paragraph>{" "}
                  <Paragraph
                    style={{ fontFamily: "OpenSans_400Regular_Italic" }}
                  >
                    Эта информация будет отображаться в вашем профиле.
                  </Paragraph>
                </Paragraph>
              </>
            )}

            <RInput
              initialValue={user?.user_description}
              isValid={validateFiled("user_description")}
              onFocus={() => setKeyboardAvoidingViewEnabled(true)}
              multiline={true}
              numberOfLines={2}
              shadow={false}
              color="grey-light"
              left={<Paragraph color="grey-medium">О себе</Paragraph>}
              placeholder={"Например: Ведущий специалист отдела продаж"}
              name="user_description"
              onChangeText={(v) =>
                setForm({ ...form, user_description: v.value })
              }
            />

            {route.name === "User" && (
              <>
                <RInput
                  initialValue={user?.sef_code}
                  isValid={"sef_code"}
                  onFocus={() => setKeyboardAvoidingViewEnabled(true)}
                  shadow={false}
                  color="grey-light"
                  left={<Paragraph color="grey-medium">Юзернейм</Paragraph>}
                  placeholder={`Flate.pro/users/${
                    user?.sef_code ? user?.sef_code : "user"
                  }`}
                  name="sef_code"
                  onBeforeChangeText={(v) => v.replace(/\s/g, "")}
                  onChangeText={(v) => setForm({ ...form, sef_code: v.value })}
                />

                {/* <PhoneEdit
                  initialValue={user?.phone}
                  arValues={
                    user?.additional_phones ? user.additional_phones : []
                  }
                /> */}

                <DropdownPhone
                  onFocus={() => setKeyboardAvoidingViewEnabled(true)}
                  shadow={false}
                  color="grey-light"
                  left={<Paragraph color="grey-medium">Мои телефоны</Paragraph>}
                  leftWidth={100}
                  title={user.phone}
                  onValueChange={(v) => console.log(v)}
                />

                {/* <EmailEdit
                    initialValue={user?.email}
                    onFocus={() => setKeyboardAvoidingViewEnabled(true)}
                    left={<Paragraph color="grey-medium">Email</Paragraph>}
                    placeholder={user?.email}
                    shadow={false}
                  /> */}
              </>
            )}

            <Btn isLoading={isLoading} onPress={formSubmitHandler}>
              Сохранить
            </Btn>

            {route.name !== "User" && (
              <Btn color="red" isLoading={isLoading} onPress={exitAccount}>
                Отмена
              </Btn>
            )}
          </View>
        </Wrapper>
        {/* </ScrollView> */}
      </KeyboardAwareScrollView>

      {route.name === "User" && <Footer navigation={navigation} />}

      <RModal
        modalVisible={
          typeof response === "object" || typeof response === "string"
        }
        setModalVisible={onCloseModal}
      >
        {typeof response === "string" ? (
          <Paragraph>{response}</Paragraph>
        ) : (
          response
        )}

        <Btn style={{ marginTop: 10 }} onPress={onOk}>
          OK
        </Btn>
      </RModal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: colors["white"],
    width: "100%",
    height: "100%",
    paddingHorizontal: 10,
    gap: 14,
  },
  scrollView: { height: "100%", backgroundColor: colors["white"] },
});