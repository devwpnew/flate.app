import { View } from "react-native";
import tw from "../../../lib/tailwind";

import LogoIcon from "../../ui/icons/logoIcon";
import HeaderCityDropdown from "./header/headerCityDropdown";

export default function Header() {
  return (
    <View
      style={tw`flex justify-between items-center flex-row w-full py-2 px-[14px] bg-greylight border-greyborder border-t border-b mt-[45px] h-[55px]`}
    >
      <LogoIcon />

      <HeaderCityDropdown
        arrowStyle={{ fill: "#4BA5F8" }}
        selectedValueContainer={{}}
        selectedValueTextContainer={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
        selectedValueTextContainerText={{
          color: "#4BA5F8",
          marginRight: 10,
        }}
      />
    </View>
  );
}
