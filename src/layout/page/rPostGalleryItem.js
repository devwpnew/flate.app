import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import { Image, TouchableOpacity, View, Dimensions } from "react-native";
import ProductImage from "../product/item/type/productImage";

const { width, height } = Dimensions.get("window");

export default function RPostGalleryItem({ zoom, style, onPress, ...props }) {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => onPress(props.source.uri)}
        style={{
          ...style,
          position: "relative",
        }}
      >
        {/* {!zoom && (
          <View
            style={{
              ...style,
              position: "absolute",
              left: 0,
              top: 0,
              zIndex: -10,
            }}
          >
            <Image
              style={{ ...style, opacity: 0.5 }}
              blurRadius={5}
              {...props}
            />
          </View>
        )} */}

        {zoom ? (
          <ImageZoom
            {...props}
            resizeMode="contain"
            style={{ width: width, height: 390 }}
            uri={props.source.uri}
          />
        ) : (
          <Image
            style={{ ...style, width: width }}
            resizeMode="contain"
            {...props}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}
