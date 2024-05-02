import { View } from "react-native";
import tw from "../../../../lib/tailwind";
import H2 from "../../../ui/heading/h2";
import DText from "../../../ui/text/dText";
import DropdownPhone from "../../../ui/dropdown/spec/dropdownPhone";
import Paragraph from "../../../ui/text/paragraph";
import RInput from "../../../ui/input/rInput";
import { useSelector } from "react-redux";

export default function FieldContacts({ user, product, onFieldChange }) {
  const form = useSelector((state) => state.addForm.value);

  return (
    <View>
      <Paragraph style={{ marginBottom: 10, marginTop: 20 }} size="md">
        Контакты
      </Paragraph>

      <DropdownPhone
        title={user.phone}
        onValueChange={(v) => onFieldChange({ name: v.name, value: v.value })}
        isSuccess={true}
      />

      {/* <RInput
        left={
          <Paragraph style={{ fontFamily: "Manrope_400Regular" }} size="md" color="grey-medium">
            Телефон
          </Paragraph>
        }
        mask="phone"
        user={user}
        name={"property_product_phone"}
        initialValue={
          product?.properties?.product_phone
            ? product?.properties?.product_phone
            : user.phone
        }
        onValueChange={(v) => onFieldChange({ name: v.name, value: v.value })}
      /> */}
    </View>
  );
}
