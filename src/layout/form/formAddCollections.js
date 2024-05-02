import { Alert, TouchableOpacity, View } from "react-native";

import Paragraph from "../../ui/text/paragraph";
import RInput from "../../ui/input/rInput";
import Btn from "../../ui/button/btn";
import { useState } from "react";
import api from "../../../api/service/api";

const numberFormat = new Intl.NumberFormat("ru");

export default function FormAddCollections({ productId, onSave, onSkip }) {
  const [comissionInput, setComissionInput] = useState("");
  const [comissionInputFormatted, setComissionInputFormatted] = useState("");

  const onInputChange = (v) => {
    setComissionInput(v.value);
    setComissionInputFormatted(numberFormat.format(v.value));
  };

  const onFormSave = async () => {
    try {
      const editRes = await api.selections.product.edit({
        productId: productId,
        comission: comissionInput,
      });

      if (editRes) {
        // UPDATE COMISSION HERE
        // addMessage();
        if (onSave) {
          onSave();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFormSkip = () => {
    // addMessage();
    if (onSkip) {
      onSkip();
    }
  };

  const addMessage = () => {
    Alert.alert(`Успех!`, `Объект успешно добавлен в подборку`, [
      {
        text: "ОК",
      },
    ]);
  };

  return (
    <>
      <View
        style={{
          marginBottom: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Paragraph size="md2" color="black">
          Увеличить комиссию?
        </Paragraph>

        <TouchableOpacity onPress={onFormSkip}>
          <Paragraph color="grey-dark">Пропустить</Paragraph>
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
          name="product_comission"
          value={comissionInputFormatted}
          onChangeText={onInputChange}
          placeholder="500 000"
        />
      </View>

      <Paragraph size="sm" style={{ marginBottom: 20 }} color="grey-dark">
        *Комиссия автоматически суммируется в подборке для клиента
      </Paragraph>
      <Btn onPress={onFormSave}>Сохранить</Btn>
    </>
  );
}
