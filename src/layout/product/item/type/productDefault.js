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
import ToCollectionButton from "../settings/toCollectionButton";

export default function ProductDefault({
  propsStyle = {},
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

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={loadScreen}
      style={{ ...wrapperStyle, ...styles.wrapper }}
    >
      <View style={styles.container}>
        <ProductImage
          // loadingIndicatorSource={require('../../../../../assets/icon.png')}
          style={{
            ...styles.image,
            height: wrapperStyle.height / 1.7,
            width: wrapperStyle.width,
          }}
          source={image}
          contentFit="cover"
        />

        <View style={styles.favoriteBtn}>
          <ToCollectionButton variant="sm" productId={product.id} />
          {/* <RFavoriteButton product={product} /> */}
        </View>

        <View style={styles.body}>
          <View style={{ ...styles.props, ...propsStyle }}>
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
    // backgroundColor: colors["white"],
  },
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  image: {
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 120,
    overflow: "hidden",
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
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
  },
  propLine: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    width: "50%",
  },
  favoriteBtn: {
    width: 31,
    height: 31,
    margin: 10,
    position: "absolute",
    left: 0,
    top: 0,
  },
});
