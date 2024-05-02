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

export default function ScreenProfile({
  title,
  variant = "icon",
  route,
  navigation,
}) {
  const dispatch = useDispatch();

  const width = Dimensions.get("window").width;

  const toNotifications = async () => {
    navigation.navigate("Notifications");
  };

  const user = useSelector((state) => state.userLogin.value);

  const [notifications, setNotifications] = useState([]);
  const [notSeenNotificationsCount, setNotSeenNotificationsCount] =
    useState("");

  useEffect(() => {
    updateMsgNotifications();
    async function updateMsgNotifications() {
      if (user.id) {
        const notifications = await api.get.notificationsByUser(user.id);
        const notSeenNotificationsCount =
          await api.get.notificationsUnreadCount(user.id);
        console.log(notSeenNotificationsCount);
        if (notifications) {
          setNotifications(notifications);
          dispatch(storeNotifications(notifications));
        } else {
          setNotifications([]);
          dispatch(storeNotifications([]));
        }

        setNotSeenNotificationsCount(
          notSeenNotificationsCount?.count ? notSeenNotificationsCount.count : 0
        );
        dispatch(
          storeNotSeenNotificationsCount(
            notSeenNotificationsCount?.count
              ? notSeenNotificationsCount.count
              : 0
          )
        );
      }
    }
  }, [user]);

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

          {variant === "count" && (
            <Paragraph color="grey-medium" size="lg">
              {notSeenNotificationsCount && `  ${notSeenNotificationsCount}`}
            </Paragraph>
          )}
        </Paragraph>
      </View>

      {variant === "icon" && (
        <TouchableOpacity
          style={{ marginLeft: "auto" }}
          onPress={toNotifications}
        >
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={40}
            height={40}
            viewBox="0 0 40 40"
            fill="none"
          >
            <Rect width={40} height={40} rx={20} fill="#ECF2F8" />
            <Path
              d="M19 25.83a1.55 1.55 0 003 0M20.5 14a4.29 4.29 0 014.29 4.29c0 4.77 1.74 5.71 2.21 5.71H14c.48 0 2.21-.95 2.21-5.71A4.29 4.29 0 0120.5 14z"
              stroke="#1A1F25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {notSeenNotificationsCount && notSeenNotificationsCount > 0 && <Circle cx={24} cy={14} r={4} fill="#F92828" />}
          </Svg>
        </TouchableOpacity>
      )}
    </>
  );
}
