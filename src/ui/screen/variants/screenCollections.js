import { useState } from "react";

import Svg, { Rect, Path } from "react-native-svg";

import { TouchableOpacity, View } from "react-native";

import Paragraph from "../../text/paragraph";
import Btn from "../../button/btn";
import ModalCreateCollections from "../../modal/spec/modalCreateCollections.js";
import { useRoute } from "@react-navigation/native";

import { colors } from "../../config.js";
import { arCollections } from "../../../layout/news/newsBubbles.js";

function QuestionIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={15}
      height={14}
      viewBox="0 0 15 14"
      fill="none"
      {...props}
    >
      <Path
        d="M7.5 13.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13zM7.5 7v3.5"
        stroke="#1A1F25"
        strokeOpacity={0.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.5 5a.5.5 0 100-1 .5.5 0 000 1z"
        stroke="#1A1F25"
        strokeOpacity={0.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default function ScreenCollections({ title, isPage, navigation }) {
  const route = useRoute();
  const [isShowModalCreateCollection, setIsShowModalCreateCollection] =
    useState(false);

  const handleBack = async () => {
    if (isPage) {
      navigation.push("Collections");
      return;
    }

    navigation.navigate("Lk");
  };

  const collectionId = route?.params?.collectionId;

  return (
    <>
      <TouchableOpacity onPress={handleBack}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={40}
          height={40}
          viewBox="0 0 40 40"
          fill="none"
        >
          <Rect width={40} height={40} rx={20} fill="#ECF2F8" />
          <Path
            d="M22.302 14l-6.15 6.15a.481.481 0 000 .7l6.15 6.15"
            stroke="#1A1F25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <Paragraph
          numberOfLines={1}
          color={isPage ? "grey-medium" : "black"}
          size="lg"
          style={{ fontFamily: "Manrope_700Bold" }}
        >
          {title}
        </Paragraph>
      </View>

      {isPage ? (
        <Btn
          onPress={() => {
            navigation.navigate("CollectionsSend", {
              collectionId: collectionId,
            });
          }}
          style={{
            borderRadius: 100,
          }}
          innerStyle={{
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 14,
            paddingRight: 14,
          }}
        >
          Отправить клиенту
        </Btn>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("STORY", {
                story: arCollections,
                image: require("../../../../assets/story/collections/thumb.jpg"),
                name: "Новая функция Подборки",
              });
            }}
            style={{
              backgroundColor: colors["grey-light"],
              borderColor: colors["grey-light"],
              borderWidth: 1,
              borderRadius: 999,
              paddingTop: 10,
              paddingBottom: 10,
              paddingHorizontal: 14,
              width: "100%",
              flex: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 6,
            }}
          >
            <QuestionIcon />
            <Paragraph color="black-50" size="md">
              Как использовать?
            </Paragraph>
          </TouchableOpacity>
          {/* <Btn
            onPress={() => {
              setIsShowModalCreateCollection(true);
            }}
            style={{
              borderRadius: 100,
            }}
            innerStyle={{
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 14,
              paddingRight: 14,
            }}
          >
            Создать подборку
          </Btn> */}
        </>
      )}

      <ModalCreateCollections
        templateName="create"
        modalVisible={isShowModalCreateCollection}
        setModalVisible={setIsShowModalCreateCollection}
      />
    </>
  );
}
