import { useState } from "react";
import { View } from "react-native";

import InputFile from "../../../ui/input/inputFile";
import Paragraph from "../../../ui/text/paragraph";
import Container from "../../../ui/common/container";
import { useSelector } from "react-redux";

export default function FieldImages({ isCanUpdate, onFieldChange, defaultImages }) {
  const form = useSelector((state) => state.addForm.value);

  const [loadedImagesCount, setLoadedImagesCount] = useState(
    defaultImages?.length ? defaultImages.length : 0
  );

  const handleLoadImage = (v) => {
    if (onFieldChange) {
      onFieldChange(v);
    }

    setLoadedImagesCount(v.value.length);
  };

  return (
    <View>
      <Container>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
            marginTop: 20,
          }}
        >
          <Paragraph size="md">
            Фотографии{" "}
            {form.section_relation != 5 && (
              <Paragraph size="md" color="red">
                *
              </Paragraph>
            )}
          </Paragraph>

          <Paragraph color="grey-dark" size="md">
            {loadedImagesCount}/30
          </Paragraph>
        </View>

        <Paragraph size="sm" style={{ marginBottom: 10 }}>
          Если нет фотографий интерьера, разместите фото ЖК или участка
        </Paragraph>
      </Container>

      <InputFile
        buttonText="Добавить"
        name="property_product_galery"
        defaultImages={defaultImages}
        onLoad={handleLoadImage}
      />
    </View>
  );
}
