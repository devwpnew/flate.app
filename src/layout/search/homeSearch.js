import { useMemo } from "react";
import { useSelector } from "react-redux";

import { View, ImageBackground } from "react-native";
import tw from "../../../lib/tailwind";

import Preloader from "../../ui/preloader/preloader";
import Search from "./search";

import useProductsCount from "../../../hooks/products/useProductsCount";
import DText from "../../ui/text/dText";

export default function HomeSearch({ navigation, route }) {
  const activeCity = useSelector((state) => state.userCity.value);

  const productsCount = useProductsCount(
    useMemo(() => {
      return {
        published: 1,
        city_link: activeCity.id,
      };
    }, [activeCity])
  );

  return (
    <ImageBackground
      source={require("../../../assets/backgrounds/home-hero.jpg")}
      resizeMode="cover"
      style={tw`py-3`}
    >
      <View style={tw`px-[15px] w-full`}>
        <DText
          style={tw`text-white text-2xl font-bold mb-2.5 w-full`}
        >
          {productsCount.isLoading ? (
            <Preloader style={tw`h-[32px] w-[250px]`} />
          ) : (
            `Объектов в продаже – ${productsCount.products?.count}`
          )}
        </DText>
        <DText style={tw`text-white text-base font-bold mb-2.5`}>
          Найдите лучшее
        </DText>
        <Search route={route} navigation={navigation} />
      </View>
    </ImageBackground>
  );
}
