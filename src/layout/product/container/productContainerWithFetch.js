import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";

import API from "../../../../api/service/api";
import tw from "../../../../lib/tailwind";

import H2 from "../../../ui/heading/h2";
import Button from "../../../ui/button/button";
import { useRef } from "react";
import PreloaderSpinner from "../../../ui/preloader/preloaderSpinner";
import Preloader from "../../../ui/preloader/preloader";
import ProductPreloader from "../../../ui/preloader/productPreloader";
import { useSelector } from "react-redux";
import Product from "../item/product";

export default function ProductContainerWithFetch({
  sectionId,

  title,
  type,

  isHasMore = true,
  isPremium,
  isLoading,
  limit,
  page,
  productSort = { date_published: "DESC" },
  products,
  productsCount,
  setProducts,

  navigation,

  containerStyle,
  itemStyle,
}) {
  const filterG = useSelector((state) => state.filterGlobalFields.value);
  const activeCity = useSelector((state) => state.userCity.value);

  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const currentPage = useRef(page);

  const getMorePost = async () => {
    setIsMoreLoading(true);

    currentPage.current = currentPage.current + 1;

    const filter = {
      window_host: "https://flate.pro",
      filter: {
        published: 1,
        ...filterG,
      },
      limit: limit,
      sort: {
        ...productSort,
      },
    };

    if (currentPage) {
      filter["page"] = currentPage.current;
    }

    if (activeCity) {
      filter["filter"]["city_link"] = activeCity.id;
    }

    if (sectionId) {
      filter["filter"]["section_relation"] = sectionId;
    }

    if (isPremium) {
      filter["filter"]["premium"] = "!false";
      filter["sort"] = { stat_views_preview: "ASC" };
    }

    if (Object.keys(filter.sort).length === 0) {
      filter["sort"] = { date_published: "DESC" };
    }

    const newProducts = await API.get.product.list(filter);

    // console.log(newProducts, filter);

    if (newProducts && Array.isArray(newProducts) && newProducts.length !== 0) {
      setProducts([...products, ...newProducts]);

      if (newProducts.length < limit) {
        setHasMore(false);
      }

      setIsMoreLoading(false);
      // scrollToEnd();
      return;
    }

    setHasMore(false);
    setIsMoreLoading(false);
    // scrollToEnd();
  };

  useEffect(() => {
    if (products?.length < limit) {
      setHasMore(false);
    }

    if (productsCount == 4 || productsCount < 4) {
      setHasMore(false);
    }
  }, [productsCount]);

  return (
    <>
      {!isLoading ? (
        <>
          {products?.length && products?.length > 0 ? (
            <View
              style={containerStyle ? containerStyle : tw`px-[15px] py-[20px]`}
            >
              {title && (
                <View style={tw`mb-2.5 border-b border-greyborder`}>
                  <H2>{title}</H2>
                </View>
              )}
              <View style={tw`flex flex-row flex-wrap justify-between`}>
                {products && (
                  <>
                    {products.map((product, index) => {
                      return (
                        <Product
                          type={type}
                          navigation={navigation}
                          product={product}
                          key={product.id + "h" + index}
                          wrapperStyle={itemStyle}
                        />
                      );
                    })}
                  </>
                )}
              </View>
              {isMoreLoading ? (
                <View style={tw`mt-[6px] h-[44px]`}>
                  <PreloaderSpinner />
                </View>
              ) : (
                <>
                  {isHasMore && hasMore && (
                    <View style={tw`mt-[6px] h-[44px]`}>
                      <Button onPress={getMorePost}>Показать еще</Button>
                    </View>
                  )}
                </>
              )}
            </View>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
