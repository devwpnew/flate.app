import api from "../../../api/service/api";

import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";

import MapView from "react-native-map-clustering";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import Preloader from "../../ui/preloader/preloader";
import Product from "../product/item/product";

import { colors } from "../../ui/config";

import Paragraph from "../../ui/text/paragraph";
import declension from "../../../helpers/formatters/declension";

const zoom = 0;
const altitude = 180000;

const heading = 0;
const pitch = 0;

const deltas = {
  latitudeDelta: 0.2,
  longitudeDelta: 0.2,
};

export default function MapButtonMap({ filter }) {
  const city = useSelector((state) => state.userCity.value);

  const coords =
    city.name === "Сочи"
      ? {
          latitude: 43.59917,
          longitude: 39.72569,
        }
      : {
          latitude: 45.04484,
          longitude: 38.97603,
        };

  const mapRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      if (!filter) {
        return;
      }

      setIsLoading(true);

      setSelectedProducts([]);

      const reqProps = {
        window_host: "https://flate.pro",
        filter: {
          published: "1",
          city_link: city.id,
          ...filter,
        },
        limit: "all",
        // select: ["id", "name", "slug"],
      };

      const fetchedProducts = await api.get.product.list(reqProps);
      const fetchedProductsWithCoords = fetchedProducts.filter(
        (p) => p.map_coordinates || p.rc_link.coordinates
      );

      setProducts(fetchedProductsWithCoords);

      setIsLoading(false);
    })();
  }, [filter]);

  useEffect(() => {
    if (products.length > 0 && isMapLoaded) {
      const productsCenterCoords = products.reduce(
        (prevCoords, curProduct) => {
          let productLatitude = parseFloat(
            curProduct.map_coordinates?.latitude
          );
          let productLongitude = parseFloat(
            curProduct.map_coordinates?.longitude
          );

          if (curProduct.rc_link.coordinates) {
            const rc_coords = JSON.parse(curProduct.rc_link.coordinates);

            productLatitude = parseFloat(rc_coords.latitude);
            productLongitude = parseFloat(rc_coords.longitude);
          }

          prevCoords.latitude += productLatitude / products.length;
          prevCoords.longitude += productLongitude / products.length;

          return prevCoords; // Возвращаем аккумулированное значение на каждой итерации
        },
        {
          latitude: 0,
          longitude: 0,
        }
      );

      if (mapRef?.current) {
        mapRef?.current.animateCamera({
          center: {
            ...productsCenterCoords,
            zoom: zoom,
            heading: heading,
            pitch: pitch,
          },
          altitude: altitude,
        });
      }
    }
  }, [products, mapRef.current, isMapLoaded]);

  const onMapReady = () => {
    mapRef.current.animateCamera({
      center: {
        latitude: parseFloat(coords.latitude),
        longitude: parseFloat(coords.longitude),
        zoom: zoom,
        heading: heading,
        pitch: pitch,
      },
      altitude: altitude,
    });
    setIsMapLoaded(true);
  };

  const selectProducts = (coords) => {
    if (!coords) {
      console.log("no coords");
      return [];
    }

    if (!products || products.length == 0) {
      console.log("no products");
      return [];
    }

    const selected = products.filter((prod) => {
      let latitude = parseFloat(prod.map_coordinates?.latitude);
      let longitude = parseFloat(prod.map_coordinates?.longitude);

      if (prod.rc_link.coordinates) {
        const rc_coords = JSON.parse(prod.rc_link.coordinates);

        latitude = parseFloat(rc_coords.latitude);
        longitude = parseFloat(rc_coords.longitude);
      }

      return coords.find(
        (coord) =>
          parseFloat(coord.latitude) == latitude &&
          parseFloat(coord.longitude) == longitude
      );
    });

    setSelectedProducts(selected ? selected : []);
  };

  const onClusterPress = (cluster, markers) => {
    const markersCoords = markers.map((marker) => {
      const coords = {
        latitude: marker.geometry.coordinates[1],
        longitude: marker.geometry.coordinates[0],
      };

      return coords;
    });

    selectProducts(markersCoords);
  };

  const onMarkerPress = (event) => {
    const { coordinate } = event.nativeEvent;

    selectProducts([coordinate]);

    if (mapRef?.current) {
      mapRef?.current.animateToRegion({
        ...coordinate,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  const clusterColor = colors["blue-light"];
  const clusterFontFamily = "Manrope_500Medium";
  const clusterTextColor = colors["white"];

  const width = 40;
  const height = 40;
  const fontSize = 15;
  const size = 30;

  const productStyle = {
    borderRadius: 10,
    backgroundColor: colors["white"],
    width: Dimensions.get("window").width / 2 - 15,
    height: Math.floor((Dimensions.get("window").width / 2 - 55) * 1.45 + 10),
  };

  return (
    <>
      <View
        style={{
          height:
            selectedProducts && selectedProducts.length > 0 ? "55%" : "100%",
        }}
      >
        {isLoading ? (
          <Preloader style={{ height: "100%", width: "100%" }} />
        ) : (
          <>
            <MapView
              ref={mapRef}
              onMapReady={onMapReady}
              style={{ height: "100%" }}
              initialRegion={{
                ...coords,
                ...deltas,
              }}
              clusterColor={clusterColor}
              clusterFontFamily={clusterFontFamily}
              clusterTextColor={clusterTextColor}
              onClusterPress={onClusterPress}
              minPoints={0}
              preserveClusterPressBehavior={false}
              spiralEnabled={false}
              provider={PROVIDER_GOOGLE}
            >
              {Boolean(products.length) &&
                products.map((product) => {
                  let coordinate = {
                    latitude: parseFloat(product.map_coordinates?.latitude),
                    longitude: parseFloat(product.map_coordinates?.longitude),
                    ...deltas,
                  };

                  if (product.rc_link.coordinates) {
                    const rc_coords = JSON.parse(product.rc_link.coordinates);

                    coordinate = {
                      latitude: parseFloat(rc_coords.latitude),
                      longitude: parseFloat(rc_coords.longitude),
                      ...deltas,
                    };
                  }

                  return (
                    <Marker
                      key={product.id}
                      coordinate={coordinate}
                      onPress={onMarkerPress}
                      // title={product.name}
                    >
                      <TouchableOpacity
                        activeOpacity={0.5}
                        style={[styles.container, { width, height }]}
                      >
                        <View
                          style={[
                            styles.wrapper,
                            {
                              backgroundColor: clusterColor,
                              width,
                              height,
                              borderRadius: width / 2,
                            },
                          ]}
                        />
                        <View
                          style={[
                            styles.cluster,
                            {
                              backgroundColor: clusterColor,
                              width: size,
                              height: size,
                              borderRadius: size / 2,
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.text,
                              {
                                color: clusterTextColor,
                                fontSize,
                                fontFamily: clusterFontFamily,
                              },
                            ]}
                          >
                            1
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </Marker>
                  );
                })}
            </MapView>
          </>
        )}
      </View>

      <View
        style={{
          height: selectedProducts && selectedProducts.length > 0 ? "45%" : 0,
        }}
      >
        {selectedProducts && selectedProducts.length > 0 && (
          <>
            {/* <ScrollView style={{ height: "30%" }}>
              <View style={productContainerStyle}>
                {products.map((product) => {
                  return (
                    <Product wrapperStyle={productStyle} product={product} />
                  );
                })}
              </View>
            </ScrollView> */}

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Paragraph size="xl" style={{ marginVertical: 20 }}>
                {`${selectedProducts.length} ${declension(
                  selectedProducts.length,
                  ["объект", "объекта", "объектов"]
                )}`}
              </Paragraph>

              <TouchableOpacity onPress={() => selectProducts([])}>
                <Paragraph
                  color="blue"
                  size="lg"
                >
                  скрыть
                </Paragraph>
              </TouchableOpacity>
            </View>

            <FlatList
              data={selectedProducts}
              numColumns={2}
              renderItem={(item) => {
                return (
                  <Product
                    wrapperStyle={{
                      ...productStyle,
                      marginLeft: item.index % 2 === 0 ? 0 : 10,
                    }}
                    product={item.item}
                  />
                );
              }}
              keyExtractor={(item) => item.id}
            />
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    position: "absolute",
    opacity: 0.5,
    zIndex: 0,
  },
  cluster: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  text: {
    fontWeight: "bold",
  },
});
