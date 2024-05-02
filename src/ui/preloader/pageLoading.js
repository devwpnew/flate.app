import { Image, View } from "react-native";
import tw from "../../../lib/tailwind";

import { colors } from "../config";

export default function PageLoading() {
  return (
    <>
      <View style={{ backgroundColor: colors["white"] }}>
        <View style={tw`h-full flex flex-col justify-center items-center`}>
          {/* <PreloaderSpinner /> */}
          <Image
            width={110}
            height={110}
            style={{ width: 110, height: 110 }}
            source={require("../../../assets/loader.gif")}
          />
        </View>
      </View>
    </>
  );
}
