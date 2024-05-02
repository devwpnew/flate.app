import React from "react";
import DropdownModal from "../dropdownModal";
import tw from "../../../../lib/tailwind";
import { useRoute } from "@react-navigation/native";

const sortFields = [
  {
    name: "По умолчанию",
    id: "date_published",
    sort: { date_published: "DESC" },
  },
  {
    name: "Дешевле",
    id: "price-desc",
    sort: { product_price: "ASC" },
  },
  {
    name: "Дороже",
    id: "price-DESC",
    sort: { product_price: "DESC" },
  },
  {
    name: "Площадь больше",
    id: "squares-DESC",
    sort: { living_squares: "DESC" },
  },
  {
    name: "Площадь меньше",
    id: "squares-ASC",
    sort: { living_squares: "ASC" },
  },
  {
    name: "Сначала старые",
    id: "date_created-ASC",
    sort: { date_created: "ASC" },
  },
  {
    name: "Сначала новые",
    id: "date_created-DESC",
    sort: { date_created: "DESC" },
  },
  // {
  //   name: "Дороже за м2",
  //   id: "squares-price-asc",
  //   sort: { living_squares: "DESC" },
  // },
  // {
  //   name: "Дешевле за м2",
  //   id: "squares-price-desc",
  //   sort: { living_squares: "ASC" },
  // },
];

const specialSortFields = [
  {
    name: "По имени [A-Я]",
    id: "name-ASC",
    sort: { name: "ASC" },
  },
  {
    name: "По имени [Я-A]",
    id: "name-DESC",
    sort: { name: "DESC" },
  },
  {
    name: "По ЖК [A-Я]",
    id: "rc_link-ASC",
    sort: { rc_link: "ASC" },
  },
  {
    name: "По ЖК [Я-A]",
    id: "rc_link-DESC",
    sort: { rc_link: "DESC" },
  },
];

export default function DropdownSort({ style, onValueChange, ...props }) {
  const route = useRoute();
  const routeName = route.name.toLocaleLowerCase();

  const fullSortedFields = [...sortFields, ...specialSortFields];

  const onSortChange = (v) => {
    const sort = fullSortedFields.find((o) => o.id === v.value);

    onValueChange(sort.sort);
  };

  return (
    <>
      <DropdownModal
        name={"sort"}
        style={style ? style : tw`w-[135px] mb-2.5`}
        options={
          routeName === "items"
            ? [...sortFields, ...specialSortFields]
            : sortFields
        }
        onValueChange={onSortChange}
        {...props}
      />
    </>
  );
}
