import api from "../../../api/service/api";

import { useIsFocused } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native";
import { storeNotSeenNotificationsCount } from "../../store/user/notifications";

import Main from "../../layout/main/main";
import Footer from "../../layout/main/footer";

import Container from "../../ui/common/container";

import NotificationItem from "./notifications/notificationItem";
import BannerItem from "../../layout/news/item/bannerItem";
import Wrapper from "../../layout/main/wrapper";
import { setLogedIn } from "../../store/global/user/userLogin";
import { userModerationHandler } from "../../../helpers/user/user";
import ModalUserModerationAlert from "../../ui/modal/spec/modalUserModerationAlert";

export default function Notifications({ navigation }) {
  const dispatch = useDispatch();
  const scrollViewRef = useRef(null);

  const user = useSelector((state) => state.userLogin.value);
  const notifications = useSelector(
    (state) => state.notifications.value.notifications
  );

  const [openUserModerationModal, setOpenUserModerationModal] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    return () => {
      (async () => {
        const readNotifications = await api.set.notificationsRead(user);

        if (readNotifications?.data?.itemId) {
          dispatch(storeNotSeenNotificationsCount([]));
        }
      })();
    };
  }, [isFocused]);

  const onNavigateToAddPage = async () => {
    if (user && Object.keys(user).length > 0) {
      if (user.user_group?.id === 6) {
        const userModeration = await userModerationHandler(user.id);

        if (userModeration) {
          dispatch(setLogedIn(userModeration));
          navigation.navigate("Add");
        } else {
          setOpenUserModerationModal(true);
        }

        return;
      }else {
        navigation.navigate("Add");
      }
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <Main>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Wrapper>
          <Container>
            {notifications.length > 0 ? (
              notifications.map((notification) => {
                return (
                  <NotificationItem
                    style={{ marginBottom: 10 }}
                    title={notification?.title}
                    text={notification?.text}
                    date={notification?.date_created}
                    isSeen={notification?.user_id?.date_notifications_read}
                    productId={notification?.product_id}
                  />
                );
              })
            ) : (
              <BannerItem
                variant="vertical"
                onPress={onNavigateToAddPage}
                image={require("../../../assets/adv-banner-no-products.jpeg")}
                heading={"Пока нет уведомлений"}
                link={"Разместить объявление"}
              />
            )}
          </Container>
        </Wrapper>
      </ScrollView>
      <ModalUserModerationAlert
        modalVisible={openUserModerationModal}
        setModalVisible={setOpenUserModerationModal}
      />
      <Footer scrollViewRef={scrollViewRef} navigation={navigation} />
    </Main>
  );
}
