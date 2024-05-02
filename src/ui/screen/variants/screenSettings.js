import api from "../../../../api/service/api";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Svg, { Rect, Path, Circle } from "react-native-svg";

import { TouchableOpacity, View, Dimensions, StyleSheet } from "react-native";

import Paragraph from "../../text/paragraph";
import {
  storeNotSeenNotificationsCount,
  storeNotifications,
} from "../../../store/user/notifications";

export default function ScreenSettings({
  title,
  route,
  navigation,
}) {
  const handleBack = async () => {
    // if (variant === "count") {
    //   const readNotifications = await api.set.notificationsRead(user);

    //   console.log(readNotifications, "readNotifications");
    // }

    navigation.goBack();
  };
  
  return (
    <>
      <TouchableOpacity onPress={handleBack}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={40}
          height={40}
          viewBox="0 0 40 40"
          fill="none"
        >
          <Rect width={40} height={40} rx={20} fill="#ECF2F8" />
          <Path
            d="M22.302 14l-6.15 6.15a.481.481 0 000 .7l6.15 6.15"
            stroke="#1A1F25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </TouchableOpacity>

      <View>
        <Paragraph
          numberOfLines={1}
          color="black"
          size="lg"
          style={{ fontFamily: "Manrope_700Bold" }}
        >
          {title}
        </Paragraph>
      </View>

        <TouchableOpacity
          style={{ marginLeft: "auto" }}
          onPress={() => navigation.navigate('User')}
        >
          <Paragraph color="blue">
          Редактировать
          </Paragraph>
        </TouchableOpacity>
    </>
  );
}
