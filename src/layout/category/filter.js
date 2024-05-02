import { Platform, View, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setFilterGlobalFields } from "../../store/global/filter/filterGlobalFields";
import { setFilterVisibility } from "../../store/global/filter/filterVisibility";
import { setFetchState } from "../../store/global/helpers/fetchTrigger";
import { useEffect, useState } from "react";

import tw from "../../../lib/tailwind";

import Button from "../../ui/button/button";
import DText from "../../ui/text/dText";
import CrossIcon from "../../ui/icons/crossIcon";
import Preloader from "../../ui/preloader/preloader";

import DropdownSections from "../../ui/dropdown/spec/dropdownSections";
import DropdownAreas from "../../ui/dropdown/spec/dropdownAreas";

import FilterField from "./filterField";
import UserInformation from "./userInformation";
import RcInformation from "./rcInformation";

import getFilterProps from "../../../helpers/filter/getFilterProps";
import declension from "../../../helpers/formatters/declension";

function isObject(variable) {
  return Object.prototype.toString.call(variable) === "[object Object]";
}

export default function Filter({
  isBuilding,
  isRc,
  isUser,
  setIsSearch,
  navigation,
  route,
}) {
  const dispatch = useDispatch();

  const [key, setKey] = useState(1);

  const isFetch = useSelector((state) => state.fetchTrigger.value);
  const filter = useSelector((state) => state.filterGlobalFields.value);

  const [props, setProps] = useState(getFilterProps(route.params.section.slug));

  useEffect(() => {
    setProps(getFilterProps(route.params.section.slug));
  }, [route]);

  const startFilter = async () => {
    setIsSearch(true);
    dispatch(setFilterVisibility(false));
    dispatch(setFetchState(!isFetch));
  };

  const clearFilter = () => {
    const rand = Math.random();

    dispatch(setFilterGlobalFields({}));

    setKey(rand);
  };

  const onFieldChange = (v) => {
    const fieldName = v.name;
    const fieldValue = v.value;

    if (fieldName) {
      if (isObject(fieldValue)) {
        const isEmptyObj = Object.keys(fieldValue).length === 0;

        if (!isEmptyObj) {
          dispatch(
            setFilterGlobalFields({ ...filter, [fieldName]: fieldValue })
          );
        }
      } else {
        dispatch(setFilterGlobalFields({ ...filter, [fieldName]: fieldValue }));
      }
    }
  };

  return (
    <ScrollView
      key={key}
      style={{
        width: "100%",
        paddingTop: 5,
        backgroundColor: "white",
        borderRadius: 8,
        ...Platform.select({
          ios: {
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 1,
            shadowRadius: 4,
          },
          android: {
            elevation: 4,
          },
        }),
      }}
    >
      <View style={tw`py-4 px-2.5 rounded border border-greyborder`}>
        {isUser && <UserInformation userId={isUser} />}
        {isRc && <RcInformation rcId={isRc} />}
        {!isUser && (
          <>
            {isRc || isBuilding ? (
              <></>
            ) : (
              <DropdownSections
                navigation={navigation}
                topTitle={"Тип"}
                style={tw`mb-[24[px]`}
                selectedValueContainer={{
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                }}
              />
            )}

            {props?.propsFields &&
              props?.propsFields.map((prop, i) => {
                const initialValue = filter[prop.name];

                return (
                  <FilterField
                    isCanClearFilter={true}
                    key={prop.name + i}
                    initialValue={initialValue}
                    propMulti={prop.multi}
                    propTitle={prop.title}
                    propName={prop.name}
                    topTitle={prop.title}
                    style={tw`mb-[24[px]`}
                    selectedValueContainer={{
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: "#E5E7EB",
                    }}
                    onValueChange={onFieldChange}
                  />
                );
              })}

            {props?.rangeFields &&
              props?.rangeFields.map((prop, i) => {
                const initialValue = filter[prop.name];

                return (
                  <FilterField
                    type={"range"}
                    key={prop.name + i}
                    initialValue={initialValue}
                    propTitle={prop.title}
                    propName={prop.name}
                    topTitle={prop.title}
                    onValueChange={onFieldChange}
                    style={tw`mb-[24[px]`}
                  />
                );
              })}

            <DropdownAreas
              isCanClearFilter={true}
              name="area_link"
              topTitle={"Район"}
              placeholder="Выберите район"
              style={tw`mb-[24[px]`}
              selectedValueContainer={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#E5E7EB",
              }}
              onValueChange={onFieldChange}
            />

            <Button style={tw`h-[42px]`} onPress={startFilter}>
              Найти
            </Button>

            {/* <DText style={tw`text-blue mt-2.5`}>
              {productsCount ? (
                <>
                  Найдено {productsCount}{" "}
                  {declension(productsCount, [
                    "объявление",
                    "объявления",
                    "объявлений",
                  ])}
                </>
              ) : (
                <Preloader style={{ height: 16, width: 200 }} />
              )}
            </DText> */}

            <View style={tw`flex flex-row justify-between gap-1`}>
              <TouchableOpacity onPress={clearFilter}>
                <DText style={tw`text-xs text-grey mt-2.5 font-open-sans`}>
                  Сбросить фильтры
                </DText>
                {/* <CrossIcon stroke={"#4ba5f8"} width={14} height={14} /> */}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => dispatch(setFilterVisibility(false))}
              >
                <DText style={tw`text-xs text-grey mt-2.5 font-open-sans`}>
                  Закрыть фильтр
                </DText>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      <View style={tw`h-[60px]`}></View>
    </ScrollView>
  );
}
