import { View, StyleSheet, TouchableOpacity } from "react-native";

import Paragraph from "../../../ui/text/paragraph";

import { colors } from "../../../ui/config";

import { Arrow } from "../../../layout/profile/icons/icons";
import { useState } from "react";

export default function FaqItem({ item, arAnswer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <View key={item.textTitle} style={styles.item}>
        <TouchableOpacity
          onPress={() => setIsOpen((prev) => !prev)}
          style={{
            position: "relative",
            paddingRight: 20,
            justifyContent: "space-between",
            paddingVertical: 10,
            borderColor: colors["grey-light"],
            borderBottomWidth: 1,
          }}
        >
          <Paragraph style={{fontFamily: "Manrope_600SemiBold",}} size="lg">{item.textTitle}</Paragraph>
          <Arrow
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              marginTop: 4
            }}
            isOpen={isOpen}
          />
        </TouchableOpacity>

        {isOpen && (
          <View style={{ marginVertical: 10 }}>
            {arAnswer.map((answer) => {
              return (
                <Paragraph key={answer.textItemAnswer} size="lg">
                  {answer.textItemAnswer}
                </Paragraph>
              );
            })}
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  item: {},
});
