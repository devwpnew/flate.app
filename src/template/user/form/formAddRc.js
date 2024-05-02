import api from "../../../../api/service/api";

import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useSelector } from "react-redux";

import { Alert, KeyboardAvoidingView, ScrollView, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import RInput from "../../../ui/input/rInput";
import Dropdown from "../../../ui/dropdown/dropdown";
import RDropdownAreas from "../../../ui/dropdown/spec/rDropdownAreas";
import InputSuggest from "../../../ui/input/spec/inputSuggest";
import Btn from "../../../ui/button/btn";
import Container from "../../../ui/common/container";
import MapScreenAdd from "../../../layout/map/mapScreenAdd";
import Wrapper from "../../../layout/main/wrapper";

export default function FormAddRc() {
  const navigation = useNavigation();

  // CITY
  const user = useSelector((state) => state.userLogin.value);
  const cities = useSelector((state) => state.cities.value.array);
  // AREA

  const activeCity = useSelector((state) => state.userCity.value);
  const [city, setCity] = useState(activeCity.id);

  // FORM
  const [coords, setCoords] = useState(null);
  const [form, setForm] = useState({
    address: "",
    city_link: user.default_city.id,
  });

  const debouncedMapScreenAddress = useDebounce(form.address, 1100);

  const sendRcForm = async () => {
    const selectedCityName = cities.find((city) => city.id == form.city_link);

    if (!form.name) {
      onRcFormError('Поле "Название" не заполнено!');
      return;
    }

    if (!selectedCityName) {
      onRcFormError('Поле "Город" не заполнено!');
      return;
    }

    if (!form.area_link) {
      onRcFormError('Поле "Район" не заполнено!');
      return;
    }

    if (!form.address) {
      onRcFormError('Поле "Адрес" не заполнено!');
      return;
    }

    const formData = new FormData();

    for (const key in form) {
      formData.append(key, form[key]);
    }

    if (coords) {
      formData.append("coordinates", JSON.stringify(coords));
    }

    const res = await api.add.rcs(formData, selectedCityName.id);

    if (res && !res.error) {
      onRcFormSuccess(res?.itemId);
    } else {
      onRcFormError("Произошла непредвиденная ошибка!");
    }
  };

  const onRcFormError = (error) => {
    Alert.alert("Ошибка!", error, [
      {
        text: "Отмена",
        onPress: () => console.log("1"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("1") },
    ]);
  };

  const onRcFormSuccess = (rcId) => {
    const form = {
      section_relation: 3,
    };

    if (rcId) {
      form["rc_link"] = rcId;
    }

    Alert.alert(
      "Успешно!",
      "Ваш ЖК отправлен на модерацию. Вы уже можете выбрать этот ЖК, при размещении объекта",
      [
        {
          text: "OK",
          onPress: () => navigation.replace("Add"),
        },
      ]
    );
  };

  // console.log(user.default_city.id)
  return (
    <>
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        scrollEventThrottle={16}
      > */}
      {/* <KeyboardAvoidingView behavior="position"> */}
      <KeyboardAwareScrollView
        keyboardDismissMode={"none"}
        keyboardShouldPersistTaps={"always"}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
      >
        <Wrapper>
          <Container>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <View style={{ marginBottom: 20 }}>
                <RInput
                  isSuccess={form?.name}
                  style={{ fontSize: 14 }}
                  placeholder="Название ЖК"
                  onChangeText={(v) => setForm({ ...form, name: v.value })}
                />
              </View>

              <View style={{ marginBottom: 20 }}>
                <Dropdown
                  isSuccess={form?.city_link}
                  placeholder="Город"
                  placeholderSize="md"
                  options={cities}
                  name={"city_link"}
                  isLoading={false}
                  initialValue={user?.default_city?.id}
                  onValueChange={(v) => {
                    setForm({ ...form, city_link: v.value });
                    setCity(v.value);
                  }}
                />
              </View>

              <View style={{ marginBottom: 20 }}>
                <RDropdownAreas
                  isSuccess={form?.area_link}
                  placeholderSize="md"
                  city={city}
                  multiselect={false}
                  onValueChange={(v) =>
                    setForm({ ...form, area_link: v.value })
                  }
                />
              </View>

              <View style={{ marginBottom: 10 }}>
                <InputSuggest
                  isSuccess={form?.address}
                  city={city}
                  onChangeAddressCoords={(coords) => {
                    if (coords && coords?.latitude && coords?.longitude) {
                      setCoords({
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                      });
                    } else {
                      console.log("Не установлены координаты");
                    }
                  }}
                  onChangeText={(v) => {
                    setForm({
                      ...form,
                      address: v,
                    });
                  }}
                  initialValue={form.address}
                  name={"address"}
                  placeholder={"Укажите адрес или передвиньте метку на карте*"}
                />
              </View>

              <View style={{ marginBottom: 10 }}>
                <MapScreenAdd
                  initialValue={debouncedMapScreenAddress}
                  onFieldChange={(v) => {
                    setForm({
                      ...form,
                      address: v.value,
                    });
                  }}
                />
              </View>

              <View style={{ marginBottom: 20 }}>
                <RInput
                  isSuccess={form?.description}
                  style={{ fontSize: 14 }}
                  multiline={true}
                  placeholder="Описание"
                  onChangeText={(v) =>
                    setForm({ ...form, description: v.value })
                  }
                />
              </View>

              <Btn onPress={sendRcForm}>Далее</Btn>
            </View>
          </Container>
        </Wrapper>
        {/* </KeyboardAvoidingView> */}
      </KeyboardAwareScrollView>
      {/* </ScrollView> */}
    </>
  );
}
