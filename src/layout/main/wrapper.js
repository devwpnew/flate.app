import { View } from "react-native";

export default function Wrapper({ children, style = {} }) {
  return (
    <View style={{ marginTop: 10, marginBottom: 25, paddingBottom: 80, ...style}}>
      {children}
    </View>
  );
}
