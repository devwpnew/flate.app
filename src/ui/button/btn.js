import { TouchableOpacity, StyleSheet, View } from "react-native";

import Paragraph from "../text/paragraph";
import Gradient from "../common/gradient";
import Loader from "../../ui/preloader/loader";

import { colors } from "../config";

export default function Btn({
  children,
  isDisabled,
  isLoading,
  pProps = {},
  onPress,
  style = {},
  innerStyle = {},
  buttonStyle = {},
  color = "gradient",
  icon,
  ...props
}) {
  const sColor = styles[color];

  let sText = {};
  let sButton = { ...styles.button, ...buttonStyle };
  sButton = { ...sButton, ...style, ...sColor };

  if (isDisabled) {
    sButton = { ...sButton, ...{ opacity: 0.5 } };
  }

  const inner = { ...styles.flex, ...innerStyle };

  function getTemplate() {
    if (color === "gradient") {
      return (
        <>
          {isLoading ? (
            <Gradient style={sButton}>
              <View style={inner}>
                <Loader color={colors.white} size="md" />
              </View>
            </Gradient>
          ) : (
            <Gradient style={sButton} {...props}>
              <TouchableOpacity onPress={onPress} style={inner}>
                {icon && icon}
                <Paragraph
                  size="md"
                  color={"white"}
                  style={styles.paragraph}
                  {...pProps}
                >
                  {children}
                </Paragraph>
              </TouchableOpacity>
            </Gradient>
          )}
        </>
      );
    }

    if (color === "gradient-border") {
      return (
        <>
          {isLoading ? (
            <Gradient style={sButton}>
              <View style={inner}>
                <Loader color={colors.white} size="md" />
              </View>
            </Gradient>
          ) : (
            <Gradient
              style={{
                ...style,
                paddingTop: 2,
                paddingBottom: 2,
                paddingLeft: 2,
                paddingRight: 2,
              }}
              {...props}
            >
              <View
                style={{
                  backgroundColor: colors["white"],
                  ...sButton,
                  ...style,
                }}
              >
                <TouchableOpacity onPress={onPress} style={inner}>
                  <Paragraph
                    size="md"
                    color={"black"}
                    style={styles.paragraph}
                    {...pProps}
                  >
                    {children}
                  </Paragraph>
                  {icon && icon}
                </TouchableOpacity>
              </View>
            </Gradient>
          )}
        </>
      );
    }

    if (color === "gradient-border-light") {
      return (
        <>
          {isLoading ? (
            <Gradient
              colors={["rgba(71, 154, 255, 0.20)", "rgba(29, 218, 155, 0.20)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={sButton}
            >
              <View style={inner}>
                <Loader color={colors.white} size="md" />
              </View>
            </Gradient>
          ) : (
            <Gradient
              colors={["rgba(71, 154, 255, 0.20)", "rgba(29, 218, 155, 0.20)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={sButton}
              {...props}
            >
              <TouchableOpacity onPress={onPress} style={inner}>
                {icon && icon}
                <Paragraph
                  size="md"
                  color={"black"}
                  style={styles.paragraph}
                  {...pProps}
                >
                  {children}
                </Paragraph>
              </TouchableOpacity>
            </Gradient>
          )}
        </>
      );
    }

    let textColor = "blue";

    if (color === "green") {
      textColor = "white";
    }

    if (color === "red") {
      textColor = "red";
    }

    if (color === "white") {
      textColor = "black";
    }

    if (color === "greyLight") {
      textColor = "black";
    }

    if (color === "blue") {
      sButton.borderColor = colors["blue"];
    }

    if (color === "grey") {
      sButton.backgroundColor = "rgba(26, 31, 37, 0.05)";
      pProps.style = { color: "rgba(26, 31, 37, 0.50)" };
    }

    if (color === "red-light") {
      sButton.backgroundColor = "rgba(212, 77, 77, 0.10)";
      pProps.style = { color: "rgba(26, 31, 37, 0.50)" };
    }

    return (
      <>
        {isLoading ? (
          <View style={sButton}>
            <View style={inner}>
              <Loader color={colors.blue} size="md" />
            </View>
          </View>
        ) : (
          <View style={sButton} {...props}>
            <TouchableOpacity onPress={onPress} style={inner}>
              {icon && icon}
              <Paragraph
                size="md"
                color={textColor}
                style={styles.paragraph}
                {...pProps}
              >
                {children}
              </Paragraph>
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  }

  return <>{getTemplate()}</>;
}

const styles = StyleSheet.create({
  transparent: {
    backgroundColor: "transparent",
    borderColor: colors["blue"],
  },
  white: {
    backgroundColor: colors["white"],
    borderColor: colors["white"],
  },
  green: {
    backgroundColor: colors["green"],
    borderColor: colors["green"],
  },
  red: {
    backgroundColor: colors["white"],
    borderColor: colors["red"],
  },
  greyLight: {
    backgroundColor: colors["grey-light"],
    borderColor: colors["grey-light"],
  },
  button: {
    overflow: "hidden",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "transparent",
  },
  flex: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    // width: "100%",
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 30,
    paddingRight: 30,
  },
  paragraph: { textAlign: "center" },
});
