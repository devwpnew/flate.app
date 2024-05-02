import API from "../../../../api/service/api";
import { useEffect, useState } from "react";
import DropdownModalLadder from "../dropdownModalLadder";
import { useSelector } from "react-redux";
import { useMemo } from "react";

export default function DropdownAreas({
  city,
  multiselect = true,
  initialValue,
  onFieldChange,
  onValueChange,
  value,
  ...props
}) {
  const [cityId, setCityId] = useState(city);

  const activeCity = useSelector((state) => state.userCity.value);
  const filter = useSelector((state) => state.filterGlobalFields.value);

  const [isLoadingAreas, setIsLoadingAreas] = useState(true);
  const [initialValueState, setAreaInitialValueState] = useState(null);
  const [sortedAreasList, setSortedAreasList] = useState([]);

  useEffect(() => {
    (async function fetchAreasData() {
      setIsLoadingAreas(true);
      const city = cityId ? cityId : activeCity.id;

      const sortedAreasListRes = await API.get.areasList(city);

      if (sortedAreasListRes.length > 0) {
        setSortedAreasList(sortedAreasListRes);
      }

      setIsLoadingAreas(false);
    })();
  }, [cityId]);

  useEffect(() => {
    setCityId(city);

    if (sortedAreasList.length > 0) {
      setAreaInitialValueState(sortedAreasList[0].id);
    }
  }, [city]);

  useEffect(() => {
    setAreaInitialValueState(initialValue);
  }, [initialValue]);
  return (
    <>
      <DropdownModalLadder
        name="area_link"
        initialValue={initialValueState ? initialValueState : filter?.area_link}
        isLoading={isLoadingAreas}
        options={sortedAreasList}
        multiselect={multiselect}
        onValueChange={onValueChange}
        value={value}
        {...props}
      />
    </>
  );
}
