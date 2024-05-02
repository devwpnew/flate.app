import React from "react";
import Wrapper from "../../layout/main/wrapper";
import Main from "../../layout/main/main";
import Title from "../heading/title";
import Paragraph from "../text/paragraph";
import Container from "../common/container";

import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ScreenFallback({ error }) {
  const navigation = useNavigation();

  return (
    <Main>
      <Wrapper>
        <Container>
          <Title>{error}</Title>

          <TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={() => navigation.replace("Home")}
          >
            <Paragraph size="lg">Вернуться на главную -></Paragraph>
          </TouchableOpacity>
        </Container>
      </Wrapper>
    </Main>
  );
}
