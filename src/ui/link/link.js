import { TouchableOpacity } from "react-native-gesture-handler";

export default function Link({ navigation, screen, children, ...props }) {
  const loadScreen = () => {
    // console.log("link clicked", screen);
    navigation.navigate(screen);
  };

  return (
    <TouchableOpacity onPress={loadScreen} {...props}>
      {children}
    </TouchableOpacity>
  );
}
