import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";

import { PCollection } from "../icons/icons";

import Paragraph from "../../../../ui/text/paragraph";
import ModalCreateCollections from "../../../../ui/modal/spec/modalCreateCollections.js";

import { userHandler } from "../../../../../helpers/user/user.js";
import { useSelector } from "react-redux";
import { Collections } from "../../../profile/icons/icons.js";
import { colors } from "../../../../ui/config.js";
import api from "../../../../../api/service/api.js";
import Gradient from "../../../../ui/common/gradient.js";

export default function ToCollectionButton({
  productId,
  variant = "md",
  color = "black",
  size = "sm",
  wrapperStyle = {},
  style = {},
}) {
  const user = useSelector((user) => user.userLogin.value);
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const fetchCollectionProducts = async () => {
  //     // try {
  //     //   const products = await api.selections.product.list({
  //     //     filter: {
  //     //       user_id: user.id,
  //     //     },
  //     //   });

  //     //   console.log(products);
  //     // } catch (error) {
  //     //   console.log(error);
  //     // }
  //   };

  //   fetchCollectionProducts();
  // }, []);

  function getTemplate() {
    if (variant === "md") {
      return (
        <View
          style={{
            ...style,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <PCollection />
          <Paragraph color={color} size={size}>
            в подборку
          </Paragraph>
        </View>
      );
    }

    if (variant === "sm") {
      return (
        <Gradient
          style={{
            ...style,
            padding: 1,
            borderRadius: 100,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              padding: 8,
              backgroundColor: colors["white"],
              borderRadius: 20,
            }}
          >
            <Collections color={colors["blue"]} />
          </View>
        </Gradient>
      );
    }

    if (variant === "button") {
      return (
        <View
          style={{
            backgroundColor: colors["grey-light"],
            // borderRadius: "100%",
            borderRadius: 999,
            paddingTop: 6,
            paddingBottom: 6,
          }}
        >
          <View
            style={{
              ...style,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <PCollection />
            <Paragraph color={color} size={size}>
              В подборку
            </Paragraph>
          </View>
        </View>
      );
    }
  }

  return (
    <>
      <TouchableOpacity
        style={wrapperStyle}
        onPress={() => {
          userHandler(navigation, user, () => setModalVisible((prev) => !prev));
        }}
      >
        {getTemplate()}
      </TouchableOpacity>

      <ModalCreateCollections
        productId={productId}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
}
