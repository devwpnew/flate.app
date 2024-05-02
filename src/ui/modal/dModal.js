import { View, Modal, TouchableOpacity, StyleSheet } from "react-native";

import CrossIcon from "../icons/crossIcon";

export default function DModal({
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
  ...props
}) {
  return (
    <Modal
      visible={modalVisible}
      animationType={animationType}
      transparent={transparent}
      {...props}
    >
      {closeOnlyByButton ? (
        <View
          style={
            containerStyle
              ? containerStyle
              : position === "top"
              ? styles.modalContainerTop
              : styles.modalContainer
          }
        >
          <View
            style={
              contentStyle
                ? contentStyle
                : position === "top"
                ? styles.modalContentTop
                : styles.modalContent
            }
          >
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={closeButtonStyle ? closeButtonStyle : styles.closeButton}
            >
              <CrossIcon />
            </TouchableOpacity>

            {children}
          </View>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={
            containerStyle
              ? containerStyle
              : position === "top"
              ? styles.modalContainerTop
              : styles.modalContainer
          }
        >
          <View
            style={
              contentStyle
                ? contentStyle
                : position === "top"
                ? styles.modalContentTop
                : styles.modalContent
            }
          >
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={closeButtonStyle ? closeButtonStyle : styles.closeButton}
            >
              <CrossIcon />
            </TouchableOpacity>

            {children}
          </View>
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
    backgroundColor: "#fff",
    width: "90%",
    padding: 15,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  modalContentTop: {
    position: "relative",
    backgroundColor: "#fff",
    width: "90%",
    padding: 15,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 60,
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 15,
    zIndex: 15,
  },
});
