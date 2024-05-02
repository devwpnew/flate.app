import { View, ScrollView } from "react-native";
import Main from "../layout/main/main";
import tw from "../../lib/tailwind";
import FallbackDevelopment from "../ui/fallback/fallbackDevelopment";
import Footer from "../layout/main/footer";

export default function Requests({ navigation }) {
  return (
    <Main>
      <View style={tw`flex flex-col items-center justify-center h-full`}>
        <FallbackDevelopment />
        <View style={tw`h-[70px]`}></View>
      </View>
      <Footer navigation={navigation} />
    </Main>
  );
}
