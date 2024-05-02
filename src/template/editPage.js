import { View } from "react-native";
import Add from "./user/add";

export default function EditPage({ navigation, route }) {
  const p = route.params.product;

  return <Add route={route} navigation={navigation} product={p} />;
}
