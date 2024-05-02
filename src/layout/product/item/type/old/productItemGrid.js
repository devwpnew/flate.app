import { Image, View, TouchableOpacity } from "react-native";
import tw from "../../../../../../lib/tailwind";
import getProductImageSrc from "../../../../../../helpers/formatters/product/getProductImageSrc";
import getProductPriceSquares from "../../../../../../helpers/formatters/product/getProductPriceSquares";
import getProductPrice from "../../../../../../helpers/formatters/product/getProductPrice";
import getProductDate from "../../../../../../helpers/formatters/product/getProductDate";
import getProductAddress from "../../../../../../helpers/formatters/product/getProductAddress";

import truncate from "../../../../../../helpers/formatters/truncate";

import FavoriteButton from "../../buttons/favoriteButton";
import DText from "../../../../../ui/text/dText";
import getProductSection from "../../../../../../helpers/formatters/product/getProductSection";

export default function productItemGrid({
  wrapperStyle = {},
  product,
  navigation,
  loadScreen,
}) {
  const address = getProductAddress(product);
  const section = getProductSection(product);

  return (
    <View style={wrapperStyle}>
      <TouchableOpacity
        onPress={loadScreen}
        style={{
          ...tw`flex flex-col border border-greyborder bg-greylight rounded overflow-hidden p-1 shadow-md gap-1`,
          backgroundColor:
            parseInt(product.premium) > 0
              ? "rgb(243,248,234)"
              : "rgb(255, 255, 255)",
        }}
      >
        <View style={tw`absolute top-0 right-0 z-10 p-1`}>
          <FavoriteButton product={product} />
        </View>

        {getProductImageSrc(product) ? (
          <Image
            style={tw`w-[100%] h-[125px] rounded overflow-hidden`}
            source={{
              uri: getProductImageSrc(product),
            }}
          />
        ) : (
          <Image
            style={tw`w-[100%] h-[125px] rounded overflow-hidden`}
            source={require("../../../../../assets/thumb-not-found.jpg")}
          />
        )}

        <View style={tw`flex flex-col mt-[6px] w-full`}>
          <DText style={tw`text-primary text-base font-bold mb-1`}>
            {getProductPrice(product)} руб.
          </DText>

          <DText
            numberOfLines={2}
            style={{
              ...tw`text-blue text-xs font-bold mb-1 min-h-[36px]`,
              overflow: "hidden",
            }}
          >
            {product.name}
            {section.slug === "parkings" || section.slug === "commertion" ? ` ${product.object_squares} м2` : ""}
          </DText>

          <DText
            numberOfLines={2}
            style={{
              ...tw`text-xs text-grey mb-1`,
              overflow: "hidden",
            }}
          >
            {address}
          </DText>

          <View style={tw`flex flex-row items-center justify-between`}>
            <DText style={tw`text-grey text-[10px] font-bold`}>
              {getProductPriceSquares(product)} руб. за{" "}
              {section.slug === "land" ? "сотку" : "м2"}
            </DText>

            <DText style={tw`text-grey text-[10px]`}>
              {getProductDate(product)}
            </DText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
