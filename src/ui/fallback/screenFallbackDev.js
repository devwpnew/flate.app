import React from "react";
import Wrapper from "../../layout/main/wrapper";
import Main from "../../layout/main/main";
import Title from "../heading/title";
import Paragraph from "../text/paragraph";
import Container from "../common/container";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
  DevSettings,
  Share,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../config";

export default function ScreenFallbackDev({ error, ...style }) {
  const share = async () => {
    const message = error;

    try {
      const result = await Share.share({
        message: message,
        url: "",
        title: "Произошла ошибка",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View>
      <SafeAreaView
        style={{ backgroundColor: colors["white"], height: "100%", ...style }}
      >
        <StatusBar animated={true} backgroundColor="#61dafb" />
        <ScrollView>
          <Wrapper>
            <Container>
              <Title style={{ marginBottom: 10 }}>Произошла ошибка</Title>

              <Paragraph>{error}</Paragraph>

              <TouchableOpacity
                onPress={() => DevSettings.reload()}
                style={{ marginTop: 10 }}
              >
                <Paragraph size="lg">Вернуться на главную -></Paragraph>
              </TouchableOpacity>
              <TouchableOpacity onPress={share} style={{ marginTop: 10 }}>
                <Paragraph size="lg">Отправить отчет -></Paragraph>
              </TouchableOpacity>
            </Container>
          </Wrapper>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
