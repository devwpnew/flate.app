import { useEffect, useState } from "react";
import { View } from "react-native";
import tw from "../../../../lib/tailwind";

import { useSelector } from "react-redux";

import H2 from "../../../ui/heading/h2";
import DText from "../../../ui/text/dText";
import InputNum from "../../../ui/input/inputNum";
import InputBasic from "../../../ui/input/inputBasic";
import FilterField from "../../../layout/category/filterField";

import propsObj from "../../../../helpers/filter/propsObj";
import Paragraph from "../../../ui/text/paragraph";
import RInput from "../../../ui/input/rInput";
import RFilterField from "../../../layout/category/rFilterField";
import { colors } from "../../../ui/config";

const props = [
  propsObj.product_room_count,
  propsObj.repairment,
  propsObj.house_floors,
  propsObj.house_communication,
  propsObj.house_construction,
  propsObj.handed_over,
];

export default function FieldAbout({
  onFieldChange,
  onTextFieldChange,
  product,
}) {
  const form = useSelector((state) => state.addForm.value);

  const getInputSquaresName = (sectionId) => {
    if (sectionId == 3) {
      return "living_squares";
    }

    if (sectionId == 4) {
      return "land_squares";
    }

    if (sectionId == 5) {
      return "land_squares";
    }

    if (sectionId == 6) {
      return "object_squares";
    }

    if (sectionId == 7) {
      return "object_squares";
    }
  };

  const [inputSquaresName, setInputSquaresName] = useState(
    getInputSquaresName(form.section_relation)
  );

  useEffect(() => {
    setInputSquaresName(getInputSquaresName(form.section_relation));
  }, [form.section_relation]);

  return (
    <View style={{ marginBottom: 20 }}>
      <Paragraph style={{ marginBottom: 10, marginTop: 20 }} size="md">
        Об объекте
      </Paragraph>

      {form.section_relation == 3 && (
        <>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <View style={{ width: "49%" }}>
              <RInput
                left={
                  <Paragraph
                    style={{ fontFamily: "Manrope_400Regular" }}
                    size="md"
                    color="grey-medium"
                  >
                    Этаж
                  </Paragraph>
                }
                leftWidth={40}
                placeholder="(если знаете)"
                placeholderTextColor={colors["grey-medium"]}
                style={{ fontSize: 14 }}
                isNumberFormat={true}
                keyboardType="numeric"
                initialValue={product?.properties.product_floor}
                onChangeText={onTextFieldChange}
                name="property_product_floor"
                isSuccess={form?.property_product_floor}
              />
            </View>
            <View style={{ width: "49%" }}>
              <RInput
                left={
                  <Paragraph
                    style={{ fontFamily: "Manrope_400Regular" }}
                    size="md"
                    color="grey-medium"
                  >
                    из
                  </Paragraph>
                }
                placeholder="(если знаете)"
                placeholderTextColor={colors["grey-medium"]}
                style={{ fontSize: 14 }}
                leftWidth={20}
                isNumberFormat={true}
                keyboardType="numeric"
                initialValue={product?.flat_floors}
                onChangeText={onTextFieldChange}
                name="flat_floors"
                isSuccess={form?.flat_floors}
              />
            </View>
          </View>
        </>
      )}

      {form.section_relation == 4 && (
        <View style={{ marginBottom: 10 }}>
          <RInput
            isRequired={true}
            style={{ fontSize: 14 }}
            keyboardType="numeric"
            left={
              <Paragraph
                style={{ fontFamily: "Manrope_400Regular" }}
                size="md"
                color="grey-medium"
              >
                Площадь м²
              </Paragraph>
            }
            leftWidth={95}
            isNumberFormat={false}
            initialValue={product?.living_squares}
            onChangeText={onTextFieldChange}
            name="living_squares"
            isSuccess={form?.living_squares}
          />
        </View>
      )}

      <View style={{ marginBottom: 10 }}>
        <RInput
          isRequired={true}
          style={{ fontSize: 14 }}
          keyboardType="numeric"
          left={
            <Paragraph
              style={{ fontFamily: "Manrope_400Regular" }}
              size="md"
              color="grey-medium"
            >
              Площадь{" "}
              {form.section_relation == 4 || form.section_relation == 5
                ? "участка соток"
                : "м²"}
            </Paragraph>
          }
          leftWidth={
            form.section_relation == 4 || form.section_relation == 5
              ? 145
              : 95
          }
          isNumberFormat={false}
          initialValue={product?.[inputSquaresName]}
          onChangeText={onTextFieldChange}
          name={inputSquaresName}
          isSuccess={form?.[inputSquaresName]}
        />

        {form?.section_relation == 7 && (
          <Paragraph size="sm" style={{ marginTop: 10 }}>
            Стандартное паркоместо – 10 м2
          </Paragraph>
        )}
      </View>

      {props &&
        props.map((prop, i) => {
          const initialValue = product ? product[prop.name] : form[prop.name];
          let isMulti = false;

          if (!prop.name || !prop.title) return;

          if (
            form.section_relation == 3 &&
            prop.name !== "product_room_count" &&
            prop.name !== "repairment"
          ) {
            return;
          }

          if (
            form.section_relation == 4 &&
            prop.name !== "house_floors" &&
            prop.name !== "house_communication" &&
            prop.name !== "house_construction" &&
            prop.name !== "repairment"
          ) {
            return;
          }

          if (
            form.section_relation == 5 &&
            prop.name !== "house_communication"
          ) {
            return;
          }

          if (form.section_relation == 6 || form.section_relation == 7) {
            return;
          }

          // if(prop.name === "house_communication") {
          //   isMulti = true
          // }

          return (
            <View style={{ marginBottom: 10 }} key={prop.name + i}>
              <RFilterField
                isRequired={true}
                isSuccess={form?.[prop.name]}
                type={prop.checkbox && "checkbox"}
                initialValue={initialValue}
                propMulti={prop.multiAdd}
                propTitle={prop.title}
                propName={prop.name}
                onValueChange={onFieldChange}
              />
            </View>
          );
        })}
    </View>
  );
}
