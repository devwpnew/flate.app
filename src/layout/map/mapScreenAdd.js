import api from "../../../api/service/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Preloader from "../../ui/preloader/preloader";

import MapScreenByAddress from "./mapScreenByAddress";

import yaGeocodeByCoordinates from "../../../helpers/map/yaGeocodeByCoordinates";

export default function MapScreenAdd({
  onFieldChange,
  initialValue,
  ...props
}) {
  const activeCity = useSelector((state) => state.userCity.value);

  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState(activeCity.name);

  useEffect(() => {
    setIsLoading(true);

    if (initialValue) {
      setAddress(initialValue);
    } else {
      setAddress(activeCity.name);
    }

    setIsLoading(false);
  }, [initialValue]);

  const onMarkerDrag = async (e) => {
    try {
      const { latitude, longitude } = e.nativeEvent.coordinate;

      const address = await yaGeocodeByCoordinates({ latitude, longitude });

      if (address) {
        onFieldChange({
          name: "map_coordinates",
          value: { latitude, longitude },
        });
        onFieldChange({ name: "property_product_address", value: address });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const style = {
    flex: 1,
    height: 240,
    marginTop: 14,
  };

  return (
    <>
      {isLoading ? (
        <Preloader style={{ ...style, marginBottom: 14 }} />
      ) : (
        <MapScreenByAddress
          mapViewProps={{
            minZoomLevel: 13,
            maxZoomLevel: 20,
          }}
          markerViewProps={{
            draggable: true,
            onDragEnd: onMarkerDrag,
          }}
          address={address}
          style={style}
        />
      )}
    </>
  );
}
