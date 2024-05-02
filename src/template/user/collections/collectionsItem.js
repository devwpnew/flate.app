import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";

import Paragraph from "../../../ui/text/paragraph";
import { Added, Remove, Sort } from "../../../layout/profile/icons/icons";

import { colors } from "../../../ui/config";
import { AddIcon } from "./icons";

import api from "../../../../api/service/api";

import { useDispatch, useSelector } from "react-redux";
import { removeCollection } from "../../../store/app/collections";
import { useEffect, useState } from "react";
import RProductPreloader from "../../../ui/preloader/rProductPreloader";

export default function CollectionsItem({
  productId,
  onPress,
  variant = "default",
  id,
  name,
  style = {},
  ...props
}) {
  const [status, setStatus] = useState("idle");

  const [collectionProduct, setCollectionProduct] = useState(null);

  const user = useSelector((store) => store.userLogin.value);

  const [template, setTemplate] = useState(variant);

  const dispatch = useDispatch();

  const itemPress = async () => {
    if (template === "added") {
      removeAction();

      // Убираем из подборки
      // onRemovePress();
      // Любые действия после действия
      // if (onPress) {
      //   onPress(id);
      // }
    }

    if (template === "select") {
      // Добавляем в подборку
      const collectionProductId = await addAction();

      // Обновляем комиссию
      if (onPress && collectionProductId) {
        onPress(collectionProductId);
      }
    }

    if (template === "default") {
      // Выводим уведомление о удалении подборки
      onDeletePress();
      // Любые действия после действия
      // if (onPress) {
      //   onPress(id);
      // }
    }
  };

  // ADD
  const addAction = async () => {
    if (!productId || !id) return;

    try {
      const add = await api.selections.product.add({
        productId: productId,
        selectionId: id,
      });

      // console.log(add, 'add'); // LOG  {"id": 182} add

      if (add?.error) {
        onMessage("Ошибка", add.error);
        return;
      }

      if (add?.msg) {
        onMessage("Ошибка", add.msg);
        return;
      }

      if (add?.id) {
        setTemplate("added");
        // dispatch(removeCollection(id));

        return add.id;
      }
    } catch (error) {
      console.log(error);
      onMessage("Ошибка", "Произошла непредвиденная ошибка");
    }
  };

  const onMessage = (title, msg) => {
    Alert.alert(title, msg, [
      {
        text: "OK",
      },
    ]);
  };

  // REMOVE
  // const onRemovePress = () => {
  //   Alert.alert(`Вы уверены?`, `Убрать объект из подборки?`, [
  //     {
  //       text: "Да",
  //       onPress: removeAction,
  //     },
  //     {
  //       text: "Отмена",
  //     },
  //   ]);
  // };

  const removeAction = async () => {
    try {
      if (!collectionProduct) return;

      setStatus("loading");

      const deleteResponse = await api.selections.product.delete({
        productId: collectionProduct.id,
      });

      if (deleteResponse) {
        setTemplate("select");
        setStatus("success");
      } else {
        setStatus("idle");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE
  const onDeletePress = () => {
    Alert.alert(`Вы уверены?`, `Подборка будет безвозвратно удалена!`, [
      {
        text: "Да",
        onPress: deleteCollectionAction,
      },
      {
        text: "Отмена",
      },
    ]);
  };

  const deleteCollectionAction = async () => {
    try {
      const deleteResponse = await api.selections.selection.delete({ id: id });
      console.log(deleteResponse);
      if (deleteResponse) {
        dispatch(removeCollection(id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // IS ADDED?
  useEffect(() => {
    (async () => {
      try {
        if (!productId || !id) return;

        setStatus("loading");

        const collectionProducts = await api.selections.product.list({
          filter: {
            selection: id,
          },
        });
        const collectionProduct = collectionProducts.find(
          (pr) => pr.product_id == productId
        );

        setCollectionProduct(collectionProduct);

        // console.log({
        //   name: name,
        //   id: id,
        //   productId: productId,
        //   pr: collectionProducts.map((p) => p.product_id),
        // });

        if (collectionProduct) {
          setTemplate("added");
          setStatus("success");
          return;
        } else {
          setStatus("idle");
        }
      } catch (error) {
        console.log(error);
        setStatus("error");
      }
    })();
  }, []);

  return (
    <>
      {status === "loading" ? (
        <>
          <RProductPreloader
            amount={1}
            style={{ ...styles.item, paddingLeft: 0, ...style }}
          />
        </>
      ) : (
        <View
          style={{
            ...styles.item,
            backgroundColor:
              template === "added"
                ? colors["blue-light"]
                : colors["grey-light"],
          }}
        >
          <View style={styles.wrap}>
            {template === "default" ? (
              <>
                <Sort style={styles.sort} />
                <View style={{ flex: 1 }}>
                  <Paragraph
                    color={template === "added" ? "white" : "black"}
                    numberOfLines={1}
                    style={{ fontFamily: "Manrope_400Regular" }}
                    size="lg"
                  >
                    {name}
                  </Paragraph>
                </View>
              </>
            ) : (
              <TouchableOpacity
                style={{ flex: 1, ...style }}
                onPress={itemPress}
              >
                <Paragraph
                  color={template === "added" ? "white" : "black"}
                  numberOfLines={1}
                  style={{ fontFamily: "Manrope_400Regular" }}
                  size="lg"
                >
                  {name}
                </Paragraph>
              </TouchableOpacity>
            )}
          </View>

          {template === "select" && (
            <TouchableOpacity style={styles.arrow} onPress={itemPress}>
              <AddIcon />
            </TouchableOpacity>
          )}
          {template === "added" && (
            <TouchableOpacity style={styles.arrow} onPress={itemPress}>
              <Added />
            </TouchableOpacity>
          )}
          {template === "default" && (
            <TouchableOpacity style={styles.arrow} onPress={itemPress}>
              <Remove />
            </TouchableOpacity>
          )}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  wrap: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
    flex: 1,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingTop: 20,
    // paddingBottom: 20,
    paddingLeft: 20,
    borderRadius: 4,
    height: "100%",
    gap: 16,
  },
  sort: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  arrow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
