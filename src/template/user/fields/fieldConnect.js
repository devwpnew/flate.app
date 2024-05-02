import { View } from "react-native";
import tw from "../../../../lib/tailwind";
import { useSelector } from "react-redux";

import H2 from "../../../ui/heading/h2";
import DText from "../../../ui/text/dText";
import FilterField from "../../../layout/category/filterField";

import propsObj from "../../../../helpers/filter/propsObj";
import RFilterField from "../../../layout/category/rFilterField";
import Paragraph from "../../../ui/text/paragraph";

const props = [propsObj.messages_calls];
const messagesAndCallsDefaultId = "0";

export default function FieldConnect({ onFieldChange, product }) {
  const form = useSelector((state) => state.addForm.value);

  return (
    <View>
      <>
        {props &&
          props.map((prop, i) => {
            const initialValue = product ? product[prop.name] : form[prop.name];
            if (!prop.name || !prop.title) return;

            return (
              <View key={prop.name + i}>
                <Paragraph
                  style={{ marginBottom: 10, marginTop: 20 }}
                  size="md"
                >
                  Способ связи
                </Paragraph>

                <RFilterField
                  isSuccess={form?.[prop.name]}
                  type={prop.checkbox && "checkbox"}
                  initialValue={
                    initialValue ? initialValue : messagesAndCallsDefaultId
                  }
                  propMulti={prop.multi}
                  propTitle={prop.title}
                  propName={prop.name}
                  onValueChange={onFieldChange}
                />
              </View>
            );
          })}
      </>
    </View>
  );
}
