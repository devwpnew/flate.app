import api from "../../../api/service/api";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { Path, Svg } from "react-native-svg";
import {
  View,
  Dimensions,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from "react-native";
import tw from "../../../lib/tailwind";

import DText from "../../ui/text/dText";

import ButtonProfileShare from "../../ui/button/spec/buttonProfileShare";

import Main from "../../layout/main/main";
import Footer from "../../layout/main/footer";
import Wrapper from "../../layout/main/wrapper";

import useProducts from "../../../hooks/products/useProducts";
import ModalUserModerationAlert from "../../ui/modal/spec/modalUserModerationAlert";
import sortProducts from "../../../helpers/products/sortProducts";

import Container from "../../ui/common/container";
import Tabs from "../../ui/tabs/tabs";
import RDropdownSort from "../../ui/dropdown/spec/rDropdownSort";
import SortIcon from "../../ui/icons/sortIcon";
import Btn from "../../ui/button/btn";
import ProductProfile from "../../layout/product/item/type/productProfile";
import RProductPreloader from "../../ui/preloader/rProductPreloader";
import { Share } from "../../layout/profile/icons/icons";
import { useRoute } from "@react-navigation/native";
import { userModerationHandler } from "../../../helpers/user/user";
import { setLogedIn } from "../../store/global/user/userLogin";
import { setFetchState } from "../../store/global/helpers/fetchTrigger";

export default function Items({ navigation }) {
  const route = useRoute();

  const [sort, setSort] = useState({ date_published: "DESC" });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isFetch = useSelector((state) => state.fetchTrigger.value);

  const dispatch = useDispatch()

  const user = useSelector((state) => state.userLogin.value);

  const [items, setItems] = useState([]);
  const [moderated, setModerated] = useState([]);
  const [archive, setArchive] = useState([]);

  const products = useProducts(
    useMemo(() => {
      if (sort?.rc_link) return;

      return {
        sort: {
          ...sort,
        },
        filter: {
          user_id: user.id,
        },
      };
    }, [route.key, user, sort, isRefreshing])
  );

  useEffect(() => {
    if (!products.data) return;
    if (sort?.rc_link) return;

    const items = products?.data
      ? products.data?.filter((p) => p.published === 1)
      : [];
    const moderated = products?.data
      ? products.data?.filter((p) => p.published === 0)
      : [];
    const archive = products?.data
      ? products.data?.filter((p) => p.published !== 1 && p.published !== 0)
      : [];

    setItems(items);
    setModerated(moderated);
    setArchive(archive);
  }, [products.data]);

  useEffect(() => {
    if (sort?.rc_link) {
      const sortId = { id: `rc_link-${sort.rc_link}` };

      const rcLinkSortedProducts = sortProducts(sortId, items);
      const rcLinkSortedModerated = sortProducts(sortId, moderated);
      const rcLinkSortedArchive = sortProducts(sortId, archive);

      setItems(rcLinkSortedProducts);
      setModerated(rcLinkSortedModerated);
      setArchive(rcLinkSortedArchive);

      return;
    }
  }, [sort]);

  const onItemUpdate = async (itemId, type) => {
    if (!itemId) {
      console.log("NO_ITEM_ID");
      return;
    }

    if (type === "activated") {
      const archivedItem = archive.find((p) => p.id === itemId);
      const filteredItems = archive.filter((p) => p.id !== itemId);

      setArchive(filteredItems);
      setModerated((arItems) => [...arItems, archivedItem]);
    }

    if (type === "archived") {
      const activeItem = archive.find((p) => p.id === itemId);
      const filteredItems = archive.filter((p) => p.id !== itemId);

      setArchive(filteredItems);
      setArchive((arActiveItems) => [...arActiveItems, activeItem]);
    }

    if (type === "deleted") {
      const filteredItems = archive.filter((p) => p.id !== itemId);
      setArchive(filteredItems);
    }

    onRefresh();
  };

  const onRefresh = async () => {
    setIsRefreshing(true);

    setSort({ date_published: "DESC" });

    dispatch(setFetchState(!isFetch));
    setIsRefreshing(false);
  };

  //
  const [activeSectionId, setActiveSectionId] = useState(
    route?.params?.tabName ? route.params.tabName : "items"
  );

  useEffect(() => {
    if (!route.params?.tabName) return;

    onRefresh();
    setActiveSectionId(route.params.tabName);
  }, [route.params?.tabName]);

  const itemsTabs = [
    {
      text: "Активные",
      id: "items",
      badge: items?.length ? items.length : "0",
    },
    {
      text: "Ждут действия",
      id: "moderated",
      badge: moderated?.length ? moderated.length : "0",
    },
    {
      text: "Архив",
      id: "archive",
      badge: archive?.length ? archive.length : "0",
    },
  ];

  const pStyle = {
    width: Dimensions.get("window").width - 20,
    height: Math.floor(Dimensions.get("window").width / 1.5),
    marginBottom: 20,
  };

  return (
    <Main>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        <Wrapper>
          <Container>
            <View style={styles.header}>
              <View>
                <ButtonProfileShare
                  isDisabled={items?.length === 0}
                  icon={<Share />}
                  style={{
                    borderRadius: 100,
                  }}
                  innerStyle={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 14,
                    paddingRight: 14,
                  }}
                  color={"gradient-border-light"}
                >
                  Поделиться моими объявлениями
                </ButtonProfileShare>
              </View>

              <View>
                <RDropdownSort
                  rounded={true}
                  leftWidth={15}
                  left={<SortIcon order={Object.values(sort)[0]} />}
                  onDonePress={(sort) => setSort(sort)}
                />
              </View>
            </View>
          </Container>

          <Tabs
            style={{ marginVertical: 20 }}
            variant="underscore"
            isLoading={false}
            getActiveTabId={setActiveSectionId}
            activeTabId={activeSectionId}
            tabs={itemsTabs}
          />

          <Container>
            {products.isLoading ? (
              <RProductPreloader
                amount={4}
                style={{ ...pStyle, borderRadius: 10 }}
              />
            ) : (
              <>
                {activeSectionId === "items" && (
                  <>
                    {items && items?.length ? (
                      <>
                        {items.map((product) => {
                          return (
                            <>
                              <ProductProfile
                                key={product.id}
                                wrapperStyle={pStyle}
                                product={product}
                                onEditFinish={onItemUpdate}
                              />
                            </>
                          );
                        })}
                      </>
                    ) : (
                      <Fallback
                        navigation={navigation}
                        text={"У вас нет объявлений"}
                      />
                    )}
                  </>
                )}

                {activeSectionId === "moderated" && (
                  <>
                    {moderated && moderated?.length ? (
                      moderated.map((product) => {
                        return (
                          <ProductProfile
                            key={product.id}
                            wrapperStyle={pStyle}
                            product={product}
                            onEditFinish={onItemUpdate}
                          />
                        );
                      })
                    ) : (
                      <Fallback
                        navigation={navigation}
                        text={"У вас нет объявлений на модерации"}
                      />
                    )}
                  </>
                )}

                {activeSectionId === "archive" && (
                  <>
                    {archive && archive?.length ? (
                      archive.map((product) => {
                        return (
                          <ProductProfile
                            key={product.id}
                            wrapperStyle={pStyle}
                            product={product}
                            onEditFinish={onItemUpdate}
                          />
                        );
                      })
                    ) : (
                      <Fallback
                        navigation={navigation}
                        text={"У вас нет объявлений в архиве"}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </Container>
        </Wrapper>
      </ScrollView>
      <Footer navigation={navigation} />
    </Main>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

function Fallback({ navigation, text }) {
  const user = useSelector((state) => state.userLogin.value);
  const dispatch = useDispatch();
  const [openUserModerationModal, setOpenUserModerationModal] = useState(false);

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
      <View
        style={tw`flex flex-col gap-5 items-center justify-center mx-auto my-5`}
      >
        <Svg
          width={207}
          height={187}
          viewBox="0 0 207 187"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M143.073 104.382c.667 1.619.935 3.375.781 5.119a10.915 10.915 0 01-5.398 8.492 10.924 10.924 0 01-4.967 1.466l-59.781 2.98 11.161 26.94a6.195 6.195 0 01-2.454 8.298l-10.11 4.149a5.842 5.842 0 01-7.597-4.091l-11.687-28.751-3.623 1.52a12.383 12.383 0 01-9.522.02 12.376 12.376 0 01-6.724-6.741l-7.188-17.531a12.448 12.448 0 016.72-16.304l18.76-7.772 48.502-44.12a10.868 10.868 0 0117.532 3.915l25.595 62.411zm-.292-36.173a5.84 5.84 0 005.376 3.623 6.367 6.367 0 002.279-.467l22.966-9.525a5.84 5.84 0 003.214-7.597 5.832 5.832 0 00-3.157-3.203 5.846 5.846 0 00-4.498-.011l-23.024 9.525a5.837 5.837 0 00-3.168 3.172 5.849 5.849 0 00.012 4.483zm32.667 14.434l-24.895-1.11a5.845 5.845 0 00-6.077 5.61 5.849 5.849 0 005.61 6.078l24.836 1.11h.292a5.843 5.843 0 100-11.688h.234zm-41.257-28.4a5.842 5.842 0 004.09-1.695l17.532-17.531a5.869 5.869 0 00-8.299-8.298l-17.531 17.53a5.842 5.842 0 00.885 9.02c.967.641 2.104.98 3.264.974h.059z"
            fill="#A5D2FB"
          />
        </Svg>
        <DText style={tw`text-base font-bold text-center`}>{text}</DText>
        <View style={tw`max-w-[255px]`}>
          <View navigation={navigation} screen={"Add"}>
            <Btn onPress={onNavigateToAddPage}>Разместить объявление</Btn>
          </View>
        </View>
      </View>
      <ModalUserModerationAlert
        modalVisible={openUserModerationModal}
        setModalVisible={setOpenUserModerationModal}
      />
    </>
  );
}
