import { View } from "react-native";
import tw from "../../../../lib/tailwind";

import { useSelector } from "react-redux";

import FilterField from "../../../layout/category/filterField";
import DText from "../../../ui/text/dText";

import propsObj from "../../../../helpers/filter/propsObj";
import RFilterField from "../../../layout/category/rFilterField";

const props = [
  propsObj.status,
  propsObj.house_types,
  propsObj.status_lands,
  propsObj.commercial_types,
  propsObj.parking_types,
];

export default function FieldStatus({ onFieldChange, product }) {
  const form = useSelector((state) => state.addForm.value);

  return (
    <View style={{ marginBottom: 10, marginTop: 10 }}>
      {props &&
        props.map((prop, i) => {
          const initialValue = product ? product[prop.name] : form[prop.name];

          if (!prop.name || !prop.title || !form.section_relation) return;

          if (form.section_relation == 3 && prop.name !== "status") {
            return;
          }

          if (form.section_relation == 4 && prop.name !== "house_types") {
            return;
          }

          if (form.section_relation == 5 && prop.name !== "status_lands") {
            return;
          }

          if (form.section_relation == 6 && prop.name !== "commercial_types") {
            return;
          }

          if (form.section_relation == 7 && prop.name !== "parking_types") {
            return;
          }
          return (
            <RFilterField
              key={prop.id}
              isRequired={true}
              isSuccess={form?.[prop.name]}
              placeholderSize="md"
              type={prop.checkbox && "checkbox"}
              initialValue={initialValue}
              propMulti={prop.multiAdd}
              propTitle={prop.title}
              propName={prop.name}
              topTitle={prop.title}
              onValueChange={onFieldChange}
            />
          );
        })}
    </View>
  );
}
