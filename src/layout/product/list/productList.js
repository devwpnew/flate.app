import API from "../../../../api/service/api";

import { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import Loader from "../../../ui/preloader/loader";
import Btn from "../../../ui/button/btn";
import Product from "../item/product";

import RProductPreloader from "../../../ui/preloader/rProductPreloader";
import ProductListTitle from "./productListTitle";
import RDropdownSort from "../../../ui/dropdown/spec/rDropdownSort";

import SortIcon from "../../../ui/icons/sortIcon";
import NoProduct from "../fallback/noProduct";

import ProductListWrapper from "../part/productListWrapper";
import FilterButton from "../../category/filterButton";
import RPostUser from "../../page/rPostUser";
import ProductAnalytics from "../analytics/productAnalytics";
import MapButton from "../../category/mapButton";

const { width } = Dimensions.get("window");

function getUniqProducts(products) {
  const uniqProducts = [];
  const tmbProductsObj = {};

  for (let i = 0; i < products.length; i++) {
    tmbProductsObj[products[i].id] = products[i];
  }

  for (const [key, value] of Object.entries(tmbProductsObj)) {
    uniqProducts.push(value);
  }

  return uniqProducts;
}

function getProductLoaderHeight(productStyle, productType) {
  if (productStyle?.height) return productStyle.height;
  if (productType === "premium") return 220;
  if (!productType) return 190;
}

const getProductListTitleStyle = (isSort, isFilter) => {
  let containerWidth = width - 40;

  if (isSort) {
    containerWidth = containerWidth - 50;
  }

  if (isFilter) {
    containerWidth = containerWidth - 50;
  }

  return { width: containerWidth };
};

export default function ProductList({
  title = "",
  user = null,
  titleSize = "sm",
  productType,
  productStyle = {},
  productPropsStyle = {},
  style = {},
  styleWrapper = {},
  styleContainer = {},
  products = [],
  maxProducts,
  setProducts,
  setSort,

  isMap = false,
  isFilter = false,
  isSort = false,
  isFetch = true,
  isPremium = false,
  isLoading = false,
  isShowCount = true,
  isButton = false,
  isAnalytics = false,
  
  page = 1,
  limit = 20,
  filter = {},
  sort = { date_published: "DESC" },
}) {
  const isSearchOnlyByRc = filter?.rc_link;

  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const currentPage = useRef(page);

  const getMorePost = async () => {
    setIsMoreLoading(true);

    currentPage.current = currentPage.current + 1;

    const reqProps = {
      window_host: "https://flate.pro",
      filter: {
        ...filter,
      },
      limit: limit,
      sort: {
        ...sort,
      },
    };

    if (currentPage) {
      reqProps["page"] = currentPage.current;
    }

    console.log(reqProps, "req next");

    const newProducts = await API.get.product.list(reqProps);

    if (newProducts && Array.isArray(newProducts) && newProducts.length !== 0) {
      // const uniqProducts = getUniqProducts([...products, ...newProducts]);
      const resultProducts = [...products, ...newProducts];

      setProducts(resultProducts);

      if (newProducts.length < limit) {
        setHasMore(false);
      }
      setIsMoreLoading(false);
      return;
    }
    setHasMore(false);
    setIsMoreLoading(false);
  };

  const onSortChange = (sort) => {
    setSort(sort);
    currentPage.current = 1;
  };

  useEffect(() => {
    currentPage.current = page;
  }, [page]);

  useEffect(() => {
    if (
      products?.length === 4 ||
      maxProducts === 4 ||
      maxProducts < 4 ||
      maxProducts == 0 ||
      maxProducts < limit
    ) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [maxProducts, products]);

  useEffect(() => {
    if (!isFetch || isButton || !hasMore) return;
    getMorePost();
  }, [isFetch, isButton, hasMore]);
  return (
    <View style={style}>
      <ProductListWrapper
        style={{ ...styles.wrapper, ...styleWrapper }}
        isPremium={isPremium}
      >
        <View style={isSort ? styles.header : {}}>
          <ProductListTitle
            style={
              isSort ? getProductListTitleStyle(isSort, isFilter) : styles.title
            }
            title={title}
            size={titleSize}
            count={maxProducts}
            isShowCount={isShowCount}
            isPremium={isPremium}
            isReverse={isSearchOnlyByRc}
          />

          {isMap && (
            <View style={{ marginLeft: "auto" }}>
              <View style={{ marginLeft: 10 }}>
                <MapButton
                  fill="#ECF2F8"
                  stroke="#ECF2F8"
                  iconStroke="#6F7882"
                  filter={filter}
                />
              </View>
            </View>
          )}

          {isSort && (
            <View style={isMap ? { marginLeft: 10 } : styles.sort}>
              <RDropdownSort
                rounded={true}
                leftWidth={15}
                left={<SortIcon order={Object.values(sort)[0]} />}
                onDonePress={onSortChange}
              />
            </View>
          )}

          {isFilter && (
            <FilterButton style={{ marginLeft: 10 }} isFilled={true} />
          )}
        </View>

        {isAnalytics && <ProductAnalytics by="rcs" filter={filter} />}

        {user && (
          <View style={{ marginTop: 10 }}>
            <View style={styles.container}>
              <RPostUser user={user} isButtons={true} />
            </View>
          </View>
        )}

        {maxProducts == 0 && (
          <View style={styles.container}>
            <NoProduct isPremium={isPremium} style={{ marginBottom: 20 }} />
          </View>
        )}

        {isLoading ? (
          <>
            <View style={{ ...styles.container, ...styleContainer }}>
              <RProductPreloader
                amount={limit}
                style={{
                  ...productStyle,
                  height: getProductLoaderHeight(productStyle, productType),
                  borderRadius: 10,
                }}
              />
            </View>
          </>
        ) : (
          <>
            {products?.length && products?.length > 0 ? (
              <>
                <View style={{ ...styles.container, ...styleContainer }}>
                  {products.map((product, index) => {
                    return (
                      <View key={product.id} style={{ position: "relative" }}>
                        <Product
                          wrapperStyle={productStyle}
                          propsStyle={productPropsStyle}
                          type={productType}
                          product={product}
                        />
                      </View>
                    );
                  })}
                </View>

                {(!isButton && hasMore) || (!isButton && isMoreLoading) ? (
                  <Loader size="lg" />
                ) : (
                  ""
                )}
              </>
            ) : (
              <></>
            )}
          </>
        )}

        {isButton && isMoreLoading ? (
          <Loader size="lg" />
        ) : (
          <>
            {!isButton ||
            maxProducts == products?.length ||
            (maxProducts == 0 && !isLoading) ? (
              <></>
            ) : (
              <Btn
                color="transparent"
                style={styles.button}
                onPress={getMorePost}
              >
                Показать еще
              </Btn>
            )}
          </>
        )}
      </ProductListWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 20,
    paddingBottom: 4,
    // borderRadius: 20,
    borderTopEndRadius: 40,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  button: { marginHorizontal: 20, marginBottom: 10 },
  title: {
    flex: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  sort: {
    width: 40,
    marginLeft: "auto",
  },
  header: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
