import API from "../../../api/service/api";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Dimensions,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";

import Preloader from "../../ui/preloader/preloader";
import Paragraph from "../../ui/text/paragraph";
import { colors } from "../../ui/config";
import {
  getProductFloor,
  getProductRooms,
  getProductSection,
  getProductSquares,
} from "../../../helpers/product/getters";

const { width } = Dimensions.get("window");

function getPropValue(props, name) {
  let value = "-";

  if (!props || props.length === 0) return value;

  result = props.find((p) => p.code === name);

  if (result?.display_value) {
    value = result.display_value;
  }

  return value;
}

export default function RPostProperties({ product }) {
  const user = useSelector((state) => state.userLogin.value);

  const slug = product?.section_relation[0].slug;

  const [isLoading, setIsLoading] = useState(false);

  const [displayProperties1, setDisplayProperties1] = useState(false);
  const [displayProperties2, setDisplayProperties2] = useState(false);

  const section = getProductSection(product);
  const squares = getProductSquares(product);
  const landsSquares = product?.land_squares;
  const floor = getProductFloor(product);
  const rooms = getProductRooms(product);

  const props = getCurrentDisplayProperties(slug);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (props && props.length > 0) {
        const properties = await API.get.product.displayProperties(
          props,
          product
        );

        const propPart1 = properties.filter(
          (el) =>
            el.code !== "sum_contract" &&
            el.code !== "comission_sum_terms" &&
            el.code !== "mortgage"
        );
        const propPart2 = properties.filter(
          (el) =>
            el.code === "sum_contract" ||
            el.code === "comission_sum_terms" ||
            el.code === "mortgage"
        );

        setDisplayProperties1(propPart1);
        setDisplayProperties2(propPart2);
      }
      setIsLoading(false);
    })();
  }, []);

  function getTopPropsTemplateBySlug(slug) {
    if (slug === "flats") {
      return (
        <>
          <View style={styles.item}>
            <Paragraph
              style={styles.propName}
              numberOfLines={1}
              color="grey-medium"
              size="md"
            >
              Статус
            </Paragraph>

            <Paragraph style={styles.prop} numberOfLines={1} size="md">
              {getPropValue(displayProperties1, "status")}
            </Paragraph>
          </View>
          <View style={styles.item}>
            <Paragraph
              style={styles.propName}
              numberOfLines={1}
              color="grey-medium"
              size="md"
            >
              Дом
            </Paragraph>

            <Paragraph style={styles.prop} numberOfLines={1} size="md">
              {getPropValue(displayProperties1, "handed_over") === "Да"
                ? "Сдан"
                : "Не сдан"}
            </Paragraph>
          </View>
          <View style={styles.item}>
            <Paragraph
              style={styles.propName}
              numberOfLines={1}
              color="grey-medium"
              size="md"
            >
              S=
            </Paragraph>

            <Paragraph style={styles.prop} numberOfLines={1} size="md">
              {squares} {section === "Земля" ? "сот" : "м²"}
            </Paragraph>
          </View>
          <View style={styles.item}>
            <Paragraph
              style={styles.propName}
              numberOfLines={1}
              color="grey-medium"
              size="md"
            >
              Комнат
            </Paragraph>

            <Paragraph style={styles.prop} numberOfLines={1} size="md">
              {rooms}
            </Paragraph>
          </View>
          <View style={styles.item}>
            <Paragraph
              style={styles.propName}
              numberOfLines={1}
              color="grey-medium"
              size="md"
            >
              Ремонт
            </Paragraph>

            <Paragraph style={styles.prop} numberOfLines={1} size="md">
              {getPropValue(displayProperties1, "repairment")}
            </Paragraph>
          </View>
          <View style={styles.item}>
            <Paragraph
              style={styles.propName}
              numberOfLines={1}
              color="grey-medium"
              size="md"
            >
              Этаж
            </Paragraph>

            <Paragraph style={styles.prop} numberOfLines={1} size="md">
              {floor}
            </Paragraph>
          </View>
        </>
      );
    }

    if (slug === "houses") {
      return (
        <>
          <View style={styles.item}>
            <Paragraph
              style={styles.propName}
              numberOfLines={1}
              color="grey-medium"
              size="md"
            >
              Вид
            </Paragraph>

            <Paragraph style={styles.prop} numberOfLines={1} size="md">
              {getPropValue(displayProperties1, "house_types")}
            </Paragraph>
          </View>
          <View style={styles.item}>
            <Paragraph
              style={styles.propName}
              numberOfLines={1}
              color="grey-medium"
              size="md"
            >
              S=
            </Paragraph>

            <Paragraph style={styles.prop} numberOfLines={1} size="md">
              {squares} м²
            </Paragraph>
          </View>
          <View style={styles.item}>
            <Paragraph
              style={styles.propName}
              numberOfLines={1}
              color="grey-medium"
              size="md"
            >
              S уч.
            </Paragraph>

            <Paragraph style={styles.prop} numberOfLines={1} size="md">
              {landsSquares} сот
            </Paragraph>
          </View>
          <View style={styles.item}>
            <Paragraph
              style={styles.propName}
              numberOfLines={1}
              color="grey-medium"
              size="md"
            >
              Конструкция
            </Paragraph>

            <Paragraph style={styles.prop} numberOfLines={1} size="md">
              {getPropValue(displayProperties1, "house_construction")}
            </Paragraph>
          </View>
          <View style={styles.item}>
            <Paragraph
              style={styles.propName}
              numberOfLines={1}
              color="grey-medium"
              size="md"
            >
              Коммуникации
            </Paragraph>

            <Paragraph style={styles.prop} numberOfLines={1} size="md">
              {getPropValue(displayProperties1, "house_communication")}
            </Paragraph>
          </View>
          <View style={styles.item}>
            <Paragraph
              style={styles.propName}
              numberOfLines={1}
              color="grey-medium"
              size="md"
            >
              Ремонт
            </Paragraph>

            <Paragraph style={styles.prop} numberOfLines={1} size="md">
              {getPropValue(displayProperties1, "repairment")}
            </Paragraph>
          </View>
          <View style={styles.item}>
            <Paragraph
              style={styles.propName}
              numberOfLines={1}
              color="grey-medium"
              size="md"
            >
              Этажей
            </Paragraph>

            <Paragraph style={styles.prop} numberOfLines={1} size="md">
              {getPropValue(displayProperties1, "house_floors")}
            </Paragraph>
          </View>
        </>
      );
    }

    if (slug === "land") {
      return (
        <>
          <View style={styles.itemLine}>
            <Paragraph
              style={styles.propNameLine}
              numberOfLines={1}
              color="grey-medium"
              size="md"
            >
              Статус
            </Paragraph>

            <Paragraph style={styles.propLine} numberOfLines={1} size="md">
              {getPropValue(displayProperties1, "status_lands")}
            </Paragraph>
          </View>
          <View style={styles.itemLine}>
            <Paragraph
              style={styles.propNameLine}
              numberOfLines={1}
              color="grey-medium"
              size="md"
            >
              S=
            </Paragraph>

            <Paragraph style={styles.propLine} numberOfLines={1} size="md">
              {squares} сот
            </Paragraph>
          </View>
          <View style={styles.itemLine}>
            <Paragraph
              style={styles.propNameLine}
              numberOfLines={1}
              color="grey-medium"
              size="md"
            >
              Коммуникации
            </Paragraph>

            <Paragraph style={styles.propLine} numberOfLines={1} size="md">
              {getPropValue(displayProperties1, "house_communication")}
            </Paragraph>
          </View>
        </>
      );
    }

    if (slug === "parkings") {
      return (
        <>
          <View style={styles.itemLine}>
            <Paragraph
              style={styles.propNameLine}
              numberOfLines={1}
              color="grey-medium"
              size="md"
            >
              Вид
            </Paragraph>

            <Paragraph style={styles.propLine} numberOfLines={1} size="md">
              {getPropValue(displayProperties1, "parking_types")}
            </Paragraph>
          </View>
          <View style={styles.itemLine}>
            <Paragraph
              style={styles.propNameLine}
              numberOfLines={1}
              color="grey-medium"
              size="md"
            >
              S=
            </Paragraph>

            <Paragraph style={styles.propLine} numberOfLines={1} size="md">
              {squares} {section === "Земля" ? "сот" : "м²"}
            </Paragraph>
          </View>
        </>
      );
    }

    if (slug === "commertion") {
      return (
        <>
          <View style={styles.itemLine}>
            <Paragraph
              style={styles.propNameLine}
              numberOfLines={1}
              color="grey-medium"
              size="md"
            >
              Вид
            </Paragraph>

            <Paragraph style={styles.propLine} numberOfLines={1} size="md">
              {getPropValue(displayProperties1, "commercial_types")}
            </Paragraph>
          </View>
          <View style={styles.itemLine}>
            <Paragraph
              style={styles.propNameLine}
              numberOfLines={1}
              color="grey-medium"
              size="md"
            >
              S=
            </Paragraph>

            <Paragraph style={styles.prop} numberOfLines={1} size="md">
              {squares} {section === "Земля" ? "сот" : "м²"}
            </Paragraph>
          </View>
        </>
      );
    }
  }

  function getTopLoadingTemplateBySlug(slug) {
    let arr = [1, 2, 3, 4, 5, 6];

    if (slug === "land") {
      arr = [1, 2, 3];

      return arr.map((i) => {
        return (
          <View key={i} style={styles.itemLine}>
            <Preloader style={{ ...styles.propNameLine, height: 20 }} />
            <Preloader style={{ ...styles.propLine, height: 20 }} />
          </View>
        );
      });
    }

    if (slug === "parkings" || slug === "commertion") {
      arr = [1, 2];

      return arr.map((i) => {
        return (
          <View key={i} style={styles.itemLine}>
            <Preloader style={{ ...styles.propNameLine, height: 20 }} />
            <Preloader style={{ ...styles.propLine, height: 20 }} />
          </View>
        );
      });
    }

    if (slug === "houses") {
      arr = [1, 2, 3, 4, 5, 6, 7];
    }

    return arr.map((i) => {
      return (
        <View key={i} style={styles.item}>
          <Preloader style={{ ...styles.propName, height: 20 }} />
          <Preloader style={{ ...styles.prop, height: 20 }} />
        </View>
      );
    });
  }

  return (
    <>
      <View style={styles.wrapper}>
        <View
          style={{
            ...styles.container,
            borderBottomWidth: 1,
            borderColor: colors["grey-light"],
          }}
        >
          {!isLoading
            ? getTopPropsTemplateBySlug(slug)
            : getTopLoadingTemplateBySlug(slug)}
        </View>
        
        <View
          style={{
            ...styles.container,
            paddingBottom: 0,
          }}
        >
          {!isLoading ? (
            <>
              {displayProperties2 &&
                displayProperties2.map((prop) => {
                  if (prop && prop.display_value) {
                    if (
                      (user.user_group?.id === 6 &&
                        prop.code === "comission_sum_terms") ||
                      (!Object.keys(user).length > 0 &&
                        prop.code === "comission_sum_terms")
                    ) {
                      return null;
                    }

                    return (
                      <View key={prop.code} style={styles.itemLine}>
                        <Paragraph
                          style={styles.propNameLine}
                          numberOfLines={1}
                          color="grey-medium"
                          size="md"
                        >
                          {prop.display_name}:
                        </Paragraph>

                        <Paragraph
                          style={styles.propLine}
                          numberOfLines={1}
                          size="md"
                        >
                          {prop.display_value}
                        </Paragraph>
                      </View>
                    );
                  }
                })}
            </>
          ) : (
            [1, 2, 3].map((i) => {
              return (
                <View key={i} style={styles.itemLine}>
                  <Preloader style={{ ...styles.propNameLine, height: 20 }} />
                  <Preloader style={{ ...styles.propLine, height: 20 }} />
                </View>
              );
            })
          )}
        </View>

        <View style={styles.links}>
          {product.cloud_links && (
            <TouchableOpacity
              onPress={() => Linking.openURL(product.cloud_links)}
              style={styles.link}
            >
              <Paragraph numberOfLines={1} color="blue" size="md">
                Прикрепленный файл
              </Paragraph>
            </TouchableOpacity>
          )}

          {product.youtube_video_link && (
            <TouchableOpacity
              onPress={() => Linking.openURL(product.youtube_video_link)}
              style={styles.link}
            >
              <Paragraph numberOfLines={1} color="blue" size="md">
                Видео объекта
              </Paragraph>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
}

const propWidth = width - 24;

const styles = StyleSheet.create({
  links: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderColor: colors["grey-light"],
  },
  link: {
    backgroundColor: colors["grey-light"],
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
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    marginBottom: 14,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    paddingBottom: 14,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    width: (width - 24) / 2,
  },
  itemLine: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    width: propWidth,
  },
  propName: {
    fontSize: 14,
    width: propWidth / 2 / 2.5 - 4,
  },
  prop: {
    fontSize: 14,
    width: propWidth / 2 / 1.75 - 4,
  },
  propNameLine: {
    fontSize: 14,
    width: propWidth / 2 - 4,
  },
  propLine: {
    fontSize: 14,
    width: propWidth / 2 - 4,
  },
});

const getCurrentDisplayProperties = (slug) => {
  if (slug == "houses") {
    return [
      { code: "house_types", display_name: "Вид" },
      { code: "house_floors", display_name: "Этажей в доме" },
      { code: "house_construction", display_name: "Конструкция" },
      { code: "house_communication", display_name: "Коммуникации" },
      // { code: "comission", display_name: "Комиссия" },
      { code: "comission_sum_terms", display_name: "Комиссия" },
      { code: "off_comission_value", display_name: "Условия комиссии" },
      { code: "repairment", display_name: "Ремонт" },
      { code: "sum_contract", display_name: "Сумма в договоре" },
      { code: "mortgage", display_name: "Ипотека" },
    ];
  }

  if (slug == "flats") {
    return [
      { code: "status", display_name: "Статус" },
      { code: "handed_over", display_name: "Дом" },
      // { code: "comission", display_name: "Комиссия" },
      { code: "comission_sum_terms", display_name: "Комиссия" },
      { code: "off_comission_value", display_name: "Условия комиссии" },
      { code: "repairment", display_name: "Ремонт" },
      { code: "sum_contract", display_name: "Сумма в договоре" },
      { code: "mortgage", display_name: "Ипотека" },
    ];
  }

  if (slug == "place") {
    return [
      { code: "sum_contract", display_name: "Сумма в договоре" },
      { code: "status_lands", display_name: "Статус" },
      { code: "house_communication", display_name: "Коммуникации" },
      // { code: "comission", display_name: "Комиссия" },
      { code: "comission_sum_terms", display_name: "Комиссия" },
      { code: "off_comission_value", display_name: "Условия комиссии" },
      { code: "repairment", display_name: "Ремонт" },
      { code: "sum_contract", display_name: "Сумма в договоре" },
      { code: "mortgage", display_name: "Ипотека" },
    ];
  }

  if (slug == "commertion") {
    return [
      { code: "commercial_types", display_name: "Вид" },
      // { code: "comission", display_name: "Комиссия" },
      { code: "comission_sum_terms", display_name: "Комиссия" },
      { code: "off_comission_value", display_name: "Условия комиссии" },
      { code: "repairment", display_name: "Ремонт" },
      { code: "sum_contract", display_name: "Сумма в договоре" },
      { code: "mortgage", display_name: "Ипотека" },
    ];
  }

  if (slug == "parkings") {
    return [
      { code: "parking_types", display_name: "Вид" },
      // { code: "comission", display_name: "Комиссия" },
      { code: "comission_sum_terms", display_name: "Комиссия" },
      { code: "off_comission_value", display_name: "Условия комиссии" },
      { code: "repairment", display_name: "Ремонт" },
      { code: "sum_contract", display_name: "Сумма в договоре" },
      { code: "mortgage", display_name: "Ипотека" },
    ];
  }

  if (slug == "land") {
    return [
      { code: "status_lands", display_name: "Статус" },
      // { code: "comission", display_name: "Комиссия" },
      { code: "comission_sum_terms", display_name: "Комиссия" },
      { code: "off_comission_value", display_name: "Условия комиссии" },
      { code: "repairment", display_name: "Ремонт" },
      { code: "sum_contract", display_name: "Сумма в договоре" },
      { code: "mortgage", display_name: "Ипотека" },
      { code: "house_communication", display_name: "Коммуникации" },
    ];
  }
};
