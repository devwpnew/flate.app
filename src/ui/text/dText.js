import { Text } from "react-native";
import tw from "../../../lib/tailwind";

export default function DText({ children, innerRef, style = {}, ...props }) {
  return (
    <Text style={{ ...tw`font-open-sans`, ...style }} {...props} ref={innerRef}>
      {children}
    </Text>
  );
}
