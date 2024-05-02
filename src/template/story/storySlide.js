import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from "expo-image";
import { View, Linking, TouchableOpacity } from "react-native";

import Btn from "../../ui/button/btn";

export default function StorySlide({
  width = "100%",
  height = "100%",
  isLast,
  image,
  buttonText,
  buttonLink,
}) {
  const navigation = useNavigation();

  return (
    <>
      <View
        style={{
          flex: 1,
          position: "relative",

        }}
      >
        <ImageBackground
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            width: width,
            height: height,
            objectFit: "contain",
            resizeMode: "contain",
            borderRadius: 20,
            overflow: "hidden",
          }}
          source={image}
        >
          {buttonText && (
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
          )}
        </ImageBackground>

        {isLast && (
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              backgroundColor: "transparent",
              height: "100%",
              width: 70,
              margin: 0,
              padding: 0,
              zIndex: 100,
            }}
          ></TouchableOpacity>
        )}
      </View>
    </>
  );
}
