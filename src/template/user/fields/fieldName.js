import { View } from "react-native";
import tw from "../../../../lib/tailwind";

import DText from "../../../ui/text/dText";
import InputBasic from "../../../ui/input/inputBasic";
import RInput from "../../../ui/input/rInput";
import { colors } from "../../../ui/config";
import Paragraph from "../../../ui/text/paragraph";
import { useSelector } from "react-redux";

export default function FieldName({ name, onTextFieldChange }) {
  const form = useSelector((state) => state.addForm.value);

  return (
    <View style={{ marginBottom: 10 }}>
      <RInput
        style={{ fontSize: 14 }}
        onChangeText={onTextFieldChange}
        initialValue={name}
        isRequired={true}
        isSuccess={form?.name}
        name={"name"}
        left={
          <Paragraph
            style={{ fontFamily: "Manrope_400Regular" }}
            size="md"
            color="grey-medium"
          >
            Название объявления
          </Paragraph>
        }
        leftWidth={140}
      />

      {/* <View style={tw`mb-5`}>
        <DText style={tw`font-bold mb-2.5`}>
          Название
          <DText style={tw`text-red`}>*</DText>
        </DText>

        <InputBasic
          onChangeText={onTextFieldChange}
          initialValue={name}
          name={"name"}
          placeholder={"Название"}
        />
      </View> */}
    </View>
  );
}
