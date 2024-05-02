import { TouchableOpacity } from "react-native";

export default function InputSide({ inputRef, variant = "left", side, width, sideStyle = {} }) {
  let style = {
    minWidth: width,
    maxWidth: width,
    width: width,
    ...sideStyle
  };

  if (variant === "right") {
    style = { display: "flex", alignItems: "flex-end", marginLeft: 'auto', ...style };
  }

  const onSidePress = () => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      {side && (
        <TouchableOpacity
          style={style}
          onPress={onSidePress}
        >
          {side}
        </TouchableOpacity>
      )}
    </>
  );
}
