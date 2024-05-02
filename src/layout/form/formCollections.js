import { ScrollView, TouchableOpacity, View } from "react-native";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeCollections } from "../../store/app/collections";

import Btn from "../../ui/button/btn";
import Title from "../../ui/heading/title";
import CollectionsItem from "../../template/user/collections/collectionsItem";
import Paragraph from "../../ui/text/paragraph";
import { PCollection } from "../product/item/icons/icons";

import api from "../../../api/service/api";
import NoCollections from "../../template/user/noCollections";
import RProductPreloader from "../../ui/preloader/rProductPreloader";

export default function FormCollections({
  productId,
  onItemPress,
  onCreate,
  onSave,
}) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.userLogin.value);
  const collections = useSelector((store) => store.collections.value.array);

  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        setStatus("loading");
        const list = await api.selections.selection.list({
          filter: {
            user_id: user.id,
          },
        });

        if (list) {
          const sort = list.map((item, index) => {
            const test = {
              id: item.id,
              name: item.name,
              sort: item?.sort ? item.sort : index,
            };

            return test;
          });

          dispatch(storeCollections(sort));

          setStatus("success");

          return;
        }

        setStatus("error");
      } catch (error) {
        console.log(error);
        setStatus("error");
      }
    };

    fetchCollection();
  }, []);

  const scrollViewRef = useRef(null);

  useEffect(() => {
    setTimeout(function () {
      scrollViewRef.current?.flashScrollIndicators();
    }, 500);
  }, []);

  return (
    <View>
      <>
        <Title style={{ marginBottom: 20 }}>Добавить в подборку </Title>

        <>
          {collections.length === 0 && (
            <ScrollView
              showsVerticalScrollIndicator={true}
              style={{ height: 295, paddingRight: 12 }}
            >
              <RProductPreloader
                amount={6}
                style={{
                  height: 50,
                  marginBottom: 10,
                  borderRadius: 10,
                }}
              />
            </ScrollView>
          )}

          {status === "error" && <NoCollections />}

          {collections.length > 0 && (
            // <TouchableOpacity activeOpacity={1}>
            <ScrollView
              ref={scrollViewRef}
              showsVerticalScrollIndicator={true}
              style={{ height: 325, paddingRight: 12 }}
            >
              {collections.map((item) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={1}
                    style={{
                      paddingBottom: 10,
                    }}
                  >
                    <View
                      style={{
                        height: 50,
                      }}
                    >
                      <CollectionsItem
                        key={item.id}
                        productId={productId}
                        onPress={onItemPress}
                        variant={"select"}
                        {...item}
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            // </TouchableOpacity>
          )}
        </>

        <TouchableOpacity
          style={{
            paddingTop: 20,
            paddingBottom: 0,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
          onPress={onCreate}
        >
          <PCollection />
          <Paragraph style={{ fontSize: 14 }} color="blue">
            Создать подборку
          </Paragraph>
        </TouchableOpacity>

        {/* <Btn style={{ marginTop: 10 }} color="blue" onPress={onSave}>
          Сохранить
        </Btn> */}
      </>
    </View>
  );
}
