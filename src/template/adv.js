import { useState } from "react";
import {
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import Main from "../layout/main/main";
import Title from "../ui/heading/title";
import Paragraph from "../ui/text/paragraph";
import Container from "../ui/common/container";
import CloseIcon from "../ui/icons/closeIcon";

const { width, height } = Dimensions.get("window");

export default function Adv({ navigation, route }) {
  const image = route.params.detail_image
    ? "https://flate.pro" + route.params.detail_image
    : null;

  const [isScrolled, setIsScrolled] = useState(false);


  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;

    if (contentOffset.y <= 0) {
      setIsScrolled(false);
    } else {
      setIsScrolled(true);
    }

  };

  return (
    <Main
      style={{
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: "hidden",
      }}
    >
      <Container>
        <View
          style={{
            marginTop: 20,
            position: "relative",
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              zIndex: 10,
              backgroundColor: isScrolled ? "#fff" : "transparent",
              width: "100%",
              paddingBottom: 20,
              transition: '2s'
            }}
            onPress={() => navigation.navigate("Home")}
          >
            <CloseIcon style={{ marginLeft: "auto" }} variant={"bolder"} />
          </TouchableOpacity>

          <View>
            <ScrollView
              onScroll={handleScroll}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
            >
              <View style={{ position: "relative", zIndex: 10000 }}>
                <Title
                  style={{ marginBottom: 20, width: width - 80 }}
                  size="sm"
                >
                  {route.params.heading}
                </Title>
              </View>

              {image && (
                <View style={{ marginBottom: 20 }}>
                  <Image
                    width={220}
                    height={220}
                    style={{ width: "100%", borderRadius: 20 }}
                    source={{ uri: image }}
                  />
                </View>
              )}

              <Paragraph style={{ marginBottom: 20 }} size="lg">
                {route.params.detail_text}
              </Paragraph>
            </ScrollView>
          </View>
        </View>
      </Container>
    </Main>
  );
}
