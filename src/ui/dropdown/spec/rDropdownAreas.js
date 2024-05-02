import api from "../../../../api/service/api";
import { useEffect, useState } from "react";

import Dropdown from "../dropdown";
import { useSelector } from "react-redux";
import { View } from "react-native";

export default function RDropdownAreas({
  multiselect,
  city,
  onValueChange,
  initialValue,
  isSuccess,
  isSingleSelect,
  placeholderAreas,
  placeholderMicroAreas,
  ...props
}) {
  const activeCity = city ? city : useSelector((state) => state.userCity.value);

  const [isLoading, setIsLoading] = useState(false);
  const [isShowChildrenDropdown, setIsShowChildrenDropdown] = useState(false);

  const [activeChildren, setActiveChildren] = useState(null);

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

        if (multiselect) {
          const areasArr = await api.get.areasList(city);

          // console.log(areasArr);

          if (areasArr && areasArr.length > 0) {
            setAreas(areasArr);
          }
        } else {
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
            const options = areasArr.map((area) => {
              return {
                ...area,
                value: area.id,
              };
            });

            setAreas(options);

            const parents = options.filter((area) => !area.parent_area);
            const children = options.filter((area) => area.parent_area);

            setParentAreas(parents);
            setChildrenAreas(children);
          }
        }
      } catch (e) {
        console.log(e);
      }

      setIsLoading(false);
    })();
  }, [activeCity]);

  useEffect(() => {
    if (multiselect) return;
    if (parentAreas.length == 0 || childrenAreas.length == 0) return;

    setIsLoading(true);

    const areas = [...parentAreas, ...childrenAreas];
    const initialArea = areas.find((area) => area.id == initialValue);

    if (initialArea?.parent_area?.id) {
      setInitialParentArea(initialArea?.parent_area?.id);
      setInitialChildArea(initialArea?.id);
      setIsShowChildrenDropdown(true);

      setIsLoading(false);
      return;
    }

    if (initialArea?.id) {
      setInitialParentArea(initialArea?.id);
    }

    setIsLoading(false);
  }, [activeCity, initialValue, parentAreas, childrenAreas]);

  const [localForm, setLocalForm] = useState({});

  const onParentValueChange = (v) => {
    if (localForm.children_area_link) {
      setIsShowChildrenDropdown(false);
      setInitialChildArea(null);
      setLocalForm({ ...localForm, children_area_link: null });
      setTimeout(() => {
        setIsShowChildrenDropdown(true);
      });
      return;
    }

    setIsShowChildrenDropdown(true);
    setLocalForm({ ...localForm, parent_area_link: v.value });
  };

  const onChildrenValueChange = (v) =>
    setLocalForm({ ...localForm, children_area_link: v.value });

  return (
    <>
      {multiselect ? (
        <Dropdown
          isSuccess={isSuccess}
          initialValue={initialValue}
          multiselect={true}
          name={"area_link"}
          placeholder={placeholderAreas ? placeholderAreas : "Район"}
          isLoading={isLoading}
          options={areas}
          onValueChange={onValueChange}
          {...props}
        />
      ) : (
        <>
          <Dropdown
            isSuccess={isSuccess}
            initialValue={initialParentArea}
            multiselect={multiselect}
            name={"area_link"}
            placeholder={placeholderAreas ? placeholderAreas : "Район"}
            isLoading={isLoading}
            options={parentAreas}
            onValueChange={(v) => {
              if (onValueChange) {
                
                if(isSingleSelect) {
                  onValueChange(v)
                }else {
                  const childrenAreasFiltered = areas.filter((area) => area.parent_area.id == v.value);
                  const childrenAreasFilteredIds = childrenAreasFiltered.map((area) => area.id);
  
                  onValueChange({ value: childrenAreasFilteredIds, name: v.name });
                }
              }
              if (onParentValueChange) {
                onParentValueChange(v);
              }
            }}
            onValuePress={(v) => {
              if (areas && areas.length > 0) {
                const childrenAreasFiltered = areas.filter(
                  (area) => area.parent_area.id == v.value
                );
                setChildrenAreas(childrenAreasFiltered);
              }

              setActiveChildren(null);
            }}
            {...props}
          />

          {isShowChildrenDropdown &&
            childrenAreas &&
            childrenAreas?.length > 0 && (
              <View style={{ marginTop: 10 }}>
                <Dropdown
                  isSuccess={isSuccess && activeChildren ? true : false}
                  initialValue={initialChildArea}
                  multiselect={multiselect}
                  name={"area_link"}
                  placeholder={
                    placeholderMicroAreas ? placeholderMicroAreas : "Микрорайон"
                  }
                  isLoading={isLoading}
                  options={childrenAreas}
                  onValueChange={(v) => {
                    if (onValueChange) {
                      onValueChange(v);
                    }
                    setActiveChildren(v);
                    if (onChildrenValueChange) {
                      onChildrenValueChange(v);
                    }
                  }}
                  {...props}
                />
              </View>
            )}
        </>
      )}
    </>
  );
}
