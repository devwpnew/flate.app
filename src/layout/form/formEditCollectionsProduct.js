import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Paragraph from "../../ui/text/paragraph";
import RInput from "../../ui/input/rInput";
import Btn from "../../ui/button/btn";
import api from "../../../api/service/api";

const numberFormat = new Intl.NumberFormat("ru");

export default function FormEditCollectionsProduct({
  productId,
  comission,
  onSave,
  onDelete,
  onChangeText,
  onEditComission,
}) {
  const [inputComission, setInputComission] = useState(comission);
  const [inputComissionFormatted, setInputComissionFormatted] =
    useState(comission);

  const onFormChange = (v) => {
    const formatted = numberFormat.format(v.value);
    setInputComissionFormatted(formatted);
    setInputComission(v.value);

    if (onChangeText) {
      onChangeText(v);
    }
  };

  const onFormSave = async () => {
    try {
      const editRes = await api.selections.product.edit({
        productId: productId,
        comission: inputComission,
      });

      if (editRes) {
        onEditComission(inputComissionFormatted);

        if (onSave) {
          onSave();
        }
      }
    } catch (error) {
      console.log(error);
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
        <Paragraph size="md2" color="black">
          Комиссия
        </Paragraph>

        <TouchableOpacity onPress={onDelete}>
          <Paragraph color="grey-dark">Удалить</Paragraph>
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 10 }}>
        <RInput
          isNumberFormat={true}
          keyboardType="numeric"
          shadow={false}
          color="grey-light"
          right={
            <Paragraph size="lg" color="grey-medium">
              ₽
            </Paragraph>
          }
          name="comission"
          value={inputComissionFormatted}
          onChangeText={onFormChange}
          placeholder="500 000"
        />
      </View>

      <Paragraph size="sm" style={{ marginBottom: 20 }} color="grey-dark">
        *Комиссия автоматически суммируется в подборке для клиента
      </Paragraph>

      <Btn onPress={onFormSave}>Сохранить</Btn>
    </View>
  );
}
