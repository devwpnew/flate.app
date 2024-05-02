import { TouchableOpacity, Image, View } from "react-native";
import { useMemo } from "react";
import tw from "../../../lib/tailwind";

import Preloader from "../../ui/preloader/preloader";
import DText from "../../ui/text/dText";

import declension from "../../../helpers/formatters/declension";

import useProductsCount from "../../../hooks/products/useProductsCount";

const getImage = (json) => {
  if (json) {
    const image = JSON.parse(json);
    return "https://flate.pro/" + image[0];
  }
};

export default function PostJk({ rc_link, building_link, navigation }) {
  const link = rc_link ? rc_link : building_link;
  const filter = { published: "1" };

  if (rc_link) {
    filter["rc_link"] = rc_link.id;
  } else {
    if (building_link) {
      filter["building_link"] = building_link.id;
    }
  }

  const rcItemsCount = useProductsCount(
    useMemo(() => {
      return { ...filter };
    }, [])
  );

  const loadCategory = () => {
    if (building_link) {
      navigation.navigate("Category", {
        name: link.name,
        section: { ...link, building_id: link.id, slug: "building" },
      });
    }

    if (rc_link) {
      navigation.navigate("Category", {
        name: link.name,
        section: { ...link, rc_id: link.id, slug: "rc" },
      });
    }
  };

  return (
    <>
      {link && (
        <TouchableOpacity
          onPress={loadCategory}
          style={tw`flex flex-col gap-2.5 py-2.5 bg-greylight mb-5 shadow-md mx-[15px] pl-2.5`}
        >
          <View style={tw`flex flex-row items-center gap-2.5 w-full`}>

            {rc_link && (
              <View style={tw`flex flex-col w-[162px] h-[150px]`}>
                <View
                  style={tw`flex flex-row items-center justify-center w-full h-full rounded overflow-hidden`}
                >
                  {rc_link.images ? (
                    <Image
                      style={tw`w-full h-full`}
                      source={{
                        uri: getImage(rc_link.images),
                      }}
                    />
                  ) : (
                    <Image
                      style={tw`w-full h-full`}
                      source={require("../../../assets/thumb-not-found.jpg")}
                    />
                  )}
                </View>
              </View>
            )}

            <View style={tw`flex flex-col gap-2 w-[230px]`}>
              <DText style={tw`font-bold`}>«{link.name}»</DText>

              {rc_link && (
                <DText style={tw`text-sm`}>
                  {link?.status === 1 ? "Сдан" : "Не сдан"}
                </DText>
              )}

              {link?.build_year && (
                <DText style={tw`text-sm`}>
                  Год постройки: {link?.build_year}
                </DText>
              )}

              {link?.builder && (
                <DText style={tw`text-sm`}>Застройщик: {link?.builder}</DText>
              )}

              {!rcItemsCount.isLoading && rcItemsCount?.products?.count ? (
                <DText style={tw`text-sm text-blue`}>
                  {rcItemsCount?.products?.count &&
                  rcItemsCount.products.count == 1
                    ? "Нет предложений кроме текущего"
                    : rcItemsCount.products.count +
                      " " +
                      declension(rcItemsCount.products.count, [
                        "квартира",
                        "квартиры",
                        "квартир",
                      ]) +
                      " в продаже"}
                </DText>
              ) : (
                <View style={tw`w-full h-[21px]`}>
                  <Preloader />
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
}
