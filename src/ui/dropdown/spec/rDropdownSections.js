import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

import Dropdown from "../dropdown";

const slugs = {
  flats: "3",
  houses: "4",
  land: "5",
  commertion: "6",
  parkings: "7",
};

export default function RDropdownSections({ ...props }) {
  const route = useRoute();

  let initialSelected = 3;
  const slug = route?.params?.slug;

  if (slug && slugs[slug]) {
    initialSelected = parseInt(slugs[slug]);
  }

  const sections = useSelector((state) => state.sections.value.array);

  return (
    <>
      <Dropdown
        name={"section_relation"}
        isLoading={false}
        options={sections}
        initialValue={initialSelected}
        placeholder="Тип объекта"
        {...props}
      />
    </>
  );
}
