import API from "../../../../api/service/api";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Platform, View } from "react-native";

import propsObj from "../../../../helpers/filter/propsObj";
import MapScreenAdd from "../../../layout/map/mapScreenAdd";
import FieldAddressInput from "./address/fieldAddressInput";
import RFilterField from "../../../layout/category/rFilterField";
import RDropdownAreasAdd from "../../../ui/dropdown/spec/rDropdownAreasAdd";
import Dropdown from "../../../ui/dropdown/dropdown";
import RInputSearch from "../../../ui/input/spec/rInputSearch";
import DropdownArrow from "../../../ui/dropdown/icon/dropdownArrow";
import Paragraph from "../../../ui/text/paragraph";
import useDebounce from "../../../../hooks/useDebounce";

const props = [propsObj.handed_over];

export default function FieldAddress({
  product,
  onTextFieldChange,
  onFieldChange,
}) {
  const form = useSelector((state) => state.addForm.value);
  const activeCity = useSelector((state) => state.userCity.value);
  const cities = useSelector((state) => state.cities.value.array);

  const [city, setCity] = useState(activeCity.id);

  const [areaInitialValue, setAreaInitialValue] = useState(null);
  const [rcsInitialValue, setRcsInitialValue] = useState(null);

  const [rcs, setRcs] = useState([]);

  useEffect(() => {
    (async function fetchRcsData() {
      try {
        const rcsArr = await API.get.rcs({
          window_host: "https://flate.pro/",
          sort: {
            id: "asc",
          },
          limit: "all",
        });

        if (rcsArr.length > 0) {
          setRcs(rcsArr);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [city]);

  useEffect(() => {
    if (product?.city_link?.id !== city) {
      // setAreaInitialValue(null);
      // onFieldChange({ name: "area_link", value: null });
      // setRcsInitialValue(null);
      // onFieldChange({ name: "rc_link", value: null });
    } else {
      if (product) {
        const productAreaLinkId = product?.area_link?.id;
        const productRcLinkId = product?.rc_link?.id;

        if (productAreaLinkId) {
          setAreaInitialValue(productAreaLinkId);
          onFieldChange({ name: "area_link", value: productAreaLinkId });
        }

        if (productRcLinkId) {
          setRcsInitialValue(product?.rc_link?.name);
          onFieldChange({ name: "rc_link", value: productRcLinkId });
        }
      } else {
        setAreaInitialValue(null);
        onFieldChange({ name: "area_link", value: null });

        setRcsInitialValue(null);
        onFieldChange({ name: "rc_link", value: null });
      }
    }
  }, [city, product]);

  const [mapScreenAddress, setMapScreenAddress] = useState("");
  const debouncedMapScreenAddress = useDebounce(mapScreenAddress, 1100);

  const addressInputChange = (v) => {
    setMapScreenAddress(v.value);
    onTextFieldChange(v);
  };

  const rcsDropdownChange = (v) => {
    if (!rcs || rcs.length === 0) return;

    if (v && v?.value) {
      const rc = rcs.find((rc) => rc.id == v.value);

      const rcAddress = rc?.address;
      const rcAreaId = rc?.area_link.id;

      if (rcAreaId) {
        setAreaInitialValue(rcAreaId);
        onFieldChange({ name: "area_link", value: rcAreaId });
      }

      if (rcAddress) {
        setMapScreenAddress(rcAddress);
      }

      onFieldChange(v);
    } else {
      setAreaInitialValue("");
      setMapScreenAddress("");
      addressInputChange({ name: "property_product_address", value: "" });
      onFieldChange({ name: "area_link", value: null });
      onFieldChange(v);
    }
  };

  const onCityDropdownChange = (v) => {
    if (v.value !== activeCity.id) {
      onFieldChange(v);
      setCity(v.value);

      onFieldChange({ name: "rc_link", parent: null, value: null });
      addressInputChange({ name: "property_product_address", value: "" });
      onFieldChange({ name: "area_link", value: null });

      setAreaInitialValue("");
      setMapScreenAddress("");
    } else {
      onFieldChange(v);
      setCity(v.value);

      if (product) {
        if (product?.rc_link?.id) {
          console.log(product?.rc_link?.id, "product?.rc_link?.id");
          onFieldChange({
            name: "rc_link",
            parent: null,
            value: product?.rc_link?.id,
          });
        }

        if (product?.area_link?.id) {
          onFieldChange({ name: "area_link", value: product?.area_link?.id });
          setAreaInitialValue("");
        }

        if (product?.properties?.product_address) {
          addressInputChange({
            name: "property_product_address",
            value: product?.properties?.product_address,
          });
          setMapScreenAddress(product?.properties?.product_address);
        }
      } else {
        onFieldChange({ name: "rc_link", parent: null, value: null });
        addressInputChange({ name: "property_product_address", value: "" });
        onFieldChange({ name: "area_link", value: null });

        setAreaInitialValue("");
        setMapScreenAddress("");
      }
    }
  };

  // console.log(form.section_relation);

  return (
    <>
      <View style={{ marginBottom: 10 }}>
        <Dropdown
          isSuccess={true}
          initialValue={product ? product?.area_link?.link_city : city}
          isLoading={false}
          options={cities}
          onValueChange={onCityDropdownChange}
          name={"city_link"}
          placeholder="Город"
          placeholderColor="grey-medium"
        />
      </View>

      {form.section_relation == 3 && (
        <View style={{ marginBottom: 10 }}>
          <RInputSearch
            cityId={city}
            isSuccess={form?.rc_link}
            initialValue={rcsInitialValue}
            onValueChange={rcsDropdownChange}
            containerStyle={{
              backgroundColor: "white",
            }}
            autoFocus={true}
            isHideSearch={true}
            left={
              form?.rc_link ? null : (
                <Paragraph
                  style={{ fontFamily: "Manrope_400Regular" }}
                  size="md"
                  color="grey-medium"
                >
                  Название ЖК (если знаете)
                </Paragraph>
              )
            }
            leftWidth={form?.rc_link ? null : 200}
            right={<DropdownArrow />}
            // WORK
            shadow={true}
            color="white"
            placeholder=""
            name={"rc_link"}
            isCanAddRc={true}
            isHideFilter={true}
            placeholderTextColor={"#6F7882"}
            style={{
              paddingBottom: Platform.OS === "android" ? 9 : 14,
              paddingTop: Platform.OS === "android" ? 9 : 14,
              fontSize: 14,
            }}
          />
        </View>
      )}

      <View style={{ marginBottom: 10 }}>
        <RDropdownAreasAdd
          isRequired={true}
          // key={areaInitialValue}
          style={{ paddingTop: 1 }}
          city={city}
          multiselect={true}
          multiselectSingle={true}
          placeholderColor="grey-medium"
          initialValue={areaInitialValue}
          isSuccess={false}
          onValueChange={onFieldChange}
        />
      </View>

      <FieldAddressInput
        rcs={rcs}
        onTextFieldChange={addressInputChange}
        product={product}
      />

      <MapScreenAdd
        initialValue={debouncedMapScreenAddress}
        onFieldChange={onFieldChange}
      />

      {form.section_relation == 3 && (
        <>
          {props &&
            props.map((prop, i) => {
              const initialValue = product
                ? product[prop.name]
                : form[prop.name];

              if (!prop.name || !prop.title) return;

              return (
                <RFilterField
                  isSuccess={form?.[prop.name]}
                  key={prop.id}
                  type={prop.checkbox && "checkbox"}
                  initialValue={initialValue}
                  propMulti={prop.multi}
                  propTitle={prop.title}
                  propName={prop.name}
                  onValueChange={onFieldChange}
                />
              );
            })}
        </>
      )}
    </>
  );
}
