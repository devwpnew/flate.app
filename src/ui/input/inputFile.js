import React, { useEffect, useState } from "react";
import { Image, ScrollView, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "../button/button";
import tw from "../../../lib/tailwind";
import InputFileItem from "./file/inputFileItem";
import Preloader from "../preloader/preloader";
import Btn from "../button/btn";
import RProductPreloader from "../preloader/rProductPreloader";
import Container from "../common/container";

export default function InputFile({
  name,
  defaultImages,
  onLoad,
  multiselect = true,
  buttonStyle = {},
  buttonText = "Загрузить",
  ...props
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!defaultImages) return;

    const defaultImagesFormatted = defaultImages.map((img) => {
      const id = img.split("/").slice(-1).join("");

      const image = {
        assetId: id,
        uri: "https://flate.pro" + img,
      };

      return image;
    });

    setImages(defaultImagesFormatted);
  }, []);

  const pickImage = async () => {
    setIsLoading(true);

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      allowsMultipleSelection: multiselect,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      let imageSizeMBLowerThanMax = true;
      const arResult = [];

      result.assets.map((img, index) => {
        const imageSizeMB = (img.fileSize * (3 / 4)) / 1024 / 1024; // Approximate image size in MB

        if (imageSizeMB >= 10) {
          imageSizeMBLowerThanMax = false;
        } else {
          if (index < 30) {

            let resImage = img;

            if(!resImage?.assetId) {
              resImage.assetId = Math.random()
            }

            arResult.push(resImage);
          }
        }
      });

      if (imageSizeMBLowerThanMax) {
        let arImages = [...images, ...arResult];

        setImages(arImages);

        if (multiselect) {
          onLoad({ name: name, value: arImages });
        } else {
          onLoad({ name: name, value: arResult[0] });
        }
      } else {
        // Handle the case where the selected image exceeds 10 MB
        // You might want to show an error message to the user.
        alert("Выбранное изображение превышает размер в 10 МБ.");
      }
    }

    setIsLoading(false);
  };

  const removeImage = (id) => {
    const filtered = images.filter((img) => {
      return img.assetId !== id;
    });

    setImages(filtered);
    onLoad({ name: name, value: filtered });
  };

  return (
    <>
      <View {...props}>
        <ScrollView
          contentContainerStyle={{
            paddingLeft: 20,
            paddingRight: 20,
            marginBottom: 20,
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              gap: 10,
            }}
          >
            {isLoading ? (
              <>
                <RProductPreloader
                  amount={5}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                  }}
                />
              </>
            ) : (
              <>
                {images &&
                  images.map((image, i) => {
                    // console.log(image);
                    return (
                      <InputFileItem
                        key={image.assetId}
                        // onPress={() => // console.log(image.assetId)}
                        onClose={() => removeImage(image.assetId)}
                        isActive={i === 0}
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 10,
                        }}
                      >
                        <Image
                          source={{ uri: image.uri }}
                          style={tw`w-full h-full`}
                        />
                      </InputFileItem>
                    );
                  })}
              </>
            )}
          </View>
        </ScrollView>

        <Container>
          <Btn color="transparent" style={buttonStyle} onPress={pickImage}>
            {buttonText}
          </Btn>
        </Container>
      </View>
    </>
  );
}
