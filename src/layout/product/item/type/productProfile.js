import { useNavigation } from "@react-navigation/native";

import { Image, StyleSheet, View, TouchableOpacity } from "react-native";

import Paragraph from "../../../../ui/text/paragraph";

import {
  getProductImageSrc,
  getProductPriceSquares,
  getProductPrice,
  getProductSection,
  getProductFloor,
  getProductSquares,
  getProductAddressNew,
  getProductPublished,
} from "../../../../../helpers/product/getters";

import Gradient from "../../../../ui/common/gradient";

import ExpiryCount from "../settings/expiryCount";
import EditProduct from "../settings/editProduct";

import { PFav, PPremium, PView } from "../icons/icons";
import { colors } from "../../../../ui/config";

import useProductStats from "../../../../../hooks/products/useProductStats";
import { useState } from "react";
import ProductImage from "./productImage";
import ToCollectionButton from "../settings/toCollectionButton";

export default function ProductProfile({
  wrapperStyle = {},
  product,
  onEditFinish,
}) {
  const [modalEditVisible, setModalEditVisible] = useState(false);

  const navigation = useNavigation();

  const address = getProductAddressNew(product);
  const image = getProductImageSrc(product);
  const price = getProductPrice(product);
  const section = getProductSection(product);
  const floor = getProductFloor(product);
  const squares = getProductSquares(product);
  const priceSquares = getProductPriceSquares(product);
  const views = product?.stat_views ? product.stat_views : 0;
  const stats = useProductStats(product.id);
  const premium = product.premium != 0;
  const published = getProductPublished(product);

  const loadPage = () => {
    navigation.push("Page", { name: address, product: product });
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPress={
          published === "active" ? loadPage : () => setModalEditVisible(true)
        }
        style={{ ...wrapperStyle, ...styles.wrapper }}
      >
        <View style={styles.container}>
          <View style={{ position: "relative" }}>
            <ProductImage
              style={{
                ...styles.image,
                borderRadius: 10,
                height: wrapperStyle.height / 1.4,
              }}
              source={image}
              contentFit="cover"
            />

            {published === "moderated" && (
              <Gradient style={styles.badge}>
                <Paragraph size="md" color="white">
                  Модерация
                </Paragraph>
              </Gradient>
            )}
          </View>

          {!premium ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("Payment")}
              style={styles.premiumIcon}
            >
              <PPremium />
            </TouchableOpacity>
          ) : (
            <Gradient style={styles.premiumIcon}>
              <PPremium />
            </Gradient>
          )}
          {published === "active" && (
            <ToCollectionButton
              wrapperStyle={styles.toCollection}
              productId={product.id}
            />
          )}

          <EditProduct
            color="black"
            modalVisible={modalEditVisible}
            setModalVisible={setModalEditVisible}
            style={styles.editIcon}
            published={published}
            cb={onEditFinish}
            productId={product.id}
          />

          <View style={styles.body}>
            <View style={styles.price}>
              <Paragraph color="black" size="lg" style={styles.price}>
                {price} ₽
              </Paragraph>

              {published == "active" && (
                <ExpiryCount isLoading={stats.isLoading} count={stats.expiry} />
              )}
            </View>

            <View style={styles.props}>
              <View style={{ ...styles.propLine, marginRight: 6 }}>
                <View style={styles.prop}>
                  <Paragraph numberOfLines={1} size="sm" color="grey-dark">
                    Тип
                  </Paragraph>
                </View>
                <Paragraph numberOfLines={1} size="sm" color="black">
                  {section}
                </Paragraph>
              </View>
              <View style={{ ...styles.propLine, width: "16%" }}>
                <View style={styles.prop}>
                  <Paragraph numberOfLines={1} size="sm" color="grey-dark">
                    S=
                  </Paragraph>
                </View>
                <Paragraph numberOfLines={1} size="sm" color="black">
                  {squares} {section === "Земля" ? "сот." : "м²"}
                </Paragraph>
              </View>
              <View style={{ ...styles.propLine, width: "15%" }}>
                <View style={styles.prop2}>
                  <Paragraph numberOfLines={1} size="sm" color="grey-dark">
                    Этаж
                  </Paragraph>
                </View>
                <Paragraph numberOfLines={1} size="sm" color="black">
                  {floor}
                </Paragraph>
              </View>
              <View style={styles.propLine}>
                <View style={styles.prop2}>
                  <Paragraph numberOfLines={1} size="sm" color="grey-dark">
                    ₽/{section === "Земля" ? "сот." : "м²"}
                  </Paragraph>
                </View>
                <View style={styles.truncate}>
                  <Paragraph numberOfLines={1} size="sm" color="black">
                    {priceSquares}
                  </Paragraph>
                </View>
              </View>
            </View>

            <View style={styles.footer}>
              <Paragraph
                style={{ width: "80%" }}
                numberOfLines={1}
                color="grey-dark"
                size="md"
              >
                {address}
              </Paragraph>
              <View style={styles.stats}>
                <View style={styles.propLine}>
                  <View style={styles.prop}>
                    <PView />
                  </View>
                  <Paragraph numberOfLines={1} size="sm" color="grey-medium">
                    {views}
                  </Paragraph>
                </View>
                {/* <View style={styles.propLine}>
                  <View style={styles.prop}>
                    <PFav />
                  </View>
                  {!stats.isLoading && (
                    <Paragraph numberOfLines={1} size="sm" color="grey-medium">
                      {stats.inFavorite}
                    </Paragraph>
                  )}
                </View> */}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  prop: {},
  prop2: {},
  truncate: {},
  wrapper: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: colors["white"],
    minHeight: 250,
  },
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  image: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 180,
  },
  props: {
    marginTop: 6,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    jusjustifyContent: "space-between",
    padding: 0,
    paddingBottom: 3,
    gap: 2,
    width: "100%",
  },
  body: {
    flex: 1,
    marginTop: 6,
  },
  price: { fontFamily: "Manrope_700Bold" },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: "red",
    width: "100%",
  },
  propLine: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    jusjustifyContent: "center",
    gap: 4,
  },
  price: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stats: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
  },
  premiumIcon: {
    position: "absolute",
    left: 0,
    top: 0,
    padding: 11,
    margin: 10,
    borderRadius: 999,
    backgroundColor: colors["grey-medium"],
    zIndex: 10,
  },
  toCollection: {
    position: "absolute",
    right: 48,
    top: 0,
    padding: 11,
    margin: 10,
    borderRadius: 999,
    backgroundColor: colors["white"],
    zIndex: 10,
  },
  editIcon: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 11,
    margin: 10,
    borderRadius: 999,
    backgroundColor: colors["white"],
    zIndex: 10,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  badge: {
    position: "absolute",
    right: 0,
    bottom: 0,
    borderRadius: 999,
    backgroundColor: colors["grey-medium"],
    paddingHorizontal: 10,
    paddingVertical: 4,
    margin: 10,
  },
});
