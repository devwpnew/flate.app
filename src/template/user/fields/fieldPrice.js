import { View } from "react-native";
import tw from "../../../../lib/tailwind";

import { useSelector } from "react-redux";

import H2 from "../../../ui/heading/h2";
import DText from "../../../ui/text/dText";
import InputBasic from "../../../ui/input/inputBasic";

import propsObj from "../../../../helpers/filter/propsObj";
import InputNum from "../../../ui/input/inputNum";
import FilterField from "../../../layout/category/filterField";
import { useEffect, useState } from "react";
import Paragraph from "../../../ui/text/paragraph";
import RInput from "../../../ui/input/rInput";
import RFilterField from "../../../layout/category/rFilterField";

const props = [propsObj.sum_contract, propsObj.mortgage];
const numberFormat = new Intl.NumberFormat("ru");

export default function FieldPrice({
  onTextFieldChange,
  onFieldChange,
  product,
}) {
  const form = useSelector((state) => state.addForm.value);

  const getSquares = () => {
    if (form.section_relation == 4) {
      return form.living_squares;
    } else {
      return form.living_squares || form.land_squares || form.object_squares;
    }
  };

  const squares = getSquares();

  const [squaresPrice, setSquaresPrice] = useState("");

  useEffect(() => {
    if (squares && form.product_price) {
      setSquaresPrice(parseInt(form.product_price) / squares);
    } else {
      setSquaresPrice("");
    }
  }, [squares, form]);

  return (
    <View>
      <Paragraph style={{ marginBottom: 10, marginTop: 20 }} size="md">
        Условия сделки
        {squaresPrice > 0 ? (
          <>
            : {numberFormat.format(Math.ceil(squaresPrice))} руб. за{" "}
            {form.section_relation == 5 ? "сот" : "м²"}
          </>
        ) : (
          ""
        )}
      </Paragraph>

      <View style={{ marginBottom: 10 }}>
        <RInput
          isRequired={true}
          style={{ fontSize: 14 }}
          left={
            <Paragraph
              style={{ fontFamily: "Manrope_400Regular" }}
              size="md"
              color="grey-medium"
            >
              Цена
            </Paragraph>
          }
          leftWidth={35}
          keyboardType="numeric"
          isNumberFormat={true}
          initialValue={product?.product_price}
          onChangeText={onTextFieldChange}
          name="product_price"
          isSuccess={form?.product_price}
        />
      </View>

      <View style={{ marginBottom: 10 }}>
        <RInput
          // isRequired={true}
          style={{ fontSize: 14 }}
          left={
            <Paragraph
              style={{ fontFamily: "Manrope_400Regular" }}
              size="md"
              color="grey-medium"
            >
              Комиссия (сумма или условия)
            </Paragraph>
          }
          leftWidth={200}
          initialValue={product?.comission_sum_terms}
          onChangeText={onTextFieldChange}
          name="comission_sum_terms"
          isSuccess={form?.comission_sum_terms}
        />
      </View>

      {props &&
        props.map((prop, i) => {
          const initialValue = product ? product[prop.name] : form[prop.name];

          if (!prop.name || !prop.title) return;

          return (
            <View key={prop.name + i}>
              <View style={{ marginBottom: 10 }}>
                <RFilterField
                  isRequired={true}
                  isSuccess={form?.[prop.name]}
                  type={prop.checkbox && "checkbox"}
                  initialValue={initialValue}
                  propMulti={prop.multi}
                  propTitle={prop.title}
                  propName={prop.name}
                  onValueChange={onFieldChange}
                />
              </View>
            </View>
          );
        })}
    </View>
  );
}
