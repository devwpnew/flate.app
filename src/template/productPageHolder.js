import api from "../../api/service/api";
import { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import PreloaderSpinner from "../ui/preloader/preloaderSpinner";
import { colors } from "../ui/config";
import ScreenFallback from "../ui/fallback/screenFallback";
import UserWrapper from "../layout/hoc/userWrapper";

const getProductSlug = (path) => {
  if (!path) return null;

  const pathNoLastSlash = route?.path.replace(/\/$/, "");
  const pathSpited = pathNoLastSlash.split("/");
  const slug = pathSpited[pathSpited.length - 1];

  return slug;
};


export default function ProductPageHolder({ navigation, route }) {
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        if (route.params?.productSlug || route?.path) {
          const slug = route.params.productSlug || getProductSlug(route?.path);

          const fetch = await api.get.product.list({
            window_host: "https://flate.pro",
            filter: {
              published: "1",
              slug: slug,
            },
            sort: { date_published: "DESC" },
          });

          const product = fetch && fetch[0];

          if (product) {
            navigation.replace("Page", {
              name: product.name,
              product: product,
            });
          } else {
            setError(`Объявление не найдено`);
          }
        }
      } catch (e) {
        console.log(e);
        setError(`Произошла непредвиденная ошибка`);
      }
    })();
  }, [route?.params?.productSlug, route?.path]);

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
