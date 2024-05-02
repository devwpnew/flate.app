import { useState } from "react";

import { Alert, View } from "react-native";

import Btn from "../../ui/button/btn";
import RInput from "../../ui/input/rInput";
import Paragraph from "../../ui/text/paragraph";
import api from "../../../api/service/api";
import { useDispatch, useSelector } from "react-redux";
import { storeCollection } from "../../store/app/collections";

export default function FormCreateCollections({ onSave, onChangeText }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLogin.value);

  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({
    name: "",
  });

  const onNameInputChange = (v) => {
    setStatus("idle");

    setForm((prev) => ({
      ...prev,
      name: v.value,
    }));

    if (onChangeText) {
      onChangeText(v);
    }
  };

  const onSubmitSave = () => {
    if (!form.name) {
      setStatus("error");
      return;
    }

    createCollection();
  };

  const createCollection = async () => {
    try {
      setStatus("loading");

      console.log(form);

      const collection = await api.selections.selection.add({
        name: form.name,
        user_id: user.id,
      });

      console.log(collection, 'created');

      if (collection?.id) {
        setStatus("success");

        const sort = {
          id: collection.id,
          name: collection.name,
          sort: collection.sort,
        };

        dispatch(storeCollection(sort));

        if (onSave) {
          onSave(collection);
        }
        // onSuccess();
      }

      if (collection?.msg) {
        onMessage("error", collection?.msg);
        return;
      }

      if (collection?.error) {
        onMessage("error", collection?.error);
      }
    } catch (error) {
      console.log(error);
      setStatus("error");
    }
  };

  const onMessage = (type = "error", msg) => {
    Alert.alert(type === "success" ? `Успех` : `Ошибка`, msg, [
      {
        text: "OK",
        onPress: () => {
          if (onSave) {
            onSave();
          }
        },
      },
    ]);
  };

  return (
    <View>
      <View
        style={{
          marginBottom: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Paragraph size="lg" color="black">
          Создать подборку
        </Paragraph>
      </View>

      <Paragraph size="md" style={{ marginBottom: 10 }} color="grey-dark">
        Клиент не видит название подборок
      </Paragraph>

      <View style={{ marginBottom: 20 }}>
        <RInput
          isSuccess={status === "success"}
          isValid={status !== "error"}
          isNumberFormat={true}
          shadow={false}
          color="grey-light"
          name="name"
          onChangeText={onNameInputChange}
          placeholder={"Название подборки"}
        />
      </View>

      <Btn onPress={onSubmitSave}>Сохранить</Btn>
    </View>
  );
}
