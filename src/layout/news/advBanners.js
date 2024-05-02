import api from "../../../api/service/api";
import { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Container from "../../ui/common/container";
import RProductPreloader from "../../ui/preloader/rProductPreloader";
import BannerItemModal from "./item/bannerItemModal";
import BannerItem from "./item/bannerItem";
import { useDispatch, useSelector } from "react-redux";
import { setLogedIn } from "../../store/global/user/userLogin";
import { userModerationHandler, userHandler } from "../../../helpers/user/user";

export default function AdvBanners({ style, variant = "horizontal" }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userLogin.value);
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [news, setNews] = useState([]);

  useEffect(() => {
    (async function fetchNews() {
      setIsLoading(true);
      const news = await api.get.news({
        window_host: "https://flate.pro",
        limit: "all",
        filter: { published: "1", variant: "1" },
        sort: { date_created: "DESC" },
      });

      if (news && news?.length) {
        setNews(news);
      }
      setIsLoading(false);
    })();
  }, []);

  const openNewsPage = (slug) => {
    Linking.openURL(`https://flate.pro/news/${slug}`).catch((error) =>
      console.log("Не удалось открыть ссылку", error)
    );
  };

  const onNavigateToAddPage = async () => {
    if (user && Object.keys(user).length > 0) {
      if (user.user_group?.id === 6) {
        const userModeration = await userModerationHandler(user.id);

        if (userModeration) {
          dispatch(setLogedIn(userModeration));
          navigation.navigate("Add");
        } else {
          setOpenUserModerationModal(true);
        }

        return;
      } else {
        navigation.navigate("Add");
      }
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <>
      {variant === "horizontal" ? (
        <View style={style ? style : styles.wrapper}>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.container}>
              <BannerItem
                onPress={() =>
                  userHandler(navigation, user, () =>
                    navigation.navigate("Collections")
                  )
                }
                image={require("../../../assets/collections-banner.jpg")}
                heading={
                  "Новое! Создание подборок и генерация лендинга для клиента"
                }
                headingColor={"black"}
                link={"Создать"}
                linkColor={"blue"}
              />

              {isLoading ? (
                <>
                  <RProductPreloader
                    amount={3}
                    style={{
                      ...styles.itemContainer,
                      height: 120,
                    }}
                  />
                </>
              ) : (
                <>
                  {news?.map(
                    ({
                      name,
                      slug,
                      preview_image,
                      preview_text,
                      detail_image,
                      detail_text,
                      href,
                    }) => {
                      return (
                        <BannerItemModal
                          key={slug}
                          isGradient={true}
                          url={href}
                          image={
                            preview_image
                              ? {
                                  uri: "https://flate.pro/" + preview_image,
                                }
                              : require("../../../assets/article-bubble-thumb.jpeg")
                          }
                          heading={name}
                          text={preview_text}
                          detail_image={detail_image}
                          detail_text={detail_text}
                          link={"Подробнее"}
                        />
                      );
                    }
                  )}
                </>
              )}
              <BannerItem
                onPress={() => Linking.openURL("https://t.me/FLATEPRO/109")}
                image={require("../../../assets/adv-banner-tg.jpg")}
                heading={"Сообщество агентов в Телеграм"}
                link={"Ссылка"}
              />
              <BannerItem
                onPress={() => navigation.navigate("Payment")}
                image={require("../../../assets/adv-banner-premium.jpg")}
                heading={"Ускорьте продажу вашего объекта"}
                link={"Разместить премиум"}
              />
            </View>
          </ScrollView>
        </View>
      ) : (
        <Container>
          <View style={style ? style : styles.wrapperVertical}>
            <View style={styles.containerVertical}>
              {/* <BannerItem
                variant="vertical"
                url={"/message"}
                image={require("../../../assets/adv-banner-4.jpg")}
                heading={"Новая фича! Собери подборку для клиента"}
                link={"Создать подборку"}
              /> */}
              <BannerItem
                isGradient={true}
                variant="vertical"
                // onPress={() => navigation.navigate("Add")}
                onPress={onNavigateToAddPage}
                image={require("../../../assets/adv-banner-2.png")}
                heading={"Нужна помощь в продаже?"}
                link={"Разместить объявление"}
              />
            </View>
          </View>
        </Container>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  wrapperVertical: {
    marginVertical: 40,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  containerVertical: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  scrollView: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  itemContainer: {
    width: 300,
    overflow: "hidden",
    borderRadius: 20,
  },
  heading: {
    width: "50%",
    height: 58,
    marginBottom: 10,
  },
  link: {
    width: "50%",
  },
  imageBackground: {
    padding: 20,
  },
  gradient: {
    flex: 1,
  },
});
