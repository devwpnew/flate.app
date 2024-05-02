import axios from "axios";
import api from "../../../api/service/api";
import * as Network from "expo-network";
import * as Device from "expo-device";

import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setLogedIn } from "../../store/global/user/userLogin";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  SafeAreaView,
} from "react-native";

import Btn from "../../ui/button/btn";
import LoginBottom from "./login/loginBottom";
import LoginTop from "./login/loginTop";
import Paragraph from "../../ui/text/paragraph";
import LoginTopDecoration from "./login/loginTopDecoration";
import LoginBottomDecoration from "./login/loginBottomDecoration";
import Title from "../../ui/heading/title";
import LoginMessage from "./login/loginMessage";
import RInputPhone from "../../ui/input/spec/rInputPhone";
import ScreenHeader from "../../ui/screen/screenHeader";

import { colors } from "../../ui/config";
import { StatusBar } from "expo-status-bar";
import RInputCode from "../../ui/input/rInputCode";

const { height } = Dimensions.get("window");

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const route = useRoute();

  const [errors, setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [sendType, setSendType] = useState("call");
  const [data, setData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tel, setTel] = useState("");
  const [userCode, setUserCode] = useState("");

  const sendSmsCode = async (type) => {
    try {
      if (isLoading) return;
      setErrors(false);

      if (tel.replace(/[^0-9]/g, "").length !== 11) {
        setErrors("Введите корректный номер телефона");
        return;
      }

      setIsLoading(true);

      if (!errors) {
        const smsAxios = await axios.post(
          `https://flate.pro/api/user/sendSmsCode`,
          {
            phone: tel,
            ip: data.ip,
            window_host: "https://flate.pro/",
            type: type,
          }
        );
        // console.log(smsAxios, "smsAxios");

        if (smsAxios.data.userInfo) {
          setUserId(
            smsAxios.data.userInfo.itemId
              ? smsAxios.data.userInfo.itemId
              : smsAxios.data.userInfo.id
          );
        } else if (smsAxios.data && smsAxios.data.error) {
          if (
            smsAxios.data.error.status_text.indexOf("Подозрение на флуд") !== -1
          ) {
            setErrors("Превышено количесво попыток, повторите через 10 минут");
          } else {
            setErrors(smsAxios.data.error.status_text);
          }
        }
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const checkSmsCode = async () => {
    try {
      setErrors(false);

      if (userCode.length !== 4) {
        return;
      }

      if (!tel) {
        setErrors("Введите номер телефона");
        return;
      }

      setIsLoading(true);

      const smsAxios = await axios.post(
        `https://flate.pro/api/user/checkSmsCode`,
        {
          userId: userId,
          userInputOtp: userCode,
        }
      );

      if (smsAxios.data.response == "correct") {
        const authorization = await api.auth.authorizeUserAxios(
          userId,
          Device.modelName
        );

        if (authorization) {
          const updatedUser = await api.get.user({
            window_host: "https://flate.pro/",
            filter: {
              id: userId,
            },
            limit: "all",
          });

          dispatch(setLogedIn(updatedUser[0]));

          if (
            !updatedUser[0].user_name ||
            // !updatedUser[0].user_agency ||
            !updatedUser[0].professional_confirmation
          ) {
            navigation.navigate("Registration");
          } else {
            navigation.navigate("Home");
          }
        }
      } else if (smsAxios.data.error) {
        if (smsAxios.data?.error?.indexOf("Подозрение на флуд") !== -1) {
          setErrors("Превышено количесво попыток, повторите через 10 минут");
        } else {
          setErrors(smsAxios.data.error);
        }
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    const ip = await Network.getIpAddressAsync();
    const ipModified = ip == "::1" ? "127.0.0.1" : ip;

    const data = {
      ip: ipModified,
    };

    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (!userId || seconds === 0) return;

    const interval = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [userId]);

  return (
    <>
      {userId ? (
        <>
          <SafeAreaView
            style={{
              backgroundColor: colors["white"],
            }}
          >
            <View
              style={{
                height: Platform.OS === "android" ? 90 : 50,
              }}
            ></View>
          </SafeAreaView>
          <KeyboardAvoidingView
            keyboardVerticalOffset={-height / 2 + 150}
            enabled={true}
            behavior="position"
          >
            <View style={{ ...styles.container, height: "100%" }}>
              <LoginTopDecoration />

              <Title
                style={{ marginBottom: 20, textAlign: "center" }}
                color="black"
                size={"sm"}
              >
                {sendType === "call"
                  ? "Введите последние 4 цифры"
                  : "Введите код из смс"}
              </Title>

              <View style={styles.row}>
                <Paragraph color="grey-dark">
                  {sendType === "call" ? "Звоним" : ""} {tel}
                </Paragraph>

                <TouchableOpacity
                  onPress={() => {
                    setUserId(null);
                    setTel("");
                  }}
                >
                  <Paragraph color="blue">Изменить номер</Paragraph>
                </TouchableOpacity>
              </View>

              <RInputCode
                space={10}
                autoFocus={true} // фокусировка на поле кода при открытии экрана
                codeLength={4} // количество символов в поле кода
                keyboardType="numeric" // тип клавиатуры для ввода кода
                inputPosition="left" // позиция курсора внутри ячейки: 'left' или 'right'
                onFulfill={(code) => setUserCode(code)} // коллбэк при завершении ввода
                containerStyle={styles.codeInputContainer}
                codeInputStyle={styles.codeInput}
                activeColor={"black"}
                returnKeyType={null}
              />

              <LoginMessage style={{ marginBottom: 20 }} error={errors} />

              <Btn
                style={{ width: "100%" }}
                onPress={checkSmsCode}
                isLoading={isLoading}
                isDisabled={userCode.length !== 4}
              >
                Продолжить
              </Btn>

              {userId && (
                <View style={{ marginTop: 20 }}>
                  {seconds < 1 ? (
                    <TouchableOpacity
                      onPress={() => {
                        setSeconds(30);
                        sendSmsCode("sms");
                        setSendType("sms");
                      }}
                    >
                      <Paragraph color="blue">Запросить СМС</Paragraph>
                    </TouchableOpacity>
                  ) : (
                    <Paragraph color="blue">
                      {sendType === "call" ? (
                        <>Мне не позвонили ({seconds} сек.)</>
                      ) : (
                        <>Не пришла смс ({seconds} сек.)</>
                      )}
                    </Paragraph>
                  )}
                </View>
              )}

              {/* <LoginBottomDecoration /> */}
              <LoginBottom hideText={true} />
            </View>
          </KeyboardAvoidingView>
        </>
      ) : (
        <>
          {!route?.params?.disallowBack && (
            <ScreenHeader title="Вход или регистрация" route={route} />
          )}
          <KeyboardAwareScrollView
            keyboardDismissMode={"on-drag"}
            keyboardShouldPersistTaps={"always"}
            extraScrollHeight={-90}
            contentContainerStyle={{
              height: "100%",
            }}
            enableOnAndroid={true}
            enableAutomaticScroll={true}
          >
            <View style={{ ...styles.container, height: "100%" }}>
              <LoginTop />

              <View style={{ marginBottom: 10, width: "100%" }}>
                <RInputPhone
                  color="grey-light"
                  onChangeText={(v) => setTel(v.text)}
                  placeholder="+7"
                  shadow={false}
                  style={{ width: "100%", textAlign: "left", borderRadius: 10 }}
                />

                <LoginMessage style={{ marginTop: 10 }} error={errors} />
              </View>

              <Btn
                onPress={() => {
                  sendSmsCode("call");
                  setSendType("call");
                  setSeconds(30);
                }}
                isLoading={isLoading}
                isDisabled={tel.replace(/[^0-9]/g, "").length !== 11}
                style={{ width: "100%", marginBottom: 10 }}
              >
                Войти или зарегистрироваться
              </Btn>

              <LoginBottom />
            </View>
          </KeyboardAwareScrollView>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors["grey-light"],
    paddingLeft: 10,
    paddingRight: 10,
    height: "100%",
    zIndex: -1,
    backgroundColor: colors.white,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  codeInputContainer: {
    width: "100%",
    marginBottom: 20,
    height: 50,
    maxHeight: 50,
  },
  codeInput: {
    backgroundColor: colors["grey-light"],
    // borderWidth: 1,
    // borderColor: "rgb(229, 231, 235)",
    borderRadius: 10,
    width: "23%",
    height: 50,
    // shadowColor: "#6f7882",
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 6,
    // elevation: 3,
    fontSize: 13,
    fontFamily: "Manrope_600SemiBold",
  },
});
