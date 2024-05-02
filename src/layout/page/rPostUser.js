import { useMemo } from "react";

import { TouchableOpacity, View } from "react-native";

import Paragraph from "../../ui/text/paragraph";
import RUserAvatar from "../profile/rUserAvatar";

import useProductsCount from "../../../hooks/products/useProductsCount";

import { colors } from "../../ui/config";
import { useSelector } from "react-redux";
import declension from "../../../helpers/formatters/declension";
import RCallButton from "./buttons/rCallButton";
import WsIcon from "../../ui/icons/wsIcon";
import RMessageButton from "./buttons/rMessageButton";

export default function RPostUser({ navigation, user, isButtons = false }) {
  const activeCity = useSelector((state) => state.userCity.value);

  const pCount = useProductsCount(
    useMemo(() => {
      return {
        user_id: user.id,
        published: "1",
        city_link: activeCity.id,
      };
    }, [user])
  );

  const productCountText = `${
    pCount?.products?.count ? pCount.products.count : ""
  } ${
    pCount?.products?.count
      ? declension(pCount?.products?.count, [
          "объявление",
          "объявления",
          "объявлений",
        ])
      : ""
  }`;

  const loadSearchPage = () => {
    // const agency = user?.user_agency ? `«${user?.user_agency}» ` : "";

    if (navigation) {
      navigation.push("SearchPage", {
        title: "Объявления от",
        user: user,
        filter: { user_id: user.id },
      });
    }
  };

  return (
    <View
      style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}
    >
      <TouchableOpacity
        activeOpacity={navigation ? "0.2" : 1}
        onPress={loadSearchPage}
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          borderColor: colors["grey-light"],
          paddingBottom: 14,
          alignItems: "center",
        }}
      >
        <RUserAvatar
          style={{
            width: 80,
            height: 80,
          }}
          avatar={user.user_avatar}
          name={user.user_name[0]}
        />

        <View>
          <Paragraph
            style={{ fontFamily: "Manrope_400Regular", marginBottom: 2 }}
            color="black-50"
            size="md"
          >
            Контактное лицо
          </Paragraph>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Paragraph size="xl">{user.user_name}</Paragraph>

            <View
              style={{
                backgroundColor: colors["grey-light"],
                paddingHorizontal: 11,
                paddingVertical: 6,
                borderRadius: 99,
              }}
            >
              <Paragraph size="sm">{productCountText}</Paragraph>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {isButtons && (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            marginBottom: 10,
            marginTop: -10,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <RCallButton
              style={{ flex: 1, borderRadius: 10 }}
              color="transparent"
              phone={user.phone}
            />
            <RMessageButton
              style={{ flex: 1, borderRadius: 10 }}
              icon={<WsIcon />}
              color="green"
              phone={user.phone}
            />
          </View>
        </View>
      )}
    </View>
  );
}
