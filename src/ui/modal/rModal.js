import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

import { useEffect, useRef, useState } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";

import CloseIcon from "../icons/closeIcon";

export default function RModal({
  children,
  position,
  modalVisible,
  setModalVisible,
  animationType = "fade",
  transparent = true,
  closeOnlyByButton,
  containerStyle,
  contentStyle,
  closeButtonStyle,
}) {
  const keyboardDidShowListener = useRef();
  const keyboardDidHideListener = useRef();

  const translateY = useSharedValue(0);

  useEffect(() => {
    // Добавьте слушателей событий клавиатуры
    keyboardDidShowListener.current = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        translateY.value = withSpring(translateY.value - e.endCoordinates.height / 2 + 20);
      }
    );

    keyboardDidHideListener.current = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        translateY.value = withSpring(0);
      }
    );

    // Очистите слушателей событий при размонтировании компонента
    return () => {
      keyboardDidShowListener.current.remove();
      keyboardDidHideListener.current.remove();
    };
  }, []);

  const getContainerStyle = () => {
    if (containerStyle) return containerStyle;
    if (position === "top") return styles.modalContainerTop;
    return styles.modalContainer;
  };

  const getContentStyle = () => {
    if (contentStyle) return contentStyle;
    if (position === "top") return styles.modalContentTop;
    return styles.modalContent;
  };

  const container = getContainerStyle();
  const content = [getContentStyle(), { transform: [{ translateY }] }];

  return (
    <Modal
      visible={modalVisible}
      animationType={animationType}
      transparent={transparent}
    >
      {closeOnlyByButton ? (
        <View style={container}>
          <Animated.View style={content}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={closeButtonStyle ? closeButtonStyle : styles.closeButton}
            >
              <CloseIcon variant="bolder" />
            </TouchableOpacity>

            {children}
          </Animated.View>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={container}
        >
          <Animated.View style={content}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={closeButtonStyle ? closeButtonStyle : styles.closeButton}
            >
              <CloseIcon variant="bolder" />
            </TouchableOpacity>

            {children}
          </Animated.View>
        </TouchableOpacity>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0, 0.5)",
  },
  modalContainerTop: {
    flex: 1,
    justifyContent: "start",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0, 0.5)",
  },
  modalContent: {
    position: "relative",
    width: "90%",
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#FFF",
    shadowColor: "#1A1F25",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  modalContentTop: {
    position: "relative",
    backgroundColor: "#fff",
    width: "90%",
    padding: 15,
    borderRadius: 10,
    marginTop: 60,
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 20,
    zIndex: 15,
  },
});
