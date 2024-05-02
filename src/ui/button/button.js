import React from "react";
import { View, TouchableOpacity } from "react-native";
import tw from "../../../lib/tailwind";
import DText from "../text/dText";

export default function Button({
  children,
  isDisabled,
  type = "blue",
  icon,
  iconContainerStyle,
  ...props
}) {
  if (type == "green") {
    return (
      <TouchableOpacity {...props}>
        <View
          style={tw`w-full min-h-[35px] rounded bg-green border border-green flex flex-row items-center justify-center ${
            isDisabled ? "opacity-50" : ""
          }`}
        >
          {icon && <View style={iconContainerStyle}>{icon}</View>}
          <DText
            style={tw`text-[14px] text-white font-normal text-center my-auto`}
          >
            {children}
          </DText>
        </View>
      </TouchableOpacity>
    );
  }

  if (type == "red") {
    return (
      <TouchableOpacity {...props}>
        <View
          style={tw`w-full min-h-[35px] rounded bg-red_light border border-greyborder flex flex-row items-center justify-center ${
            isDisabled ? "opacity-50" : ""
          }`}
        >
          {icon && <View style={iconContainerStyle}>{icon}</View>}
          <DText
            style={tw`text-[14px] text-primary font-normal text-center my-auto`}
          >
            {children}
          </DText>
        </View>
      </TouchableOpacity>
    );
  }

  if (type == "white") {
    return (
      <TouchableOpacity {...props}>
        <View
          style={tw`w-full min-h-[35px] rounded bg-white border border-greyborder flex flex-row items-center justify-center ${
            isDisabled ? "opacity-50" : ""
          }`}
        >
          {icon && <View style={iconContainerStyle}>{icon}</View>}
          <DText
            style={tw`text-[14px] text-primary font-normal text-center my-auto`}
          >
            {children}
          </DText>
        </View>
      </TouchableOpacity>
    );
  }

  if (type == "blue-light") {
    return (
      <TouchableOpacity {...props}>
        <View
          style={tw`w-full min-h-[35px] rounded bg-bluelighter border border-transparent flex flex-row items-center justify-center ${
            isDisabled ? "opacity-50" : ""
          }`}
        >
          {icon && <View style={iconContainerStyle}>{icon}</View>}
          <DText
            style={tw`text-[14px] text-primary font-normal text-center my-auto text-blue`}
          >
            {children}
          </DText>
        </View>
      </TouchableOpacity>
    );
  }

  if (type === "blue") {
    return (
      <TouchableOpacity {...props}>
        <View
          style={tw`w-full min-h-[35px] rounded bg-blue flex flex-row items-center justify-center ${
            isDisabled ? "opacity-50" : ""
          }`}
        >
          {icon && <View style={iconContainerStyle}>{icon}</View>}
          <DText
            style={tw`text-[14px] text-white font-normal text-center my-auto`}
          >
            {children}
          </DText>
        </View>
      </TouchableOpacity>
    );
  }
}
