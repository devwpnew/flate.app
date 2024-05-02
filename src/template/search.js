import { useState } from "react";
import { View, Dimensions } from "react-native";

import Container from "../ui/common/container";
import Main from "../layout/main/main";
import Footer from "../layout/main/footer";

import RFilter from "../layout/category/rFilter";
import Tabs from "../ui/tabs/tabs";
import ModalSearchRc from "../ui/modal/spec/modalSearchRc";

import { colors } from "../ui/config";

const { width } = Dimensions.get("screen");

const isSmallDevice = width < 390;

export default function Search({ route, navigation }) {
  const [searchModalShow, setSearchModalShow] = useState(false);

  let topTabs = [];

  if (route.params?.isReset) {
    topTabs = [
      {
        text: isSmallDevice ? "По параметрам" : "Поиск по параметрам",
        id: "search-filter",
      },
      {
        text: isSmallDevice ? "Поиск по ЖК" : "Поиск по ЖК",
        id: "search-jk",
      },
    ];
  }

  return (
    <>
      <Main>
        <View
          style={{
            marginTop: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            overflow: "hidden",
            paddingTop: 20,
            backgroundColor: colors["grey-light"],
            height: "100%",
          }}
        >
          {/* {route.params?.isTopButtons && ( */}
          <>
            {Boolean(topTabs.length) && (
              <View
                style={{
                  marginBottom: 20,
                }}
              >
                <Tabs
                  isSetActiveTab={false}
                  isLoading={false}
                  activeTabId={"search-filter"}
                  getActiveTabId={(id) =>
                    id === "search-jk" && setSearchModalShow(true)
                  }
                  tabs={topTabs}
                />
              </View>
            )}

            <ModalSearchRc
              autoFocus={true}
              isCanGoBack={false}
              searchModalShow={searchModalShow}
              setSearchModalShow={setSearchModalShow}
            />
          </>
          {/* )} */}

          <Container>
            <RFilter
              initialFilter={route.params?.filter}
              slug={route?.params?.slug}
              isReset={route?.params?.isReset ? route?.params.isReset : false}
            />
          </Container>
        </View>

        <Footer navigation={navigation} />
      </Main>
    </>
  );
}
