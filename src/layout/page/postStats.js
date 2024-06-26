import tw from "../../../lib/tailwind";

import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

import DText from "../../ui/text/dText";

import getProductDate from "../../../helpers/formatters/product/getProductDate";

export default function PostStats({ product }) {
  return (
    <View
      style={tw`flex flex-row justify-between items-center mb-2.5 px-[15px]`}
    >
      <DText style={tw`text-sm`}>{getProductDate(product)}</DText>
      <DText style={tw`text-sm`}>№ {product.id}</DText>
      <View style={tw`flex flex-row items-center`}>
        <EyeIcon />
        <DText style={tw`ml-1 text-sm`}>
          {product.stat_views ? product.stat_views : 0}
        </DText>
      </View>
    </View>
  );
}

function EyeIcon() {
  return (
    <Svg
      width="14"
      height="9"
      viewBox="0 0 14 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M7 0C4.32515 0 1.89946 1.46343 0.109543 3.84044C-0.0365143 4.03518 -0.0365143 4.30725 0.109543 4.50199C1.89946 6.88186 4.32515 8.3453 7 8.3453C9.67485 8.3453 12.1005 6.88186 13.8905 4.50486C14.0365 4.31011 14.0365 4.03805 13.8905 3.84331C12.1005 1.46343 9.67485 0 7 0ZM7.19188 7.11097C5.41628 7.22266 3.94998 5.75923 4.06168 3.98077C4.15332 2.51447 5.34182 1.32597 6.80812 1.23433C8.58372 1.12263 10.05 2.58607 9.93832 4.36453C9.84382 5.82796 8.65531 7.01647 7.19188 7.11097ZM7.1031 5.7535C6.14657 5.81364 5.35614 5.02608 5.41915 4.06955C5.46783 3.27912 6.10934 2.64048 6.89977 2.58893C7.8563 2.52879 8.64672 3.31635 8.58372 4.27288C8.53217 5.06617 7.89066 5.70482 7.1031 5.7535Z"
        fill="#1F1F1F"
      />
    </Svg>
  );
}
