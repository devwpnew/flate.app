import api from "../../../../api/service/api";
import { useEffect, useState } from "react";

import { StyleSheet, View, TouchableOpacity, Alert } from "react-native";

import Paragraph from "../../../ui/text/paragraph";

import { Sort } from "../../profile/icons/icons";
import { PMoney } from "./icons/icons";

import ProductImage from "./type/productImage";
import ModalEditProductCollections from "../../../ui/modal/spec/modalEditProductCollections";

import { colors } from "../../../ui/config";
import { getProductPublished } from "../../../../helpers/product/getters";

const sectionsId = {
  3: "Квартира",
  4: "Дом",
  5: "Земля",
  6: "Коммерция",
  7: "Паркинги",
};

const numberFormat = new Intl.NumberFormat("ru");

function getProductCollectionSquares(product) {
  let squares = "";

  if (product?.square_area) {
    squares = product?.square_area;
  }

  if (product?.square_object) {
    squares = product?.square_object;
  }

  if (product?.square) {
    squares = product?.square;
  }

  return squares;
}

export default function ProductCollections({
  onDelete,
  wrapperStyle = {},
  variant = "default",
  product,
}) {
  const [isShowEditModal, setIsShowEditModal] = useState(false);

  const onDeleteProduct = () => {
    Alert.alert(`Вы уверены?`, `Убрать объект из подборки?`, [
      {
        text: "Да",
        onPress: deleteAction,
      },
      {
        text: "Отмена",
      },
    ]);
  };

  const deleteAction = async () => {
    try {
      if (!product?.id) return;

      const deleteRes = await api.selections.product.delete({
        productId: product.id,
      });

      if (deleteRes && onDelete) {
        onDelete({
          id: product.id,
          response: deleteRes,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // STYLE
  const row = {
    ...styles.row,
    // width: wrapperStyle.width - styles.props.padding * 2,
  };
  const wrapperMergedStyle = {
    ...wrapperStyle,
    ...styles.wrapper,
    opacity: 1,
  };
  const maxImageWidth = variant === "default" ? 0.26 : 0.23;
  const imageStyle = {
    ...styles.image,
    width: wrapperStyle.width * maxImageWidth,
  };
  const priceRowStyle = {
    ...row,
    justifyContent: "space-between",
    width: wrapperStyle.width - 66 - imageStyle.width,
  };
  // /STYLE

  const section = sectionsId[product.type];

  const [address, setAddress] = useState(null);

  const currentComission = product.comission
    ? numberFormat.format(product.comission)
    : null;

  const getPrice = () => {
    if (variant === "default") {
      return product.price;
    }
    return product?.comission
      ? product.price + product.comission
      : product.price;
  };

  const currentPrice = getPrice();

  const [comission, setComission] = useState(currentComission);

  const image = product.preview_old
    ? { uri: `https://flate.pro/${product.preview_old}` }
    : null;
  const price = numberFormat.format(currentPrice);
  const floor = product.floor;
  const squares = getProductCollectionSquares(product);
  const priceSquares = numberFormat.format(Math.ceil(currentPrice / squares));

  const [published, setPublished] = useState("archive");

  useEffect(() => {
    (async () => {
      if (!product?.product_id) return;

      const originalProduct = await api.get.product.byID(product.product_id);

      const published = getProductPublished(originalProduct);

      setPublished(published);
    })();
  }, [product.product_id]);

  useEffect(() => {
    (async () => {
      try {
        if (!product?.rc) {
          setAddress(product.address);
          return;
        }

        const rc = await api.get.rcs({
          filter: {
            id: product.rc,
          },
          limit: 1,
        });
        if (rc.name) {
          setAddress(rc.name);
        } else {
          setAddress(product.address);
        }
      } catch (error) {
        console.log(error);
        setAddress(product.address);
      }
    })();
  }, [product?.rc]);

  console.log(product);

  return (
    <>
      <View
        style={{
          ...wrapperMergedStyle,
          opacity: published === "active" ? 1 : 0.5,
        }}
      >
        <View style={styles.container}>
          {image ? (
            <ProductImage
              style={imageStyle}
              source={image}
              contentFit="cover"
            />
          ) : (
            <View
              style={{ ...imageStyle, backgroundColor: colors["grey-light"] }}
            ></View>
          )}

          <View style={styles.flex}>
            <View
              style={{
                ...styles.props,
                flex: 1,
              }}
            >
              <View style={priceRowStyle}>
                <Paragraph color="black" size="lg" style={styles.price}>
                  {price} ₽
                </Paragraph>
                {/* {variant === "default" && ( */}
                {comission && (
                  <>
                    <Paragraph
                      numberOfLines={1}
                      style={{
                        ...styles.comission,
                        fontSize: variant === "default" ? 14 : 12,
                      }}
                      size="md"
                      color="blue-light"
                    >
                      {variant === "default" ? <>+{comission} ₽</> : <>+ ₽</>}
                    </Paragraph>
                  </>
                )}
                {/* )} */}
              </View>
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
                {floor && (
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
                )}
              </View>
              <View style={row}>
                {squares && (
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
                )}
                {priceSquares && (
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
                )}
              </View>

              {address ? (
                <Paragraph
                  numberOfLines={1}
                  color="grey-dark"
                  style={
                    variant === "default"
                      ? { fontSize: 14, flex: 1 }
                      : { fontSize: 14 }
                  }
                >
                  {address}
                </Paragraph>
              ) : (
                <Paragraph
                  numberOfLines={1}
                  color="grey-dark"
                  style={
                    variant === "default"
                      ? { opacity: 0, fontSize: 14, flex: 1 }
                      : { opacity: 0, fontSize: 14 }
                  }
                >
                  {address}
                </Paragraph>
              )}

              {variant === "default" && (
                <TouchableOpacity
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 4,
                  }}
                  onPress={() => setIsShowEditModal((pr) => !pr)}
                >
                  <PMoney />

                  <Paragraph
                    numberOfLines={1}
                    color="blue"
                    style={{ fontSize: 14 }}
                  >
                    Редактировать
                  </Paragraph>
                </TouchableOpacity>
              )}
            </View>

            {variant === "default" && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignContent: "flex-end",
                  gap: 6,
                  height: "100%",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "flex-end",
                    width: 46,
                    height: 46,
                    borderWidth: 1,
                    borderRadius: 50,
                    borderColor: "#ECF2F8",
                  }}
                >
                  <Sort />
                </View>
                <TouchableOpacity onPress={onDeleteProduct}>
                  <Paragraph
                    style={{ fontSize: 14 }}
                    size="md"
                    color="grey-dark"
                  >
                    Удалить
                  </Paragraph>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>

      <ModalEditProductCollections
        onDelete={onDelete}
        onEditComission={(comission) => setComission(comission)}
        productId={product.id}
        comission={comission}
        modalVisible={isShowEditModal}
        setModalVisible={setIsShowEditModal}
      />
    </>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  prop: {
    width: 18,
  },
  prop2: {
    width: 25,
  },
  truncate: {
    width: 55,
  },
  wrapper: {},
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
    height: "100%",
    position: "relative",
  },
  image: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderRadius: 20,
  },
  props: {
    display: "flex",
    flexDirection: "column",
    padding: 0,
    paddingBottom: 3,
    gap: 2,
  },
  body: {
    flex: 1,
  },
  price: {
    flex: 1,
    fontFamily: "Manrope_700Bold",
  },
  comission: {
    flex: 1,
    marginTop: 2,
  },
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
    left: 0,
    top: 0,
    borderRadius: 999,
    backgroundColor: colors["grey-medium"],
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});
