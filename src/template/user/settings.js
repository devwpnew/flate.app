import API from "../../../api/service/api";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Dimensions,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

import tw from "../../../lib/tailwind";

import Main from "../../layout/main/main";
import Footer from "../../layout/main/footer";
import DText from "../../ui/text/dText";
import Button from "../../ui/button/button";
import Input from "../../ui/input/input";
import InputArea from "../../ui/input/inputArea";
import DropdownPhone from "../../ui/dropdown/spec/dropdownPhone";
import DropdownModal from "../../ui/dropdown/dropdownModal";
import InputEmail from "../../ui/input/spec/inputEmail";
import DModal from "../../ui/modal/dModal";
import Preloader from "../../ui/preloader/preloader";
import { setLogedIn } from "../../store/global/user/userLogin";
import api from "../../../api/service/api";
import { Keyboard } from "react-native";

export default function Settings({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLogin.value);

  // CITIES
  const cities = useSelector((state) => state.cities.value.array);

  // FORM
  const [response, setResponse] = useState(null);
  const [form, setForm] = useState({
    id: user.id,
  });
  const [isFormLoading, setIsFormLoading] = useState(false);

  const saveUserSubmit = async () => {
    setIsFormLoading(true);

    const data = form;

    if (!data.id) {
      setResponse("Произошла ошибка");
      return;
    }

    const res = await API.update.user(data);
    // console.log("res", res);

    if (res?.error) {
      setResponse(res.error);
    } else {
      setIsFormLoading(true);

      updateUser(user.id);

      setIsFormLoading(false);

      setResponse("Успешно");
    }

    setIsFormLoading(false);
  };

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

  const handleScroll = (event) => {
    Keyboard.dismiss();
  };

  return (
    <Main>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={tw`h-full`}
      >
        <View style={tw`px-[15px]`}>
          <View style={tw`my-4`}>
            <Input
              topTitle={"Имя"}
              name="user_name"
              initialValue={user && user.user_name}
              placeholder={"Имя"}
              required={true}
              onChangeText={(v) =>
                setForm({
                  ...form,
                  user_name: v.value,
                })
              }
            />
          </View>
          <View style={tw`mb-4`}>
            <Input
              topTitle={"Фамилия"}
              name="user_last_name"
              initialValue={user && user.user_last_name}
              placeholder={"Фамилия"}
              onChangeText={(v) =>
                setForm({
                  ...form,
                  user_last_name: v.value,
                })
              }
            />
          </View>
          <View style={tw`relative mb-4`}>
            <Input
              tooltip={"Если вы работаете на себя, укажите “Частный брокер”"}
              topTitle={"Название агентства"}
              placeholder={"Название агентства"}
              name="user_agency"
              initialValue={user && user.user_agency}
              onChangeText={(v) =>
                setForm({
                  ...form,
                  user_agency: v.value,
                })
              }
            />
          </View>
          <View style={tw`mb-4`}>
            <DropdownModal
              required={true}
              isLoading={false}
              options={cities}
              topTitle={"Город"}
              name={"default_city"}
              initialValue={user?.default_city?.id}
              onValueChange={(v) =>
                setForm({
                  ...form,
                  default_city: v.value,
                })
              }
            />
          </View>
          <View style={tw`mb-4`}>
            <Input
              leftTitle={"flate.pro/users/"}
              topTitle={"Юзернейм"}
              placeholder={
                (user && user.sef_code) || (user && user.id.toString())
              }
              name="sef_code"
              initialValue={
                (user && user.sef_code) || (user && user.id.toString())
              }
              onChangeText={(v) =>
                setForm({
                  ...form,
                  sef_code: v.value,
                })
              }
            />
            <DText
              style={{
                ...tw`text-xs mt-1`,
                color: "rgb(156, 163, 175)",
              }}
            >
              Вы можете поделиться ссылкой на все свои объявления в разделе “Мои
              объявления”
            </DText>
          </View>
          <View style={tw`mb-4`}>
            <DropdownPhone
              user={user}
              name={"phone"}
              topTitle={"Номер телефона"}
              onValueChange={(v) =>
                setForm({
                  ...form,
                  phone: v.value,
                })
              }
            />
          </View>
          <View style={tw`relative mb-4`}>
            <InputEmail />
          </View>
          <View style={tw`mb-4`}>
            <InputArea
              topTitle={"О себе"}
              style={"w-full"}
              initialValue={user && user.user_description}
              name="user_description"
              placeholder={"Например: Ведущий специалист отдела продаж."}
              onChangeText={(v) =>
                setForm({
                  ...form,
                  user_description: v.value,
                })
              }
            />
          </View>
          {isFormLoading ? (
            <Preloader style={tw`h-[41px] w-full`} />
          ) : (
            <Button style={tw`h-[41px]`} onPress={saveUserSubmit}>
              Сохранить изменения
            </Button>
          )}
        </View>

        <View style={tw`h-[320px]`}></View>
      </ScrollView>

      <DModal
        modalVisible={typeof response === "string"}
        setModalVisible={setResponse}
      >
        <DText>{response}</DText>
      </DModal>

      <Footer navigation={navigation} />
    </Main>
  );
}
