import { ActivityIndicator } from "react-native";

export default function PreloaderSpinner({
  size = "large",
  color = "#4BA5F8",
  ...props
}) {
  return <ActivityIndicator size={size} color={color} {...props} />;
}
