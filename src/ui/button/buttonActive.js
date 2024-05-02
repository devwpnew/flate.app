import { useState } from "react";
import Button from "./button";

export default function ButtonActive({
  onPress,
  active = false,
  type,
  children,
  ...props
}) {
  const [isActive, setIsActive] = useState(active);

  const activeHandler = () => {
    setIsActive((p) => !p);
    onPress();
  };

  return (
    <Button onPress={activeHandler} {...props} type={isActive ? "blue" : type}>
      {children}
    </Button>
  );
}
