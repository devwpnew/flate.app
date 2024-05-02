import { StyleSheet, View } from "react-native";

import Paragraph from "../../ui/text/paragraph";
import Title from "../../ui/heading/title";

export default function RPostDescription({ description }) {
  return (
    <View style={styles.wrapper}>
      <Title style={{ marginBottom: 10 }} size="sm">
        Описание
      </Title>
      <Paragraph size="lg">{description.replace(/"\n"/g, "")}</Paragraph>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
  },
});
