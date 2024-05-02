import React from "react";
import { Image, View } from "react-native";
import tw from "../../../lib/tailwind";

import DText from "../../ui/text/dText";
import MapScreenByAddress from "../map/mapScreenByAddress";

export default function PostMap({ product }) {
  return (
    <>
      <View style={tw`mb-2.5 px-[15px]`}>
        <DText style={tw`text-xl font-bold mb-2`}>Расположение</DText>
        <DText style={tw`text-sm leading-6`}>
          {product.properties.product_address}
        </DText>
      </View>

      <MapScreenByAddress
        key={product.id}
        markTitle={product.name}
        address={product.properties.product_address}
      />
    </>
  );
}
