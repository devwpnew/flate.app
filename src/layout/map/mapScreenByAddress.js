import { useState, useEffect } from "react";
import { View, Platform } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import tw from "../../../lib/tailwind";
import Preloader from "../../ui/preloader/preloader";

import yaGeocodeByAddress from "../../../helpers/map/yaGeocodeByAddress";
import Btn from "../../ui/button/btn";

export default function MapScreenByAddress({
  markTitle,
  address,
  mapViewProps = {},
  markerViewProps = {},
  ...props
}) {
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [addressState, setAddressState] = useState(address);
  const [initialRegion, setInitialRegion] = useState({});

  useEffect(() => {
    (async function () {
      setIsLoading(true);

      try {
        const { latitude, longitude } = await yaGeocodeByAddress(addressState);

        if (latitude && longitude) {
          setInitialRegion({
            latitude: latitude,
            longitude: longitude,
          });
        }
      } catch (e) {
        console.log(e);
      }

      setIsLoading(false);
    })();
  }, [addressState]);

  useEffect(() => {
    setAddressState(address);
  }, [address]);

  const mapViewDefaultProps = {
    style: { height: "100%", flex: 1 },
  };

  if (Platform.OS !== "ios") {
    mapViewDefaultProps["provider"] = PROVIDER_GOOGLE;
  }

  return (
    <View style={tw`py-2`}>
      <Btn
        innerStyle={{
          paddingTop: 12.2,
          paddingBottom: 12.2,
        }}
        color="transparent"
        onPress={() => setIsShow((prev) => !prev)}
      >
        {isShow ? "Скрыть карту" : "Показать карту"}
      </Btn>
      {isShow && (
        <View {...props}>
          {isLoading ? (
            <Preloader style={tw`h-full w-full`} />
          ) : (
            <>
              {initialRegion && Object.keys(initialRegion).length > 0 && (
                <MapView
                  {...mapViewDefaultProps}
                  initialRegion={{
                    ...initialRegion,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                  {...mapViewProps}
                >
                  <Marker
                    coordinate={{
                      ...initialRegion,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    }}
                    title={markTitle}
                    {...markerViewProps}
                  />
                </MapView>
              )}
            </>
          )}
        </View>
      )}
    </View>
  );
}
