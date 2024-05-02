import API from "../../../../../api/service/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites } from "../../../../store/global/user/userFavorites";

import { TouchableOpacity, View } from "react-native";
import tw from "../../../../../lib/tailwind";

import HeartIcon from "../../../../ui/icons/heartIcon";
import Button from "../../../../ui/button/button";
import { Path, Svg } from "react-native-svg";
import Paragraph from "../../../../ui/text/paragraph";

export default function RFavoriteButton({ variant, type, product }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLogin.value);
  const favoritesList = useSelector((state) => state.userFavorites.value);

  const [isLoading, setIsLoading] = useState(false);
  const [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    const isInFav = favoritesList.find((fItem) => fItem.id == product.id);

    setIsInFavorites(isInFav ? true : false);
  }, [favoritesList]);

  const addRemoveFavorite = async () => {
    setIsLoading(true);
    if (isInFavorites) {
      const list = favoritesList.filter((p) => p.id !== product.id);
      dispatch(setFavorites(list));
      await API.remove.favoritesById(user.id, product.id);
    } else {
      const list = [...favoritesList, { id: product.id }];
      dispatch(setFavorites(list));
      await API.add.favoritesById(user.id, product.id);
    }
    setIsLoading(false);
  };

  function getTemplate(type) {
    if (type === "button") {
      return (
        <Button
          onPress={addRemoveFavorite}
          type={"white"}
          style={{ height: 25, width: 45 }}
          icon={<FavIcon stroke={isInFavorites ? "#F4505B" : "#4BA5F8"} />}
          iconContainerStyle={tw`w-full h-full flex justify-center items-center`}
        ></Button>
      );
    }

    if (type === "text") {
      return (
        <>
          {isLoading ? (
            <View>
              <Paragraph size="md" color="blue">
                Загрузка...
              </Paragraph>
            </View>
          ) : (
            <TouchableOpacity onPress={addRemoveFavorite}>
              {isInFavorites ? (
                <Paragraph size="md" color="red">
                  Удалить
                </Paragraph>
              ) : (
                <Paragraph size="md" color="green">
                  Добавить
                </Paragraph>
              )}
            </TouchableOpacity>
          )}
        </>
      );
    }

    if (!type) {
      return (
        <TouchableOpacity onPress={addRemoveFavorite}>
          <HeartIcon
            variant={variant}
            style={tw`mx-auto`}
            isActive={isInFavorites}
          />
        </TouchableOpacity>
      );
    }
  }

  return (
    <>{user && Object.keys(user).length > 0 && <>{getTemplate(type)}</>}</>
  );
}

export function FavIcon({ stroke, style, ...props }) {
  return (
    <Svg
      style={style}
      {...props}
      width={14}
      height={13}
      viewBox="0 0 14 13"
      fill="none"
      stroke={stroke}
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M6.589 2.102l.41.594.412-.594C8.03 1.207 9.02.636 10.129.636c1.838 0 3.371 1.576 3.371 3.573 0 .783-.374 1.689-1.01 2.643-.629.945-1.477 1.883-2.338 2.72a32.223 32.223 0 01-3.15 2.67l-.007.006-.004-.002a29.904 29.904 0 01-3.145-2.61C2.986 8.81 2.139 7.88 1.51 6.929.878 5.97.5 5.041.5 4.209c0-1.294.397-2.17.979-2.725.587-.56 1.42-.848 2.392-.848 1.109 0 2.098.571 2.718 1.466z"
        fill="#fff"
      />
    </Svg>
  );
}
