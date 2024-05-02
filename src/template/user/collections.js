import { useEffect, useRef, useState } from "react";

import Main from "../../layout/main/main";
import Footer from "../../layout/main/footer";

import Container from "../../ui/common/container";

import CollectionsSortable from "./collections/collectionsSortable";
import CollectionsItem from "./collections/collectionsItem";

import api from "../../../api/service/api";

import { useSelector, useDispatch } from "react-redux";
import { sortCollections, storeCollections } from "../../store/app/collections";

import RProductPreloader from "../../ui/preloader/rProductPreloader";

export default function Collections({ navigation }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userLogin.value);
  const collections = useSelector((state) => state.collections.value.array);

  const scrollViewRef = useRef(null);

  const [status, setStatus] = useState("idle");

  useEffect(() => {
    // if (collections.length === 0) {
    (async () => {
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
              sort: item.sort ? item.sort : index,
            };

            return test;
          });

          const t = sort.map((s) => s.id);

          console.log(t, "BACKEND");

          dispatch(storeCollections(sort));

          setStatus("success");

          return;
        }

        setStatus("error");
      } catch (error) {
        console.log(error);
        setStatus("error");
      }
    })();
    // }
  }, []);

  const onDataChange = async (collections) => {
    try {
      const sorted = collections.map((collection) => collection.id);
      sorted.reverse();

      console.log(sorted, "FRONT");

      const sortRes = await api.selections.selection.sort({
        selections: sorted,
      });

      // if (sortRes && sortRes.length > 0) {
      //   dispatch(sortCollections(sortRes));
      // }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(collections, "collections");

  return (
    <Main>
      <Container>
        {/* {status === "error" || (collections.length === 0 && <NoCollections />)} */}

        {status === "loading" && collections.length == 0 && (
          <RProductPreloader
            amount={5}
            style={{
              height: 50,
              marginBottom: 10,
              borderRadius: 10,
            }}
          />
        )}
      </Container>

      {collections && (
        <CollectionsSortable
          onPress={(item) => {
            if (!item) return;
            navigation.push("CollectionsPage", {
              name: item.name,
              collectionId: item.id,
            });
          }}
          onDragStart={() => {}}
          onDataChange={onDataChange}
          CollectionItem={CollectionsItem}
          collectionData={collections}
        />
      )}

      <Footer scrollViewRef={scrollViewRef} navigation={navigation} />
    </Main>
  );
}
