import api from "../../../../api/service/api";

import { useMemo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";

import Container from "../../../ui/common/container";
import Tabs from "../../../ui/tabs/tabs";
import ProductList from "./productList";
import RDropdownSort from "../../../ui/dropdown/spec/rDropdownSort";
import MapButton from "../../category/mapButton";
import useProductsCount from "../../../../hooks/products/useProductsCount";
import SortIcon from "../../../ui/icons/sortIcon";
import ProductListTitle from "./productListTitle";

const sectionsTabs = [
  {
    text: "Квартиры",
    id: "3",
  },
  {
    text: "Дома",
    id: "4",
  },
  {
    text: "Земля",
    id: "5",
  },
  {
    text: "Коммерция",
    id: "6",
  },
  {
    text: "Паркинги",
    id: "7",
  },
];

const productsLimit = 20;
const productsPage = 1;

const productsParams = {
  window_host: "https://flate.pro",
  filter: { published: 1 },
  limit: productsLimit,
  page: productsPage,
};

export default function ProductTabs({
  title,
  style = {},
  maxProducts,
  ...props
}) {
  const activeCity = useSelector((state) => state.userCity.value);

  const [isLoading, setIsLoading] = useState(false);
  const [sort, setSort] = useState({ date_published: "DESC" });
  const [products, setProducts] = useState([]);

  const [activeSectionId, setActiveSectionId] = useState("3");

  const productsCount = useProductsCount(
    useMemo(() => {
      return {
        published: 1,
        section_relation: activeSectionId,
        city_link: activeCity.id,
      };
    }, [activeSectionId, activeCity])
  );

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      setProducts([]);

      productsParams["sort"] = sort;
      productsParams["filter"]["section_relation"] = activeSectionId;
      productsParams["filter"]["city_link"] = activeCity.id;

      console.log(productsParams, "req 1");

      const response = await api.get.product.list(productsParams);

      if (response) {
        setProducts(response);
      } else {
        setProducts([]);
      }

      setIsLoading(false);
    }

    fetchData();
  }, [sort, activeSectionId, activeCity]);

  return (
    <View style={style}>
      <Container>
        <View style={styles.header}>
          <ProductListTitle
            title={title}
            count={productsCount?.products?.count}
          />

          <View style={styles.sort}>
            <MapButton
              fill="#ECF2F8"
              stroke="#ECF2F8"
              iconStroke="#6F7882"
              filter={{
                section_relation: activeSectionId,
              }}
            />
            <RDropdownSort
              sectionId={activeSectionId}
              rounded={true}
              leftWidth={15}
              left={<SortIcon order={Object.values(sort)[0]} />}
              onDonePress={(sort) => setSort(sort)}
            />
          </View>
        </View>
      </Container>
      <Tabs
        isLoading={false}
        getActiveTabId={setActiveSectionId}
        activeTabId={activeSectionId}
        tabs={sectionsTabs}
      />
      <ProductList
        key={activeSectionId}
        maxProducts={productsCount?.products?.count}
        products={products}
        setProducts={setProducts}
        isLoading={isLoading}
        title={null}
        limit={productsLimit}
        page={productsPage}
        filter={productsParams.filter}
        sort={sort}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  sort: {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
  },
});
