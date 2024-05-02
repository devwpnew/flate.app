import { Image, View, TouchableOpacity } from "react-native";
import tw from "../../../../../../lib/tailwind";

import FavoriteButton from "../../buttons/favoriteButton";

import getProductImageSrc from "../../../../../../helpers/formatters/product/getProductImageSrc";
import getProductPrice from "../../../../../../helpers/formatters/product/getProductPrice";
import getProductPriceSquares from "../../../../../../helpers/formatters/product/getProductPriceSquares";
import getProductAddress from "../../../../../../helpers/formatters/product/getProductAddress";
import getProductDate from "../../../../../../helpers/formatters/product/getProductDate";

import truncate from "../../../../../../helpers/formatters/truncate";
import DText from "../../../../../ui/text/dText";
import getProductSection from "../../../../../../helpers/formatters/product/getProductSection";

export default function ProductItemRow({
  navigation,
  loadScreen,
  wrapperStyle,
  product,
}) {
  const address = getProductAddress(product);
  const section = getProductSection(product);

  return (
    <View
      style={{
        ...wrapperStyle,
        backgroundColor:
          parseInt(product.premium) > 0
            ? "rgb(243,248,234)"
            : "rgb(255, 255, 255)",
      }}
    >
      <TouchableOpacity
        onPress={loadScreen}
        style={tw`relative rounded p-2 flex flex-col justify-between border border-greyborder`}
      >
        <View style={tw`absolute top-3 right-3 z-10`}>
          <FavoriteButton product={product} />
        </View>

        {getProductImageSrc(product) ? (
          <Image
            style={tw`w-[100%] h-[216px]`}
            source={{
              uri: getProductImageSrc(product),
            }}
          />
        ) : (
          <Image
            style={tw`w-[100%] h-[216px]`}
            source={require("../../../../../assets/thumb-not-found.jpg")}
          />
        )}

        <DText style={tw`text-primary text-sm font-bold mb-[4px] mt-4`}>
          {product.name}
          {section.slug === "parkings" || section.slug === "commertion" ? ` ${product.object_squares} м2` : ""}
        </DText>

        <View style={tw`flex items-center flex-row mb-1 gap-2.5`}>
          <DText style={tw`text-primary text-base font-bold `}>
            {getProductPrice(product)} руб.
          </DText>
          <DText style={tw`text-primary text-xs `}>
            {getProductPriceSquares(product)} руб. за{" "}
            {product.section_relation[0].slug === "land" ? "сотку" : "м2"}
          </DText>
        </View>

        {/* <DText style={tw`text-grey text-xs font-open-sans mb-1`}>
          {product.area_link.name && <>р-н {product.area_link.name}</>}
        </DText> */}

        {/* <DText style={tw`w-full text-primary text-xs mb-1`}>
          {truncate(address, 50)}
        </DText> */}
        
        <DText
          numberOfLines={2}
          style={{
            ...tw`w-full text-primary text-xs mb-1`,
            overflow: "hidden",
          }}
        >
          {address}
        </DText>

        {/* <DText style={tw`text-grey text-xs h-[50px] overflow-hidden`}>
          {truncate(product.product_description, 120)}
        </DText> */}
        <DText style={tw`text-grey  font-open-sans`}>
          {getProductDate(product)}
        </DText>
      </TouchableOpacity>
    </View>
  );
}
