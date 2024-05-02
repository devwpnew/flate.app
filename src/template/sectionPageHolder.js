import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import UserWrapper from "../layout/hoc/userWrapper";
import ScreenFallback from "../ui/fallback/screenFallback";

import { View } from "react-native-web";
import { Dimensions } from "react-native";
import { colors } from "../ui/config";

import PreloaderSpinner from "../ui/preloader/preloaderSpinner";
import api from "../../api/service/api";

export default function SectionPageHolder({ navigation, route }) {
  const [error, setError] = useState("");

  const sections = useSelector((state) => state.sections.value.array);

  useEffect(() => {
    (async () => {
      try {
        if (route?.name) {
          const slug = route.name.toLowerCase();

          const fetch = await api.get.sections({
            sort: {
              id: "asc",
            },
            filter: {
              active: true,
            },
            window_host: "https://flate.pro",
          });

          console.log(fetch, '==========');

          const section = fetch.find(s => s.slug === slug)

          if (section) {
            navigation.replace("Category", {
              name: section.name,
              section: section,
            });
          } else {
            setError(`Категория не найдена`);
          }
        }
      } catch (e) {
        console.log(e);
        setError(`Произошла непредвиденная ошибка`);
      }
    })();
  }, [route.name]);

  const loadCategory = (slug) => {
    const section = sections.find((s) => s.slug === slug.toLowerCase());

    console.log(section, "section");

    navigation.replace("Category", {
      name: section.name,
      section: section,
    });
  };

  return (
    <UserWrapper>
      {error ? (
        <ScreenFallback error={error} />
      ) : (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            height: Dimensions.get("window").height - 100,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors["white"],
          }}
        >
          <PreloaderSpinner />
        </View>
      )}
    </UserWrapper>
  );
}
