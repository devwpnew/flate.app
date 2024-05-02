import { useNavigation } from "@react-navigation/native";

import ProductProfile from "./type/productProfile";
import ProductFavorite from "./type/productFavorite";
import ProductPremium from "./type/productPremium";
import ProductDefault from "./type/productDefault";

import { getProductAddressNew } from "../../../../helpers/product/getters";

export default function Product({
  type,
  isModeration,
  wrapperStyle,
  product,
  callRefresh,
  propsStyle,
  ...props
}) {
  const navigation = useNavigation();

  const isArchive = product?.published == 2;

  const loadPage = () => {
    const address = getProductAddressNew(product);

    navigation.push("Page", { name: address, product: product });
  };

  const loadEditPage = () => {
    navigation.navigate("EditPage", { pName: product.name, product: product });
  };

  if (type === "profile") {
    return (
      <ProductProfile
        isModeration={isModeration}
        navigation={navigation}
        callRefresh={callRefresh}
        loadScreen={isModeration || isArchive ? loadEditPage : loadPage}
        loadEditScreen={loadEditPage}
        product={product}
        wrapperStyle={wrapperStyle}
      />
    );
  }

  if (type === "premium") {
    return (
      <ProductPremium
        wrapperStyle={wrapperStyle}
        navigation={navigation}
        loadScreen={loadPage}
        product={product}
      />
    );
  }

  if (type === "favorite") {
    return (
      <ProductFavorite
        wrapperStyle={wrapperStyle}
        navigation={navigation}
        loadScreen={loadPage}
        product={product}
        {...props}
      />
    );
  }

  return (
    <ProductDefault
      propsStyle={propsStyle}
      wrapperStyle={wrapperStyle}
      navigation={navigation}
      loadScreen={loadPage}
      product={product}
    />
  );
}
