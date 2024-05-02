import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

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
import ProductImage from "./productImage";
import ToCollectionButton from "../settings/toCollectionButton";

export default function ProductPremium({
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
      <ProductImage source={image} contentFit="cover" style={styles.container}>
        <LinearGradient
          style={styles.gradient}
          colors={["rgba(26, 31, 37, 0.00)", "rgba(26, 31, 37, 0.90)"]}
          locations={[0.4271, 0.6927]}
        >
          <View style={styles.favoriteBtn}>
            <ToCollectionButton variant="sm" productId={product.id} />
            {/* <RFavoriteButton product={product} /> */}
          </View>

          <View style={styles.props}>
            <Paragraph color="white" size="lg" style={styles.price}>
              {price} ₽
            </Paragraph>

            <View style={row}>
              <View style={styles.propLine}>
                <View style={styles.prop}>
                  <Paragraph numberOfLines={1} size="sm" color="grey-product">
                    Тип
                  </Paragraph>
                </View>
                <View style={styles.truncate}>
                  <Paragraph numberOfLines={1} size="sm" color="white">
                    {section}
                  </Paragraph>
                </View>
              </View>
              <View style={styles.propLine}>
                <View style={styles.prop2}>
                  <Paragraph numberOfLines={1} size="sm" color="grey-product">
                    Этаж
                  </Paragraph>
                </View>
                <Paragraph numberOfLines={1} size="sm" color="white">
                  {floor}
                </Paragraph>
              </View>
            </View>
            <View style={row}>
              <View style={styles.propLine}>
                <View style={styles.prop}>
                  <Paragraph numberOfLines={1} size="sm" color="grey-product">
                    S=
                  </Paragraph>
                </View>

                <Paragraph numberOfLines={1} size="sm" color="white">
                  {squares} {section === "Земля" ? "сот" : "м²"}
                </Paragraph>
              </View>
              <View style={styles.propLine}>
                <View style={styles.prop2}>
                  <Paragraph numberOfLines={1} size="sm" color="grey-product">
                    ₽/{section === "Земля" ? "сот" : "м²"}
                  </Paragraph>
                </View>
                <View style={styles.truncate}>
                  <Paragraph numberOfLines={1} size="sm" color="white">
                    {priceSquares}
                  </Paragraph>
                </View>
              </View>
            </View>

            <Paragraph numberOfLines={1} color="white" size="md">
              {address}
            </Paragraph>
          </View>
        </LinearGradient>
      </ProductImage>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  prop: {
    width: 18,
  },
  prop2: {
    width: 29,
  },
  truncate: {
    width: 55,
  },
  wrapper: {
    borderRadius: 10,
    overflow: "hidden",
  },
  container: {
    width: "100%",
    height: "100%",
  },
  props: {
    marginTop: "auto",
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  gradient: {
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
  },
});
