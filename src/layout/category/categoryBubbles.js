import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  View,
  Platform,
} from "react-native";

import { Image, ImageBackground } from "expo-image";

import Paragraph from "../../ui/text/paragraph";
import { colors } from "../../ui/config";

const { width } = Dimensions.get("window");

export default function CategoryBubbles({ style }) {
  const navigation = useNavigation();

  const sections = useSelector((state) => state.sections.value.array);

  const loadCategory = (slug) => {
    const section = sections.find((s) => s.slug === slug);

    navigation.navigate("Category", {
      name: section.name,
      section: section,
    });
  };

  return (
    <View style={{ ...style, ...styles.container }}>
      <TouchableOpacity onPress={() => loadCategory("flats")}>
        <ImageBackground
          source={require("../../../assets/backgrounds/flats-bg.png")}
          contentFit="cover"
          style={styles.flats}
        >
          <Paragraph style={text} color="white">
            Квартиры
          </Paragraph>
        </ImageBackground>
      </TouchableOpacity>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => loadCategory("houses")}>
          <ImageBackground
            source={require("../../../assets/backgrounds/houses-bg.png")}
            contentFit="cover"
            style={styles.houses}
          >
            <Paragraph style={text} color="white">
              Дома
            </Paragraph>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => loadCategory("land")}>
          <ImageBackground
            source={require("../../../assets/backgrounds/earth-bg.png")}
            contentFit="cover"
            style={styles.earth}
          >
            <Paragraph style={text} color="white">
              Земля
            </Paragraph>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => loadCategory("parkings")}>
        <ImageBackground
          source={require("../../../assets/backgrounds/parking-bg.png")}
          contentFit="cover"
          style={styles.parking}
        >
          <Paragraph style={text} color="white">
            Паркинги
          </Paragraph>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => loadCategory("commertion")}>
        <ImageBackground
          source={require("../../../assets/backgrounds/commerce-bg.png")}
          contentFit="cover"
          style={styles.commerce}
        >
          <Paragraph style={text} color="white">
            Коммерция
          </Paragraph>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}

const itemBase = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  paddingVertical: 44,
  shadowColor: "rgba(0, 0, 0, 0.25)",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowRadius: 10,
  shadowOpacity: 1,
  backgroundColor: colors["grey-light"],
};

const text = {
  fontFamily: "Manrope_700Bold",
  fontSize: 16,
  textShadowOffset: { width: 0, height: 4 },
  textShadowRadius: 4,
  textShadowColor: "rgba(0, 0, 0, 0.25)",
};

function MathRound(val) {
  return Math.floor(val / 10) * 10;
}

const getHeight = () => {
  return 100;
  // const height = MathRound(width / 2.5 - 20);

  // if (height <= 110) {
  //   return 120;
  // }

  // return height;
};

const bubbleHeight = getHeight();

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  flats: {
    ...itemBase,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: Platform.OS == "ios" ? 55 : 100,
    width: MathRound(width - 20),
    height: bubbleHeight,
  },
  houses: {
    ...itemBase,
    borderTopRightRadius: Platform.OS == "ios" ? 55 : 100,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    width: MathRound(width / 1.5 - 35),
    height: bubbleHeight,
  },
  earth: {
    ...itemBase,
    borderTopRightRadius: 100,
    borderTopLeftRadius: 100,
    width: MathRound(width / 2.5 - 20),
    height: bubbleHeight,
  },
  parking: {
    ...itemBase,
    borderTopRightRadius: 100,
    borderTopLeftRadius: 100,
    borderBottomRightRadius: 100,
    width: MathRound(width / 2.5 - 20),
    height: bubbleHeight,
  },
  commerce: {
    ...itemBase,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    width: MathRound(width / 1.5 - 27),
    height: bubbleHeight,
  },
  row: {
    marginVertical: "4%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
