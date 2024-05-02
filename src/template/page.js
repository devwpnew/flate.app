import { useRef, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import tw from "../../lib/tailwind";

import Main from "../layout/main/main";
import Footer from "../layout/main/footer";
import PostDescription from "../layout/page/postDescription";
import H1 from "../ui/heading/h1";
import PostSocials from "../layout/page/postSocials";
import PostGallery from "../layout/page/postGallery";
import CallButton from "../layout/page/buttons/callButton";
import MessageButton from "../layout/page/buttons/messageButton";
import PostProperties from "../layout/page/postProperties";
import PostJk from "../layout/page/postJk";
import PostRelated from "../layout/page/postRelated";
import PostMap from "../layout/page/postMap";

import DText from "../ui/text/dText";

import getProductAddress from "../../helpers/formatters/product/getProductAddress";
import getProductPrice from "../../helpers/formatters/product/getProductPrice";
import getProductPriceSquares from "../../helpers/formatters/product/getProductPriceSquares";
import getProductPhone from "../../helpers/formatters/product/getProductPhone";
import PostStats from "../layout/page/postStats";
import PostUser from "../layout/page/postUser";

export default function Page({ navigation, route }) {
  const isFocused = useIsFocused();

  useEffect(() => {
    // Логика, выполняемая при каждом изменении навигации

    if (isFocused) {
      scrollToTop();
      // Дополнительные действия при фокусе на экране
    } else {
      // // console.log("Page Screen is blurred");
      // Дополнительные действия при потере фокуса с экрана
    }

    return () => {
      // Логика, выполняемая при размонтировании компонента
    };
  }, [route, isFocused]);

  const scrollViewRef = useRef();
  const scrollToTop = () => {
    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
  };

  const product = route.params.product;

  const gallery = product?.properties?.product_galery?.split(",");

  return (
    <Main>
      <ScrollView ref={scrollViewRef}>
        <View>
          <PostGallery galleryImages={gallery} />
        </View>

        <DText style={tw`text-sm -mt-2.5 mb-2.5 px-[15px]`}>
          {getProductAddress(product)}
        </DText>
        <View style={tw`mb-2.5 px-[15px]`}>
          <H1>{product.name}</H1>
        </View>

        <View style={tw`flex flex-col gap-1 mb-2.5 px-[15px]`}>
          <DText style={tw`text-primary text-2xl font-bold`}>
            {getProductPrice(product)} руб.
          </DText>
          <DText style={tw`text-base font-open-sans`}>
            {getProductPriceSquares(product)} руб. за{" "}
            {product.section_relation[0].slug === "land" ? "сотку" : "м2"}
          </DText>
        </View>

        <View style={tw`flex flex-row items-center justify-between px-[15px]`}>
          <View style={tw`h-10 w-[49%]`}>
            <CallButton phone={getProductPhone(product)} />
          </View>
          <View style={tw`h-10 w-[49%]`}>
            <MessageButton product={product} />
          </View>
        </View>
        <PostProperties product={product} />

        <PostDescription description={product.product_description} />

        <PostJk
          navigation={navigation}
          rc_link={product.rc_link}
          building_link={product.building_link}
        />

        <PostMap product={product} />

        <PostSocials product={product} />

        <PostStats product={product} />

        <PostUser navigation={navigation} product={product} />

        <PostRelated product={product} navigation={navigation} />

        <View style={tw`h-[70px]`}></View>
      </ScrollView>

      <Footer navigation={navigation} />
    </Main>
  );
}
