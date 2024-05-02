import api from "../../../api/service/api";
import tw from "../../../lib/tailwind";

import { useEffect, useState } from "react";
import { View, Image } from "react-native";

import DText from "../../ui/text/dText";

const getImage = (json) => {
  if (json) {
    const image = JSON.parse(json);
    return "https://flate.pro/" + image[0];
  }
};

export default function RcInformation({ rcId }) {
  const [rc, setRc] = useState(null);

  useEffect(() => {
    (async function fetchRc() {
      const rcArr = await api.get.rcs({
        window_host: "https://flate.pro",
        filter: {
          id: rcId,
          published: "1",
        },
        sort: {
          id: "asc",
        },
        limit: "all",
      });

      setRc(rcArr[0]);
    })();
  }, []);

  return (
    <View style={tw`p-2.5 mb-5 border-b border-greyborder`}>
      <View style={tw`flex flex-row items-center gap-2.5 mb-2.5`}>
        {rc?.images ? (
          <Image
            style={tw`min-w-[40px] min-h-[40px] w-[40px] h-[40px] rounded-full`}
            source={{
              uri: getImage(rc.images),
            }}
          />
        ) : (
          <View
            style={tw`min-w-[40px] min-h-[40px] w-[40px] h-[40px] rounded-full bg-blue`}
          ></View>
        )}

        <DText style={tw`font-extrabold`}>{rc?.name}</DText>
      </View>

      <DText style={tw`text-sm font-bold mb-2.5`}>{rc?.address}</DText>
      {/* <View style="text-sm max-h-[300px] overflow-hidden">{rc?.description}</View>{rc?.description && <>...</>} */}
      <DText style={tw`text-sm`}>{rc?.description}</DText>
    </View>
  );
}
