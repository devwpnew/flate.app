import { StyleSheet, View } from "react-native";
import InputBasic from "./inputBasic";
import DText from "../text/dText";
import tw from "../../../lib/tailwind";

import { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import DModal from "../modal/dModal";

export default function Input({
  inputStyle,
  style,
  tooltip,
  leftTitle,
  topTitle,
  required,
  onChangeText,
  ...props
}) {
  const topTitleRef = useRef(null);
  const [markWidth, setMarkWidth] = useState(false);
  const [isShowTooltip, setIsShowTooltip] = useState(false);

  useEffect(() => {
    if (!topTitle || !tooltip) return;

    if (!markWidth);
    {
      if (topTitleRef.current) {
        topTitleRef.current.measure((x, y, width, height) => {
          setMarkWidth(width + 28);
        });
      }
    }
  }, [topTitleRef.current, topTitle, tooltip, markWidth]);

  const handleTooltip = () => {
    if (!tooltip) return;
    setIsShowTooltip((prev) => !prev);
  };

  return (
    <View
      style={
        style
          ? {
              ...style,
              position: "relative",
            }
          : {
              ...styles.container,
              position: "relative",
            }
      }
    >
      {tooltip && (
        <View style={[Platform.select({ ios: { zIndex: 10 } })]}>
          <View
            style={tw`w-[${markWidth ? markWidth : 0}px] relative ${
              markWidth ? "opacity-100" : "opacity-0"
            }`}
          >
            <TouchableOpacity
              onPress={handleTooltip}
              style={{
                ...tw`w-4 h-4 bg-greyA0 rounded-full`,
                position: "absolute",
                right: -3,
                top: -8,
              }}
            >
              <DText style={tw`text-center text-white text-[12px]`}>?</DText>
            </TouchableOpacity>
          </View>

          <DModal
            setModalVisible={setIsShowTooltip}
            modalVisible={isShowTooltip}
          >
            <DText style={tw`text-center text-grey`}>{tooltip}</DText>
          </DModal>
        </View>
      )}

      {topTitle && (
        <View style={[Platform.select({ ios: { zIndex: 10 } })]}>
          <TouchableOpacity onPress={() => setIsShowTooltip(true)}>
            <DText style={styles.topTitle} innerRef={topTitleRef}>
              {topTitle}

              {required && <DText style={tw`text-red`}>*</DText>}
            </DText>
          </TouchableOpacity>
        </View>
      )}

      <InputBasic
        topTitle={topTitle}
        leftTitle={leftTitle}
        style={inputStyle}
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topTitle: {
    position: "absolute",
    top: -8,
    left: 10,
    fontSize: 12,
    zIndex: 5,
    backgroundColor: "#fff",
    color: "#666666",
  },
});
