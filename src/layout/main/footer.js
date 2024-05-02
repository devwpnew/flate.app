import { useEffect, useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Keyboard,
  Platform,
} from "react-native";

import ModalUserModerationAlert from "../../ui/modal/spec/modalUserModerationAlert";
import Paragraph from "../../ui/text/paragraph";

import { colors } from "../../ui/config";
import { setAddForm } from "../../store/global/addForm/addForm";
import Btn from "../../ui/button/btn";
import Container from "../../ui/common/container";
import { userModerationHandler, userHandler } from "../../../helpers/user/user";
import { setLogedIn } from "../../store/global/user/userLogin";
import {
  HomeIcon,
  ItemsIcon,
  LkIcon,
  MoreIcon,
  SearchIcon,
} from "../icons/icons";
import ModalCreateCollections from "../../ui/modal/spec/modalCreateCollections.js";

export default function Footer({ scrollViewRef, navigation }) {
  const [openUserModerationModal, setOpenUserModerationModal] = useState(false);

  const route = useRoute();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLogin.value);

  const scrollToTop = () => {
    if (!scrollViewRef || !scrollViewRef.current) return;
    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
  };

  const [keyboardStatus, setKeyboardStatus] = useState("closed");

  const keyboardDidShowListener = useRef();
  const keyboardDidHideListener = useRef();

  useEffect(() => {
    if (Platform.OS === "ios") return;

    // Добавьте слушателей событий клавиатуры
    keyboardDidShowListener.current = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardStatus("opened");
      }
    );

    keyboardDidHideListener.current = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardStatus("closed");
      }
    );

    // Очистите слушателей событий при размонтировании компонента
    return () => {
      keyboardDidShowListener.current.remove();
      keyboardDidHideListener.current.remove();
    };
  }, []);

  const onNavigateToAddPage = async () => {
    if (user && Object.keys(user).length > 0) {
      if (user.user_group?.id === 6) {
        const userModeration = await userModerationHandler(user.id);

        if (userModeration) {
          dispatch(setLogedIn(userModeration));
          dispatch(setAddForm({}));
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

  const [isShowModalCreateCollection, setIsShowModalCreateCollection] =
    useState(false);

  return (
    <>
      {keyboardStatus === "closed" && (
        <View style={styles.container}>
          {route.name === "Items" && (
            <View style={{ marginBottom: 9 }}>
              <Container>
                <View style={styles.btnWrapper}>
                  <View style={styles.btnContainer}>
                    <Btn
                      innerStyle={styles.btnInner}
                      buttonStyle={styles.btnStyle}
                      onPress={onNavigateToAddPage}
                    >
                      Добавить объявление
                    </Btn>
                  </View>
                </View>
              </Container>
            </View>
          )}

          {route.name === "Collections" && (
            <>
              <View style={{ marginBottom: 9 }}>
                <Container>
                  <View style={styles.btnWrapper}>
                    <View style={styles.btnContainer}>
                      <Btn
                        innerStyle={styles.btnInner}
                        buttonStyle={styles.btnStyle}
                        onPress={() => setIsShowModalCreateCollection(true)}
                      >
                        Добавить подборку
                      </Btn>
                    </View>
                  </View>
                </Container>
              </View>
            </>
          )}

          <View style={styles.row}>
            <Container>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    width: 63.5,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Home");
                      scrollToTop();
                    }}
                    style={styles.item}
                  >
                    {route.name === "Home" ? (
                      <HomeIcon active={true} />
                    ) : (
                      <HomeIcon />
                    )}

                    <Paragraph color="grey-dark" size="sm" style={styles.name}>
                      Главная
                    </Paragraph>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: 63.5,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      userHandler(navigation, user, () => {
                        if (route.name === "Search") {
                          navigation.goBack();
                        } else {
                          navigation.navigate("Search", {
                            slug: "flats",
                            title: "Поиск",
                            isReset: true,
                            isTopButtons: true,
                          });
                          // loadSearch(route, navigation)
                        }
                      });
                    }}
                    style={styles.item}
                  >
                    {route.name === "Category" ||
                    route.name === "Search" ||
                    route.name === "SearchPage" ? (
                      <SearchIcon active={true} />
                    ) : (
                      <SearchIcon />
                    )}

                    <Paragraph color="grey-dark" size="sm" style={styles.name}>
                      Поиск
                    </Paragraph>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: 100,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      userHandler(navigation, user, () =>
                        navigation.navigate("Items")
                      )
                    }
                    style={{
                      ...styles.item,
                      // position: "relative",
                    }}
                  >
                    <ItemsIcon />

                    {/* <View style={{ height: 15 }}></View> */}
                    <Paragraph color="grey-dark" size="sm" style={styles.name}>
                      Мои объявления
                    </Paragraph>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: 63.5,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() =>
                      userHandler(navigation, user, () =>
                        navigation.navigate("Lk")
                      )
                    }
                  >
                    {route.name === "Lk" ? (
                      <LkIcon active={true} />
                    ) : (
                      <LkIcon />
                    )}
                    <Paragraph color="grey-dark" size="sm" style={styles.name}>
                      Кабинет
                    </Paragraph>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: 63.5,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      userHandler(navigation, user, () =>
                        navigation.navigate("Profile")
                      )
                    }
                    style={styles.item}
                  >
                    {route.name === "Profile" ? (
                      <MoreIcon active={true} />
                    ) : (
                      <MoreIcon />
                    )}

                    <Paragraph color="grey-dark" size="sm" style={styles.name}>
                      Ещё
                    </Paragraph>
                  </TouchableOpacity>
                </View>
              </View>
            </Container>
          </View>
        </View>
      )}
      <ModalCreateCollections
        templateName="create"
        modalVisible={isShowModalCreateCollection}
        setModalVisible={setIsShowModalCreateCollection}
      />
      <ModalUserModerationAlert
        modalVisible={openUserModerationModal}
        setModalVisible={setOpenUserModerationModal}
      />
    </>
  );
}

const styles = StyleSheet.create({
  btn: {},
  btnWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    width: 220,
    shadowColor: "#FFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 10,
  },
  btnInner: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  btnStyle: {
    borderRadius: 30,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: Dimensions.get("screen").width,
    gap: 4,
    paddingTop: 10,
    paddingBottom: Platform.OS === "android" ? 10 : 34,
    backgroundColor: colors["white"],
  },
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
    height: 33,
    textAlign: "center",
  },
  name: {
    textAlign: "center",
    width: "100%",
    fontSize: 10,
  },
});
