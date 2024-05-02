import api from "../../../api/service/api";

import { useEffect, useState, useMemo } from "react";
import { Dimensions, View } from "react-native";

import useProductsCount from "../../../hooks/products/useProductsCount";
import getProductSection from "../../../helpers/formatters/product/getProductSection";

import ProductList from "../product/list/productList";
import { colors } from "../../ui/config";

const page = 1;
const limit = 6;

const getFilter = (product) => {
  const section = getProductSection(product);

  const filter = {
    published: "1",
    id: `!=${product.id}`,
  };

  if (product?.rc_link) {
    filter["rc_link"] = product.rc_link.id;
  } else if (product?.building_link) {
    filter["building_link"] = product.building_link.id;
  } else {
    filter["section_relation"] = section.id;
  }

  return filter;
};

export default function RPostRelated({
  style,
  product,
  isEndOfThePage = false,
}) {
  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [productsRelatedCount, setProductsRelatedCount] = useState(0);
  const [products, setProducts] = useState([]);

  const filter = getFilter(product);

  useEffect(() => {
    async function fetchData() {
      setIsProductsLoading(true);

      const countResult = await api.get.product.count(filter);

      const result = await api.get.product.list({
        window_host: "https://flate.pro",
        filter: filter,
        limit: limit,
        page: page,
        sort: { date_published: "DESC" },
      });

      setProductsRelatedCount(countResult?.count);
      setProducts(result);

      setIsProductsLoading(false);
    }

    fetchData();
  }, [product]);

  return (
    <>
      {products && productsRelatedCount > 0 ? (
        <View style={{ backgroundColor: colors["grey-light"], ...style }}>
          <ProductList
            title={
              filter.rc_link || filter.building_link
                ? "Ещё в этом доме"
                : "Другие предложения"
            }
            filter={filter}
            limit={limit}
            page={page}
            sort={{ date_published: "DESC" }}
            maxProducts={parseInt(productsRelatedCount)}
            products={products}
            setProducts={setProducts}
            isLoading={isProductsLoading}
            isPremium={false}
            isButton={false}
            isFetch={isEndOfThePage}
            productStyle={{
              width: Dimensions.get("window").width / 2 - 15,
              height: Math.floor(
                (Dimensions.get("window").width / 2 - 25) * 1.3
              ),
            }}
          />
        </View>
      ) : (
        <View style={style}></View>
      )}
    </>
  );
}
