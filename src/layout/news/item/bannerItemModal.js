import { Image, StyleSheet, Linking, Dimensions } from "react-native";
import { useState } from "react";

import BannerItem from "./bannerItem";
import RModal from "../../../ui/modal/rModal";
import Title from "../../../ui/heading/title";
import Btn from "../../../ui/button/btn";
import Paragraph from "../../../ui/text/paragraph";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");

export default function BannerItemModal({
  heading,
  image,
  text,
  url,
  detail_text,
  detail_image,
  ...props
}) {
  const navigation = useNavigation();
  const [showBannerModal, setShowBannerModal] = useState(false);

  return (
    <>
      <BannerItem
        image={image}
        heading={heading}
        onPress={() => {
          navigation.navigate("Adv", {
            heading: heading,
            image: image,
            text: text,
            url: url,
            detail_text: detail_text,
            detail_image:detail_image
          });
          // setShowBannerModal(true);
        }}
        {...props}
      />

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
            {heading}
          </Title>

          {/* <Image style={styles.image} source={image} /> */}

          <Paragraph style={{ marginBottom: 20 }} size="lg">
            {detail_text}
          </Paragraph>
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
  image: {
    borderRadius: 20,
    height: height / 4,
    marginBottom: 20,
  },
});
