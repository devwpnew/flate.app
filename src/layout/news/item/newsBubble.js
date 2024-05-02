import { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import Paragraph from "../../../ui/text/paragraph";
import Gradient from "../../../ui/common/gradient";

import { colors } from "../../../ui/config";
import RModal from "../../../ui/modal/rModal";
import Title from "../../../ui/heading/title";
import Btn from "../../../ui/button/btn";

const { width, height } = Dimensions.get("window");

const isSmallDevice = width < 390;

export default function NewsBubble({
  onPress,
  url,
  preview_image_local,
  preview_image,
  detail_image,
  detail_text,
  name,
}) {
  const [showBannerModal, setShowBannerModal] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          if (!onPress) {
            setShowBannerModal(true);
          } else {
            onPress();
          }
        }}
      >
        <Gradient isReverseColors={true} style={styles.gradientContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={
                preview_image_local
                  ? preview_image_local
                  : preview_image
                  ? { uri: `https://flate.pro${preview_image}` }
                  : require("../../../../assets/article-bubble-thumb.jpeg")
              }
            />
          </View>
        </Gradient>

        <Paragraph
          numberOfLines={2}
          style={{ ...styles.text, fontSize: isSmallDevice ? 9 : 10 }}
          size="sm"
        >
          {name}
        </Paragraph>
      </TouchableOpacity>

      <RModal
        closeOnlyByButton={true}
        modalVisible={showBannerModal}
        setModalVisible={setShowBannerModal}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ height: height - 200 }}
        >
          <Title style={{ marginBottom: 20 }} size="sm">
            {name}
          </Title>

          <Paragraph style={{ marginBottom: 20 }} size="lg">
            {detail_text}
          </Paragraph>

          {detail_image && (
            <Image
              style={styles.modalImage}
              source={{ uri: `https://flate.pro${detail_image}` }}
            />
          )}
        </ScrollView>
        {url ? (
          <Btn
            style={{ paddingTop: 10 }}
            color="transparent"
            onPress={() => Linking.openURL(url)}
          >
            Узнать подробности
          </Btn>
        ) : (
          <Btn
            style={{ paddingTop: 10 }}
            color="transparent"
            onPress={() => setShowBannerModal(false)}
          >
            Закрыть
          </Btn>
        )}
      </RModal>
    </>
  );
}

const styles = StyleSheet.create({
  modalImage: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 20,
    height: height / 4,
    marginBottom: 20,
  },
  gradientContainer: {
    width: width / 5.2,
    height: width / 5.2,
    padding: 2,
    borderRadius: 100,
    overflow: "hidden",
    marginBottom: 4,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    padding: 2,
    backgroundColor: colors["white"],
    borderRadius: 100,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    overflow: "hidden",
    backgroundColor: colors["grey-light"],
  },
  text: {
    textAlign: "center",
    width: 74,
  },
});
