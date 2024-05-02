import { useEffect, useState } from "react";
import { Dimensions, ImageBackground, Linking, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Btn from "../../ui/button/btn";

const { width, height } = Dimensions.get("window");

export default function StorySingle({
  image,
  buttonLink,
  buttonText,
  duration = 10,
}) {
  const navigation = useNavigation();

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (duration === seconds) {
      navigation.navigate("Home");
    }
  }, [duration, seconds]);

  return (
    <>
      <ImageBackground
        resizeMode="cover"
        style={{
          width: width,
          height: height,
          borderRadius: 20,
          marginTop: 10,
          overflow: "hidden",
        }}
        source={image}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            height: height - 130,
          }}
        >
          <Btn
            color="white"
            style={{
              marginBottom: 60,
              width: "70%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            onPress={() => Linking.openURL(buttonLink)}
          >
            {buttonText}
          </Btn>
        </View>
      </ImageBackground>
    </>
  );
}
