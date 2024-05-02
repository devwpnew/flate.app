import { StyleSheet, Platform } from "react-native";
import { useRoute } from "@react-navigation/native";

import RNPickerSelect from "react-native-picker-select";

import SortIcon from "../../icons/sortIcon";
import { useState } from "react";

const sortFields = [
  {
    label: "По умолчанию",
    obj: {
      id: "date_published",
      sort: { date_published: "DESC" },
    },
    value: "1",
  },
  {
    label: "Дешевле",
    obj: {
      id: "price-desc",
      sort: { product_price: "ASC" },
    },
    value: "2"
  },
  {
    label: "Дороже",
    obj: {
      id: "price-DESC",
      sort: { product_price: "DESC" },
    },
    value: "3"
  },
  {
    label: "Сначала старые",
    obj: {
      id: "date_created-ASC",
      sort: { date_created: "ASC" },
    },
    value: "4"
  },
  {
    label: "Сначала новые",
    obj: {
      id: "date_created-DESC",
      sort: { date_created: "DESC" },
    },
    value: "5"
  },
  // {
  // label:"Дороже за м2",
  //   id: "squares-price-asc",
  //   sort: { living_squares: "DESC" },
  // },
  // {
  // label:"Дешевле за м2",
  //   id: "squares-price-desc",
  //   sort: { living_squares: "ASC" },
  // },
];

const specialSortFields = [
  {
    label: "По имени [A-Я]",
    obj: {
      id: "name-ASC",
      sort: { name: "ASC" },
    },
    value: "6"
  },
  {
    label: "По имени [Я-A]",
    obj: {
      id: "name-DESC",
      sort: { name: "DESC" },
    },
    value: "7"
  },
  {
    label: "По ЖК [A-Я]",
    obj: {
      id: "rc_link-ASC",
      sort: { rc_link: "ASC" },
    },
    value: "8"
  },
  {
    label: "По ЖК [Я-A]",
    obj: {
      id: "rc_link-DESC",
      sort: { rc_link: "DESC" },
    },
    value: "9"
  },
];

const sectionsId = {
  3: "flats",
  4: "houses",
  5: "land",
  6: "commertion",
  7: "parkings",
};

export default function RDropdownSort({ onDonePress, sectionId, ...props }) {
  const route = useRoute();
  const routeName = route.name.toLocaleLowerCase();
  const slug =
    route.params?.section?.slug ||
    sectionsId[route?.params?.filter?.section_relation] ||
    sectionsId[sectionId];

  let fullSortedFields = sortFields;
  const specialItemsSortFields = [...sortFields, ...specialSortFields];

  if (slug == "land") {
    const sortSquares = [
      {
        label: "Площадь больше",
        obj: {
          id: "squares-DESC",
          sort: { land_squares: "DESC" },
        },
        value: "30"
      },
      {
        label: "Площадь меньше",
        obj: {
          id: "squares-ASC",
          sort: { land_squares: "ASC" },
        },
        value: "31"
      },
    ];

    fullSortedFields = [...fullSortedFields, ...sortSquares];
  } else if (slug == "commertion") {
    const sortSquares = [
      {
        label: "Площадь больше",
        obj: {
          id: "squares-DESC",
          sort: { object_squares: "DESC" },
        },
        value: "32"
      },
      {
        label: "Площадь меньше",
        obj: {
          id: "squares-ASC",
          sort: { object_squares: "ASC" },
        },
        value: "33"
      },
    ];

    fullSortedFields = [...fullSortedFields, ...sortSquares];
  } else {
    const sortSquares = [
      {
        label: "Площадь больше",
        obj: {
          id: "squares-DESC",
          sort: { living_squares: "DESC" },
        },
        value: "34"
      },
      {
        label: "Площадь меньше",
        obj: {
          id: "squares-ASC",
          sort: { living_squares: "ASC" },
        },
        value: "35"
      },
    ];

    fullSortedFields = [...fullSortedFields, ...sortSquares];
  }

  const [selected, setSelected] = useState(null);

  const onSortDone = (v) => {
    const sortObj = [...fullSortedFields, ...specialItemsSortFields].find((sort) => sort.value == v)

    if (onDonePress) {
      if (sortObj) {
        onDonePress(sortObj.obj.sort)
      } else {
        onDonePress(fullSortedFields[0].obj.sort);
      }
    }
  };

  const onSortChange = (v) => {
    if (Platform.OS == "ios") {
      setSelected(v);
    } else {
      onSortDone(v);
    }
  };

  return (
    <>
      <RNPickerSelect
        doneText="Применить"
        onDonePress={() => onSortDone(selected)}
        items={
          routeName === "items" ? specialItemsSortFields : fullSortedFields
        }
        textInputProps={styles.textInput}
        onValueChange={onSortChange}
        placeholder={{}}
        Icon={() => {
          return <SortIcon />;
        }}
        useNativeAndroidPickerStyle={false}
      />

      {/* <Dropdown
        shadow={false}
        color="grey-light"
        options={
          routeName === "items"
            ? [...sortFields, ...specialSortFields]
            : sortFields
        }
        name={"sort"}
        initialValue="date_published"
        onValueChange={onSortChange}
        isLoading={false}
        {...props}
      /> */}
    </>
  );
}
const styles = StyleSheet.create({
  textInput: {
    opacity: 0,
    textAlign: "right",
    position: "relative",
    zIndex: 10,
    height: 40,
    width: 40,
  },
});
