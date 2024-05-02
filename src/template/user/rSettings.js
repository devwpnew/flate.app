import api from "../../../api/service/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogedIn } from "../../store/global/user/userLogin";

import { View, StyleSheet, Image, Alert, TouchableOpacity } from "react-native";

import { ScrollView } from "react-native";
import { getImageSource } from "./profile/rUserAvatarLoad";

import FileIcon from "../../ui/icons/fileIcon";
import Main from "../../layout/main/main";
import Container from "../../ui/common/container";
import Wrapper from "../../layout/main/wrapper";
import Paragraph from "../../ui/text/paragraph";
import Btn from "../../ui/button/btn";
import ProfileList from "../../layout/profile/profileList";

import { Enter, Delete, Edit, Share } from "../../layout/profile/icons/icons";
import { Defs, LinearGradient, Stop, Svg, TSpan, Text } from "react-native-svg";
import { colors } from "../../ui/config";
import Footer from "../../layout/main/footer";
import ButtonProfileShare from "../../ui/button/spec/buttonProfileShare";
import { setFavorites } from "../../store/global/user/userFavorites";
import { CommonActions } from "@react-navigation/native";

export default function Settings({ navigation }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userLogin.value);
  const [userAvatar, setUserAvatar] = useState(null);

  useEffect(() => {
    if (user?.user_avatar) {
      setUserAvatar(user.user_avatar);
    }
  }, [user]);

  const exitAccount = async () => {
    try {
      await AsyncStorage.removeItem("userToken");

      navigation.dispatch(CommonActions.navigate("Home"));

      // navigation.navigate("", {
      //   disallowBack: true,
      // });
      
      dispatch(setLogedIn({}));
      dispatch(setFavorites([]));
    } catch (e) {
      console.log(e);
    }
  };

  const deleteAccount = async () => {
    try {
      await AsyncStorage.removeItem("userToken");

      const res = await api.remove.user({ id: user.id });

      if (res) {
        dispatch(setLogedIn({}));
        dispatch(setFavorites([]));

        navigation.navigate("Home");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const alertExit = async () => {
    Alert.alert("Вы уверены?", "Вы выходите из аккаунта", [
      {
        text: "Отмена",
        onPress: () => console.log("1"),
        style: "cancel",
      },
      { text: "Да", onPress: () => exitAccount() },
    ]);
  };

  const alertDelete = async () => {
    Alert.alert("Удалить аккаунт?", "Действие нельзя отменить", [
      {
        text: "Отмена",
        onPress: () => console.log("1"),
        style: "cancel",
      },
      { text: "Да", onPress: () => deleteAccount() },
    ]);
  };

  const profileList = [
    {
      icon: <Enter />,
      name: "Выйти",
      cb: () => alertExit(),
    },
    {
      icon: <Delete />,
      name: "Удалить аккаунт",
      cb: () => alertDelete(),
      noArrow: true,
      noBorderBottom: true,
    },
  ];

  return (
    <Main>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Wrapper>
          <Container>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.circle}
                onPress={() => navigation.navigate("User")}
              >
                {userAvatar ? (
                  <Image
                    style={{ width: 120, height: 120 }}
                    source={getImageSource(userAvatar)}
                  />
                ) : (
                  <FileIcon />
                )}
              </TouchableOpacity>
              <View style={styles.info}>
                {user?.sef_code && (
                  <Paragraph
                    style={{ marginBottom: 8 }}
                    size="md"
                    color="green-dark"
                  >
                    @{user.sef_code}
                  </Paragraph>
                )}

                <Paragraph size="xl">{user.user_name}</Paragraph>
                <Paragraph
                  style={{ marginBottom: 8 }}
                  size="md"
                  color="grey-dark"
                >
                  {user.user_agency}
                </Paragraph>
                <Paragraph size="sm" color="grey-dark">
                  {user.user_description}
                </Paragraph>
              </View>
            </View>
            <ButtonProfileShare
              icon={<Share />}
              color="greyLight"
              style={{ marginBottom: 10 }}
            >
              Поделиться моими объявлениями
            </ButtonProfileShare>

            <Paragraph
              style={{ marginBottom: 40, textAlign: "center" }}
              size="sm"
              color="grey-dark"
            >
              Пусть наше комьюнити растёт :)
            </Paragraph>

            <ProfileList list={profileList} />
          </Container>
        </Wrapper>
      </ScrollView>
      <Footer navigation={navigation} />
    </Main>
  );
}

const styles = StyleSheet.create({
  circle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
    overflow: "hidden",
    width: 120,
    height: 120,
    backgroundColor: colors["grey-light"],
  },
  header: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 20,
    alignItems: "center",
    marginBottom: 40,
  },
  info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
