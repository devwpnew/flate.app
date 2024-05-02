import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

import Btn from "../../ui/button/btn";
import MapIcon from "../../ui/icons/mapIcon";
import RMapScreenByAddress from "../map/rMapScreenByAddress";
import Paragraph from "../../ui/text/paragraph";
import RModal from "../../ui/modal/rModal";

export default function PostMap({ variant = "default", product }) {
  const [isShowMap, setIsShowMap] = useState(false);

  return (
    <>
      {variant === "default" ? (
        <View style={{ paddingBottom: 24 }}>
          <Btn
            style={{ marginBottom: isShowMap ? 14 : 0 }}
            icon={<MapIcon />}
            color="transparent"
            onPress={() => setIsShowMap((prev) => !prev)}
          >
            {isShowMap ? "Скрыть карту" : "Показать на карте"}
          </Btn>
        </View>
      ) : (
        <Paragraph
          onPress={() => setIsShowMap((prev) => !prev)}
          color="blue"
          size="md"
        >
          {isShowMap ? " Скрыть карту" : " На карте"}
        </Paragraph>
      )}
     

      {isShowMap && (
        <RMapScreenByAddress
          key={product.id}
          markTitle={product.name}
          address={product.properties.product_address}
        />
      )}
    </>
  );
}
