import { View } from "react-native";


import RInput from "../../../ui/input/rInput";
import Paragraph from "../../../ui/text/paragraph";
import { useSelector } from "react-redux";
import { colors } from "../../../ui/config";

export default function FieldFiles({ onTextFieldChange, product }) {
  const form = useSelector((state) => state.addForm.value);

  return (
    <View>
      <Paragraph style={{ marginBottom: 10, marginTop: 20 }} size="md">
        Прикрепить ссылки
      </Paragraph>

      <View style={{ marginBottom: 10 }}>
        <RInput
          style={{ fontSize: 14 }}
          left={
            <Paragraph
              style={{ fontFamily: "Manrope_400Regular" }}
              size="md"
              color="grey-medium"
            >
              Видео
            </Paragraph>
          }
          leftWidth={65}
          initialValue={product?.youtube_video_link}
          onChangeText={onTextFieldChange}
          name={"youtube_video_link"}
          isSuccess={form?.youtube_video_link}
          placeholder={"https://"}
          placeholderTextColor={colors['grey-medium']}
        />
      </View>

      <View style={{ marginBottom: 10 }}>
        <RInput
          style={{ fontSize: 14 }}
          left={
            <Paragraph
              style={{ fontFamily: "Manrope_400Regular" }}
              size="md"
              color="grey-medium"
            >
              Облако
            </Paragraph>
          }
          leftWidth={65}
          initialValue={product?.cloud_links}
          onChangeText={onTextFieldChange}
          name={"cloud_links"}
          isSuccess={form?.cloud_links}
          placeholder={"https://"}
          placeholderTextColor={colors['grey-medium']}
        />
      </View>
    </View>
  );
}
