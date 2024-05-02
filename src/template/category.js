import API from "../../api/service/api";
import tw from "../../lib/tailwind";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Dimensions, View, ScrollView, RefreshControl } from "react-native";

import Main from "../layout/main/main";
import Footer from "../layout/main/footer";
import H1 from "../ui/heading/h1";

import Filter from "../layout/category/filter";

import ProductContainerWithFetch from "../layout/product/container/productContainerWithFetch";
import ProductContainerInfinite from "../layout/product/container/productContainerInfinite";

import useProductsCount from "../../hooks/products/useProductsCount";
import Preloader from "../ui/preloader/preloader";
import DText from "../ui/text/dText";
import AnimateFade from "../ui/animate/AnimateFade";
import DropdownSort from "../ui/dropdown/spec/dropdownSort";
import DModal from "../ui/modal/dModal";
import { setFilterVisibility } from "../store/global/filter/filterVisibility";
import { setFetchState } from "../store/global/helpers/fetchTrigger";
import { setFilterGlobalFields } from "../store/global/filter/filterGlobalFields";
import { useRef } from "react";

const productsLimit = 20;
const premiumProductsLimit = 4;

const productsPage = 1;
const premiumProductsPage = 1;

export default function Category({ navigation, route }) {
  const [productSort, setProductSort] = useState({});

  const dispatch = useDispatch();

  const isFetch = useSelector((state) => state.fetchTrigger.value);
  const filter = useSelector((state) => state.filterGlobalFields.value);
  const filterVisibility = useSelector((state) => state.filterVisibility.value);
  const activeCity = useSelector((state) => state.userCity.value);

  const sectionId = route.params.section.id;
  const buildingId = route.params?.section?.building_id;
  const rcId = route.params?.section?.rc_id;
  const userId = route.params?.section?.user_id;

  const title = route.params.section.name
    ? route.params.section.name
    : route.params?.section.user_name;

  const filterDefault = {
    published: 1,
    city_link: activeCity.id,
  };

  if (!rcId && !userId && !buildingId) {
    filterDefault["section_relation"] = sectionId;
  }

  if (rcId) {
    filterDefault["rc_link"] = rcId;
  }

  if (buildingId) {
    filterDefault["building_link"] = buildingId;
  }

  if (userId) {
    filterDefault["user_id"] = userId;
  }

  const productsPremiumCount = useProductsCount(
    useMemo(() => {
      return {
        ...filterDefault,
        premium: "!false",
      };
    }, [activeCity, sectionId, rcId, userId, buildingId])
  );
  const productsCount = useProductsCount(
    useMemo(() => {
      return {
        ...filterDefault,
        ...filter,
      };
    }, [activeCity, sectionId, isFetch, userId, buildingId])
  );

  const [isSearch, setIsSearch] = useState(route.params.isSearch);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPremium, setIsLoadingPremium] = useState(false);

  const [cityInNameIsLoading, setCityInNameIsLoading] = useState(true);
  const [cityInName, setCityInName] = useState(null);

  const [premiumProducts, setPremiumProducts] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    setIsSearch(route.params.isSearch);
  }, [route.params.isSearch]);

  useEffect(() => {
    fetchData();
  }, [
    productSort,
    activeCity,
    sectionId,
    rcId,
    isFetch,
    userId,
    buildingId,
    route.params.isSearch,
  ]);

  useEffect(() => {
    fetchPremium();
  }, [isSearch, sectionId]);

  async function fetchData() {
    setIsLoading(true);

    let sortParam = productSort;

    if (Object.keys(productSort).length === 0) {
      sortParam = { date_published: "DESC" };
    }

    if (buildingId || rcId || userId || route.params.isSearch) {
      setIsSearch(true);

      if (Object.keys(productSort).length === 0) {
        sortParam = { premium: "DESC", date_published: "DESC" };
      }
    }

    // const validatedFilter = {};

    // for (const key in filter) {
    //   if (object.hasOwnProperty(key)) {
    //     const value = object[key];
    //     // console.log(key, value);
    //   }
    // }

    // // console.log(isSearch, "isSearch");
    // // console.log(sortParam, "sortParam");

    const productsParams = {
      window_host: "https://flate.pro",
      sort: {
        ...sortParam,
      },
      filter: {
        ...filterDefault,
        ...filter,
      },
      limit: productsLimit,
      page: productsPage,
    };

    // console.log(productsParams, "productsParams");

    // // console.log(productsParams, "fetch");

    setProducts(await API.get.product.list(productsParams));

    setIsLoading(false);
  }

  async function fetchPremium() {
    const productsPremiumParams = {
      window_host: "https://flate.pro",
      sort: { stat_views_preview: "ASC" },
      filter: {
        premium: "!false",
        ...filterDefault,
      },
      limit: premiumProductsLimit,
      page: premiumProductsPage,
    };

    if (!isSearch) {
      setIsLoadingPremium(true);
      setPremiumProducts(await API.get.product.list(productsPremiumParams));
      setIsLoadingPremium(false);
    }
  }

  const scrollViewRef = useRef(null);

  const [isEndOfThePage, setIsEndOfThePage] = useState(false);

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20; // Устанавливаем порог на 20 пикселей

    // // console.log(contentSize.height, layoutMeasurement.height + contentOffset.y);
    if (isCloseToBottom) {
      setIsEndOfThePage(true);
    } else {
      setIsEndOfThePage(false);
    }
  };

  const [isRefreshing, setIsRefreshing] = useState(false);
  const onRefresh = async () => {
    setIsRefreshing(true);

    clearFilter();

    await fetchData();
    await fetchPremium();

    setIsRefreshing(false);
  };

  useEffect(() => {
    (async function getInName() {
      setCityInNameIsLoading(true);
      const city = await API.get.cities({
        window_host: "https://flate.pro",
        filter: {
          id: activeCity.id,
        },
      });
      setCityInName(city[0].in_name);
      setCityInNameIsLoading(false);
    })();
  }, [activeCity, isFetch]);

  const productContainerProps = {
    buildingId: buildingId,
    userId: userId,
    rcId: rcId,
    sectionId: sectionId,
    isPremium: false,
    isLoading: isLoading,
    isEndOfThePage: isEndOfThePage,
    title:
      !isSearch &&
      `Новые предложения – ${
        productsCount?.products?.count ? productsCount?.products?.count : ""
      }`,

    productsCount: productsCount?.products?.count,
    type: isSearch && "row",
    products: products,
    setProducts: setProducts,
    limit: productsLimit,
    page: productsPage,
    itemStyle: isSearch
      ? {
          width: Dimensions.get("window").width - 32,
          marginBottom: 8,
        }
      : {
          width: Dimensions.get("window").width / 2 - 18,
          marginBottom: 8,
        },

    navigation: navigation,
    productSort: productSort,
  };

  const clearFilter = () => {
    dispatch(setFilterGlobalFields({}));
    dispatch(setFetchState(!isFetch));
    dispatch(setFilterVisibility(false));
  };

  // console.log(isSearch, "isSearch");

  return (
    <Main>
      <ScrollView
        style={tw`h-full`}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ref={scrollViewRef}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        <View style={tw`bg-white`}>
          <View style={tw`px-3.5`}>
            <View style={tw`mb-2.5 mt-[14px]`}>
              <H1>
                {productsCount?.isLoading || cityInNameIsLoading ? (
                  <Preloader style={{ width: 250, height: 36 }} />
                ) : (
                  <>
                    {title.trim()} {userId || rcId ? "" : <>в {cityInName} </>}
                    <DText style={tw`text-grey font-bold`}>
                      {productsCount?.products?.count}
                    </DText>
                  </>
                )}
              </H1>
            </View>

            <DModal
              containerStyle={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                backgroundColor: "#fff",
              }}
              contentStyle={{
                position: "relative",
                backgroundColor: "#fff",
                width: "100%",
                padding: 15,
                borderRadius: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 0,
              }}
              closeButtonStyle={{
                position: "absolute",
                left: 0,
                top: 30,
                padding: 15,
              }}
              animationType="slide"
              closeOnlyByButton={true}
              modalVisible={filterVisibility}
              setModalVisible={() => dispatch(setFilterVisibility(false))}
            >
              <DText style={tw`font-bold text-center pt-[30px] mb-2.5`}>
                Фильтры
              </DText>
              <Filter
                isBuilding={buildingId}
                isRc={rcId}
                isUser={userId}
                isSearch={isSearch}
                setIsSearch={setIsSearch}
                navigation={navigation}
                route={route}
                productsCount={productsCount?.products?.count}
              />
            </DModal>

            {/* <AnimateFade isShow={filterVisibility}>
              <Filter
                isBuilding={buildingId}
                isRc={rcId}
                isUser={userId}
                isSearch={isSearch}
                setIsSearch={setIsSearch}
                navigation={navigation}
                route={route}
                productsCount={productsCount?.products?.count}
              />
            </AnimateFade> */}
          </View>

          {!isSearch && (
            <ProductContainerWithFetch
              sectionId={sectionId}
              isPremium={true}
              isLoading={isLoadingPremium}
              title={`Премиум размещение – ${
                productsPremiumCount?.products?.count
                  ? productsPremiumCount?.products?.count
                  : ""
              }`}
              productsCount={productsPremiumCount?.products?.count}
              type={isSearch && "row"}
              products={premiumProducts}
              setProducts={setPremiumProducts}
              limit={premiumProductsLimit}
              page={premiumProductsPage}
              itemStyle={
                isSearch
                  ? {
                      width: Dimensions.get("window").width - 32,
                      marginBottom: 8,
                    }
                  : {
                      width: Dimensions.get("window").width / 2 - 18,
                      marginBottom: 8,
                    }
              }
              navigation={navigation}
            />
          )}

          <View style={tw`px-[15px]`}>
            <DropdownSort
              style={tw`w-[135px]`}
              onValueChange={(v) => setProductSort(v)}
            />
          </View>

          {!isSearch ? (
            <ProductContainerWithFetch {...productContainerProps} />
          ) : (
            <ProductContainerInfinite {...productContainerProps} />
          )}
        </View>

        <View style={tw`h-[70px]`}></View>
      </ScrollView>

      <Footer scrollViewRef={scrollViewRef} navigation={navigation} />
    </Main>
  );
}
