import { Dimensions, ScrollView, View } from "react-native";

import Main from "../layout/main/main";
import Wrapper from "../layout/main/wrapper";
import Container from "../ui/common/container";
import ProfileList from "../layout/profile/profileList";
import Footer from "../layout/main/footer";
import Dropdown from "../ui/dropdown/dropdown";
import { useEffect, useMemo, useRef, useState } from "react";
import api from "../../api/service/api";
import { useSelector } from "react-redux";
import CollectionsItem from "./user/collections/collectionsItem";
import Title from "../ui/heading/title";
import ProductTabs from "../layout/product/list/productTabs";
import useProductsCount from "../../hooks/products/useProductsCount";
import Paragraph from "../ui/text/paragraph";
import RDropdownAreas from "../ui/dropdown/spec/rDropdownAreas";
import { colors } from "../ui/config";
import Btn from "../ui/button/btn";
import ProductAnalytics from "../layout/product/analytics/productAnalytics";

export default function Test({ navigation }) {
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

  const [form, setForm] = useState({});

  return (
    <Main>
      <ScrollView
        onScroll={handleScroll}
        persistentScrollbar={true}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
      >
        <Container>
          <Title style={{ marginBottom: 20 }}>Аналитика цен по районам</Title>

          <View style={{ marginBottom: 10 }}>
            <RDropdownAreas
              color="grey-light"
              shadow={false}
              multiselect={false}
              onValueChange={(v) => setForm({ ...form, area_link: v.value })}
              placeholder="Выберите район"
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Btn>Показать</Btn>
          </View>

          <ProductAnalytics filter={filter} />
        </Container>
      </ScrollView>
      <Footer navigation={navigation} />
    </Main>
  );
}
