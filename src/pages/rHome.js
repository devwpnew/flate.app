import API from "../../api/service/api";

import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect, useMemo } from "react";
import { Dimensions, ScrollView, RefreshControl } from "react-native";

import Footer from "../layout/main/footer";

import useProductsCount from "../../hooks/products/useProductsCount";

import { useIsFocused } from "@react-navigation/native";
import { setFilterGlobalFields } from "../store/global/filter/filterGlobalFields";
import { setFilterVisibility } from "../store/global/filter/filterVisibility";

import Categories from "../layout/category/categories";

const productsLimit = 20;
const premiumProductsLimit = 4;

const productsPage = 1;
const premiumProductsPage = 1;

const premiumFilter = {
  published: 1,
  premium: "!false",
};

const productsPremiumParams = {
  window_host: "https://flate.pro",
  sort: { stat_views_preview: "ASC" },
  filter: premiumFilter,
  limit: premiumProductsLimit,
  page: premiumProductsPage,
};

const productsParams = {
  window_host: "https://flate.pro",
  sort: { date_published: "DESC" },
  filter: { published: 1 },
  limit: productsLimit,
  page: productsPage,
};

import { colors } from "../ui/config";

import ProductList from "../layout/product/list/productList";
import ProductTabs from "../layout/product/list/productTabs";

import NewsBubbles from "../layout/news/newsBubbles";
import AdvBanners from "../layout/news/advBanners";
import Wrapper from "../layout/main/wrapper";
import Main from "../layout/main/main";

import Constants, { ExecutionEnvironment } from "expo-constants";
import ModalAppUpdate from "../ui/modal/spec/modalAppUpdate";
import { setFetchState } from "../store/global/helpers/fetchTrigger";

// `true` when running in Expo Go.
const isExpoGo =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

let analytics;
if (!isExpoGo) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  analytics = require("@react-native-firebase/analytics").default;
}

export async function logLevelComplete(level, moves) {
  if (isExpoGo) {
    console.log(
      "levelComplete analytics event, level: ",
      level,
      "moves: ",
      moves
    );
  } else {
    await analytics().logEvent("level_complete", {
      level: level,
      moves: moves,
    });
  }
}

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const activeCity = useSelector((state) => state.userCity.value);
  const isFetch = useSelector((state) => state.fetchTrigger.value);

  const productsPremiumCount = useProductsCount(
    useMemo(() => {
      return {
        published: 1,
        city_link: activeCity.id,
        premium: "!false",
      };
    }, [activeCity])
  );

  const [isLoading, setIsLoading] = useState(false);
  const [premiumProducts, setPremiumProducts] = useState(null);

  useEffect(() => {
    fetchData();
  }, [activeCity]);

  async function fetchData() {
    setIsLoading(true);

    if (activeCity?.id) {
      productsPremiumParams["filter"]["city_link"] = activeCity.id;
      productsParams["filter"]["city_link"] = activeCity.id;
    }

    console.log(productsPremiumParams, "productsPremiumParams");

    setPremiumProducts(await API.get.product.list(productsPremiumParams));

    setIsLoading(false);
  }

  const clearFilter = () => {
    dispatch(setFilterVisibility(false));
    dispatch(setFilterGlobalFields({}));
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    // Логика, выполняемая при каждом изменении навигации

    if (isFocused) {
      clearFilter();
      // Дополнительные действия при фокусе на экране
    } else {
      // // console.log("Screen is blurred");
      // Дополнительные действия при потере фокуса с экрана
    }

    return () => {
      // Логика, выполняемая при размонтировании компонента
    };
  }, [isFocused]);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const onRefresh = async () => {
    setIsRefreshing(true);

    await fetchData();

    dispatch(setFetchState(!isFetch));
    
    setIsRefreshing(false);
  };

  const scrollViewRef = useRef(null);

  const [isEndOfThePage, setIsEndOfThePage] = useState(false);
  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20; // Устанавливаем порог на 20 пикселей

    if (isCloseToBottom) {
      setIsEndOfThePage(true);
    } else {
      setIsEndOfThePage(false);
    }
  };

  useEffect(() => {
    logLevelComplete(2, 3);
  }, []);

  return (
    <Main>
      <ScrollView
        keyboardDismissMode={"on-drag"}
        keyboardShouldPersistTaps={"always"}
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: colors["white"],
        }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ref={scrollViewRef}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        <Wrapper>
          <AdvBanners
            style={{
              marginBottom: "2%",
            }}
          />

          <NewsBubbles
            style={{
              marginTop: "3%",
              marginBottom: "4%",
            }}
          />

          <Categories
            style={{
              marginBottom: 20,
            }}
          />

          <ProductList
            title="Премиум размещение"
            maxProducts={productsPremiumCount?.products?.count}
            products={premiumProducts}
            setProducts={setPremiumProducts}
            isPremium={true}
            isLoading={isLoading}
            isButton={true}
            isFetch={isEndOfThePage}
            filter={premiumFilter}
            sort={productsPremiumParams.sort}
            limit={premiumProductsLimit}
            page={premiumProductsPage}
            productPropsStyle={{
              paddingHorizontal: 10,
            }}
            productStyle={{
              borderRadius: 10,
              backgroundColor: colors["white"],
              width: Dimensions.get("window").width / 2 - 15,
              height: Math.floor(
                (Dimensions.get("window").width / 2 - 55) * 1.45 + 10
              ),
              marginBottom: 20,
            }}
          />

          <AdvBanners
            style={{
              marginVertical: 20,
            }}
            variant="vertical"
          />

          <ProductTabs
            key={isFetch}
            title="Свежие"
            isPremium={false}
            isButton={false}
            isFetch={isEndOfThePage}
            productStyle={{
              width: Dimensions.get("window").width / 2 - 15,
              height: Math.floor(
                (Dimensions.get("window").width / 2 - 40) * 1.45
              ),
              marginBottom: 20,
            }}
          />
        </Wrapper>
      </ScrollView>
      <Footer scrollViewRef={scrollViewRef} navigation={navigation} />
      <ModalAppUpdate />
    </Main>
  );
}
