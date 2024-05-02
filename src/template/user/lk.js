import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { View, ScrollView, Linking } from "react-native";

import Main from "../../layout/main/main";
import Footer from "../../layout/main/footer";

import Container from "../../ui/common/container";
import Wrapper from "../../layout/main/wrapper";
import {
  Analytics,
  Items,
  User,
  Question,
  Favorites,
  Notifications,
  Help,
  Contacts,
  Collections,
  Chat,
  Requests,
} from "../../layout/profile/icons/icons";
import ProfileList from "../../layout/profile/profileList";
import BannerItem from "../../layout/news/item/bannerItem";

export default function Profile({ navigation }) {
  const secondList = [
    {
      icon: <User />,
      name: "Профиль",
      cb: () => navigation.navigate("Settings"),
    },
    {
      icon: <Notifications />,
      name: "Уведомления",
      cb: () => navigation.navigate("Notifications"),
    },
  ];

  const thirdList = [
    {
      icon: <Items />,
      name: "Мои объявления",
      cb: () => navigation.navigate("Items"),
    },
    {
      icon: <Collections />,
      name: "Подборки",
      cb: () => navigation.navigate("Collections"),
      badge: "новое",
    },
    {
      icon: <Analytics />,
      name: "Аналитика цен",
      cb: () =>
        navigation.navigate("Analytics", {
          by: "areas",
        }),
      badge: "новое",
    },
  ];

  const fourList = [
    {
      icon: <Chat />,
      name: "Чат агентов Сочи",
      cb: () => Linking.openURL("https://t.me/+PWLKFN8vQXFlMzQy"),
    },
    {
      icon: <Requests />,
      name: "Запросы",
      cb: () => Linking.openURL("https://t.me/+kuHZhKdHWR5mMWJi"),
    },
  ];

  const otherList = [
    {
      icon: <Contacts />,
      name: "Контакты",
      cb: () => navigation.navigate("Contacts"),
    },
    {
      icon: <Help />,
      name: "Помощь",
      cb: () => navigation.navigate("Help"),
    },
    {
      icon: <Question />,
      name: "Есть идея?",
      cb: () => navigation.navigate("Question"),
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
              onPress={() => navigation.navigate("Collections")}
              image={require("../../../assets/collections-banner.jpg")}
              heading={
                "Новое! Создание подборок и генерация лендинга для клиента"
              }
              headingColor={"black"}
              link={"Создать подборку"}
              linkColor={"blue"}
            />
          </Container>

          <Container>
            <View style={{ marginBottom: 20, marginTop: 20 }}>
              <ProfileList variant="rounded" list={profileList} />
            </View>
            <View style={{ marginBottom: 20 }}>
              <ProfileList variant="rounded" list={fourList} />
            </View>
            <View style={{ marginBottom: 20 }}>
              <ProfileList
                variant="rounded"
                list={thirdList}
                badge="gradient"
              />
            </View>
            {/* <View style={{ marginBottom: 20 }}>
              <ProfileList variant="rounded" list={otherList} />
            </View> */}
          </Container>
          {/* <Container>
            <BannerItem
              variant="vertical"
              onPress={() => Linking.openURL("https://t.me/FLATEPRO")}
              image={require("../../../assets/adv-banner-tg.jpg")}
              heading={"Наше сообщество агентов в Telegram"}
              link={"Подписаться"}
            />
          </Container> */}
        </Wrapper>
      </ScrollView>
      <Footer scrollViewRef={scrollViewRef} navigation={navigation} />
    </Main>
  );
}
