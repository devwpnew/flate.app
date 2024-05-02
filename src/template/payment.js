import { View, ScrollView, Dimensions, Image, Linking } from "react-native";
import Main from "../layout/main/main";

import Footer from "../layout/main/footer";
import Wrapper from "../layout/main/wrapper";
import Container from "../ui/common/container";
import Paragraph from "../ui/text/paragraph";
import Btn from "../ui/button/btn";
import Title from "../ui/heading/title";
import WsIcon from "../ui/icons/wsIcon";

const { width, height } = Dimensions.get("window");

export default function Payment({ navigation }) {
  return (
    <Main>
      <Wrapper style={{ height: "100%" }}>
        <Container style={{ height: "100%" }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ height: "100%" }}>
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
                  source={require("../../assets/payment.jpg")}
                />
              </View>

              <View style={{ marginBottom: 20 }}>
                <Title size="lg">
                  Ваше объявление точно заметят с премиум-размещением
                </Title>
              </View>

              <Paragraph size="lg" style={{ marginBottom: 20 }}>
                Премиум объявления всегда выше бесплатных – на главной и в
                поисковой выдаче, а выделение цветом обеспечит большие охваты и
                повысит вероятность продажи.
              </Paragraph>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingBottom: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#1A1F25",
                  marginBottom: 20,
                }}
              >
                <Paragraph
                  style={{ fontFamily: "Manrope_500Medium" }}
                  size="xl"
                >
                  30 дней премиума
                </Paragraph>

                <Paragraph size="xl">990 ₽</Paragraph>
              </View>

              <Btn
                icon={<WsIcon />}
                onPress={() => Linking.openURL(`https://wa.me/79899966015`)}
                color="green"
              >
                <Paragraph size="md" color={"white"}>
                  Подробнее и оплата в WhatsApp
                </Paragraph>
              </Btn>
            </View>
          </ScrollView>
        </Container>
      </Wrapper>
      <Footer navigation={navigation} />
    </Main>
  );
}
