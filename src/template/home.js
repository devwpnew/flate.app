import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import { View, Dimensions, ScrollView, RefreshControl } from "react-native";
import API from "../../api/service/api";
import tw from "../../lib/tailwind";

import Main from "../layout/main/main";
import Header from "../layout/main/header";
import Footer from "../layout/main/footer";
import HomeMenu from "../layout/menu/homeMenu";
import HomeSearch from "../layout/search/homeSearch";

import ProductContainerInfinite from "../layout/product/container/productContainerInfinite";
import ProductContainerWithFetch from "../layout/product/container/productContainerWithFetch";
import useProductsCount from "../../hooks/products/useProductsCount";
import { useIsFocused } from "@react-navigation/native";
import { setFilterGlobalFields } from "../store/global/filter/filterGlobalFields";
import { setFilterVisibility } from "../store/global/filter/filterVisibility";
import { useRef } from "react";
import Search from "../layout/search/search";

import ModalAppUpdate from "../ui/modal/spec/modalAppUpdate";

const productsLimit = 20;
const premiumProductsLimit = 4;

const productsPage = 1;
const premiumProductsPage = 1;

export default function Home({ navigation }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userLogin.value);
  const filter = useSelector((state) => state.filterGlobalFields.value);
  const activeCity = useSelector((state) => state.userCity.value);

  const productsParams = {
    window_host: "https://flate.pro",
    sort: { date_published: "DESC" },
    filter: { published: 1 },
    limit: productsLimit,
    page: productsPage,
  };

  const productsPremiumParams = {
    window_host: "https://flate.pro",
    sort: { stat_views_preview: "ASC" },
    filter: {
      published: 1,
      premium: "!false",
    },
    limit: premiumProductsLimit,
    page: premiumProductsPage,
  };

  const productsPremiumCount = useProductsCount(
    useMemo(() => {
      return {
        published: 1,
        city_link: activeCity.id,
        premium: "!false",
      };
    }, [activeCity])
  );
  const productsCount = useProductsCount(
    useMemo(() => {
      return {
        published: 1,
        city_link: activeCity.id,
      };
    }, [activeCity])
  );

  const [isLoading, setIsLoading] = useState(false);
  const [premiumProducts, setPremiumProducts] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetchData();
  }, [activeCity]);

  async function fetchData() {
    setIsLoading(true);

    if (activeCity?.id) {
      productsPremiumParams["filter"]["city_link"] = activeCity.id;
      productsParams["filter"]["city_link"] = activeCity.id;
    }

    setPremiumProducts(await API.get.product.list(productsPremiumParams));
    setProducts(await API.get.product.list(productsParams));

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
      // console.log("Screen is blurred");
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

  return (
    <Main>
      <ScrollView
        style={tw`h-full bg-white`}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ref={scrollViewRef}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        {/* <Header /> */}
        <View style={tw`mt-5`}></View>
        <HomeMenu navigation={navigation} />

        <View style={[Platform.select({ ios: { zIndex: 10 } })]}>
          {/* <HomeSearch navigation={navigation} /> */}
          <Search navigation={navigation} type={"mini"} isFilter={false} />
        </View>

        <ProductContainerWithFetch
          isPremium={true}
          isLoading={isLoading}
          title={`Премиум размещение – ${productsPremiumCount?.products?.count}`}
          productsCount={productsPremiumCount?.products?.count}
          products={premiumProducts}
          setProducts={setPremiumProducts}
          limit={premiumProductsLimit}
          page={premiumProductsPage}
          containerStyle={tw`px-[15px]`}
          itemStyle={{
            width: Dimensions.get("window").width / 2 - 18,
            marginBottom: 8,
          }}
          navigation={navigation}
        />

        <ProductContainerInfinite
          isEndOfThePage={isEndOfThePage}
          isPremium={false}
          isLoading={isLoading}
          title={`Новые предложения – ${productsCount?.products?.count}`}
          productsCount={productsCount?.products?.count}
          products={products}
          setProducts={setProducts}
          limit={productsLimit}
          page={productsPage}
          containerStyle={tw`px-[15px] mt-5`}
          itemStyle={{
            width: Dimensions.get("window").width / 2 - 18,
            marginBottom: 8,
          }}
          navigation={navigation}
        />
        <View style={tw`h-[70px]`}></View>
      </ScrollView>
      <Footer scrollViewRef={scrollViewRef} navigation={navigation} />
    </Main>
  );
}