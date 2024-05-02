import {
  Dimensions,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import tw from "../../../../../../lib/tailwind";
import DText from "../../../../../ui/text/dText";
import getProductImageSrc from "../../../../../../helpers/formatters/product/getProductImageSrc";
import FavoriteButton from "../../buttons/favoriteButton";
import getProductPrice from "../../../../../../helpers/formatters/product/getProductPrice";
import getProductSection from "../../../../../../helpers/formatters/product/getProductSection";

export default function ProductItemHorizontal({
  product,
  loadScreen,
  navigation,
}) {
  const section = getProductSection(product);
  
  return (
    <TouchableOpacity
      onPress={loadScreen}
      style={tw`flex flex-row justify-start relative w-full mb-2.5`}
    >
      <View style={tw`relative w-1/3 h-[80px] rounded`}>
        {getProductImageSrc(product) ? (
          <Image
            style={tw`w-full h-full rounded`}
            source={{
              uri: getProductImageSrc(product),
            }}
          />
        ) : (
          <Image
            style={tw`w-full h-full rounded`}
            source={require("../../../../../assets/thumb-not-found.jpg")}
          />
        )}

        <View style={tw`absolute top-1 right-1 z-10`}>
          <FavoriteButton product={product} />
        </View>
      </View>

      <View style={tw`flex flex-col ml-2.5`}>
        <DText style={tw`text-blue text-xs font-bold mb-1 m-w-[250px]`}>
          {product.name}
          {section.slug === "parkings" || section.slug === "commertion" ? ` ${product.object_squares} м2` : ""}
        </DText>
        <DText style={tw`text-primary text-base font-bold mb-1`}>
          {getProductPrice(product)}
        </DText>
      </View>
    </TouchableOpacity>
  );
}
