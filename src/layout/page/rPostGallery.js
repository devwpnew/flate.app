import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Modal,
} from "react-native";

import { colors } from "../../ui/config";

import CloseIcon from "../../ui/icons/closeIcon";
import { SliderBox } from "react-native-image-slider-box";
import RPostGalleryItem from "./rPostGalleryItem";
import DownloadButton from "./buttons/downloadButton";
import {
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";
import Container from "../../ui/common/container";

const { width, height } = Dimensions.get("window");

export default function RPostGallery({ galleryImages }) {
  const [viewedGalleryIndex, setViewedGalleryIndex] = useState(0);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [isOpenGallery, setIsOpenGallery] = useState(false);

  const onFlingHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      console.log("Fling gesture ended");
      // Действия при завершении свайпа вниз
      setIsOpenGallery(false);
    }
  };

  const paginationPosition =
    galleryImages?.length > 10 ? "flex-start" : "center";

  return (
    <>
      <View style={styles.wrapper}>
        <SliderBox
          activeOpacity={1}
          paginationBoxStyle={{
            width: "100%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "row",
            justifyContent: paginationPosition,
          }}
          inactiveDotColor={colors["grey-light"]}
          dotColor={colors["blue"]}
          imageLoadingColor={colors["blue"]}
          currentImageEmitter={(index) => setActiveGalleryIndex(index)}
          onCurrentImagePressed={() => setIsOpenGallery(true)}
          style={styles.slider}
          ImageComponentStyle={styles.slider}
          images={galleryImages}
        />
      </View>

      <Modal visible={isOpenGallery} animationType={"fade"} transparent={false}>
        <FlingGestureHandler
          direction={Directions.DOWN}
          onHandlerStateChange={onFlingHandlerStateChange}
        >
          <View
            style={{
              position: "relative",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DownloadButton
              style={{
                position: "absolute",
                left: 15,
                top: 95,
                zIndex: 100,
                padding: 10,
              }}
              imagesUrls={galleryImages.length > 1 && galleryImages}
              imageUrl={galleryImages[0]}
            />

            <TouchableOpacity
              onPress={() => {
                setIsOpenGallery(false);
              }}
              style={{
                position: "absolute",
                right: 15,
                top: 95,
                zIndex: 100,
                padding: 10,
              }}
            >
              <CloseIcon variant="bolder" />
            </TouchableOpacity>

            <SliderBox
              activeOpacity={1}
              paginationBoxVerticalPadding={35}
              paginationBoxStyle={{
                width: "100%",
                overflow: "hidden",
                display: "flex",
                flexDirection: "row",
                justifyContent: paginationPosition,
              }}
              firstItem={activeGalleryIndex}
              inactiveDotColor={colors["grey-light"]}
              dotColor={colors["blue"]}
              imageLoadingColor={colors["blue"]}
              onPress={() => {
                setIsOpenGallery(true);
              }}
              // currentImageEmitter={(index) => setViewedGalleryIndex(index)}
              ImageComponent={(props) => (
                <RPostGalleryItem zoom={true} {...props} />
              )}
              images={galleryImages}
            />
          </View>
        </FlingGestureHandler>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  slider: {
    width: "100%",
    // height: 340,
    minHeight: height / 2.75,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
  },
});
