import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import { View, TouchableOpacity, Share } from "react-native";

import tw from "../../../lib/tailwind";

import { HeaderBackButton } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";

import Button from "../button/button";
import DText from "../text/dText";

import truncate from "../../../helpers/formatters/truncate";
import FavoriteButton from "../../layout/product/item/buttons/favoriteButton";

export default function ScreenPageHeader({ route }) {
  const navigation = useNavigation();
  const product = route.params.product;

  const url = `https://flate.pro/posts/${product.section_relation[0].slug}/${product.slug}`;
  const message = `Посмотрите объявление! ${product.name} в ${product.city_link.name}\n\n${url}`;

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: message,
        url: '',
        title: message,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const link = product?.rc_link ? product.rc_link : product.building_link;

  const loadCategory = () => {
    if (product.building_link) {
      navigation.navigate("Category", {
        name: link.name,
        section: { ...link, building_id: link.id, slug: "building" },
      });
    }

    if (product?.rc_link) {
      navigation.navigate("Category", {
        name: link.name,
        section: { ...link, rc_id: link.id, slug: "rc" },
      });
    }
  };

  return (
    <View
      style={{
        marginTop: 45,
      }}
    >
      <View
        style={tw`bg-greylight border-b border-t border-greyborder px-[15px] py-2.5 flex flex-row items-center h-[60px]`}
      >
        <HeaderBackButton
          tintColor="#1F1F1F"
          onPress={() => navigation.goBack()}
        />

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <DText style={tw`font-bold`}>{truncate(product.name, 18)}</DText>
        </TouchableOpacity>

        <View
          style={{
            marginLeft: "auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
          }}
        >
          <FavoriteButton type="button" product={product} />

          {link ? (
            <Button
              onPress={loadCategory}
              type={"white"}
              style={{ height: 25, width: 45 }}
              icon={<IconMap />}
              iconContainerStyle={tw`w-full h-full flex justify-center items-center`}
            ></Button>
          ) : (
            ""
          )}

          <Button
            onPress={onShare}
            type={"white"}
            style={{ height: 25, width: 45 }}
            icon={<IconShare />}
            iconContainerStyle={tw`w-full h-full flex justify-center items-center`}
          ></Button>
        </View>
      </View>
    </View>
  );
}

function IconMap({ style, ...props }) {
  return (
    <Svg
      style={style}
      {...props}
      width={14}
      height={17}
      viewBox="0 0 14 17"
      fill="none"
      stroke={"#4BA5F8"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clipPath="url(#clip0_2906_4290)">
        <Path d="M13 7.167c0 4.666-6 8.666-6 8.666s-6-4-6-8.667a6 6 0 1112 0z" />
        <Path d="M7 9.166a2 2 0 100-4 2 2 0 000 4z" />
      </G>
      <Defs>
        <ClipPath id="clip0_2906_4290">
          <Path transform="translate(0 .5)" d="M0 0H14V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

function IconShare({ style, ...props }) {
  return (
    <Svg
      style={style}
      {...props}
      width={20}
      height={20}
      viewBox="0 0 14 15"
      fill="none"
      stroke={"#4BA5F8"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path d="M4.784 8.482l4.44 2.587M9.216 3.93L4.784 6.52M12.85 2.95a1.95 1.95 0 11-3.9 0 1.95 1.95 0 013.9 0zM5.05 7.5a1.95 1.95 0 11-3.9 0 1.95 1.95 0 013.9 0zm7.8 4.55a1.95 1.95 0 11-3.9 0 1.95 1.95 0 013.9 0z" />
    </Svg>
  );
}
