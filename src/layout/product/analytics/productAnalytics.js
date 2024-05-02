import axios from "axios";

import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import Container from "../../../ui/common/container";
import Paragraph from "../../../ui/text/paragraph";

import { colors } from "../../../ui/config";

function numberToKosar(number) {
  if (!number) return "-";

  const kosar = number / 1000;
  const flooredKosar = Math.floor(kosar);

  return `${flooredKosar} к`;
}

export default function ProductAnalytics({ filter, by = "areas" }) {
  const [statistic, setStatistic] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await axios.post(
        "https://flate.pro/api/v2/product/getStatistics",
        { filter: filter }
      );
      if (result.data) {
        setStatistic(result.data);
      }
    })();
  }, [filter]);

  const navigation = useNavigation();

  const navigateTo = () => {
    navigation.navigate("Analytics", {
      by: by === "rcs" ? "areas" : "rcs",
    });
  };

  const navigateToTitle = () => {
    if (by === "areas") {
      return "По комплексам";
    }

    if (by === "rcs") {
      return "По районам";
    }
  };

  return (
    <Container>
      <View
        style={{
          borderRadius: 10,
          backgroundColor: "rgba(20, 179, 103, 0.10)",
          height: 180,
        }}
      >
        <View style={{ paddingVertical: 14, paddingHorizontal: 20 }}>
          <View style={styles.row}>
            <Paragraph style={{ width: "69%" }} numberOfLines={1}>
              Средняя стоимость за м2
            </Paragraph>

            <TouchableOpacity onPress={navigateTo} style={{ width: "31%" }}>
              <Paragraph
                style={{ textAlign: "right" }}
                color="blue"
                numberOfLines={1}
              >
                {navigateToTitle()}
                <Paragraph color="blue" style={{ fontSize: 15 }} size="md">
                  {">"}
                </Paragraph>
              </Paragraph>
            </TouchableOpacity>
          </View>

          <View style={styles.rowmd}>
            <Paragraph
              numberOfLines={1}
              style={{ width: "40%", color: "rgba(26, 31, 37, 0.50)" }}
              color={colors["black-50"]}
            >
              ₽
            </Paragraph>
            <Paragraph
              numberOfLines={1}
              style={{ width: "20%", color: "rgba(26, 31, 37, 0.50)" }}
              color={colors["black-50"]}
            >
              от
            </Paragraph>
            <Paragraph
              numberOfLines={1}
              style={{ width: "20%", color: "rgba(26, 31, 37, 0.50)" }}
              color={colors["black-50"]}
            >
              до
            </Paragraph>
            <Paragraph
              numberOfLines={1}
              style={{ width: "20%", color: "rgba(26, 31, 37, 0.50)" }}
              color={colors["black-50"]}
            >
              средняя
            </Paragraph>
          </View>
          {statistic && (
            <>
              <View style={styles.rowmd}>
                <Paragraph
                  numberOfLines={1}
                  style={{ width: "40%", color: "rgba(26, 31, 37, 0.50)" }}
                  color={colors["black-50"]}
                >
                  1к 0-45 м²
                </Paragraph>
                <Paragraph
                  numberOfLines={1}
                  style={{ width: "20%" }}
                  color={colors["black-50"]}
                >
                  {numberToKosar(statistic["0_45"]?.minPrice)}
                </Paragraph>
                <Paragraph
                  numberOfLines={1}
                  style={{ width: "20%" }}
                  color={colors["black-50"]}
                >
                  {numberToKosar(statistic["0_45"]?.maxPrice)}
                </Paragraph>
                <Paragraph
                  numberOfLines={1}
                  style={{ width: "20%" }}
                  color={colors["black-50"]}
                >
                  {numberToKosar(statistic["0_45"]?.averageprice)}
                </Paragraph>
              </View>
              <View style={styles.rowsm}>
                <Paragraph
                  numberOfLines={1}
                  style={{ width: "40%", color: "rgba(26, 31, 37, 0.50)" }}
                  color={colors["black-50"]}
                >
                  2к 45-60 м²
                </Paragraph>
                <Paragraph
                  numberOfLines={1}
                  style={{ width: "20%" }}
                  color={colors["black-50"]}
                >
                  {numberToKosar(statistic["45_65"]?.minPrice)}
                </Paragraph>
                <Paragraph
                  numberOfLines={1}
                  style={{ width: "20%" }}
                  color={colors["black-50"]}
                >
                  {numberToKosar(statistic["45_65"]?.maxPrice)}
                </Paragraph>
                <Paragraph
                  numberOfLines={1}
                  style={{ width: "20%" }}
                  color={colors["black-50"]}
                >
                  {numberToKosar(statistic["45_65"]?.averageprice)}
                </Paragraph>
              </View>
              <View style={styles.rowsm}>
                <Paragraph
                  numberOfLines={1}
                  style={{ width: "40%", color: "rgba(26, 31, 37, 0.50)" }}
                  color={colors["black-50"]}
                >
                  3к 60-80 м²
                </Paragraph>
                <Paragraph
                  numberOfLines={1}
                  style={{ width: "20%" }}
                  color={colors["black-50"]}
                >
                  {numberToKosar(statistic["60_80"]?.minPrice)}
                </Paragraph>
                <Paragraph
                  numberOfLines={1}
                  style={{ width: "20%" }}
                  color={colors["black-50"]}
                >
                  {numberToKosar(statistic["60_80"]?.maxPrice)}
                </Paragraph>
                <Paragraph
                  numberOfLines={1}
                  style={{ width: "20%" }}
                  color={colors["black-50"]}
                >
                  {numberToKosar(statistic["60_80"]?.averageprice)}
                </Paragraph>
              </View>
              <View style={styles.rowsm}>
                <Paragraph
                  numberOfLines={1}
                  style={{ width: "40%", color: "rgba(26, 31, 37, 0.50)" }}
                  color={colors["black-50"]}
                >
                  от 80 м²
                </Paragraph>
                <Paragraph
                  numberOfLines={1}
                  style={{ width: "20%" }}
                  color={colors["black-50"]}
                >
                  {numberToKosar(statistic["80"]?.minPrice)}
                </Paragraph>
                <Paragraph
                  numberOfLines={1}
                  style={{ width: "20%" }}
                  color={colors["black-50"]}
                >
                  {numberToKosar(statistic["80"]?.maxPrice)}
                </Paragraph>
                <Paragraph
                  numberOfLines={1}
                  style={{ width: "20%" }}
                  color={colors["black-50"]}
                >
                  {numberToKosar(statistic["80"]?.averageprice)}
                </Paragraph>
              </View>
            </>
          )}
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowmd: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  rowsm: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
});
