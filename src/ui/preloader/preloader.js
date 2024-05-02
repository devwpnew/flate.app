import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Animated } from "react-native";

const Preloader = ({ children, style }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animatedValue]);

  const animatedStyles = StyleSheet.create({
    loader: {
      flex: 1,
      width: "100%",
      height: "100%",
      position: "relative",
      backgroundColor: "#E5E7EB",
      borderRadius: style?.borderRadius ? style.borderRadius : 4,
      overflow: "hidden",
    },
    box: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderRadius: 5,
    },
  });

  return (
    <View style={style}>
      <View style={animatedStyles.loader}>
        {children ? (
          <Animated.View style={animatedStyles.box} opacity={animatedValue}>
            {children}
          </Animated.View>
        ) : (
          <Animated.View style={animatedStyles.box} opacity={animatedValue} />
        )}
      </View>
    </View>
  );
};

export default Preloader;
