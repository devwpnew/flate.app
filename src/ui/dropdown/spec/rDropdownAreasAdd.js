import api from "../../../../api/service/api";
import { useEffect, useState } from "react";

import Dropdown from "../dropdown";
import { useSelector } from "react-redux";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function RDropdownAreasAdd({
  multiselect,
  city,
  onValueChange,
  initialValue,
  isSuccess,
  ...props
}) {
  const form = useSelector((state) => state.addForm.value);
  const activeCity = city ? city : useSelector((state) => state.userCity.value);

  const [isLoading, setIsLoading] = useState(false);

  const [initialParentArea, setInitialParentArea] = useState(null);
  const [initialChildArea, setInitialChildArea] = useState(null);

  const [areas, setAreas] = useState([]);
  const [parentAreas, setParentAreas] = useState([]);
  const [childrenAreas, setChildrenAreas] = useState([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const city = activeCity && activeCity.id ? activeCity.id : activeCity;

        const areasArr = await api.get.areas({
          sort: {
            sort: "asc",
          },
          filter: {
            link_city: city,
          },
          limit: "all",
        });

        if (areasArr && areasArr.length > 0) {
          setAreas(areasArr);

          const parents = areasArr.filter((area) => !area.parent_area);

          setParentAreas(parents);
        }
      } catch (e) {
        console.log(e);
      }

      setIsLoading(false);
    })();
  }, [activeCity]);

  useEffect(() => {
    if (areas.length === 0) return;

    if (initialValue) {
      const initialArea = areas.find((area) => area.id == initialValue);

      const children = areas.filter((area) => area.parent_area);
      setChildrenAreas(children);

      if (initialArea?.parent_area?.id) {
        setInitialParentArea(initialArea?.parent_area?.id);
        setInitialChildArea(initialArea?.id);

        return;
      }

      if (initialArea?.id) {
        setInitialParentArea(initialArea?.id);
      }
    }
  }, [areas, initialValue]);

  const onParentChange = (v) => {
    if (v?.value && v?.value[0]) {
      const selectedId = v.value[0];
      const childrenAreasFiltered = areas.filter(
        (area) => area.parent_area.id == v.value
      );
      setChildrenAreas(childrenAreasFiltered);
      onValueChange({ name: "area_link", value: selectedId });
      setInitialParentArea(selectedId)
    }
  };

  const onChildChange = (v) => {
    if (v?.value && v?.value[0]) {
      const selectedId = v.value[0];
      onValueChange({ name: "area_link", value: selectedId });
      setInitialChildArea(selectedId)
    }
  };

  const isParentSuccess = form?.area_link;
  const isChildSuccess = childrenAreas.find((ch) => ch.id == form?.area_link);

  return (
    <>
      <Dropdown
        isSuccess={isParentSuccess}
        initialValue={initialParentArea ? [initialParentArea] : null}
        multiselect={true}
        multiselectSingle={true}
        name={"area_link"}
        placeholder={"Район"}
        isLoading={isLoading}
        options={parentAreas}
        onValueChange={onParentChange}
        {...props}
      />

      {childrenAreas && childrenAreas.length > 0 && (
        <View style={{ marginTop: 10 }}>
          <Dropdown
            isSuccess={isChildSuccess}
            initialValue={initialChildArea ? [initialChildArea] : null}
            multiselect={true}
            multiselectSingle={true}
            name={"area_link_children"}
            placeholder={"Микрорайон"}
            isLoading={isLoading}
            options={childrenAreas}
            onValueChange={onChildChange}
            {...props}
          />
        </View>
      )}
    </>
  );
}
