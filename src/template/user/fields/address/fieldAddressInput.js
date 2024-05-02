import { useSelector } from "react-redux";
import { useEffect } from "react";

import InputSuggest from "../../../../ui/input/spec/inputSuggest";

export default function FieldAddressInput({ rcs, product, onTextFieldChange }) {
  const form = useSelector((state) => state.addForm.value);

  // const [productAddressValue, setProductAddressValue] = useState("");

  useEffect(() => {
    if (!rcs || form.section_relation != "3") return;

    const selectedRc = rcs.find((rc) => rc.id === form.rc_link);

    if (selectedRc) {
      // setProductAddressValue(selectedRc.address);

      onTextFieldChange({
        name: "property_product_address",
        value: selectedRc.address,
      });
    }
  }, [form.section_relation, rcs, form.rc_link]);

  useEffect(() => {
    if (form?.city_link !== product?.city_link?.id) {
      // setProductAddressValue("");
      onTextFieldChange({
        name: "property_product_address",
        value: "",
      });
    } else {
      if (product?.properties.product_address) {
        onTextFieldChange({
          name: "property_product_address",
          value: product.properties.product_address,
        });
        // setProductAddressValue(product.properties.product_address);
      } else {
        onTextFieldChange({
          name: "property_product_address",
          value: "",
        });
      }
    }
  }, [product, form.city_link]);

  // console.log(productAddressValue);

  return (
    <>
      <InputSuggest
        isRequired={true}
        isSuccess={form?.property_product_address}
        city={form?.city_link ? form.city_link : 5}
        onChangeAddressCoords={(coords) => {
          if (coords && coords?.latitude && coords?.longitude) {
            onTextFieldChange({
              name: "map_coordinates",
              value: { latitude: coords.latitude, longitude: coords.longitude },
            });
          } else {
            console.log("Не установлены координаты");
          }
        }}
        onChangeAddressDetails={(details) => {
          onTextFieldChange({
            name: "building_address",
            value: details?.structured_formatting?.main_text,
          });
        }}
        onChangeText={(v) => {
          onTextFieldChange({
            name: "property_product_address",
            value: v,
          });
          // setProductAddressValue(v);
        }}
        initialValue={form?.property_product_address}
        name={"property_product_address"}
        placeholder={"Адрес"}
        placeholderSize="md"
        placeholderColor="grey-medium"
      />
    </>
  );
}
