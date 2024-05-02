import api from "../../../api/service/api";
import { useEffect, useState } from "react";

import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Linking,
} from "react-native";

import NewsBubble from "./item/newsBubble";
import AboutText from "./static/aboutText";
import MsgText from "./static/msgText";
import RProductPreloader from "../../ui/preloader/rProductPreloader";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const news = [
//   {
//     preview_image: require("../../../assets/article-bubble-1.jpeg"),
//     detail_image: require("../../../assets/about-msg.jpeg"),
//     name: "Мы пришли, чтобы сделать вас счастливее",
//     slug: "about",
//     detail_text: <AboutText />,
//   },
//   {
//     preview_image: require("../../../assets/article-bubble-2.jpeg"),
//     detail_image: require("../../../assets/author-msg.jpeg"),
//     name: "Открытое письмо основателя",
//     slug: "message",
//     detail_text: <MsgText />,
//   },
// ];

const { width } = Dimensions.get("window");

const arStory = [
  require("../../../assets/story/about/1.jpg"),
  require("../../../assets/story/about/2.jpg"),
  require("../../../assets/story/about/3.jpg"),
  require("../../../assets/story/about/4.jpg"),
  require("../../../assets/story/about/5.jpg"),
  require("../../../assets/story/about/6.jpg"),
  // require("../../../assets/story/about/7.jpg"),
  require("../../../assets/story/about/8.jpg"),
  require("../../../assets/story/about/9.jpg"),
  require("../../../assets/story/about/10.jpg"),
];

const arStoryTg = [require("../../../assets/story/tg/tg.jpg")];

const arStoryMessage = [
  require("../../../assets/story/message/1.jpg"),
  require("../../../assets/story/message/2.jpg"),
  require("../../../assets/story/message/3.jpg"),
  require("../../../assets/story/message/4.jpg"),
  require("../../../assets/story/message/5.jpg"),
  require("../../../assets/story/message/6.jpg"),
  require("../../../assets/story/message/7.jpg"),
  require("../../../assets/story/message/8.jpg"),
  require("../../../assets/story/message/9.jpg"),
];

export const arCollections = [
  require("../../../assets/story/collections/1.jpg"),
  require("../../../assets/story/collections/2.jpg"),
  require("../../../assets/story/collections/3.jpg"),
  require("../../../assets/story/collections/4.jpg"),
  require("../../../assets/story/collections/5.jpg"),
  require("../../../assets/story/collections/6.jpg"),
  require("../../../assets/story/collections/7.jpg"),
  require("../../../assets/story/collections/8.jpg"),
];

const arAdv = [
  require("../../../assets/story/adv/1.jpg"),
  require("../../../assets/story/adv/2.jpg"),
  require("../../../assets/story/adv/3.jpg"),
  require("../../../assets/story/adv/4.jpg"),
  require("../../../assets/story/adv/5.jpg"),
  require("../../../assets/story/adv/6.jpg"),
  require("../../../assets/story/adv/7.jpg"),
  require("../../../assets/story/adv/8.jpg"),
  require("../../../assets/story/adv/9.jpg"),
];

const arAnalytics = [
  require("../../../assets/story/analytics/1.jpg"),
  require("../../../assets/story/analytics/2.jpg"),
  require("../../../assets/story/analytics/3.jpg"),
]

// const objStoryTg = {
//   image: require("../../../assets/story/tg.jpg"),
//   buttonText: "Подробнее",
//   buttonLink: "https://t.me/FLATEPRO/109",
// };

export default function NewsBubbles({ style = {} }) {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [news, setNews] = useState([]);

  useEffect(() => {
    (async function fetchNews() {
      setIsLoading(true);
      const news = await api.get.news({
        window_host: "https://flate.pro",
        limit: "all",
        filter: { published: "1", variant: "2" },
        sort: { date_created: "DESC" },
      });

      if (news && news?.length) {
        setNews(news);
      }
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const isAppReviewSeen = await AsyncStorage.getItem("isAppReviewSeen");

      if (isAppReviewSeen !== "Y") {
        handleAppReview();
      }
    })();
  }, []);

  const handleAppReview = async () => {
    await AsyncStorage.setItem("isAppReviewSeen", "Y");

    navigation.navigate("STORY", {
      story: arStory,
      image: require("../../../assets/article-bubble-thumb.jpeg"),
      name: "Обзор приложения",
    });
  };

  return (
    <View style={style}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          <NewsBubble
            name={"Новое: Аналитика цен"}
            preview_image_local={require("../../../assets/story/analytics/thumb.jpg")}
            preview_image={null}
            detail_text={"detail_text"}
            detail_image={null}
            onPress={() =>
              navigation.navigate("STORY", {
                story: arAnalytics,
                image: require("../../../assets/story/analytics/thumb.jpg"),
                name: "Новое: Аналитика цен",
              })
            }
            url={null}
          />
          <NewsBubble
            name={"Как работает FLATE"}
            preview_image_local={require("../../../assets/story/adv/thumb.jpg")}
            preview_image={null}
            detail_text={"detail_text"}
            detail_image={null}
            onPress={() =>
              navigation.navigate("STORY", {
                story: arAdv,
                image: require("../../../assets/story/adv/thumb.jpg"),
                name: "Как работает FLATE",
              })
            }
            url={null}
          />
          <NewsBubble
            name={"Подборки"}
            preview_image_local={require("../../../assets/story/collections/thumb.jpg")}
            preview_image={null}
            detail_text={"detail_text"}
            detail_image={null}
            onPress={() =>
              navigation.navigate("STORY", {
                story: arCollections,
                image: require("../../../assets/story/collections/thumb.jpg"),
                name: "Подборки",
              })
            }
            url={null}
          />

          <NewsBubble
            name={"Обзор приложения"}
            preview_image={null}
            detail_text={"detail_text"}
            detail_image={null}
            onPress={handleAppReview}
            url={null}
          />

          <NewsBubble
            name={"Обращение сооснователя"}
            preview_image_local={require("../../../assets/story/message/thumb.jpg")}
            preview_image={null}
            detail_text={"detail_text"}
            detail_image={null}
            onPress={() =>
              navigation.navigate("STORY", {
                story: arStoryMessage,
                image: require("../../../assets/story/message/thumb.jpg"),
                name: "Открытое письмо основателя",
              })
            }
            url={null}
          />

          <NewsBubble
            name={"Наш телеграм"}
            preview_image_local={require("../../../assets/story/tg/thumb.jpg")}
            preview_image={null}
            detail_text={"detail_text"}
            detail_image={null}
            onPress={() =>
              navigation.navigate("STORY", {
                story: arStoryTg,
                image: require("../../../assets/story/tg/thumb.jpg"),
                name: "Наш телеграм",
                buttonText: "Подробнее",
                buttonLink: "https://t.me/FLATEPRO/109",
              })
            }
            url={null}
          />

          {isLoading ? (
            <>
              <RProductPreloader
                amount={3}
                style={{
                  width: width / 5.2,
                  height: width / 5.2,
                  padding: 2,
                  borderRadius: 999,
                }}
              />
            </>
          ) : (
            <>
              {news?.map(
                ({
                  name,
                  slug,
                  detail_text,
                  preview_image,
                  detail_image,
                  href,
                }) => {
                  return (
                    <NewsBubble
                      key={slug}
                      name={name}
                      preview_image={preview_image}
                      detail_text={detail_text}
                      detail_image={detail_image}
                      url={null}
                    />
                  );
                }
              )}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    paddingBottom: 5,
  },
});
