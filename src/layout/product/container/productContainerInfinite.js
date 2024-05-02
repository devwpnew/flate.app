import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { View } from "react-native";

import API from "../../../../api/service/api";
import tw from "../../../../lib/tailwind";

import H2 from "../../../ui/heading/h2";
import Product from "../item/product";

import PreloaderSpinner from "../../../ui/preloader/preloaderSpinner";
import Preloader from "../../../ui/preloader/preloader";
import ProductPreloader from "../../../ui/preloader/productPreloader";

export default function ProductContainerInfinite({
  rcId,
  sectionId,
  buildingId,
  userId,

  title,

  isPremium,
  isLoading,
  isEndOfThePage,
  limit,
  page,
  type,
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

    if (rcId) {
      filter["filter"]["rc_link"] = rcId;
    }

    if (buildingId) {
      filter["filter"]["building_link"] = buildingId;
    }

    if (userId) {
      filter["filter"]["user_id"] = userId;
    }

    if (sectionId && !userId && !buildingId && !rcId) {
      filter["filter"]["section_relation"] = sectionId;
    }

    if (isPremium) {
      filter["filter"]["premium"] = "!false";
      filter["sort"] = { stat_views_preview: "ASC" };
    }

    if (Object.keys(filter.sort).length === 0) {
      filter["sort"] = { date_published: "DESC" };
    }

    // console.log(filter, "asdasd");

    const newProducts = await API.get.product.list(filter);
    // // console.log(newProducts);
    // // console.log(filter);

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

  // const [isInViewport, setIsInViewport] = useState(false);
  // const endContainerRef = useRef();
  // const windowHeight = Dimensions.get("window").height;

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (endContainerRef.current) {
  //       endContainerRef.current.measure((x, y, width, height, pageX, pageY) => {
  //         const top = pageY;
  //         const bottom = pageY + height;
  //         const isInView = top < windowHeight && bottom > 0;
  //         setIsInViewport(isInView);
  //       });
  //     }
  //   };

  //   handleScroll();

  //   const eventListener = setInterval(handleScroll, 500);

  //   return () => clearInterval(eventListener);
  // }, []);

  useEffect(() => {
    if (!isEndOfThePage) return;

    getMorePost();
  }, [isEndOfThePage]);

  useEffect(() => {
    if (products?.length === 4) {
      setHasMore(false);
    }

    if (productsCount === 4 || productsCount < 4) {
      setHasMore(false);
    }
  }, [productsCount]);

  return (
    <>
      <View style={containerStyle ? containerStyle : tw`px-[15px] py-[20px]`}>
        {!isLoading ? (
          <>
            {products?.length && products?.length > 0 ? (
              <>
                <View style={tw`mb-2.5 border-b border-greyborder`}>
                  <H2>{title}</H2>
                </View>
                <View style={tw`flex flex-row flex-wrap justify-between`}>
                  {products &&
                    products.map((product, index) => {
                      return (
                        <Product
                          navigation={navigation}
                          product={product}
                          key={product.id + "h" + index}
                          type={type}
                          wrapperStyle={itemStyle}
                        />
                      );
                    })}
                </View>

                {hasMore || isMoreLoading ? (
                  <View style={tw`mt-[6px] h-[44px]`}>
                    <PreloaderSpinner />
                  </View>
                ) : (
                  ""
                )}
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <View style={tw`mb-2.5 border-b border-greyborder`}>
              <Preloader style={tw`h-[34px] mb-2`} />
            </View>
            <View style={tw`flex flex-row flex-wrap justify-between`}>
              <ProductPreloader
                amount={limit}
                style={{ ...itemStyle, height: 200 }}
              />
            </View>
          </>
        )}
      </View>
    </>
  );
}
