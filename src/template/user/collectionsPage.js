import api from "../../../api/service/api";

import { useEffect, useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {
  Alert,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

import Main from "../../layout/main/main";
import Footer from "../../layout/main/footer";
import Container from "../../ui/common/container";
import Wrapper from "../../layout/main/wrapper";
import Paragraph from "../../ui/text/paragraph";
import Product from "../../layout/product/item/product";
import RProductPreloader from "../../ui/preloader/rProductPreloader";

import { colors } from "../../ui/config";
import { DragSortableView } from "react-native-drag-sort";
import { PEdit } from "../../layout/product/item/icons/icons";
import ModalEditTitleCollections from "../../ui/modal/spec/modalEditTitleCollections";
import {
  getProductAddressNew,
  getProductPublished,
} from "../../../helpers/product/getters";
import ProductCollections from "../../layout/product/item/productCollections";

export default function CollectionsPage({ navigation }) {
  const user = useSelector((state) => state.userLogin.value);
  // const favorites = useSelector((state) => state.userFavorites.value);

  const route = useRoute();
  const scrollViewRef = useRef(null);

  const [isShowEditTitleModal, setIsShowEditTitleModal] = useState(false);

  const [title, setTitle] = useState(route?.params?.name);

  const collectionId = route?.params?.collectionId;

  // PRODUCTS
  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [collectionProductsData, setCollectionProductsData] = useState([]);
  const [products, setProducts] = useState([]);

  const productStyle = {
    width: Dimensions.get("screen").width - 20,
    height: 100,
  };

  useEffect(() => {
    async function fetchData() {
      setIsProductsLoading(true);

      const collectionProducts = await api.selections.product.list({
        filter: {
          selection: collectionId,
        },
      });

      if (collectionProducts && collectionProducts?.length > 0) {
        setProducts(collectionProducts);

        const favoritesListCollections = collectionProducts.map(
          (product, index) => ({
            sort: product?.sort ? product.sort : index,
            type: "collections",
            wrapperStyle: productStyle,
            ...product,
          })
        );

        setCollectionProductsData(favoritesListCollections);
      } else {
        setProducts([]);
      }

      setIsProductsLoading(false);
    }
    fetchData();
  }, []);

  // /PRODUCTS

  // DRAGGABLE
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const handleDragStart = (startIndex, endIndex) => {
    setScrollEnabled(false);

    // if (onDragStart) {
    //   onDragStart({ startIndex, endIndex });
    // }
  };

  const handleDragEnd = (startIndex) => {
    setScrollEnabled(true);
    // if (onDragEnd) {
    //   onDragEnd(startIndex);
    // }
  };

  const handleDataChange = async (newData) => {
    try {
      if (newData.length !== collectionProductsData.length) {
        setCollectionProductsData(newData);
      }

      const sorted = newData.map((product) => product.id);
      sorted.reverse();

      const sortedRes = await api.selections.product.sort({
        selectionProducts: sorted,
      });

      if (sortedRes) {
        console.log(sortedRes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // /DRAGGABLE

  const onSaveTitleForm = (params) => {
    setTitle(params.name);
  };

  const loadProduct = async (id) => {
    try {
      if (!id) return;

      const product = await api.get.product.byID(id);
      const address = getProductAddressNew(product);
      const published = getProductPublished(product);

      if (published === "active" && product && address) {
        navigation.push("Page", { name: address, product: product });
        return;
      }

      onMessage("Ошибка", "Объект не найден или его сняли с публикации");
    } catch (error) {
      console.log(error);
      onMessage("Ошибка", "Объявление удалено владельцем");
    }
  };

  const onMessage = (title, msg) => {
    Alert.alert(title, msg, [
      {
        text: "OK",
      },
    ]);
  };

  const onCollectionProductDelete = ({ id, response }) => {
    if (response) {
      setCollectionProductsData((curProducts) => {
        return curProducts.filter((p) => p.id !== id);
      });
    }
  };

  return (
    <Main>
      <Wrapper>
        <Container>
          <TouchableOpacity
            onPress={() => setIsShowEditTitleModal((pr) => !pr)}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 10,
              padding: 20,
              marginBottom: 20,
              backgroundColor: colors["grey-light"],
            }}
          >
            <Paragraph
              style={{ marginRight: 20, flex: 1 }}
              numberOfLines={1}
              size="xl"
            >
              {title}
            </Paragraph>

            <PEdit />
          </TouchableOpacity>

          <ScrollView
            style={{
              height: "100%",
            }}
            scrollEnabled={scrollEnabled}
            showsVerticalScrollIndicator={false}
            ref={scrollViewRef}
          >
            {isProductsLoading && products.length == 0 && (
              <RProductPreloader
                amount={5}
                style={{ ...productStyle, borderRadius: 20, marginTop: 20 }}
              />
            )}

            {!isProductsLoading && products.length > 0 ? (
              <>
                <DragSortableView
                  dataSource={collectionProductsData}
                  parentWidth={productStyle.width}
                  childrenWidth={productStyle.width}
                  childrenHeight={productStyle.height + 20}
                  scaleStatus={"scaleY"}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onDataChange={handleDataChange}
                  keyExtractor={(item) => item.id}
                  onClickItem={(data, item, index) => {
                    if (item?.product_id) {
                      loadProduct(item.product_id);
                    }
                  }}
                  renderItem={(product) => {
                    return (
                      <View
                        style={{
                          marginTop: 10,
                          overflow: "hidden",
                        }}
                      >
                        <ProductCollections
                          onDelete={onCollectionProductDelete}
                          wrapperStyle={productStyle}
                          product={product}
                        />
                      </View>
                    );
                  }}
                />
              </>
            ) : (
              <></>
              // <Paragraph>Товары отсутствуют</Paragraph>
            )}
            <View style={{ height: 120 }}></View>
          </ScrollView>
        </Container>
      </Wrapper>

      <ModalEditTitleCollections
        collectionId={collectionId}
        title={title}
        modalVisible={isShowEditTitleModal}
        setModalVisible={setIsShowEditTitleModal}
        onSaveForm={onSaveTitleForm}
      />
      <Footer scrollViewRef={scrollViewRef} navigation={navigation} />
    </Main>
  );
}
