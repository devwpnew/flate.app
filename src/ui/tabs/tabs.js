import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import RProductPreloader from "../preloader/rProductPreloader";
import Tab from "./tab";

export default function Tabs({
  variant = "tabs",
  isLoading,
  isHideActive,
  isSetActiveTab = true,
  getActiveTabId,
  activeTabId,
  tabs,
  style,
}) {
  const [activeTab, setActiveTab] = useState(activeTabId);

  useEffect(() => {
    setActiveTab(activeTabId);
  }, [activeTabId]);
  
  const onPressTab = (id) => {
    if (isSetActiveTab) {
      setActiveTab(id);
    }
    getActiveTabId(id);
  };

  return (
    <View style={{ ...styles.container, ...style }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollview}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.tabs}>
          {isLoading ? (
            <RProductPreloader
              amount={5}
              style={{
                width: 80,
                height: 40,
                borderRadius: 20,
              }}
            />
          ) : (
            <>
              {tabs &&
                tabs.length &&
                tabs.map((tab) => {
                  if (isHideActive && activeTabId == tab.id) return <></>;

                  return (
                    <Tab
                      variant={variant}
                      badge={tab?.badge}
                      activeTab={activeTab}
                      onPress={onPressTab}
                      text={tab.text}
                      id={tab.id}
                      key={tab.id}
                    />
                  );
                })}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
  },
  container: {},
  scrollview: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});
