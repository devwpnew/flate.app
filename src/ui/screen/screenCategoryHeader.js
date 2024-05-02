import { View } from "react-native";

import { useNavigation } from "@react-navigation/native";

import Search from "../../layout/search/search";

export default function ScreenCategoryHeader({ isFilter, route }) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        marginTop: 45,
      }}
    >
      <Search navigation={navigation} type={"mini"} isFilter={isFilter} />
    </View>
  );
}
