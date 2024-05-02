// import React from "react";
// import { Dimensions, StyleSheet, Image, View } from "react-native";
// import tw from "../../../lib/tailwind";

// import Swiper from "react-native-swiper/src";
// import Lightbox from "react-native-lightbox-v2";
// import DText from "../../ui/text/dText";

// export default function PostGallery({ galleryImages }) {
//   const { width } = Dimensions.get("window");

//   const renderPagination = (index, total, context) => {
//     return (
//       <View style={tw`flex flex-row justify-center w-full relative -top-8`}>
//         <DText style={tw`text-white font-bold`}>{index + 1}</DText>
//         <DText style={tw`text-white font-bold`}>/{total}</DText>
//       </View>
//     );
//   };

//   return (
//     <Swiper style={tw`h-[285px] mt-2.5`} renderPagination={renderPagination}>
//       {JSON.parse(galleryImages).map((src, index, arr) => {
//         return (
//           <View style={tw`h-[285px] relative`} key={index}>
//             <View style={tw`w-full h-[285px] m-auto absolute top-0 left-0`}>
//               <Image
//                 style={tw`w-full h-[285px] opacity-50`}
//                 source={{
//                   uri: "https://flate.pro/" + src,
//                 }}
//                 blurRadius={5}
//               />
//             </View>
//             <Lightbox
//               doubleTapZoomEnabled={true}
//               backgroundColor={"#fff"}
//               underlayColor={"transparent"}
//               renderContent={() => (
//                 <>
//                   <Image
//                     style={tw`w-full h-full`}
//                     resizeMode="contain"
//                     source={{
//                       uri: "https://flate.pro/" + src,
//                     }}
//                   />
//                 </>
//               )}
//               style={tw`w-full h-[285px] overflow-hidden m-auto flex flex-col justify-center items-center`}
//             >
//               <Image
//                 style={tw`w-[${width}px] h-[285px]`}
//                 resizeMode="contain"
//                 source={{
//                   uri: "https://flate.pro/" + src,
//                 }}
//               />
//             </Lightbox>
//           </View>
//         );
//       })}
//     </Swiper>
//   );
// }
