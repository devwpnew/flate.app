import api from "../../../api/service/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogedIn } from "../../store/global/user/userLogin";
import { View, ScrollView, RefreshControl } from "react-native";
import { Path, Svg } from "react-native-svg";
import tw from "../../../lib/tailwind";

import Link from "../../ui/link/link";
import Button from "../../ui/button/button";
import DText from "../../ui/text/dText";

import Main from "../../layout/main/main";
import Footer from "../../layout/main/footer";
import ProductContainerWithFetch from "../../layout/product/container/productContainerWithFetch";
import { useRef } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Favorites({ navigation }) {
  const dispatch = useDispatch();
  const favoritesList = useSelector((state) => state.userFavorites.value);
  const user = useSelector((state) => state.userLogin.value);

  useEffect(() => {
    updateUser(user.id);
  }, [favoritesList]);

  const updateUser = async (userId) => {
    const updatedUser = await api.get.user({
      window_host: "https://flate.pro",
      filter: {
        id: userId,
      },
      sort: {
        id: "asc",
      },
      limit: 1,
    });
    if (updatedUser) {
      dispatch(setLogedIn(updatedUser));
    }
  };

  const scrollViewRef = useRef(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const onRefresh = async () => {
    setIsRefreshing(true);

    await updateUser(user.id);

    setIsRefreshing(false);
  };

  return (
    <Main>
      {user?.favorites ? (
        <ScrollView
          ref={scrollViewRef}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
          style={tw`bg-white h-full`}
        >
          <ProductContainerWithFetch
            type="favorite"
            isPremium={false}
            isLoading={false}
            title={false}
            productsCount={user?.favorites.length}
            products={user?.favorites}
            setProducts={(v) => console.log(v)}
            isHasMore={false}
            limit={4}
            page={1}
            itemStyle={{
              width: "100%",
              marginBottom: 8,
            }}
            navigation={navigation}
          />
          <View style={tw`h-[70px]`}></View>
        </ScrollView>
      ) : (
        <>
          <FavoritesFallback />
        </>
      )}
      <Footer scrollViewRef={scrollViewRef} navigation={navigation} />
    </Main>
  );
}
