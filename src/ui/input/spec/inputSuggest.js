import { useEffect, useMemo, useRef, useId } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { View, TextInput, Platform } from "react-native";

import { colors } from "../../config";
import AccessoryView from "../part/accessoryView";
import Paragraph from "../../text/paragraph";

export default function InputSuggest({
  city = "5",
  style,
  listViewStyle,
  name,
  onChangeAddressCoords,
  onChangeAddressDetails,
  onChangeText,
  initialValue,
  placeholder,
  placeholderSize = "md",
  placeholderColor = "grey-medium",
  isSuccess,
  isRequired,
  ...props
}) {
  const inputAccessoryViewID = useId();
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;

    if (initialValue) {
      ref.current?.setAddressText(initialValue);
    } else {
      ref.current?.setAddressText("");
    }
  }, [ref.current, initialValue]);

  let workPlace = "43.5855,39.7231";

  if (city != 5) {
    workPlace = "45.0402,38.9760";
  }

  const borderColorValue = useMemo(() => {
    return isSuccess ? colors["green-dark"] : "transparent";
  }, [isSuccess]);

  return (
    <View style={{}}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            position: "relative",
            width: "100%",
            shadowColor: "#6F7882",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.2,
            shadowRadius: 6,
            elevation: 2, // для AndroidF
            backgroundColor: "#fff",
            borderColor: borderColorValue,
            borderWidth: 1,
            borderRadius: 6,
            paddingLeft: isRequired ? 25 : 15,
            paddingRight: 10,
            paddingTop: Platform.OS === "android" ? 0 : 5.5,
            paddingBottom: Platform.OS === "android" ? 0 : 5.5,
          }}
        >
          {isRequired && (
            <Paragraph
              style={{ position: "absolute", top: 15, left: 20 }}
              size="md"
              color="red"
            >
              *
            </Paragraph>
          )}

          <GooglePlacesAutocomplete
            ref={ref}
            listViewDisplayed={false}
            fetchDetails={true}
            onPress={(data, details = null) => {
              const { lat, lng } = details.geometry.location;

              const addressText = data?.description;
              if (onChangeText) {
                onChangeText(addressText);
              }

              if (onChangeAddressDetails) {
                onChangeAddressDetails(details);
              }

              if (
                onChangeAddressCoords &&
                details.geometry.location &&
                lat &&
                lng
              ) {
                onChangeAddressCoords({ latitude: lat, longitude: lng });
              }
            }}
            textInputProps={{
              returnKeyType: "done",
              inputAccessoryViewID: inputAccessoryViewID,
              placeholder: placeholder,
              placeholderTextColor: colors[placeholderColor],
              InputComp: TextInput,
              onChangeText: (text) => {
                if (onChangeText) {
                  //onChangeText(text);
                }
              },
            }}
            GooglePlacesDetailsQuery={{
              key: "AIzaSyAC5QwsSuLWH8Cq-3r2YqsfDIxwy-Q9U7I",
              language: "ru",
              components: "country:ru", // Ограничьте поиск только до России
              fields: ["geometry"],
            }}
            query={{
              key: "AIzaSyAC5QwsSuLWH8Cq-3r2YqsfDIxwy-Q9U7I",
              language: "ru",
              components: "country:ru", // Ограничьте поиск только до России
              location: workPlace,
              radius: 50000,
            }}
            debounce={2000}
            disableScroll={true}
            enablePoweredByContainer={false}
            styles={{
              textInputContainer: {},
              textInput: {
                width: "100%",
                height: "100%",
                fontSize: placeholderSize == "md" ? 14 : 16,
              },
              listView: {
                ...(listViewStyle
                  ? listViewStyle
                  : {
                      backgroundColor: "red",
                    }),
              },
              description: {
                fontWeight: "400",
              },
              predefinedPlacesDescription: {
                color: "#1faadb",
              },
            }}
            {...props}
            placeholder={null}
          />
        </View>
      </View>
      <AccessoryView inputAccessoryViewID={inputAccessoryViewID} />
    </View>
  );
}
