import { View } from "react-native";

import RInput from "../../../ui/input/rInput";
import Paragraph from "../../../ui/text/paragraph";
import { useSelector } from "react-redux";
import { colors } from "../../../ui/config";

export default function FieldDescription({ product, onTextFieldChange }) {
  const form = useSelector((state) => state.addForm.value);

  const getDescPlaceholder = () => {
    if (form.section_relation == 5) {
      return "Расскажите об особенностях участка: какой уклон, сколько ехать до цента, магазина и школы. Не дублируйте номер.";
    }

    if (form.section_relation == 6) {
      return "Расскажите об особенностях объекта: какая окупаемость, средняя проходимость, далеко ли до дороги. Не дублируйте номер.";
    }

    if (form.section_relation == 7) {
      return "Расскажите об особенностях объекта: есть ли охрана, каковы ежемесячные платежи или другие особенности. Не дублируйте номер.";
    }

    return "Расскажите, что есть в квартире и рядом с домом, в каком состоянии жильё. Покупателям интересно, сколько идти до магазина. Не дублируйте номер.";
  };

  const descPlaceholder = getDescPlaceholder();

  return (
    <View>
      <Paragraph style={{ marginBottom: 10, marginTop: 20 }} size="md">
        Описание
      </Paragraph>

      <Paragraph
        style={{
          fontFamily: "Manrope_400Regular",
          marginBottom: 10,
          color: colors["grey-medium"],
        }}
        size="sm"
      >
        {descPlaceholder}
      </Paragraph>

      <RInput
        isRequired={true}
        multiline={true}
        style={{
          fontSize: 14,
          paddingBottom: 30,
        }}
        initialValue={product?.product_description}
        onChangeText={onTextFieldChange}
        name={"product_description"}
        isSuccess={form?.product_description}
        placeholder={"Описание объекта"}
        placeholderTextColor={colors["grey-medium"]}
      />
    </View>
  );
}
