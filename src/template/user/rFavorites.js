import api from "../../../api/service/api";
import { useRef, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { View, ScrollView, RefreshControl, Dimensions } from "react-native";
import tw from "../../../lib/tailwind";

import Main from "../../layout/main/main";
import Footer from "../../layout/main/footer";
import Container from "../../ui/common/container";
import RProductPreloader from "../../ui/preloader/rProductPreloader";
import Btn from "../../ui/button/btn";
import Paragraph from "../../ui/text/paragraph";
import Product from "../../layout/product/item/product";

import { FavIcon } from "../../layout/product/item/buttons/rFavoriteButton";
import { colors } from "../../ui/config";
import Wrapper from "../../layout/main/wrapper";
import { setFavorites } from "../../store/global/user/userFavorites";

export default function Favorites({ navigation }) {
  // USER
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLogin.value);

  // PRODUCTS
  const [products, setProducts] = useState([]);
  const [isProductsLoading, setIsProductsLoading] = useState(false);

  async function fetchData() {
    setIsProductsLoading(true);

    let result = [];

    const favoritesList = await api.get.favoritesById(user.id, true)
    const favListReverse = favoritesList && favoritesList.reverse()
    result = favListReverse

    if(result && result?.length > 0) {
      setProducts(result);

      const list = result.map((p) => {
        {
          return { id: p.id };
        }
      });
            
      dispatch(setFavorites(list));
    }else {
      setProducts([]);
      dispatch(setFavorites([]));
    }

    setIsProductsLoading(false);
  }

  useEffect(() => {
    fetchData()
  }, [])

  // SCROLLVIEW
  const scrollViewRef = useRef(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const onRefresh = async () => {
    setIsRefreshing(true);

    await fetchData();

    setIsRefreshing(false);
  };

  const pStyle = {
    width: Dimensions.get("window").width - 40,
    height: Math.floor(Dimensions.get("window").width / 4),
    marginBottom: 20,
  };

  return (
    <Main>
      {isProductsLoading && (
        <Wrapper>
          <Container>
            <RProductPreloader
              amount={5}
              style={{ ...pStyle, borderRadius: 20 }}
            />
          </Container>
        </Wrapper>
      )}

      {!isProductsLoading && products.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={scrollViewRef}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        >
          <Wrapper>
            <Container>
              {products.map((product, index) => {
                return (
                  <Product
                    key={product.id}
                    type={"favorite"}
                    product={product}
                    wrapperStyle={pStyle}
                  />
                );
              })}
            </Container>
          </Wrapper>
        </ScrollView>
      ) : (
        <>
          {!isProductsLoading && !products.length && (
            <View
              style={tw`flex flex-col items-center justify-center gap-2.5 mx-auto h-full`}
            >
              <Paragraph size="xl">Здесь пока ничего нет</Paragraph>
              <View style={tw`flex flex-row gap-2 items-center`}>
                <Paragraph>
                  Добавляйте объявления в избранное с помощью
                </Paragraph>
                <FavIcon stroke={colors["blue"]} />
              </View>
              <Btn onPress={() => navigation.navigate("Home")}>
                Перейти в каталог
              </Btn>
            </View>
          )}
        </>
      )}
      <Footer scrollViewRef={scrollViewRef} navigation={navigation} />
    </Main>
  );
}
