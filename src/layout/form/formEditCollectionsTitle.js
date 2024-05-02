import { View } from "react-native";

import Paragraph from "../../ui/text/paragraph";
import RInput from "../../ui/input/rInput";
import Btn from "../../ui/button/btn";
import { useState } from "react";
import api from "../../../api/service/api";
import { useDispatch } from "react-redux";
import { renameCollection } from "../../store/app/collections";

export default function FormEditCollectionsTitle({
  onChangeText,
  onSave,
  title,
  collectionId,
}) {
  const dispatch = useDispatch();

  const [formTitle, setFormTitle] = useState(title);
  const [status, setStatus] = useState("idle");

  const onChangeTitle = (v) => {
    setFormTitle(v.value);
    if (onChangeText) {
      onChangeText(v.value);
    }
  };

  const onSaveTitle = async () => {
    try {
      setStatus("loading");

      const params = {
        id: collectionId,
        name: formTitle,
      };

      const editResponse = await api.selections.selection.edit(params);

      if (editResponse) {
        setStatus("success");

        dispatch(renameCollection(params));
        
        if (onSave) {
          onSave(params);
        }
      }
    } catch (error) {
      console.log(error);
      setStatus("error");
    }
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
        <Paragraph size="md2" color="black">Название подборки</Paragraph>
      </View>
      <View style={{ marginBottom: 20 }}>
        <RInput
          isNumberFormat={true}
          shadow={false}
          color="grey-light"
          name="title"
          onChangeText={onChangeTitle}
          placeholder={title}
          value={formTitle}
        />
      </View>
      <Btn onPress={onSaveTitle}>Сохранить</Btn>
    </View>
  );
}
