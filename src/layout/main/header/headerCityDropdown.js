import API from "../../../../api/service/api";
import { useEffect, useState } from "react";
import tw from "../../../../lib/tailwind";
import { View } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { setCity } from "../../../store/global/user/userCity";

import MapPointIcon from "../../../ui/icons/mapPointIcon";

import DropdownModal from "../../../ui/dropdown/dropdownModal";

export default function HeaderCityDropdown({
  arrowStyle,
  dropdownStyle,
  selectedValueContainer,
  selectedValueTextContainer,
  selectedValueTextContainerText,
  ...props
}) {
  const activeCity = useSelector((state) => state.userCity.value);
  const dispatch = useDispatch();

  const [cities, setCities] = useState([]);
  const [isLoadingCities, setIsLoadingCities] = useState(false);

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

  const onCityChange = (v) => {
    const selectedCity = cities.find((option) => option.id == v.value)
    dispatch(setCity(selectedCity));
  };

  // console.log(activeCity.id);

  return (
    <View style={tw`flex flex-row items-center`}>
      <DropdownModal
        required={true}
        name={'city_link'}
        initialValue={activeCity.id}
        style={dropdownStyle}
        icon={<MapPointIcon style={{ marginTop: 6, marginRight: 4 }} />}
        arrowStyle={arrowStyle}
        selectedValueContainer={selectedValueContainer}
        selectedValueTextContainer={selectedValueTextContainer}
        selectedValueTextContainerText={selectedValueTextContainerText}
        isLoading={isLoadingCities}
        options={cities}
        onValueChange={onCityChange}
        {...props}
      />
    </View>
  );
}
