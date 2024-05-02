import api from "../../../../api/service/api";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import tw from "../../../../lib/tailwind";

import InputFile from "../../../ui/input/inputFile";

import UserAvatar from "../../../layout/profile/userAvatar";

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

export default function UserAvatarLoad({ style, avatar, name, ...props }) {
  const user = useSelector((state) => state.userLogin.value);
  const [userAvatar, setUserAvatar] = useState(avatar);
  const [userName, setUserName] = useState(name);

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
    const formData = new FormData();

    formData.append("id", user.id);
    formData.append("window_host", "https://flate.pro");
    appendImages(image, "user_avatar", formData);

    const response = await api.set.userAvatar(formData);

    if (response) {
      // console.log(response);
    }
  }

  return (
    <>
      <UserAvatar
        style={tw`rounded-full`}
        avatar={userAvatar}
        name={userName}
      />
      <InputFile
        style={tw`absolute left-0 top-0 h-full opacity-0`}
        buttonStyle={tw`h-full`}
        multiselect={false}
        name="property_product_galery"
        onLoad={handleLoadImage}
        emptyImage={true}
      />
    </>
  );
}
