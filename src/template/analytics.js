import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import Main from "../layout/main/main";
import Container from "../ui/common/container";
import Footer from "../layout/main/footer";
import RInputSearch from "../ui/input/spec/rInputSearch";
import Title from "../ui/heading/title";
import Btn from "../ui/button/btn";
import RDropdownAreas from "../ui/dropdown/spec/rDropdownAreas";
import ProductAnalytics from "../layout/product/analytics/productAnalytics";
import Wrapper from "../layout/main/wrapper";
import Paragraph from "../ui/text/paragraph";

import { colors } from "../ui/config";

export default function Analytics({ navigation, route }) {
  const [filter, setFilter] = useState({});
  const [form, setForm] = useState({});

  useEffect(() => {
    setForm({});
    setFilter({});
  }, [route.params.by]);

  const navigateToTitle = () => {
    if (route.params.by === "rcs") {
      return "по комплексам";
    }

    if (route.params.by === "areas") {
      return "по районам";
    }
  };

  const toRc = () => {
    navigation.navigate("Analytics", {
      by: "rcs",
    });
  };

  const toAreas = () => {
    navigation.navigate("Analytics", {
      by: "areas",
    });
  };

  const activeTabStyle = {
    backgroundColor: colors["black"],
    borderWidth: 1.5,
    borderColor: colors["black"],
  };

  const notActiveTabStyle = {
    borderWidth: 1.5,
    borderColor: "rgba(26, 31, 37, 0.10)",
  };

  const tabStyle = {
    ...styles.tab,
  };

  return (
    <Main>
      <ScrollView
        keyboardShouldPersistTaps={"always"}
        persistentScrollbar={true}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
      >
        <Wrapper>
          <Container>
            <Title style={{ marginBottom: 20 }}>Аналитика цен</Title>

            <View style={styles.tabs}>
              <TouchableOpacity
                onPress={toAreas}
                style={
                  route.params.by === "areas"
                    ? { ...tabStyle, ...activeTabStyle }
                    : { ...tabStyle, ...notActiveTabStyle }
                }
              >
                <Paragraph
                  color={route.params.by === "areas" ? "white" : "black"}
                >
                  По районам
                </Paragraph>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={toRc}
                style={
                  route.params.by === "rcs"
                    ? { ...tabStyle, ...activeTabStyle }
                    : { ...tabStyle, ...notActiveTabStyle }
                }
              >
                <Paragraph
                  color={route.params.by === "rcs" ? "white" : "black"}
                >
                  По ЖК
                </Paragraph>
              </TouchableOpacity>
            </View>

            <View style={{ marginBottom: 10 }}>
              {route.params.by === "rcs" && (
                <RInputSearch
                  isHideSearch={true}
                  isHideFilter={true}
                  rounded={false}
                  shadow={false}
                  isCanAddRc={false}
                  placeholder="Выберите ЖК"
                  name={"rc_link"}
                  style={{ fontSize: 14, backgroundColor: colors["grey"] }}
                  containerStyle={{
                    borderRadius: 10,
                    backgroundColor: colors["grey"],
                  }}
                  containerBgStyle={{
                    backgroundColor: colors["grey-light"],
                    paddingVertical: 4,
                  }}
                />
              )}

              {route.params.by === "areas" && (
                <RDropdownAreas
                  isSingleSelect={false}
                  isSuccess={form?.area_link}
                  color="grey-light"
                  shadow={false}
                  multiselect={false}
                  onValueChange={(v) =>
                    setForm({ ...form, area_link: v.value })
                  }
                  placeholderAreas={"Выберите район"}
                  placeholderMicroAreas={"Выберите микрорайон (не обязательно)"}
                />
              )}
            </View>

            {route.params.by === "areas" && (
              <View style={{ marginBottom: 10 }}>
                <Btn onPress={() => setFilter(form)}>Показать</Btn>
              </View>
            )}
            {Object.keys(filter).length > 0 && (
              <View style={{ marginHorizontal: -10 }}>
                <ProductAnalytics filter={filter} by={route.params.by} />
              </View>
            )}
          </Container>
        </Wrapper>
      </ScrollView>
      <Footer navigation={navigation} />
    </Main>
  );
}

const styles = StyleSheet.create({
  tabs: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
    marginBottom: 20,
  },
  tab: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    flex: 1,
  },
});
