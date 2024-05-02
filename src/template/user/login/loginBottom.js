import api from "../../../../api/service/api";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import { TouchableOpacity, Linking, View } from "react-native";

import Paragraph from "../../../ui/text/paragraph";
import LoginBottomDecoration from "./loginBottomDecoration";
import IconUsers from "./iconUsers";

export default function LoginBottom({ hideText }) {
  const openWaUrl = () => {
    const phone = "79899966015";

    const message = `Здрвствуйте, поддержка FLATE. Мне нужна помощь!\n\n`;
    const encodedMessage = encodeURIComponent(message).replace(/%20/g, "+");
    const link = `https://wa.me/${phone}/?text=${encodedMessage}`;

    Linking.openURL(link);
  };

  const [usersCount, setUsersCount] = useState(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const { count } = await api.get.userCount();
        setUsersCount(count);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCount();
  }, []);

  return (
    <>
      {!hideText && (
        <Paragraph size="sm" style={{ textAlign: "center" }} color="grey-dark">
          Нажимая войти вы принимаете условия{" "}
          <Paragraph
            size="sm"
            color="blue"
            onPress={() => Linking.openURL("https://flate.pro/rules")}
          >
            Пользовательского соглашения
          </Paragraph>{" "}
          и{" "}
          <Paragraph
            size="sm"
            color="blue"
            onPress={() => Linking.openURL("https://flate.pro/policy")}
          >
            Политики конфиденциальности
          </Paragraph>
        </Paragraph>
      )}

      <LinearGradient
        style={{
          padding: 20,
          width: "100%",
          borderRadius: 20,
          marginBottom: 20,
          marginTop: 20,
        }}
        colors={["rgba(71, 154, 255, 0.20)", "rgba(102, 255, 204, 0.20)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* <Gradient> */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginBottom: 6,
          }}
        >
          {usersCount ? (
            <Paragraph size="xl">{usersCount}</Paragraph>
          ) : (
            <Paragraph style={{ opacity: 0 }} size="xl">
              758
            </Paragraph>
          )}
          <IconUsers />
        </View>

        <Paragraph color="grey-dark">
          уже зарегистрировались и используют Flate в работе
        </Paragraph>
        {/* </Gradient> */}
      </LinearGradient>

      <TouchableOpacity onPress={openWaUrl}>
        <Paragraph color="blue" style={{ marginBottom: 10 }}>
          Нужна помощь?
        </Paragraph>
      </TouchableOpacity>

      <LoginBottomDecoration />
    </>
  );
}
