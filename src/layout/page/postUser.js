import { useMemo } from "react";
import tw from "../../../lib/tailwind";

import { View } from "react-native";
import DText from "../../ui/text/dText";
import Preloader from "../../ui/preloader/preloader";
import UserAvatar from "../profile/userAvatar";

import useProductsCount from "../../../hooks/products/useProductsCount";
import { TouchableOpacity } from "react-native";

export default function PostUser({ navigation, product }) {
  const pCount = useProductsCount(
    useMemo(() => {
      return { user_id: product.user_id.id, published: "1" };
    }, [])
  );

  const loadCategory = () => {
    navigation.navigate("Category", {
      name: product.user_id.user_name,
      section: {
        ...product.user_id,
        name: product.user_id.user_name,
        user_id: product.user_id.id,
        slug: "user",
      },
    });
  };

  return (
    <TouchableOpacity
      onPress={loadCategory}
      style={tw`flex flex-col px-[15px] mb-5`}
    >
      <DText style={tw`text-grey text-sm`}>Контактное лицо</DText>
      <View style={tw`flex flex-row items-center mt-2.5`}>
        <UserAvatar
          avatar={product.user_id.user_avatar}
          name={product.user_id.user_name[0]}
          style={tw`w-10 h-10 bg-bluelight2 rounded-full mr-2.5`}
          textStyle={tw`text-center text-white text-[19px]`}
        />

        <View style={tw`flex flex-col`}>
          <DText style={tw`font-bold`}>{product.user_id.user_name}</DText>
          <DText style={tw`text-sm`}>
            {pCount.isLoading ? (
              <Preloader style={{ width: 100, height: 20, paddingTop: 5 }} />
            ) : (
              <>{pCount.products.count} объявления</>
            )}
          </DText>
        </View>
      </View>
    </TouchableOpacity>
  );
}
