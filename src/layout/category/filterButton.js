import { useNavigation, useRoute } from "@react-navigation/native";

import { Circle, Path, Rect, Svg } from "react-native-svg";
import { TouchableOpacity } from "react-native";

const sectionsId = {
  3: "flats",
  4: "houses",
  5: "land",
  6: "commertion",
  7: "parkings",
};

export const loadSearch = (route, navigation, cb) => {
  const filter = route?.params?.filter;
  let slug = route?.params?.slug;

  if (route?.params?.section?.slug) {
    slug = route?.params.section.slug;
  }

  if (filter?.section_relation) {
    slug = sectionsId[filter.section_relation];
  }

  if (!slug) {
    slug = "flats";
  }

  const navObj = {};

  if (slug) {
    navObj["slug"] = slug;
  }

  if (filter) {
    navObj["filter"] = filter;
  }

  navigation.push("Search", navObj);

  if (cb) {
    cb();
  }
};

export default function FilterButton({ style = {}, isFilled = false }) {
  const route = useRoute();
  const navigation = useNavigation();

  // const isAlert =
  //   route.params?.filter && Object.keys(route.params?.filter).length > 1;

  const isAlert = route.name === "Home" ? false : true;

  return (
    <TouchableOpacity
      style={{ ...style, position: "relative" }}
      onPress={() => loadSearch(route, navigation)}
    >
      {isFilled ? (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={40}
          height={40}
          viewBox="0 0 40 40"
          fill="none"
        >
          <Rect width={40} height={40} rx={20} fill="#ECF2F8" />
          <Path
            d="M15.5 17a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17 15.5h10M20.5 22a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM14 20.5h5M22 20.5h5M25.5 27a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM24 25.5H14"
            stroke="#1A1F25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ) : (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={15}
          height={14}
          viewBox="0 0 15 14"
          fill="none"
        >
          <Path
            d="M2.5 3.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM4 2h10M7.5 8.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1 7h5M9 7h5M12.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM11 12H1"
            stroke="#1A1F25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      )}

      {isAlert && (
        <Svg
          style={{
            position: "absolute",
            right: 3,
            top: 3,
          }}
          width={8}
          height={8}
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Circle cx={4} cy={4} r={4} fill="#D44D4D" />
        </Svg>
      )}
    </TouchableOpacity>
  );
}
