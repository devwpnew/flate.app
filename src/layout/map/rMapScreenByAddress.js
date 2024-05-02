import { useState, useEffect, useRef } from "react";
import { View, Platform } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import tw from "../../../lib/tailwind";
import Preloader from "../../ui/preloader/preloader";
import yaGeocodeByAddress from "../../../helpers/map/yaGeocodeByAddress";

export default function RMapScreenByAddress({
  markTitle,
  address,
  mapViewProps = {},
  markerViewProps = {},
  ...props
}) {
  const mapRef = useRef();

  const [isLoading, setIsLoading] = useState(true);
  const [addressState, setAddressState] = useState(address);
  const [initialRegion, setInitialRegion] = useState({});

  useEffect(() => {
    (async function () {
      setIsLoading(true);

      const { latitude, longitude } = await yaGeocodeByAddress(addressState);

      setInitialRegion({
        latitude: latitude,
        longitude: longitude,
      });

      setIsLoading(false);
    })();
  }, [addressState]);

  useEffect(() => {
    setAddressState(address);
  }, [address]);

  const onMapReady = () => {
    mapRef.current.animateCamera({
      center: {
        latitude: initialRegion.latitude,
        longitude: initialRegion.longitude,
        zoom: 15
      },
      altitude: 700,
    });
  };

  return (
    <View style={tw`h-[240px]`} {...props}>
      {isLoading ? (
        <Preloader style={tw`h-full w-full`} />
      ) : (
        <>
          {Platform.OS === "ios" ? (
            <>
              {initialRegion && Object.keys(initialRegion).length > 0 && (
                <MapView
                  ref={mapRef}
                  onMapReady={onMapReady}
                  style={tw`h-full`}
                  initialRegion={initialRegion}
                  {...mapViewProps}
                >
                  <Marker
                    coordinate={initialRegion}
                    title={markTitle}
                    {...markerViewProps}
                  />
                </MapView>
              )}
            </>
          ) : (
            <>
              {initialRegion && Object.keys(initialRegion).length > 0 && (
                <MapView
                  ref={mapRef}
                  onMapReady={onMapReady}
                  provider={PROVIDER_GOOGLE}
                  style={tw`h-full`}
                  initialRegion={{
                    ...initialRegion,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                  {...mapViewProps}
                >
                  <Marker
                    coordinate={initialRegion}
                    title={markTitle}
                    {...markerViewProps}
                  />
                </MapView>
              )}
            </>
          )}
        </>
      )}
    </View>
  );
}
