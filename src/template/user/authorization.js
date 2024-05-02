import React from "react";

import {
  Dimensions,
  StyleSheet,
  Image,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import tw from "../../../lib/tailwind";
import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from "react-native-svg";

import Main from "../../layout/main/main";
import Footer from "../../layout/main/footer";
import H2 from "../../ui/heading/h2";
import DText from "../../ui/text/dText";

export default function Authorization({ navigation }) {
  const loadLogin = () => {
    navigation.navigate("Login");
  };
  return (
    <Main>
      <ScrollView style={tw`bg-white h-full`}>
        <View style={tw`px-[15px]`}>
          <DText style={tw`my-2.5`}>
            Войдите для доступа ко всем функциям сервиса
          </DText>

          <TouchableOpacity
            onPress={loadLogin}
            style={tw`h-10 w-full mb-[15px]`}
          >
            <View
              style={tw`flex flex-col justify-center items-center rounded h-10 bg-white border border-greyC4`}
            >
              <View
                style={tw`flex flex-row items-center justify-center font-bold`}
              >
                <DText style={tw`ml-2.5 text-base font-bold`}>
                  Войти или зарегистрироваться
                </DText>
              </View>
            </View>
          </TouchableOpacity>

          <View
            style={tw`py-[15px] border-t border-b border-greyborder flex flex-row justify-between mb-[14px]`}
          >
            <View style={tw`flex flex-row items-center`}>
              <Svg
                width="20"
                height="22"
                viewBox="0 0 20 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.0011 21.0832C10.0011 21.0832 18.5725 15.5832 18.5725 9.1665C18.5725 6.97847 17.6695 4.88005 16.062 3.33287C14.4546 1.7857 12.2744 0.916504 10.0011 0.916504C7.72783 0.916504 5.54766 1.7857 3.9402 3.33287C2.33275 4.88005 1.42969 6.97847 1.42969 9.1665C1.42969 15.5832 10.0011 21.0832 10.0011 21.0832ZM12.8588 9.1665C12.8588 10.6853 11.5796 11.9165 10.0017 11.9165C8.42372 11.9165 7.14453 10.6853 7.14453 9.1665C7.14453 7.64772 8.42372 6.4165 10.0017 6.4165C11.5796 6.4165 12.8588 7.64772 12.8588 9.1665Z"
                  fill="#A0A0A0"
                />
              </Svg>

              <DText style={tw`ml-[14px]`}>Город</DText>
            </View>

            <View style={tw`flex flex-row items-center`}>
              <DText style={tw`mr-[7.5px]`}>Сочи</DText>

              <View
                style={{
                  transform: [{ rotate: "270deg" }],
                }}
              >
                <Svg
                  width="7"
                  height="4"
                  viewBox="0 0 7 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.83608 3.85993C3.65047 4.04669 3.34953 4.04669 3.16392 3.85993L0.139208 0.816411C-0.046403 0.629645 -0.046403 0.326839 0.139208 0.140074C0.32482 -0.0466914 0.625755 -0.0466914 0.811367 0.140074L3.22158 2.56527L3.77842 2.56527L6.18863 0.140074C6.37424 -0.0466917 6.67518 -0.0466917 6.86079 0.140074C7.0464 0.326839 7.0464 0.629645 6.86079 0.81641L3.83608 3.85993Z"
                    fill="#1F1F1F"
                  />
                </Svg>
              </View>
            </View>
          </View>

          <DText style={tw`text-grey mb-[30px]`}>
            © 2011—2022 Название.ру — сделано в России. Жильё с гарантией.
          </DText>

          <DText style={tw`text-grey text-underline`}>
            Пользовательское соглашение
          </DText>

          <DText style={tw`text-grey text-underline`}>
            Правила пользования
          </DText>

          <DText style={tw`text-grey mb-[30px]`}>
            Оплачивая услуги на сайте, вы принимаете{" "}
            <DText style={tw`text-underline`}>оферту</DText>
          </DText>

          <DText style={tw`text-primary`}>Реклама на сайте</DText>

          <DText style={tw`text-primary mb-[40px]`}>Помощь</DText>

          <View style={tw`mb-2.5`}>
            <H2>Скачать приложение</H2>
          </View>
          <DText style={tw`mb-[15px]`}>
            Для установки наведите камеру на QR-код
          </DText>

          <DText style={tw`mb-[15px]`}>
            © 2009–2022, ООО «Сравни.ру». При использовании материалов
            гиперссылка на sravni.ru обязательна. ИНН 7710718303, ОГРН
            1087746642774. 109544, г. Москва, бульвар Энтузиастов, дом 2, 26
            этаж.
            {"\n"}
            {"\n"}
            Мы используем файлы cookie для того, чтобы предоставить
            пользователям больше возможностей при посещении сайта sravni.ru.
            Подробнее{" "}
            <DText style={tw`text-blue text-underline`}>
              об условиях использования.
            </DText>
          </DText>
        </View>
        <View style={tw`h-[70px]`}></View>
      </ScrollView>
      <Footer navigation={navigation} />
    </Main>
  );
}
