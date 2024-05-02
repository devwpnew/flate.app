import api from "../../../../api/service/api";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import tw from "../../../../lib/tailwind";

import InputFile from "../../../ui/input/inputFile";

import UserAvatar from "../../../layout/profile/userAvatar";
import { StyleSheet } from "react-native";
import { colors } from "../../../ui/config";
import { View } from "react-native";
import FileIcon from "../../../ui/icons/fileIcon";
import Paragraph from "../../../ui/text/paragraph";
import { Image } from "react-native";
import Loader from "../../../ui/preloader/loader";
import { setLogedIn } from "../../../store/global/user/userLogin";

function appendImages(images, key, formData) {
  const imagesArray = Array.isArray(images) ? images : [images];

  imagesArray.map((image) => {
    const uri = image.uri;
    const fileName = uri.split("/").pop();
    const match = /\.(\w+)$/.exec(fileName);
    const type = match ? `image/${match[1]}` : `image`;
    const fileObj = {
      uri: uri,
      name: fileName,
      type,
    };
    formData.append(key, fileObj);
  });
}

export function getImageSource(userAvatar) {
  return {
    uri: userAvatar.includes("/upload/")
      ? "https://flate.pro/" + userAvatar
      : userAvatar,
  };
}

export default function RUserAvatarLoad({
  style,
  avatar,
  name,
  width = 80,
  height = 80,
  ...props
}) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userLogin.value);
  const [userAvatar, setUserAvatar] = useState(avatar);
  const [userName, setUserName] = useState(name);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?.user_avatar) {
      setUserAvatar(user.user_avatar);
    }
    if (user?.user_name) {
      setUserName(user.user_name);
    }
  }, [user]);

  useEffect(() => {
    if (avatar) {
      setUserAvatar(avatar);
    }

    if (name) {
      setUserName(name);
    }
  }, [avatar, name]);

  const handleLoadImage = async (v) => {
    if (!v.value) return;

    setUserAvatar(v.value.uri);
    loadUserAvatar(v.value);
  };

  async function loadUserAvatar(image) {
    setIsLoading(true);
    const formData = new FormData();

    formData.append("id", user.id);
    formData.append("window_host", "https://flate.pro");
    appendImages(image, "user_avatar", formData);

    const response = await api.set.userAvatar(formData);

    if (response) {
      updateUser(user.id);
      console.log(response);
    }
    setIsLoading(false);
  }

  const updateUser = async (userId) => {
    const updatedUser = await api.get.user({
      window_host: "https://flate.pro",
      filter: {
        id: userId,
      },
      sort: {
        id: "asc",
      },
      limit: 1,
    });
    if (updatedUser) {
      dispatch(setLogedIn(updatedUser));
    }
  };

  return (
    <View style={styles.row}>
      <View
        style={{ ...style, ...styles.circle, width: width, height: height }}
      >
        {isLoading ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            {userAvatar ? (
              <Image
                style={{ width: width, height: height }}
                source={getImageSource(userAvatar)}
              />
            ) : (
              <FileIcon />
            )}
          </>
        )}
      </View>

      <Paragraph color="blue">{userAvatar ? "Заменить фото" : "Загрузить фото"}</Paragraph>

      <InputFile
        style={styles.input}
        buttonStyle={{ height: "100%", width: "100%" }}
        multiselect={false}
        name="property_product_galery"
        onLoad={handleLoadImage}
        emptyImage={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors["grey-light"],
    borderRadius: 9999,
    overflow: "hidden",
  },
  row: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    position: "relative",
  },
  input: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    width: "100%",
    opacity: 0
  },
});
