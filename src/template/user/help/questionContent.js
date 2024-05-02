import { View, TouchableOpacity } from "react-native";
import DText from "../../../ui/text/dText";
import tw from "../../../../lib/tailwind";
import Button from "../../../ui/button/button";
import Link from "../../../ui/link/link";

export default function QuestionsContent({ navigation, questions }) {
  return (
    <>
      {questions.map((el) => {
        return (
          <View style={tw`mb-5`} key={el.textItemQuestion}>
            <DText style={tw`mb-2.5 text-xl font-bold`}>
              {el.textItemQuestion?.trim()}
            </DText>
            <DText style={tw`text-lg`}>{el.textItemAnswer?.trim()}</DText>
          </View>
        );
      })}
      <Button
        onPress={() => navigation.navigate("Help")}
        style={tw`h-[41px] w-[100px] mb-5`}
      >
        Назад
      </Button>
    </>
  );
}
