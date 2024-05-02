import API from "../../../../api/service/api";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { setFilterVisibility } from "../../../store/global/filter/filterVisibility";

import DropdownModal from "../dropdownModal";

export default function DropdownSections({ navigation, ...props }) {
  const route = useRoute();

  let sectionId = route?.params?.section?.id;

  if (route?.params?.section.rc_id) {
    sectionId = null;
  }

  const [isLoadingSections, setIsLoadingSections] = useState(true);
  const [sections, setSections] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    (async function fetchSectionsData() {
      setIsLoadingSections(true);

      const sectionsArr = await API.get.sections({
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

  const loadCategory = (option) => {
    const category = sections.find((section) => section.id == option.value);
    if (category?.name && sectionId != category.id) {
      navigation.navigate("Category", {
        name: category.name,
        section: category,
      });
      dispatch(setFilterVisibility(false));
    }
  };

  return (
    <DropdownModal
      required={true}
      initialValue={sectionId ? sectionId : 3}
      isLoading={isLoadingSections}
      options={sections}
      onValueChange={loadCategory}
      fireOnValueChangeOnLoad={false}
      {...props}
    />
  );
}
