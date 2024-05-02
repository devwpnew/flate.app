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

export default function Categories({ style }) {
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
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => loadCategory("flats")}
        >
          <ImageBackground
            style={styles.item}
            source={require("../../../assets/categories/flats.jpg")}
            contentFit="cover"
          >
            <Paragraph style={text} color="black">
              Квартиры
            </Paragraph>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => loadCategory("houses")}
        >
          <ImageBackground
            style={styles.item}
            source={require("../../../assets/categories/houses.jpg")}
            contentFit="cover"
          >
            <Paragraph style={text} color="black">
              Дома
            </Paragraph>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.itemThree}
          onPress={() => loadCategory("land")}
        >
          <ImageBackground
            style={styles.itemThree}
            source={require("../../../assets/categories/earth.jpg")}
            contentFit="cover"
          >
            <Paragraph style={text} color="black">
              Земля
            </Paragraph>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemThree}
          onPress={() => loadCategory("commertion")}
        >
          <ImageBackground
            style={styles.itemThree}
            source={require("../../../assets/categories/commertion.jpg")}
            contentFit="cover"
          >
            <Paragraph style={text} color="black">
              Коммерция
            </Paragraph>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemThree}
          onPress={() => loadCategory("parkings")}
        >
          <ImageBackground
            style={styles.itemThree}
            source={require("../../../assets/categories/parkings.jpg")}
            contentFit="cover"
          >
            <Paragraph style={text} color="black">
              Паркинги
            </Paragraph>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const text = {
  fontFamily: "Manrope_600SemiBold",
  fontSize: 14,
  padding: 10,
};

function MathRound(val) {
  return Math.floor(val / 10) * 10;
}

const getHeight = () => {
  return 100;
  // const height = MathRound(width / 2.5 - 40);

  // if (height <= 100) {
  //   return 100;
  // }

  // return height;
};

const bubbleHeight = getHeight();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    gap: 10,
  },
  item: {
    height: bubbleHeight,
    width: width / 2 - 15,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: "hidden",
    backgroundColor: colors["grey-light"],
  },
  itemThree: {
    height: bubbleHeight,
    width: width / 3 - 12,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: "hidden",
    backgroundColor: colors["grey-light"],
  },
});
