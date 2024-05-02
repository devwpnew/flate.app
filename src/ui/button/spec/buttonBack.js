import { HeaderBackButton } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";

export default function ButtonBack({ path }) {
  const navigation = useNavigation();

  return (
    <HeaderBackButton
      tintColor="#1F1F1F"
      onPress={() => navigation.navigate("Login")}
    />
  );
}
