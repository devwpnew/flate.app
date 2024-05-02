import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setFilterGlobalFields } from "../../store/global/filter/filterGlobalFields";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Btn from "../../ui/button/btn";
import RFilterField from "./rFilterField";

import getFilterProps from "../../../helpers/filter/getFilterProps";
import RDropdownAreas from "../../ui/dropdown/spec/rDropdownAreas";
import RDropdownSections from "../../ui/dropdown/spec/rDropdownSections";

function isObject(variable) {
  return Object.prototype.toString.call(variable) === "[object Object]";
}

const sections = {
  flats: "3",
  houses: "4",
  land: "5",
  commertion: "6",
  parkings: "7",
};

const sectionsId = {
  3: "flats",
  4: "houses",
  5: "land",
  6: "commertion",
  7: "parkings",
};

const checkboxNames = ["mortgage", "handed_over", "repairment", "sum_contract"];

export default function RFilter({
  isReset = false,
  initialFilter,
  slug = "flats",
}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const filter = useSelector((state) => state.filterGlobalFields.value);

  const [id, setId] = useState(0);
  const [props, setProps] = useState(getFilterProps(slug));

  useEffect(() => {
    setProps(getFilterProps(slug));
    dispatch(
      setFilterGlobalFields({ ...filter, section_relation: sections[slug] })
    );
  }, [slug]);

  useEffect(() => {
    if (initialFilter && Object.entries(initialFilter).length > 0) {
      const mergedFilter = { ...filter, ...initialFilter };

      if (mergedFilter["user_id"]) {
        delete mergedFilter["section_relation"];
        delete mergedFilter["rc_link"];
      }

      if (mergedFilter["section_relation"]) {
        delete mergedFilter["user_id"];
        // delete mergedFilter["rc_link"];
      }

      if (mergedFilter["rc_link"]) {
        delete mergedFilter["user_id"];
        delete mergedFilter["area_link"];
        // delete mergedFilter["section_relation"];
      }

      dispatch(setFilterGlobalFields(mergedFilter));

      // for (const [key, value] of Object.entries(initialFilter)) {
      //   if (value) {
      //     dispatch(setFilterGlobalFields({ ...filter, [key]: value }));
      //   }
      // }
    }
  }, [initialFilter]);

  useEffect(() => {
    if (isReset) {
      dispatch(
        setFilterGlobalFields({
          section_relation: "3",
        })
      );
      setId(Math.random());
    }
  }, [isReset]);

  const onFieldChange = (v) => {
    const fieldName = v.name;
    const fieldValue = v.value;

    if (fieldName) {
      if (isObject(fieldValue)) {
        const isEmptyObj = Object.keys(fieldValue).length === 0;

        if (!isEmptyObj) {
          const isCheckbox = checkboxNames.includes(fieldName);

          if (isCheckbox) {
            if (fieldValue == 1) {
              const newFilter = {};

              for (const name in filter) {
                if (name != fieldName) {
                  newFilter[name] = filter[name];
                }
              }

              console.log(newFilter, "newFilter 1");

              dispatch(setFilterGlobalFields(newFilter));
            } else {
              dispatch(
                setFilterGlobalFields({ ...filter, [fieldName]: fieldValue })
              );
            }
          } else {
            dispatch(
              setFilterGlobalFields({ ...filter, [fieldName]: fieldValue })
            );
          }
        } else {
          const filterNew = { ...filter };
          delete filterNew[fieldName];

          dispatch(setFilterGlobalFields(filterNew));
        }
      } else {
        const isCheckbox = checkboxNames.includes(fieldName);

        if (isCheckbox) {
          if (fieldValue == 1) {
            const newFilter = {};

            for (const name in filter) {
              if (name != fieldName) {
                newFilter[name] = filter[name];
              }
            }

            console.log(newFilter, "newFilter 2");

            dispatch(setFilterGlobalFields(newFilter));
          } else {
            dispatch(
              setFilterGlobalFields({ ...filter, [fieldName]: fieldValue })
            );
          }
        } else {
          dispatch(
            setFilterGlobalFields({ ...filter, [fieldName]: fieldValue })
          );
        }
      }
    }
  };

  const startSearch = () => {
    const filterFormatted = {};

    for (const [key, value] of Object.entries(filter)) {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          filterFormatted[key] = value;
        }
      } else {
        if (value) {
          filterFormatted[key] = value;
        }
      }
    }

    navigation.push("SearchPage", {
      title: "Найдено",
      slug: slug,
      filter: filterFormatted,
    });
  };

  const onSectionChange = (v) => {
    const slug = sectionsId[v.value];
    if (slug) {
      setId(slug);
      setProps(getFilterProps(slug));
      dispatch(setFilterGlobalFields({ section_relation: sections[slug] }));
    }
  };

  return (
    <>
      <KeyboardAwareScrollView
        keyboardDismissMode={"on-drag"}
        keyboardShouldPersistTaps={"always"}
        extraScrollHeight={Platform.OS === "android" ? 120 : 120}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
      >
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            height: "100%",
            paddingBottom: Platform.OS === "android" ? 150 : 120,
          }}
        >
          {!filter.rc_link && !filter.building_link && !filter.user_id && (
            <View style={{ marginBottom: 10, width: "100%" }}>
              <RDropdownSections
                // key={route.params}
                isSuccess={filter?.section_relation}
                onValueChange={onSectionChange}
                isPlaceholder={false}
                placeholderColor={
                  filter?.section_relation ? "black" : "grey-medium"
                }
              />
            </View>
          )}

          {!filter.rc_link && !filter.building_link && (
            <View style={{ marginBottom: 10, width: "100%" }}>
              <RDropdownAreas
                isSuccess={
                  filter?.area_link && filter.area_link.length > 0
                    ? true
                    : false
                }
                initialValue={filter?.area_link}
                multiselectSearch={true}
                multiselect={true}
                onValueChange={onFieldChange}
                placeholderColor={
                  filter?.area_link?.length ? "black" : "grey-medium"
                }
              />
            </View>
          )}

          {!filter.user_id && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
              key={id}
            >
              {props?.propsFields &&
                props?.propsFields.map((prop, i) => {
                  const initialValue = filter[prop.name];

                  const rc = filter?.rc_link;
                  const slug = rc
                    ? sectionsId["3"]
                    : sectionsId[filter?.section_relation];

                  let isSuccess = filter[prop.name] ? true : false;
                  let width = prop?.width ? prop?.width : "100%";

                  if (prop.multi) {
                    isSuccess =
                      filter[prop.name] && filter[prop.name].length > 0
                        ? true
                        : false;
                  }

                  if (
                    slug == "houses" ||
                    (slug == "land" && prop.name === "mortgage")
                  ) {
                    width = "100%";
                  }

                  return (
                    <View
                      key={prop.name}
                      style={{
                        marginBottom: 10,
                        width: width,
                      }}
                    >
                      <RFilterField
                        isCanRemoveSelected={true}
                        isSuccess={isSuccess}
                        type={prop.checkbox && "checkbox"}
                        initialValue={initialValue}
                        propMulti={prop.multi}
                        propTitle={prop.title}
                        propName={prop.name}
                        topTitle={prop.title}
                        onValueChange={onFieldChange}
                      />
                    </View>
                  );
                })}

              {props?.rangeFields &&
                props?.rangeFields.map((prop, i) => {
                  let title = prop.title;
                  const initialValue = filter[prop.name];
                  let isSuccess = filter[prop.name] ? true : false;
                  if (prop.multi) {
                    isSuccess =
                      filter[prop.name] && filter[prop.name].length > 0
                        ? true
                        : false;
                  }

                  const slug = sectionsId[filter?.section_relation];
                  if (slug === "houses" && prop.name == "living_squares") {
                    title = "S дома, м²";
                  }

                  if (slug === "houses" && prop.name == "land_squares") {
                    title = "S участка, сот";
                  }

                  return (
                    <View
                      style={{ marginBottom: 10, width: "100%" }}
                      key={prop.name}
                    >
                      <RFilterField
                        isSuccess={isSuccess}
                        type={"range"}
                        initialValue={initialValue}
                        propMulti={prop.multi}
                        propTitle={title}
                        propName={prop.name}
                        topTitle={title}
                        onValueChange={onFieldChange}
                      />
                    </View>
                  );
                })}
            </View>
          )}

          <Btn style={{ width: "100%" }} onPress={startSearch}>
            {isReset ? "Найти" : "Фильтровать"}
          </Btn>

          {/* <View style={tw`flex flex-row justify-between gap-1`}>
        <TouchableOpacity onPress={clearFilter}>
          <DText style={tw`text-xs text-grey mt-2.5 font-open-sans`}>
            Сбросить фильтры
          </DText>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigate.goBack()}>
          <DText style={tw`text-xs text-grey mt-2.5 font-open-sans`}>
            Закрыть фильтр
          </DText>
        </TouchableOpacity>
      </View> */}
        </View>
        {/* </ScrollView> */}
      </KeyboardAwareScrollView>
    </>
  );
}
