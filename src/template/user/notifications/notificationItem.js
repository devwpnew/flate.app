import api from "../../../../api/service/api";

import { useEffect, useState } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Paragraph from "../../../ui/text/paragraph";

import { Arrow } from "../../../layout/profile/icons/icons";

import Btn from "../../../ui/button/btn";
import ProductFavorite from "../../../layout/product/item/type/productFavorite";
import RProductPreloader from "../../../ui/preloader/rProductPreloader";

import { colors } from "../../../ui/config";
import { dateOptions } from "../../../../helpers/product/getters";
import { PPremium } from "../../../layout/product/item/icons/icons";

export default function NotificationItem({
  style,
  title,
  text,
  date,
  productId,
  isSeen,
  ...props
}) {
  const navigation = useNavigation();

  const [isOpen, setIsOpen] = useState(false);

  const pStyle = {
    width: Dimensions.get("window").width - 95,
    height: Math.floor(Dimensions.get("window").width / 5),
  };

  const [product, setProduct] = useState(null);
  const [isProductsLoading, setIsProductsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsProductsLoading(true);

      const res = await api.get.product.list({
        window_host: "https://flate.pro",
        filter: { id: productId.id },
      });

      if (res && res[0]) {
        setProduct(res[0]);
      }

      setIsProductsLoading(false);
    }
    fetchData();
  }, [productId]);

  const notProductNotText = !text && !productId;

  return (
    <>
      <TouchableOpacity
        style={{
          position: "relative",
          paddingVertical: 20,
          paddingLeft: 20,
          paddingRight: 36,
          borderRadius: 20,
          backgroundColor: colors["grey-light"],
          opacity: isSeen ? 0.4 : 1,
          ...style,
        }}
        onPress={() => setIsOpen((pr) => !pr)}
        {...props}
      >
        <Paragraph numberOfLines={2} size="lg" style={{ marginBottom: 10 }}>
          {title}
        </Paragraph>

        {date && (
          <Paragraph size="sm" color="grey-dark">
            {new Date(date).toLocaleDateString("ru-RU", dateOptions)}
          </Paragraph>
        )}

        {!notProductNotText && (
          <Arrow
            variant="2"
            style={{ position: "absolute", top: 0, right: 0, padding: 20 }}
            isOpen={isOpen}
          />
        )}

        {!notProductNotText && isOpen && (
          <View style={{ marginTop: 10, marginRight: -10 }}>
            {productId ? (
              <>
                {isProductsLoading ? (
                  <>
                    <RProductPreloader amount={1} style={pStyle} />
                    <Btn
                      onPress={() =>
                        navigation.navigate("Items", {
                          tabName: "archive",
                        })
                      }
                      isLoading={isProductsLoading}
                      color="transparent"
                      style={{ marginTop: 10 }}
                    >
                      Продлить
                    </Btn>
                  </>
                ) : (
                  <>
                    {product && (
                      <>
                        <ProductFavorite
                          variant="noFavorite"
                          wrapperStyle={pStyle}
                          navigation={navigation}
                          loadScreen={() => {}}
                          product={product}
                        />
                        <Btn
                          onPress={() =>
                            navigation.navigate("Items", {
                              tabName: "archive",
                            })
                          }
                          icon={<PPremium variant="gradient" />}
                          color="transparent"
                          style={{ marginTop: 10 }}
                        >
                          Продлить
                        </Btn>
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <Paragraph size="sm" style={{ marginBottom: 10 }}>
                {text}
              </Paragraph>
            )}
          </View>
        )}
      </TouchableOpacity>
    </>
  );
}
