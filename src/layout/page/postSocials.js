import {
  Dimensions,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Share,
} from "react-native";
import tw from "../../../lib/tailwind";
import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from "react-native-svg";

import ReportButton from "./buttons/reportButton";
export default function PostSocials({ product }) {
  const url = `https://flate.pro/posts/${product.section_relation[0].slug}/${product.slug}`;
  const message = `Смотри! ${product.name} в ${product.city_link.name} ${url}`;

  // const onShare = async () => {
  //   try {
  //     const result = await Share.share({
  //       message: message,
  //       url: url,
  //       title: message,
  //     });
  //     if (result.action === Share.sharedAction) {
  //       if (result.activityType) {
  //         // shared with activity type of result.activityType
  //       } else {
  //         // shared
  //       }
  //     } else if (result.action === Share.dismissedAction) {
  //       // dismissed
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  // const singleShare = async (customOptions) => {
  //   try {
  //     await Share.shareSingle(customOptions);
  //   } catch (err) {
  //     // console.log(err);
  //   }
  // };

  return (
    <View style={tw`mb-5`}>
      <View style={tw`px-[15px]`}>
        <View style={tw`flex flex-col`}>
          {/* <View style={tw`flex flex-row mb-5`}>
            <TouchableOpacity
              style={tw`flex items-center justify-center mr-2.5`}
              onPress={onShare}
            >
              <Svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M29.25 36H6.75C3.02175 36 0 32.9782 0 29.25V6.75C0 3.02175 3.02175 0 6.75 0H29.25C32.9782 0 36 3.02175 36 6.75V29.25C36 32.9782 32.9782 36 29.25 36Z"
                  fill="#3D79CF"
                />
                <Path
                  d="M23.9366 18.7707C23.6453 18.4028 23.7296 18.2397 23.9366 17.9112C23.94 17.9078 26.343 14.5879 26.5894 13.4618L26.5905 13.4607C26.7142 13.05 26.5905 12.7485 25.9954 12.7485H24.0266C23.526 12.7485 23.2943 13.0073 23.1716 13.2964C23.1716 13.2964 22.1692 15.6949 20.7517 17.2497C20.2939 17.6985 20.0835 17.8437 19.8326 17.8437C19.7089 17.8437 19.5188 17.6997 19.5188 17.289V13.4607C19.5188 12.969 19.3781 12.7485 18.9641 12.7485H15.8692C15.5554 12.7485 15.3686 12.978 15.3686 13.1918C15.3686 13.6575 16.0774 13.7655 16.1505 15.0784V17.9269C16.1505 18.5502 16.0369 18.6649 15.786 18.6649C15.1177 18.6649 13.4932 16.2563 12.5314 13.5012C12.3379 12.9668 12.1466 12.7497 11.6426 12.7497H9.675C9.11363 12.7497 9 13.0084 9 13.2975C9 13.8094 9.66825 16.3519 12.1106 19.7123C13.7385 22.0062 16.0301 23.2493 18.1147 23.2493C19.368 23.2493 19.521 22.9737 19.521 22.4978C19.521 20.3063 19.4074 20.0993 20.0351 20.0993C20.3265 20.0993 20.8271 20.2433 21.9971 21.3492C23.3336 22.662 23.5541 23.2493 24.3022 23.2493H26.271C26.8324 23.2493 27.117 22.9737 26.9528 22.4292C26.5793 21.285 24.0503 18.9282 23.9366 18.7707V18.7707Z"
                  fill="white"
                />
              </Svg>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex items-center justify-center mr-2.5`}
              onPress={async () => {
                await singleShare({
                  title: "Share via whatsapp",
                  message: "some awesome dangerous message",
                  url: file.pdf,
                  social: Share.Social.WHATSAPP,
                  whatsAppNumber: "9199999999",
                  filename: file.pdf,
                });
              }}
            >
              <Svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M29.25 36H6.75C3.02175 36 0 32.9782 0 29.25V6.75C0 3.02175 3.02175 0 6.75 0H29.25C32.9782 0 36 3.02175 36 6.75V29.25C36 32.9782 32.9782 36 29.25 36Z"
                  fill="#4DBD37"
                />
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.07538 17.9201C9.07875 10.0552 18.6233 6.01194 24.39 11.5863L24.3788 11.6167C26.0696 13.3008 27 15.5429 27 17.9246C26.9966 24.7117 19.6796 28.9631 13.7509 25.7613L9 26.9999L10.2713 22.3784C9.48713 21.0251 9.07538 19.4917 9.07538 17.9201ZM22.1237 19.7865L22.1304 19.7302C22.1545 19.7411 22.1778 19.7514 22.2001 19.7613C22.3859 19.844 22.5085 19.8986 22.5557 19.989C22.6119 20.0902 22.6119 20.529 22.4207 21.0577C22.2339 21.5865 21.3395 22.059 20.9087 22.1276C20.5228 22.1827 20.0345 22.2063 19.499 22.0365C17.5157 21.3558 16.4312 20.8653 14.396 18.2013C13.3599 16.7411 13.055 15.3697 14.2655 14.0388C14.5434 13.7497 14.8595 13.7441 15.2915 13.7812C15.3051 13.7812 15.319 13.7807 15.3334 13.7801C15.4661 13.7751 15.6331 13.7688 15.7955 14.1637C15.8786 14.3582 16.0125 14.6823 16.1409 14.9931C16.3028 15.3851 16.456 15.7558 16.4874 15.8186C16.5437 15.93 16.5819 16.0537 16.5065 16.2112C16.3301 16.5451 16.1463 16.7478 16.0092 16.899C15.8211 17.1065 15.7209 17.217 15.8484 17.4363C15.9812 17.6613 16.4278 18.3926 17.0938 18.9888C17.8094 19.6291 18.432 19.899 18.7479 20.0359C18.8094 20.0626 18.8594 20.0842 18.896 20.1026C19.1188 20.2038 19.2493 20.1926 19.3809 20.0463C19.5103 19.8978 19.9412 19.3961 20.0885 19.1745C20.2907 18.8723 20.4557 18.9545 21.8685 19.6593C21.9494 19.6996 22.0344 19.742 22.1237 19.7865Z"
                  fill="white"
                />
              </Svg>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex items-center justify-center mr-2.5`}
              onPress={async () => {
                await singleShare({
                  title: "Share via",
                  message: "some message",
                  url: "some share url",
                  social: Share.Social.TELEGRAM,
                });
              }}
            >
              <Svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M29.25 36H6.75C3.02175 36 0 32.9782 0 29.25V6.75C0 3.02175 3.02175 0 6.75 0H29.25C32.9782 0 36 3.02175 36 6.75V29.25C36 32.9782 32.9782 36 29.25 36Z"
                  fill="#2F8ED4"
                />
                <Path
                  d="M16.0623 20.3862L15.7653 24.5746C16.1917 24.5746 16.375 24.3912 16.5967 24.1718L18.5935 22.2627L22.7324 25.2935C23.4907 25.7165 24.0262 25.4937 24.2309 24.5948L26.9478 11.8666L26.9489 11.8655C27.1897 10.7438 26.5439 10.3051 25.8037 10.5807L9.83542 16.6928C8.74642 17.1158 8.76217 17.7233 9.64979 17.999L13.7313 19.2691L23.2139 13.3358C23.6605 13.04 24.0655 13.2042 23.7325 13.499L16.0623 20.3862Z"
                  fill="white"
                />
              </Svg>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex items-center justify-center mr-2.5`}
              onPress={onShare}
            >
              <Svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Rect width="36" height="36" rx="6" fill="#F8FAFC" />
                <Path
                  d="M16.1528 18.9231C16.5492 19.453 17.055 19.8916 17.6358 20.2089C18.2166 20.5262 18.8588 20.7149 19.519 20.7622C20.1791 20.8094 20.8417 20.7142 21.4618 20.4829C22.0818 20.2516 22.6449 19.8896 23.1128 19.4215L25.8821 16.6523C26.7228 15.7818 27.188 14.616 27.1775 13.4058C27.167 12.1957 26.6816 11.0381 25.8258 10.1824C24.9701 9.32665 23.8125 8.84126 22.6024 8.83074C21.3922 8.82023 20.2264 9.28543 19.3559 10.1262L17.7682 11.7046M19.8451 17.0769C19.4487 16.547 18.943 16.1085 18.3622 15.7911C17.7814 15.4738 17.1391 15.2851 16.479 15.2379C15.8189 15.1906 15.1563 15.2858 14.5362 15.5171C13.9161 15.7484 13.353 16.1104 12.8851 16.5785L10.1159 19.3477C9.27518 20.2182 8.80997 21.384 8.82049 22.5942C8.831 23.8043 9.3164 24.9619 10.1721 25.8176C11.0279 26.6734 12.1855 27.1588 13.3956 27.1693C14.6057 27.1798 15.7716 26.7146 16.6421 25.8739L18.2205 24.2954"
                  stroke="#2563EB"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </Svg>
            </TouchableOpacity>
          </View> */}

          <ReportButton product={product} />
        </View>
      </View>
    </View>
  );
}
