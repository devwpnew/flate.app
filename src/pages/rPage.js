import api from "../../api/service/api";

import { useRef, useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import Main from "../layout/main/main";
import Footer from "../layout/main/footer";
import RPostDescription from "../layout/page/rPostDescription";
import RPostGallery from "../layout/page/rPostGallery";

import RMessageButton from "../layout/page/buttons/rMessageButton";

import getProductAddress from "../../helpers/formatters/product/getProductAddress";
import getProductPrice from "../../helpers/formatters/product/getProductPrice";
import getProductPriceSquares from "../../helpers/formatters/product/getProductPriceSquares";
import getProductPhone from "../../helpers/formatters/product/getProductPhone";

import RPostInfo from "../layout/page/rPostInfo";
import Container from "../ui/common/container";
import Title from "../ui/heading/title";
import Paragraph from "../ui/text/paragraph";

import ViewsIcon from "../ui/icons/viewsIcon";
import {
  getProductAddressNew,
  getProductDate,
  getProductGallery,
  getProductSection,
} from "../../helpers/product/getters";
import RPostProperties from "../layout/page/RPostProperties";
import RPostUser from "../layout/page/rPostUser";
import RCallButton from "../layout/page/buttons/rCallButton";
import WsIcon from "../ui/icons/wsIcon";
import RReportButton from "../layout/page/buttons/rReportButton";
import RPostRelated from "../layout/page/rPostRelated";
import Wrapper from "../layout/main/wrapper";

import { colors } from "../ui/config";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RMapScreenByAddress from "../layout/map/rMapScreenByAddress";
import RModal from "../ui/modal/rModal";
import ToCollectionButton from "../layout/product/item/settings/toCollectionButton";
import { PMap } from "../layout/product/item/icons/icons";
import MapButton from "../layout/category/mapButton";

export default function RPage({ navigation, route }) {
  const [isShowMap, setIsShowMap] = useState(false);

  const isFocused = useIsFocused();

  const [product, setProduct] = useState(route.params.product);

  useEffect(() => {
    setProduct(route.params.product);
  }, [route.params.product]);

  useEffect(() => {
    // Логика, выполняемая при каждом изменении навигации

    if (isFocused) {
      scrollToTop();
      // Дополнительные действия при фокусе на экране
    } else {
      // Дополнительные действия при потере фокуса с экрана
    }

    return () => {
      // Логика, выполняемая при размонтировании компонента
    };
  }, [route, isFocused]);

  const scrollViewRef = useRef();
  const scrollToTop = () => {
    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
  };

  useEffect(() => {
    (async () => {
      if (product) {
        await api.set.productViewed(product.id);
      }
    })();
  }, [product.id]);

  const arGallery = getProductGallery(product);

  const arInfo = [
    { text: getProductDate(product), icon: "" },
    { text: `№${product.id}`, icon: "" },
    { text: product?.stat_views, icon: product?.stat_views && <ViewsIcon /> },
  ];

  const priceSquares = getProductPriceSquares(product);
  const section = getProductSection(product);
  const price = getProductPrice(product);
  const address = getProductAddress(product);
  const addressSm = getProductAddressNew(product);

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

  console.log(product.map_coordinates, 'product.map_coordinates');

  return (
    <Main>
      <GestureHandlerRootView>
        <ScrollView
          keyboardDismissMode={"none"}
          keyboardShouldPersistTaps={"always"}
          showsVerticalScrollIndicator={false}
          ref={scrollViewRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <Wrapper style={{ paddingBottom: 0 }}>
            {/* GALLERY */}
            <View style={{ marginBottom: 10 }}>
              <RPostGallery galleryImages={arGallery} />
            </View>
            {/* BUTTONS */}
            <Container>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <MapButton
                  style={{
                    backgroundColor: colors["white"],
                    borderColor: colors["black-10"],
                    borderWidth: 1,
                    // borderRadius: "100%",
                    borderRadius: 999,
                    paddingTop: 6,
                    paddingBottom: 6,
                    width: "100%",
                    flex: 1,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 5,
                  }}
                  renderIcon={() => (
                    <>
                      <PMap />
                      <Paragraph color="black-50" size="md">
                        {isShowMap ? " Скрыть карту" : " На карте"}
                      </Paragraph>
                    </>
                  )}
                  filter={{ id: product.id }}
                />

                <ToCollectionButton
                  wrapperStyle={{
                    width: "100%",
                    flex: 1,
                  }}
                  variant="button"
                  productId={product.id}
                  color="blue"
                  size="md"
                />
              </View>
            </Container>
            {/* HEADING */}
            <Container>
              <View
                style={{
                  marginVertical: 14,
                  paddingBottom: 14,
                  borderBottomWidth: 1,
                  borderColor: colors["grey-light"],
                }}
              >
                <Title
                  style={{
                    marginBottom: 6,
                  }}
                  numberOfLines={1}
                  size="sm"
                >
                  {addressSm}
                </Title>

                <Paragraph
                  style={{ fontFamily: "Manrope_500Medium" }}
                  size="md"
                >
                  {address}
                </Paragraph>
              </View>
            </Container>
            {/* PRICE */}
            <Container>
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingBottom: 14,
                  marginBottom: 14,
                  borderBottomWidth: 1,
                  borderColor: colors["grey-light"],
                }}
              >
                <Title style={{ fontSize: 26 }}>{price} руб.</Title>

                <Paragraph
                  style={{
                    fontFamily: "Manrope_400Regular",
                  }}
                  color="grey-dark"
                  size="lg"
                >
                  {priceSquares}
                  {`₽/${section === "Земля" ? "сот" : "м²"}`}
                </Paragraph>
              </View>
            </Container>
            {/* PROPS */}
            <Container>
              <RPostProperties product={product} />
            </Container>
            {/* USER */}
            <Container>
              <RPostUser navigation={navigation} user={product.user_id} />
            </Container>
            {/* CONTACTS */}
            <Container>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 10,
                  }}
                >
                  <RCallButton
                    style={{ flex: 1, borderRadius: 10 }}
                    color="transparent"
                    phone={getProductPhone(product)}
                  />
                  <RMessageButton
                    style={{ flex: 1, borderRadius: 10 }}
                    icon={<WsIcon />}
                    color="green"
                    product={product}
                  />
                </View>
              </View>
            </Container>
            {/* DESCR */}
            <Container>
              <View
                style={{
                  padding: 20,
                  marginVertical: 30,
                  backgroundColor: colors["grey-light"],
                  borderRadius: 10,
                }}
              >
                <RPostDescription description={product.product_description} />
              </View>
            </Container>
            {/* OTHER */}
            <Container>
              <RReportButton
                productId={product.id}
                style={{ marginBottom: 14 }}
                innerStyle={{
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
                pProps={{
                  size: "sm",
                }}
                color="red-light"
              />
              <RPostInfo items={arInfo} />
            </Container>
            {/* RELATED */}
            <RPostRelated
              style={{ paddingBottom: 80, marginTop: 40 }}
              product={product}
              isEndOfThePage={isEndOfThePage}
            />
          </Wrapper>
        </ScrollView>
      </GestureHandlerRootView>

      <RModal
        closeOnlyByButton={true}
        contentStyle={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          width: "95%",
          padding: 20,
          borderRadius: 20,
          backgroundColor: "#FFF",
          shadowColor: "#1A1F25",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.25,
          shadowRadius: 10,
          elevation: 5,
        }}
        transparent={false}
        modalVisible={isShowMap}
        setModalVisible={setIsShowMap}
      >
        <Title numberOfLines={1}>На карте</Title>
        <Paragraph style={{ marginTop: 10 }} size="sm">
          {product.properties.product_address}
        </Paragraph>
        <RMapScreenByAddress
          style={{ marginTop: 20, height: "80%", width: "100%" }}
          markTitle={product.name}
          address={product.properties.product_address}
        />
      </RModal>

      <Footer navigation={navigation} />
    </Main>
  );
}
