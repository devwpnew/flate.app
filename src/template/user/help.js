import React from "react";
import { useRoute } from "@react-navigation/native";
import { View, ScrollView, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

import tw from "../../../lib/tailwind";

import Main from "../../layout/main/main";
import DText from "../../ui/text/dText";

import faqData from "../../../helpers/static/faq/faqData";
import QuestionsContent from "./help/questionContent";

export default function Help({ navigation }) {
  const data = faqData();
  const route = useRoute();

  const loadQuestion = (title, questions) => {
    // console.log(title);

    navigation.navigate("Help", {
      name: title,
      questions: questions ? questions : null,
    });
  };

  // // console.log(route.params?.questions);

  return (
    <Main>
      <ScrollView style={tw`bg-white h-full`}>
        <View style={tw`flex flex-col py-[17px] px-[15px]`}>
          {!route.params?.questions ? (
            <>
              {data.map((faqItem) => {
                return (
                  <View
                    style={tw`flex flex-row items-start mb-3`}
                    key={faqItem.title}
                  >
                    <QuestionIcon />

                    <View style={tw`flex flex-col ml-2`}>
                      <DText style={tw`text-base font-bold mb-[2px] mb-2.5`}>
                        {faqItem.title.trim()}
                      </DText>
                      {faqItem.items.map((child) => {
                        return (
                          <TouchableOpacity
                            key={child.item.textTitle}
                            onPress={() =>
                              navigation.navigate("Help", {
                                name: faqItem.title,
                                questions: child.item.textContent,
                              })
                            }
                          >
                            <DText style={tw`text-base mb-2.5`}>
                              {child.item.textTitle.trim()}
                            </DText>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                );
              })}
            </>
          ) : (
            <QuestionsContent
              navigation={navigation}
              questions={route.params?.questions}
            />
          )}
        </View>

        <View style={tw`h-[70px]`}></View>
      </ScrollView>
      {/* <Footer navigation={navigation} /> */}
    </Main>
  );
}

function QuestionIcon() {
  return (
    <>
      <Svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M6.78393 9.38525C6.38365 9.38525 6.05957 9.71885 6.05957 10.1192C6.05957 10.5099 6.37411 10.8531 6.78393 10.8531C7.19376 10.8531 7.51784 10.51 7.51784 10.1192C7.51784 9.71885 7.18427 9.38525 6.78393 9.38525Z"
          fill="#1F1F1F"
        />
        <Path
          d="M6.90987 3.82812C5.62315 3.82812 5.03223 4.59061 5.03223 5.1053C5.03223 5.47704 5.34673 5.64859 5.60409 5.64859C6.11876 5.64859 5.90909 4.91468 6.88127 4.91468C7.35784 4.91468 7.73909 5.12438 7.73909 5.56281C7.73909 6.07753 7.20534 6.37298 6.89081 6.63985C6.61442 6.87813 6.25222 7.26893 6.25222 8.08861C6.25222 8.58421 6.38563 8.72719 6.77643 8.72719C7.24346 8.72719 7.33875 8.51752 7.33875 8.33643C7.33875 7.84079 7.34832 7.55486 7.87253 7.14503C8.12986 6.94487 8.94003 6.29675 8.94003 5.4008C8.94003 4.50486 8.12986 3.82812 6.90987 3.82812Z"
          fill="#1F1F1F"
        />
        <Path
          d="M7 0C3.1313 0 0 3.13078 0 7V13.4531C0 13.7552 0.244836 14 0.546875 14H7C10.8687 14 14 10.8692 14 7C14 3.1313 10.8692 0 7 0ZM7 12.9062H1.09375V7C1.09375 3.73579 3.73535 1.09375 7 1.09375C10.2642 1.09375 12.9062 3.73535 12.9062 7C12.9062 10.2642 10.2647 12.9062 7 12.9062Z"
          fill="#1F1F1F"
        />
      </Svg>
    </>
  );
}
