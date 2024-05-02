import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { View, ScrollView, Linking } from "react-native";

import Main from "../../layout/main/main";
import Footer from "../../layout/main/footer";

import Container from "../../ui/common/container";
import Wrapper from "../../layout/main/wrapper";
import {
  Items,
  User,
  Question,
  Favorites,
  Notifications,
  Help,
  Contacts,
  Requests,
  Chat,
} from "../../layout/profile/icons/icons";
import ProfileList from "../../layout/profile/profileList";
import BannerItem from "../../layout/news/item/bannerItem";

export default function Profile({ navigation }) {
  const secondList = [
    {
      icon: <Question />,
      name: "Есть идея?",
      cb: () => navigation.navigate("Question"),
    },
    {
      icon: <Help />,
      name: "Помощь",
      cb: () => navigation.navigate("Help"),
    },
    {
      icon: <Contacts />,
      name: "Контакты",
      cb: () => navigation.navigate("Contacts"),
    },
    {
      icon: <Notifications />,
      name: "Уведомления",
      cb: () => navigation.navigate("Notifications"),
    },
  ];

  const scrollViewRef = useRef(null);

  const notSeenNotificationsCount = useSelector(
    (state) => state.notifications.value.notSeenNotificationsCount
  );

  const [profileList, setProfileList] = useState(secondList);

  useEffect(() => {
    setProfileList((prev) => {
      return prev.map((it) => {
        if (it.name === "Уведомления") {
          it = {
            ...it,
            badge:
              notSeenNotificationsCount &&
              notSeenNotificationsCount > 0 &&
              notSeenNotificationsCount,
          };
        }

        return it;
      });
    });
  }, [notSeenNotificationsCount]);

  return (
    <Main>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Wrapper>
          <Container>
            <BannerItem
              variant="vertical"
              onPress={() => Linking.openURL("https://t.me/FLATEPRO")}
              image={require("../../../assets/adv-banner-tg.jpg")}
              heading={"Наше сообщество агентов в Telegram"}
              link={"Подписаться"}
            />

            {/* <BannerItem
              variant="vertical"
              onPress={() => navigation.navigate("Collections")}
              image={require("../../../assets/collections-banner.jpg")}
              heading={
                "Новое! Создание подборок и генерация лендинга для клиента"
              }
              headingColor={"black"}
              link={"Создать подборку"}
              linkColor={"blue"}
            /> */}
          </Container>

          <Container>
            <View style={{ marginTop: 20 }}>
              <ProfileList variant="rounded" list={profileList} />
            </View>
          </Container>
        </Wrapper>
      </ScrollView>
      <Footer scrollViewRef={scrollViewRef} navigation={navigation} />
    </Main>
  );
}
