import { useRef } from "react";
import { useIsFocused } from "@react-navigation/native";

import API from "../../api/service/api";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Dimensions, ScrollView, RefreshControl } from "react-native";

import Main from "../layout/main/main";
import Footer from "../layout/main/footer";

import useProductsCount from "../../hooks/products/useProductsCount";

import { setFilterVisibility } from "../store/global/filter/filterVisibility";
import { setFilterGlobalFields } from "../store/global/filter/filterGlobalFields";

import Container from "../ui/common/container";
import ProductListTitle from "../layout/product/list/productListTitle";
import ProductList from "../layout/product/list/productList";
import TabsSections from "../ui/tabs/spec/tabsSections";
import { colors } from "../ui/config";

const productsLimit = 20;
const premiumProductsLimit = 6;

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

export default function RCategory({ navigation, route }) {
  const dispatch = useDispatch();
  const activeCity = useSelector((state) => state.userCity.value);
  const sectionId = route.params.section.id;
  const title = route.params.section.name
    ? route.params.section.name
    : route.params?.section.user_name;
  const rcId = route.params?.section?.rc_id;
  const userId = route.params?.section?.user_id;

  const productsPremiumCount = useProductsCount(
    useMemo(() => {
      return {
        published: 1,
        city_link: activeCity.id,
        premium: "!false",
        section_relation: sectionId,
      };
    }, [sectionId, activeCity])
  );

  const productsCount = useProductsCount(
    useMemo(() => {
      return {
        published: 1,
        city_link: activeCity.id,
        section_relation: sectionId,
      };
    }, [sectionId, activeCity])
  );

  const [sort, setSort] = useState({ date_published: "DESC" });

  const [isLoading, setIsLoading] = useState(false);
  const [premiumProducts, setPremiumProducts] = useState(null);

  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetchPremiumData();
  }, [sectionId, activeCity]);

  useEffect(() => {
    fetchData();
  }, [sectionId, activeCity, sort]);

  async function fetchPremiumData() {
    setIsLoading(true);

    productsPremiumParams["filter"]["section_relation"] = sectionId;

    if (activeCity?.id) {
      productsPremiumParams["filter"]["city_link"] = activeCity.id;
    }

    // console.log(productsPremiumParams, "productsPremiumParams");

    setPremiumProducts(await API.get.product.list(productsPremiumParams));

    setIsLoading(false);
  }

  async function fetchData() {
    setIsProductsLoading(true);

    productsParams["filter"]["section_relation"] = sectionId;
    productsParams["sort"] = sort;

    if (activeCity?.id) {
      productsParams["filter"]["city_link"] = activeCity.id;
    }

    setProducts(await API.get.product.list(productsParams));
    setIsProductsLoading(false);
  }

  // OTHER
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

    clearFilter();

    await fetchData();
    await fetchPremiumData();

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
  // /OTHER

  return (
    <Main>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ref={scrollViewRef}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        <TabsSections
          style={{ marginBottom: 20, marginTop: 10 }}
          activeTabId={sectionId}
        />

        <Container>
          <ProductListTitle
            size="lg"
            style={{ marginBottom: 20 }}
            title={
              <>
                {title.trim()}{" "}
                {userId || rcId ? "" : <>в {activeCity.in_name} </>}
              </>
            }
            count={productsCount?.products?.count}
            isCountLoading={productsCount.isLoading}
          />
        </Container>

        <ProductList
          title="Премиум размещение"
          maxProducts={productsPremiumCount?.products?.count}
          products={premiumProducts}
          setProducts={setPremiumProducts}
          isPremium={true}
          isLoading={isLoading}
          isButton={true}
          isShowCount={false}
          isFetch={isEndOfThePage}
          filter={premiumFilter}
          sort={sort}
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

        <ProductList
          title="Все предложения"
          maxProducts={productsCount?.products?.count}
          products={products}
          setProducts={setProducts}
          setSort={setSort}
          isPremium={false}
          isLoading={isProductsLoading}
          isButton={false}
          isShowCount={false}
          isSort={true}
          isFetch={isEndOfThePage}
          filter={productsParams.filter}
          sort={productsParams.sort}
          limit={productsLimit}
          page={productsPage}
          productStyle={{
            width: Dimensions.get("window").width / 2 - 15,
            height: Math.floor(
              (Dimensions.get("window").width / 2 - 55) * 1.45
            ),
            marginBottom: 20,
          }}
          style={{ paddingBottom: 70 }}
        />
      </ScrollView>

      <Footer scrollViewRef={scrollViewRef} navigation={navigation} />
    </Main>
  );
}
