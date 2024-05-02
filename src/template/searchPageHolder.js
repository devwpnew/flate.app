import api from "../../api/service/api";

import { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";

import PreloaderSpinner from "../ui/preloader/preloaderSpinner";
import ScreenFallback from "../ui/fallback/screenFallback";

import { colors } from "../ui/config";

import { storeSections } from "../store/app/sections";
import { useDispatch, useSelector } from "react-redux";
import UserWrapper from "../layout/hoc/userWrapper";

const query = {
  sort: {
    id: "asc",
  },
  filter: {
    active: true,
  },
  window_host: "https://flate.pro",
};

export default function SearchPageHolder({ navigation, route }) {
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        if (route.params) {
          // const filter = getFilterFromPath(route.path);

          if (route.params?.rc) {
            const fetch = await api.get.rcs({
              window_host: "https://flate.pro/",
              filter: {
                id: route.params?.rc,
              },
            });

            const rc = fetch && fetch[0];

            if (rc) {
              navigation.replace("SearchPage", {
                title: rc.name,
                filter: {
                  rc_link: rc.id,
                },
              });
            } else {
              setError(`ЖК не найден`);
            }

            return;
          }

          if (route.params?.user) {
            const filter = {};

            if (parseInt(route.params.user)) {
              filter["id"] = route.params.user;
            } else {
              filter["sef_code"] = route.params.user;
            }

            const fetch = await api.get.user({
              window_host: "https://flate.pro/",
              filter: filter,
            });

            console.log(filter);

            const user = fetch && fetch[0];

            if (user) {
              navigation.replace("SearchPage", {
                title: user.user_name,
                filter: {
                  user_id: user.id,
                },
              });
            } else {
              setError(`Пользователь не найден`);
            }

            return;
          }
        }
      } catch (e) {
        console.log(e);
        setError(`Произошла непредвиденная ошибка`);
      }
    })();
  }, [route?.path]);

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
