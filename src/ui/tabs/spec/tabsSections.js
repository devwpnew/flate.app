import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import Tabs from "../tabs";

const sectionsTabs = [
  {
    text: "Квартиры",
    id: "3",
  },
  {
    text: "Дома",
    id: "4",
  },
  {
    text: "Земля",
    id: "5",
  },
  {
    text: "Коммерция",
    id: "6",
  },
  {
    text: "Паркинги",
    id: "7",
  },
];

export default function TabsSections({ ...props }) {
  const navigation = useNavigation();

  const sections = useSelector((state) => state.sections.value.array);

  const loadCategory = (id) => {
    const section = sections.find((s) => s.id == id);

    navigation.navigate("Category", {
      name: section.name,
      section: section,
    });
  };

  console.log(props);

  return (
    <Tabs
      {...props}
      isLoading={false}
      isHideActive={false}
      getActiveTabId={(id) => loadCategory(id)}
      tabs={sectionsTabs}
    />
  );
}
