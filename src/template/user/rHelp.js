import { useRef } from "react";
import { View, ScrollView, Linking } from "react-native";

import Main from "../../layout/main/main";
import Footer from "../../layout/main/footer";
import Wrapper from "../../layout/main/wrapper";

import Container from "../../ui/common/container";
import Btn from "../../ui/button/btn";

import Paragraph from "../../ui/text/paragraph";

import faqData from "../../../helpers/static/faq/faqData";

import FaqItems from "./help/faqItems";
import { colors } from "../../ui/config";

const data = faqData();

export default function Help({ navigation }) {
  const scrollViewRef = useRef(null);

  return (
    <Main>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Wrapper>
          <Container>
            {data.map((fq) => {
              return (
                <View key={fq.title}>
                  <View
                    style={{
                      marginTop: 20,
                      paddingBottom: 10,
                      borderColor: colors["grey-light"],
                      borderBottomWidth: 1,
                    }}
                  >
                    <Paragraph size="xl">{fq.title}</Paragraph>
                  </View>
                  <FaqItems arItems={fq?.items} />
                </View>
              );
            })}

            <Btn
              style={{marginTop: 20}}
              onPress={() => Linking.openURL(`https://wa.me/79899966015`)}
              color="green"
            >
              Не нашли ответ? Напишите нам в WhatsApp
            </Btn>
          </Container>
        </Wrapper>
      </ScrollView>
      <Footer scrollViewRef={scrollViewRef} navigation={navigation} />
    </Main>
  );
}
