import * as Linking from "expo-linking";
import { useEffect, useState } from "react";

import { SafeAreaView, StatusBar } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import * as Application from "expo-application";

import { handleDeepLink } from "../../ui/linkhandlers";
import { colors } from "../../ui/config";
import { useDispatch, useSelector } from "react-redux";
import { storeDeepLink } from "../../store/app/deeplink";

export default function Main({ style, isHiddenStatusBar = false, children }) {
  const navigation = useNavigation();

  const user = useSelector((state) => state.userLogin.value);

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      if (!user.user_name || !user.professional_confirmation) {
        navigation.replace("Registration");
      }
    }
  }, [user?.user_name, user?.professional_confirmation]);

  return (
    <SafeAreaView
      style={{ backgroundColor: colors["white"], height: "100%", ...style }}
    >
      <StatusBar
        hidden={isHiddenStatusBar}
        animated={true}
        backgroundColor="#61dafb"
      />
      <>{children}</>
    </SafeAreaView>
  );
}
