import InputSide from "./inputSide";
import InputContainer from "./inputContainer";
import Paragraph from "../../text/paragraph";
import InputLoader from "./inputLoader";

export default function InputWrapper({
  isLoading,
  isRequired = true,
  color,
  shadow,
  rounded,
  style,
  isValid,
  isSuccess,
  left,
  leftWidth,
  right,
  rightWidth,
  leftVariant,
  children,
}) {
  return (
    <>
      <InputContainer
        color={color}
        shadow={shadow}
        rounded={rounded}
        style={style}
        isValid={isValid}
        isSuccess={isSuccess}
      >
        {isLoading ? (
          <InputLoader
            style={{ paddingTop: 9.3, paddingBottom: 9.3 }}
            variant={leftVariant}
          />
        ) : (
          <>
            {isRequired && (
              <Paragraph size="md" color="red">
                *
              </Paragraph>
            )}

            <InputSide variant="left" side={left} width={leftWidth} />

            {children}

            <InputSide variant="right" side={right} width={rightWidth} />
          </>
        )}
      </InputContainer>
    </>
  );
}
