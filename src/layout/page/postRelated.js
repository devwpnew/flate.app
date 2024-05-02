import { useMemo } from "react";
import { View } from "react-native";
import tw from "../../../lib/tailwind";

import Product from "../product/item/product";
import H2 from "../../ui/heading/h2";

import useProductsRelated from "../../../hooks/products/useProductsRelated";
import useProductsCountRelated from "../../../hooks/products/useProductsCountRelated";
import Preloader from "../../ui/preloader/preloader";

export default function PostRelated({ product, navigation }) {
  const filter = {
    published: "1",
  };

  if (product?.rc_link) {
    filter["rc_link"] = product.rc_link.id;
  } else {
    if (product?.building_link) {
      filter["building_link"] = product.building_link.id;
    }
  }

  if (!product.building_link && !product?.rc_link) {
    filter["rc_link"] = 99999;
  }

  const related = useProductsRelated(
    useMemo(() => {
      return {
        filter: {
          id: `!=${product.id}`,
          ...filter,
        },
        filter_related: {
          id: `!=${product.id}`,
          published: "1",
          area_link: product.area_link,
          product_price: product.product_price,
        },
        limit: 3,
      };
    }, [])
  );
  const relatedCount = useProductsCountRelated(
    useMemo(() => {
      return { ...filter };
    }, [])
  );

  return (
    <>
      {related?.isLoading ? (
        <Preloader style={tw`h-[425px] w-full`} />
      ) : (
        <>
          {related?.data &&
            related?.data?.length &&
            relatedCount?.products?.count > 0 && (
              <View style={tw`bg-greylight pb-4`}>
                <View style={tw`px-[15px] pt-[15px]`}>
                  <H2>
                    {related?.isOther
                      ? "Другие предложения"
                      : "Ещё в этом доме"}
                  </H2>
                  <View style={tw`flex flex-col mt-[15px] gap-2.5`}>
                    {related?.data.map((product, index) => {
                      return (
                        <Product
                          key={product.id}
                          navigation={navigation}
                          product={product}
                          type={"horizontal"}
                        />
                      );
                    })}
                  </View>
                </View>
              </View>
            )}
        </>
      )}
    </>
  );
}
