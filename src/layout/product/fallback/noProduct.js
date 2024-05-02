import { useNavigation } from "@react-navigation/native";

import BannerItem from "../../news/item/bannerItem";
import { useDispatch, useSelector } from "react-redux";
import { userModerationHandler } from "../../../../helpers/user/user";
import { setLogedIn } from "../../../store/global/user/userLogin";
import ModalUserModerationAlert from "../../../ui/modal/spec/modalUserModerationAlert";
import { useState } from "react";

export default function NoProduct({ isPremium, style }) {
  const user = useSelector((state) => state.userLogin.value);

  const [openUserModerationModal, setOpenUserModerationModal] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

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
      } else {
        navigation.navigate("Add");
      }
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <>
      {isPremium ? (
        <BannerItem
          style={style}
          variant="vertical"
          onPress={() => navigation.navigate("Payment")}
          image={require("../../../../assets/adv-banner-premium.jpg")}
          heading={"Ваше объявление увидят все пользователи"}
          link={"Разместить премиум"}
        />
      ) : (
        <BannerItem
          style={style}
          variant="vertical"
          onPress={onNavigateToAddPage}
          image={require("../../../../assets/adv-banner-no-products.jpeg")}
          heading={"В этой категории пока нет объявлений. Будь первым"}
          link={"Разместить"}
        />
      )}
      <ModalUserModerationAlert
        modalVisible={openUserModerationModal}
        setModalVisible={setOpenUserModerationModal}
      />
    </>
  );
}
