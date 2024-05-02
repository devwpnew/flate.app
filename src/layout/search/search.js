import API from "../../../api/service/api";
import tw from "../../../lib/tailwind";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterVisibility } from "../../../src/store/global/filter/filterVisibility";
import { setCity } from "../../store/global/user/userCity";

import { View, Dimensions, TouchableOpacity } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";

import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

import Button from "../../ui/button/button";
import DropdownModal from "../../ui/dropdown/dropdownModal";
import DropdownAreas from "../../ui/dropdown/spec/dropdownAreas";
import DropdownSections from "../../ui/dropdown/spec/dropdownSections";

import { setFilterGlobalFields } from "../../store/global/filter/filterGlobalFields";
import DropdownRcs from "../../ui/dropdown/spec/rcs/dropdownRcs";
import SearchIcon from "../../ui/icons/searchIcon";
import DText from "../../ui/text/dText";
import { useRoute } from "@react-navigation/native";
import FilterButton from "../category/filterButton";

function isObject(variable) {
  return Object.prototype.toString.call(variable) === "[object Object]";
}

export default function Search({ isFilter = true, navigation, type }) {
  const activeCity = useSelector((state) => state.userCity.value);
  const filterVisibility = useSelector((state) => state.filterVisibility.value);
  const filter = useSelector((state) => state.filterGlobalFields.value);
  const user = useSelector((state) => state.userLogin.value);

  const route = useRoute();

  const dispatch = useDispatch();

  const [isLoadingCities, setIsLoadingCities] = useState(true);

  const [cities, setCities] = useState([]);

  const [isLoadingSections, setIsLoadingSections] = useState(true);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    (async function fetchSectionsData() {
      setIsLoadingSections(true);

      const sectionsArr = await API.get.sections({
        filter: {
          id: 3,
        },
        sort: {
          id: "asc",
        },
        window_host: "https://flate.pro/",
      });

      if (sectionsArr.length > 0) {
        setSections(sectionsArr);
      }
      setIsLoadingSections(false);
    })();
  }, []);

  useEffect(() => {
    (async function fetchCitiesData() {
      setIsLoadingCities(true);

      const citiesArr = await API.get.cities({
        select: ["id", "name"],
        sort: {
          id: "asc",
        },
        filter: {
          active: true,
        },
        window_host: "https://flate.pro/",
      });

      if (citiesArr.length > 0) {
        setCities(citiesArr);
      }

      setIsLoadingCities(false);
    })();
  }, []);

  const loadSearch = () => {
    if (!sections) return;

    // dispatch(setFilterVisibility(true));

    navigation.navigate("Category", {
      name: sections[0].name,
      section: sections[0],
      isSearch: true,
    });
  };

  const onCityChange = (v) => {
    const selectedCity = cities.find((option) => option.id == v.value);
    dispatch(setCity(selectedCity));
  };

  const handleBackButton = () => {
    if (route.params.isSearch) {
      navigation.navigate("Category", {
        name: sections[0].name,
        section: sections[0],
        isSearch: false,
      });
    } else {
      navigation.goBack();
    }
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
    <>
      {type === "mini" ? (
        <View style={[Platform.select({ ios: { zIndex: 50 } })]}>
          <View
            style={tw`${
              isFilter ? "bg-greylight border-b border-t border-greyborder" : ""
            } px-[15px] py-2.5 flex flex-row justify-between items-center h-[60px]`}
          >
            {isFilter && (
              <HeaderBackButton
                tintColor="#1F1F1F"
                style={{ width: 35 }}
                onPress={handleBackButton}
              />
            )}

            {/* <View style={{ width: Dimensions.get("window").width - 95 }}> */}
            <View
              style={
                isFilter ? tw`w-[75%]` : { display: "flex", width: "100%" }
              }
            >
              <DropdownRcs
                isShowSelected={false}
                navigation={navigation}
                topTitle={"Название ЖК"}
                emptyOption={{
                  name: (
                    <>
                      <View style={tw`flex flex-row gap-2`}>
                        <SearchIcon />
                        <DText style={tw`text-grey`}>Поиск по ЖК</DText>
                      </View>
                    </>
                  ),
                  id: "",
                }}
                style={{ height: 44 }}
              />
            </View>
            {isFilter && (
              <TouchableOpacity
                style={tw`pr-2.5 pl-2 py-2 ml-auto`}
                onPress={() => dispatch(setFilterVisibility(!filterVisibility))}
              >
                <FilterButton isActive={filterVisibility} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : (
        <>
          <DropdownSections
            navigation={navigation}
            style={{ marginBottom: 8 }}
          />

          <DropdownRcs navigation={navigation} style={{ marginBottom: 8 }} />

          <View style={tw`flex justify-between flex-row gap-1`}>
            <DropdownModal
              initialValue={activeCity.id}
              isLoading={isLoadingCities}
              options={cities}
              onValueChange={onCityChange}
              style={{ width: "49%" }}
            />
            <DropdownAreas
              isCanClearFilter={true}
              name="area_link"
              placeholder="Выберите район"
              style={{ width: "49%" }}
              onValueChange={onFieldChange}
              initialValue={null}
            />
          </View>

          <Button style={tw`mt-[6px] h-[44px]`} onPress={loadSearch}>
            Найти
          </Button>
        </>
      )}
    </>
  );
}

function FilterIcon(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill={props.isActive ? "#4BA5F8" : "#1F1F1F"}
      {...props}
    >
      <G clipPath="url(#clip0_1476_22287)">
        <Path d="M.625 3.526h9.516a2.916 2.916 0 002.843 2.285c1.39 0 2.556-.98 2.843-2.285h3.548a.625.625 0 100-1.25h-3.549A2.919 2.919 0 0012.984-.01c-1.389 0-2.556.98-2.843 2.286H.625a.625.625 0 000 1.25zm10.698-.624v-.006a1.663 1.663 0 011.66-1.656c.912 0 1.657.742 1.661 1.654v.01a1.662 1.662 0 01-1.66 1.657 1.662 1.662 0 01-1.66-1.656v-.003zm8.052 13.572h-3.549a2.919 2.919 0 00-2.842-2.285c-1.389 0-2.556.98-2.843 2.285H.625a.625.625 0 100 1.25h9.516a2.916 2.916 0 002.843 2.286c1.39 0 2.556-.98 2.843-2.286h3.548a.625.625 0 100-1.25zm-6.391 2.286a1.662 1.662 0 01-1.66-1.657v-.002-.007a1.663 1.663 0 011.66-1.655c.911 0 1.656.741 1.66 1.654v.009a1.662 1.662 0 01-1.66 1.658zm6.391-9.385H9.859a2.916 2.916 0 00-2.843-2.286c-1.39 0-2.556.98-2.843 2.286H.625a.625.625 0 000 1.25h3.549a2.919 2.919 0 002.842 2.285c1.389 0 2.556-.98 2.843-2.285h9.516a.625.625 0 100-1.25zm-10.698.623v.007a1.663 1.663 0 01-1.66 1.655 1.664 1.664 0 01-1.661-1.653v-.01a1.662 1.662 0 011.66-1.658c.915 0 1.659.743 1.66 1.657v.002z" />
      </G>
      <Defs>
        <ClipPath id="clip0_1476_22287">
          <Path fill="#fff" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
