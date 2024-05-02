import { TouchableOpacity } from "react-native";
import { useState, useRef, useEffect } from "react";

import CloseIcon from "../../icons/closeIcon";
import RInput from "../rInput";
import Paragraph from "../../text/paragraph";

const getLeft = (name, type) => {
  if (!name) return null;

  if (name.includes("price") || name.includes("squares")) {
    if (type === "from") {
      return <Paragraph>от</Paragraph>;
    }
    if (type === "to") {
      return <Paragraph>до</Paragraph>;
    }
  }

  return null;
};

export default function InputRangeSide({
  setResult,
  sideValue,
  type,
  name,
  ...props
}) {
  const [ref, setRef] = useState(null);

  const [isShowClear, setIsShowClear] = useState(false);
  const [isShowSides, setIsShowSides] = useState(false);

  useEffect(() => {
    if(props.initialValue) {
      setIsShowSides(true)
    }
  }, [props?.initialValue])

  const onBlur = () => {
    setIsShowSides(false);
    setIsShowClear(true);
  };

  const onFocus = () => {
    setIsShowSides(true);
  };

  const clearInput = () => {
    if (ref?.current) {
      ref.current.clear();
      setIsShowClear(false);

      setResult((prev) => {
        prev.value[type] = "";
        return prev;
      });
    }
  };

  const getRight = (name) => {
    if (!name) return null;

    if (sideValue && isShowClear) {
      return (
        <TouchableOpacity onPress={clearInput}>
          <CloseIcon />
        </TouchableOpacity>
      );
    }

    if (isShowSides) {
      if (name.includes("price")) {
        return <Paragraph>₽</Paragraph>;
      }

      if (name.includes("squares")) {

        if(name === 'land_squares') {
          return <Paragraph>сот</Paragraph>;
        }

        return <Paragraph>м²</Paragraph>;


      }
    }
  };

  const right = getRight(name);
  const left = getLeft(name, type);

  return (
    <>
      <RInput
        name={type}
        leftWidth={20}
        rightWidth={22}
        right={right}
        left={left}
        onFocus={onFocus}
        onBlur={onBlur}
        getRef={setRef}
        {...props}
      />
    </>
  );
}
