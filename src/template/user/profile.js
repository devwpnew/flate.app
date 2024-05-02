import api from "../../../api/service/api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, ScrollView } from "react-native";
import tw from "../../../lib/tailwind";

import DText from "../../ui/text/dText";

import Main from "../../layout/main/main";
import Footer from "../../layout/main/footer";

import UserActions from "../../layout/profile/userActions";
import UserAvatarLoad from "./profile/userAvatarLoad";
import { useRef } from "react";

export default function Profile({ navigation }) {
  const user = useSelector((state) => state.userLogin.value);
  const scrollViewRef = useRef(null);
  return (
    <Main>
      <ScrollView style={tw`bg-white h-full`}>
        <View style={tw`px-[15px]`}>
          <View style={tw`py-2.5 border-b mb-4 border-greyborder`}>
            <View style={tw`flex flex-row justify-start items-center mb-2.5`}>
              <View
                style={tw`w-[70px] h-[70px] text-3xl relative bg-bluelighter rounded-full`}
              >
                <UserAvatarLoad />
              </View>

              <View style={tw`flex flex-col ml-2.5`}>
                <DText style={tw`text-lg font-bold`}>{user.user_name}</DText>

                <DText style={tw`text-sm text-grey`}>{user.user_agency}</DText>
              </View>
            </View>

            <DText style={tw`text-xs text-grey`}>О себе</DText>
            <DText>{user.user_description}</DText>
          </View>

          <View style={tw`mb-5 pb-2.5`}>
            <UserActions navigation={navigation} />
          </View>
        </View>
        <View style={tw`h-[70px]`}></View>
      </ScrollView>
      <Footer scrollViewRef={scrollViewRef} navigation={navigation} />
    </Main>
  );
}
