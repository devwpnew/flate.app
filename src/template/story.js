import { useState } from "react";
import { View, Dimensions, Platform } from "react-native";
import Swiper from "react-native-swiper/src";

import ScreenHeader from "../ui/screen/screenHeader";
import Main from "../layout/main/main";

import Container from "../ui/common/container";
import PaginationStory from "../ui/slider/paginationStory";
import StorySingle from "./story/storySingle";
import StorySlide from "./story/storySlide";

const { width, height } = Dimensions.get("screen");

export default function Story({ navigation, route }) {
  const isSlider = Array.isArray(route.params.story);
  const slidesCount = route.params?.story?.length;

  const [currentSlide, setCurrentSlide] = useState(0);

  const top = 82;
  const other = 90;
  const slideHeight = height - top - other;

  return (
    <Main
      isHiddenStatusBar={true}
      style={{
        backgroundColor: "#000",
        paddingTop: Platform.OC === "ios" ? 0 : 5,
      }}
    >
      <View style={{ height: "100%", backgroundColor: "#000" }}>
        {isSlider && (
          <Container>
            <PaginationStory
              currentSlide={currentSlide}
              slidesCount={slidesCount}
            />
          </Container>
        )}

        <View style={{ marginTop: 10 }}>
          <ScreenHeader
            isInvert={true}
            variant="story"
            title={route.params.name}
            route={route}
          />
        </View>

        {isSlider ? (
          <Swiper
            loop={false}
            autoplay={true}
            autoplayDirection={true}
            autoplayTimeout={10}
            onIndexChanged={(v) => {
              setCurrentSlide(v);
            }}
            showsButtons={true}
            showsPagination={false}
            style={{
              height: slideHeight,
            }}
            nextButton={
              <View
                style={{
                  backgroundColor: "transparent",
                  height: "100%",
                  width: 70,
                  margin: 0,
                  padding: 0,
                }}
              ></View>
            }
            prevButton={
              <View
                style={{
                  backgroundColor: "transparent",
                  height: "100%",
                  width: 70,
                  margin: 0,
                  padding: 0,
                }}
              ></View>
            }
          >
            {route.params.story.map((src, index, arr) => {
              return (
                <StorySlide
                  key={src}
                  width={width}
                  height={slideHeight}
                  isLast={slidesCount == currentSlide + 1}
                  image={src}
                  buttonLink={route.params.buttonLink}
                  buttonText={route.params.buttonText}
                />
              );
            })}
          </Swiper>
        ) : (
          <StorySingle
            image={route.params.story.image}
            buttonLink={route.params.story.buttonLink}
            buttonText={route.params.story.buttonText}
          />
        )}
      </View>
    </Main>
  );
}
