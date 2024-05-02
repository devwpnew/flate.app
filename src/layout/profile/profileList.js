import { TouchableOpacity, StyleSheet, View } from "react-native";

import { Arrow } from "./icons/icons";

import Paragraph from "../../ui/text/paragraph";
import { colors } from "../../ui/config";
import Gradient from "../../ui/common/gradient";

export default function ProfileList({
  backgroundColor = "grey-light",
  borderColor = "white",
  badge = "default",
  variant,
  list,
}) {
  return (
    <>
      {variant === "rounded" ? (
        <View
          style={{
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors[borderColor],
          }}
        >
          {list.map((item, i) => {
            return (
              <View
                key={i}
                style={{
                  paddingHorizontal: 20,
                  backgroundColor: colors[backgroundColor],
                  borderTopLeftRadius: i === 0 ? 20 : 0,
                  borderTopRightRadius: i === 0 ? 20 : 0,
                  borderBottomLeftRadius: i + 1 === list.length ? 20 : 0,
                  borderBottomRightRadius: i + 1 === list.length ? 20 : 0,
                }}
              >
                <TouchableOpacity
                  onPress={item.cb}
                  style={{
                    ...styles.itemRounded,
                    borderTopWidth: 1,
                    borderColor: colors[backgroundColor],
                    justifyContent: "space-between",
                    paddingTop: i === 0 ? 20 : 16,
                    paddingBottom: i + 1 === list.length ? 20 : 16,
                    borderTopColor:
                      i === 0 ? colors[backgroundColor] : colors[borderColor],
                    borderBottomWidth: item?.noBorderBottom
                      ? 0
                      : i + 1 === list.length
                      ? 1
                      : 0,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    {item.icon}

                    <Paragraph
                      style={{ fontFamily: "Manrope_400Regular" }}
                      size="lg"
                    >
                      {item.name}
                    </Paragraph>

                    {item?.badge ? (
                      <>
                        {badge === "gradient" ? (
                          <Gradient style={styles.badge}>
                            <Paragraph size="md" color="white">
                              {item.badge}
                            </Paragraph>
                          </Gradient>
                        ) : (
                          <View style={styles.badge}>
                            <Paragraph size="md" color="white">
                              {item.badge}
                            </Paragraph>
                          </View>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </View>

                  {!item?.noArrow && <Arrow style={{ ...styles.arrow }} />}
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      ) : (
        <>
          {list.map((item, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={item.cb}
                style={{
                  ...styles.item,
                  borderBottomWidth: item?.noBorderBottom
                    ? 0
                    : i + 1 === list.length
                    ? 1
                    : 0,
                }}
              >
                {item.icon}

                <Paragraph
                  style={{ fontFamily: "Manrope_400Regular" }}
                  size="lg"
                >
                  {item.name}
                </Paragraph>

                {item?.badge ? (
                  <View style={styles.badge}>
                    <Paragraph size="md" color="white">
                      {item.badge}
                    </Paragraph>
                  </View>
                ) : (
                  <></>
                )}

                {!item?.noArrow && <Arrow style={styles.arrow} />}
              </TouchableOpacity>
            );
          })}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#ECF2F8",
  },
  itemRounded: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingTop: 16,
    paddingBottom: 16,
  },
  arrow: {
    // position: "absolute",
    right: 0,
    top: 0,
  },
  badge: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 999,
    overflow: "hidden",
    backgroundColor: colors["grey-medium"],
  },
});
