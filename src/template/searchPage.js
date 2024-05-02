import { useRef } from "react";

import API from "../../api/service/api";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { Dimensions, ScrollView, RefreshControl, View } from "react-native";

import Main from "../layout/main/main";
import Footer from "../layout/main/footer";

import useProductsCount from "../../hooks/products/useProductsCount";

import ProductList from "../layout/product/list/productList";
import Wrapper from "../layout/main/wrapper";
import Button from "../ui/button/button";
import FilterButton from "../layout/category/filterButton";

const productsLimit = 20;

const productsPage = 1;

const productsParams = {
  window_host: "https://flate.pro",
  sort: { date_published: "DESC" },
  filter: { published: 1 },
  limit: productsLimit,
  page: productsPage,
};

export default function SearchPage({ navigation, route }) {
  const activeCity = useSelector((state) => state.userCity.value);

  const filter = route.params.filter; //useSelector((state) => state.filterGlobalFields.value);
  const title = route.params.title;
  const user = route.params.user;

  const productsCount = useProductsCount(
    useMemo(() => {
      return {
        published: "1",
        city_link: activeCity.id,
        ...filter,
      };
    }, [filter, activeCity])
  );

  const [sort, setSort] = useState({ date_published: "DESC" });

  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetchData();
  }, [filter, activeCity, sort]);

  async function fetchData() {
    setIsProductsLoading(true);

    productsParams["filter"] = { published: 1, ...filter };
    productsParams["sort"] = sort;

    console.log(productsParams, "productsParams");

    setProducts(await API.get.product.list(productsParams));

    setIsProductsLoading(false);
  }

  const [isRefreshing, setIsRefreshing] = useState(false);
  const onRefresh = async () => {
    setIsRefreshing(true);

    await fetchData();

    setIsRefreshing(false);
  };

  const scrollViewRef = useRef(null);

  const [isLowerTitle, setIsLowerTitle] = useState(false);
  const [isEndOfThePage, setIsEndOfThePage] = useState(false);
  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    const isCloseToLowerTitle = contentOffset.y > 100;

    if (isCloseToLowerTitle) {
      setIsLowerTitle(true);
    } else {
      setIsLowerTitle(false);
    }

    if (isCloseToBottom) {
      setIsEndOfThePage(true);
    } else {
      setIsEndOfThePage(false);
    }
  };
  // /OTHER
  const isAnalytics = filter.section_relation == 3 || filter.rc_link;
  // console.log(filter, "filter sp");
  // console.log(isEndOfThePage, 'isEndOfThePage');

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
        <Wrapper>
          <View style={{ position: "relative" }}>
            <ProductList
              key={isRefreshing}
              title={title}
              user={user}
              titleSize="lg"
              maxProducts={productsCount?.products?.count}
              products={products}
              setProducts={setProducts}
              setSort={setSort}
              isFilter={true}
              isAnalytics={isAnalytics}
              isPremium={false}
              isLoading={isProductsLoading}
              isButton={false}
              isShowCount={user ? false : true}
              isSort={true}
              isFetch={isEndOfThePage}
              filter={{
                published: "1",
                city_link: activeCity.id,
                ...filter,
              }}
              isMap={true}
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
              styleWrapper={{
                paddingTop: 0,
              }}
              styleContainer={{ marginTop: 10 }}
            />
          </View>
        </Wrapper>
      </ScrollView>

      {isLowerTitle && (
        <FilterButton
          style={{
            marginLeft: "auto",
            position: "absolute",
            bottom: 100,
            right: 15,
          }}
          isFilled={true}
        />
      )}

      <Footer scrollViewRef={scrollViewRef} navigation={navigation} />
    </Main>
  );
}
