import Title from "../../../ui/heading/title";
import Paragraph from "../../../ui/text/paragraph";
import Loader from "../../../ui/preloader/loader";
import { colors } from "../../../ui/config";
import { PPremium } from "../item/icons/icons";
import { View } from "react-native";

export default function ProductListTitle({
  title,
  style = {},
  count,
  isCountLoading = false,
  isShowCount = true,
  isPremium = false,
  isReverse = false,
  size = "sm",
}) {
  return (
    <>
      {title && (
        <View
          style={{
            ...style,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            flex: 1,
          }}
        >
          {isPremium && (
            <>
              <PPremium variant="gradient" />
            </>
          )}

          <Title numberOfLines={1} size={size}>
            {isReverse ? (
              <>
                {isShowCount && (
                  <>
                    {isCountLoading ? (
                      <Loader color={colors["black"]} size="lg" />
                    ) : (
                      <>
                        <Paragraph
                          size={size === "sm" ? "xl" : "xxl"}
                          color="grey-medium"
                        >
                          {count}
                        </Paragraph>
                      </>
                    )}
                  </>
                )}{" "}
                {title}
              </>
            ) : (
              <>
                {title}
                {isShowCount && (
                  <>
                    {" "}
                    {isCountLoading ? (
                      <Loader color={colors["black"]} size="lg" />
                    ) : (
                      <>
                        <Paragraph
                          size={size === "sm" ? "xl" : "xxl"}
                          color="grey-medium"
                        >
                          {count}
                        </Paragraph>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </Title>
        </View>
      )}
    </>
  );
}
