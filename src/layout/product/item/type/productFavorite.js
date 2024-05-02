import { Image, StyleSheet, View, TouchableOpacity } from "react-native";

import RFavoriteButton from "../buttons/rFavoriteButton";

import Paragraph from "../../../../ui/text/paragraph";

import {
  getProductImageSrc,
  getProductPriceSquares,
  getProductPrice,
  getProductSection,
  getProductFloor,
  getProductSquares,
  getProductAddressNew,
} from "../../../../../helpers/product/getters";

import { colors } from "../../../../ui/config";
import ProductImage from "./productImage";

export default function ProductFavorite({
  variant = "favorite",
  wrapperStyle = {},
  product,
  loadScreen,
}) {
  const row = {
    ...styles.row,
    width: wrapperStyle.width - styles.props.padding * 2,
  };

  const address = getProductAddressNew(product);
  const image = getProductImageSrc(product);
  const price = getProductPrice(product);
  const section = getProductSection(product);
  const floor = getProductFloor(product);
  const squares = getProductSquares(product);
  const priceSquares = getProductPriceSquares(product);

  const isNotActive = product.published == 0;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={isNotActive ? null : loadScreen}
      style={{
        ...wrapperStyle,
        ...styles.wrapper,
        opacity: isNotActive ? 0.5 : 1,
        minHeight: variant !== "noFavorite" && 100,
      }}
    >
      <View style={styles.container}>
        <ProductImage style={styles.image} source={image} contentFit="cover" />
        {isNotActive && (
          <View style={styles.badge}>
            <Paragraph size="md" color="white">
              Снято
            </Paragraph>
          </View>
        )}
        <View style={styles.body}>
          <View style={styles.props}>
            <Paragraph color="black" size="lg" style={styles.price}>
              {price} ₽
            </Paragraph>

            <View style={row}>
              <View style={styles.propLine}>
                <View style={styles.prop}>
                  <Paragraph numberOfLines={1} size="sm" color="grey-dark">
                    Тип
                  </Paragraph>
                </View>
                <Paragraph numberOfLines={1} size="sm" color="black">
                  {section}
                </Paragraph>
              </View>
              <View style={styles.propLine}>
                <View style={styles.prop2}>
                  <Paragraph numberOfLines={1} size="sm" color="grey-dark">
                    Этаж
                  </Paragraph>
                </View>
                <Paragraph numberOfLines={1} size="sm" color="black">
                  {floor}
                </Paragraph>
              </View>
            </View>
            <View style={row}>
              <View style={styles.propLine}>
                <View style={styles.prop}>
                  <Paragraph numberOfLines={1} size="sm" color="grey-dark">
                    S=
                  </Paragraph>
                </View>
                <Paragraph numberOfLines={1} size="sm" color="black">
                  {squares} {section === "Земля" ? "сот." : "м²"}
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

            <Paragraph numberOfLines={1} color="grey-dark" size="md">
              {address}
            </Paragraph>
          </View>
          {variant === "favorite" && (
            <View style={styles.favoriteBtn}>
              <RFavoriteButton type="text" product={product} />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  prop: {
    width: 18,
  },
  prop2: {
    width: 25,
  },
  truncate: {
    width: 55,
  },
  wrapper: {
    borderRadius: 10,
    overflow: "hidden",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    width: "100%",
    height: "100%",
    position: "relative",
  },
  image: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "32%",
    height: "100%",
    borderRadius: 20,
  },
  props: {
    marginTop: 6,
    display: "flex",
    flexDirection: "column",
    padding: 0,
    paddingBottom: 3,
    gap: 2,
  },
  body: {
    flex: 1,
  },
  price: { fontFamily: "Manrope_700Bold" },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 4,
  },
  propLine: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    width: 80,
  },
  favoriteBtn: {},
  badge: {
    position: "absolute",
    right: 0,
    top: 0,
    borderRadius: 999,
    backgroundColor: colors["grey-medium"],
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});
