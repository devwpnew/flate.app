import { useRef } from "react";
import { View, ScrollView, Linking, Image, Dimensions } from "react-native";

import Main from "../../layout/main/main";
import Footer from "../../layout/main/footer";

import Container from "../../ui/common/container";
import BannerItem from "../../layout/news/item/bannerItem";
import Btn from "../../ui/button/btn";
import Paragraph from "../../ui/text/paragraph";
import WsIcon from "../../ui/icons/wsIcon";
import Wrapper from "../../layout/main/wrapper";
import Title from "../../ui/heading/title";

import { colors } from "../../ui/config";

const { width, height } = Dimensions.get("window");

export default function Contacts({ navigation }) {
  const scrollViewRef = useRef(null);

  return (
    <Main>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Wrapper>
          <Container>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <Image
                resizeMode="stretch"
                style={{
                  width: width - 40,
                  height: (width - 40) / 1.7,
                  borderRadius: 25,
                }}
                source={require("../../../assets/contact-us.jpeg")}
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Title size="lg">Мы рады обратной связи и предложениям</Title>
            </View>

            <Btn
              onPress={() => Linking.openURL(`tel:+79899966015`)}
              style={{ marginBottom: 10, borderColor: colors["blue"] }}
              color="blue"
            >
              Позвонить
            </Btn>

            <Btn
              style={{ marginBottom: 20 }}
              icon={<WsIcon />}
              color="green"
              onPress={() => Linking.openURL(`https://wa.me/79899966015`)}
            >
              <Paragraph size="md" color="white">
                WhatsApp
              </Paragraph>
            </Btn>

            <BannerItem
              variant="vertical"
              onPress={() => Linking.openURL("https://t.me/FLATEPRO")}
              image={require("../../../assets/adv-banner-tg.jpg")}
              heading={"Наше сообщество агентов в Telegram"}
              link={"Подписаться"}
            />
          </Container>
        </Wrapper>
      </ScrollView>
      <Footer scrollViewRef={scrollViewRef} navigation={navigation} />
    </Main>
  );
}
