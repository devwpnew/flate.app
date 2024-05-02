import { useState } from "react";

import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

import { Alert, TouchableOpacity, View } from "react-native";
import { ClipPath, Defs, G, Path, Svg } from "react-native-svg";

import Loader from "../../../ui/preloader/loader";
import Paragraph from "../../../ui/text/paragraph";

import declension from "../../../../helpers/formatters/declension";

export default function DownloadButton({ imagesUrls, imageUrl, style }) {
  const [status, setStatus] = useState("idle");

  const [isLoading, setIsLoading] = useState(false);
  const [permission, requestPermission] = MediaLibrary.usePermissions();

  const handleSuccess = (fileUri) => {
    setStatus("success");

    const decl = declension(fileUri.length, [
      "изображение",
      "изображения",
      "изображений",
    ]);

    const alertText = Array.isArray(fileUri)
      ? `${fileUri.length} ${decl} успешно сохранены`
      : "Изображение успешно сохранено";

    Alert.alert("Успешно!", `${alertText}`, [
      {
        text: "OK",
        onPress: () => setStatus("idle"),
      },
    ]);
  };

  const handleError = () => {
    const isPermission =
      permission.status === "denied" || permission.granted === false || permission.accessPrivileges === 'limited';

      const errorText = isPermission
      ? "Произошла ошибка, проверьте доступ приложения к изображениям..."
      : "Произошла ошибка, попробуйте снова...";

    setStatus("error");
    Alert.alert("Ошибка!", errorText, [
      {
        text: "OK",
        onPress: async () => {
          setStatus("idle");
          await MediaLibrary.requestPermissionsAsync()
        },
      },
    ]);
  };

  const getFileUrl = () => {
    if (imagesUrls) {
      return imagesUrls.map((imageUrl) => {
        const spitedName = imageUrl.split("/");

        const fileUri =
          FileSystem.documentDirectory + spitedName[spitedName?.length - 1];

        return {
          imageUrl: imageUrl,
          fileUri: fileUri,
        };
      });
    }

    if (imageUrl) {
      const spitedName = imageUrl.split("/");

      const fileUri =
        FileSystem.documentDirectory + spitedName[spitedName?.length - 1];

      return {
        imageUrl: imageUrl,
        fileUri: fileUri,
      };
    }

    return null;
  };

  const handleDownload = async () => {
    setIsLoading(true);

    const fileUrl = getFileUrl();

    if (!fileUrl) {
      // handleError();
      // setIsLoading(false);
      return;
    }

    try {
      if (Array.isArray(fileUrl)) {
        const responses = await Promise.all(
          fileUrl.map(async (url) => {
            const downloadAsyncRes = await FileSystem.downloadAsync(
              url.imageUrl,
              url.fileUri
            );
            return downloadAsyncRes;
          })
        );
        const fileUrls = responses.map((res) => res.uri);
        await saveFile(fileUrls);
      } else {
        const response = await FileSystem.downloadAsync(
          fileUrl.imageUrl,
          fileUrl.fileUri
        );

        await saveFile(response.uri);
      }
    } catch (err) {
      console.log("FS Err: ", err);

      setStatus("error");

      // handleError();
    } finally {
      setIsLoading(false);
    }
  };

  const saveFile = async (fileUri) => {
    // setIsLoading(true);
    setIsLoading(false);

    try {
      if (Array.isArray(fileUri)) {
        let assetId = null;
        let isNewAlbum = false;
        let album = await MediaLibrary.getAlbumAsync("Download");

        const assets = await Promise.all(
          fileUri.map(async (fileUri) => {
            return await MediaLibrary.createAssetAsync(fileUri);
          })
        );

        if (album == null) {
          album = await MediaLibrary.createAlbumAsync(
            "Download",
            assets[0],
            false
          );
          assetId = assets[0].id;
          isNewAlbum = true;
        }

        let assetsToAlbum = assets;

        if (!isNewAlbum) {
          assetsToAlbum = assetsToAlbum.filter((asset) => asset.id !== assetId);
        }

        const result = await MediaLibrary.addAssetsToAlbumAsync(
          assetsToAlbum,
          album,
          false
        );

        console.log(result, "result");
      } else {
        const asset = await MediaLibrary.saveToLibraryAsync(fileUri);
      }

      handleSuccess(fileUri);
    } catch (err) {
      console.log("Save err: ", err);

      handleError();
    } finally {
      setIsLoading(false);
    }
  };

  const onSaveButtonPress = async () => {
    console.log(permission);
    if (permission.status === "denied" || permission.granted === false || permission.accessPrivileges === 'limited') {
      await MediaLibrary.requestPermissionsAsync()

      if (permission.status === "denied" || permission.granted === false || permission.accessPrivileges === 'limited') {
        handleError();
      }

      return;
    }

    await handleDownload();
  };

  return (
    <>
      {isLoading ? (
        <View style={style}>
          <Loader size="sm" />
        </View>
      ) : (
        <TouchableOpacity onPress={onSaveButtonPress} style={style}>
          <Svg
            width={23}
            height={23}
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <G clipPath="url(#clip0_856_5)" fill="#1A1F25">
              <Path d="M19.875 13.75a.625.625 0 00-.625.625v4.375H1.75v-4.375a.625.625 0 00-1.25 0v5c0 .345.28.625.625.625h18.75c.345 0 .625-.28.625-.625v-5a.625.625 0 00-.625-.625z" />
              <Path d="M10.043 14.817a.64.64 0 00.893 0l4.375-4.313a.62.62 0 000-.883.635.635 0 00-.893 0l-3.297 3.25V.625a.628.628 0 00-.63-.625.628.628 0 00-.632.625v12.246L6.562 9.62a.635.635 0 00-.892 0 .62.62 0 000 .883l4.373 4.313z" />
            </G>
            <Defs>
              <ClipPath id="clip0_856_5">
                <Path
                  fill="#1A1F25"
                  transform="translate(.5)"
                  d="M0 0H20V20H0z"
                />
              </ClipPath>
            </Defs>
          </Svg>

          {imagesUrls && (
            <Paragraph
              size="sm"
              style={{
                position: "absolute",
                bottom: -5,
                right: -50,
                width: 100,
              }}
            >
              Скачать все
            </Paragraph>
          )}
        </TouchableOpacity>
      )}
    </>
  );
}
