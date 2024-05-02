import API from "../../../../../api/service/api";
import { useState, useEffect } from "react";

import DText from "../../../text/dText";
import { View, ScrollView } from "react-native";
import Input from "../../../input/input";
import DropdownModal from "../../dropdownModal";
import DropdownAreas from "../dropdownAreas";

import InputSuggest from "../../../../ui/input/spec/inputSuggest";
import MapScreenAdd from "../../../../layout/map/mapScreenAdd";
import Button from "../../../button/button";
import tw from "../../../../../lib/tailwind";
import DModal from "../../../modal/dModal";

export default function addNewRcForm({ onNewRcAdded }) {
  const [addressValue, setAddressValue] = useState("");
  const [selectedCityName, setSelectedCityName] = useState("Сочи");

  const [formErrorMessage, setFormErrorMessage] = useState(false);
  const [formStatus, setFormStatus] = useState("init");
  const [form, setForm] = useState({
    city_link: 5,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    (async function fetchData() {
      setIsLoading(true);

      const cities = await API.get.cities({
        window_host: "https://flate.pro",
        select: ["id", "name"],
      });

      setCities(cities);

      setIsLoading(false);
    })();
  }, []);

  const sendRcForm = async () => {
    if (!form.name) {
      onRcFormError('Поле "Название" не заполнено!');
      return;
    }

    if (!form.address) {
      onRcFormError('Поле "Адрес" не заполнено!');
      return;
    }

    if (!form.area_link) {
      onRcFormError('Поле "Район" не заполнено!');
      return;
    }

    const formData = new FormData();

    for (const key in form) {
      formData.append(key, form[key]);
    }

    const res = await API.add.rcs(formData, selectedCityName);

    if (res && !res.error) {
      onRcFormSuccess();
    } else {
      onRcFormError("Произошла непредвиденная ошибка!");
    }
  };

  const onRcFormError = (error) => {
    setFormStatus("error");
    setFormErrorMessage(error);
    setTimeout(() => {
      if (formErrorMessage) {
        setFormStatus("init");
        setFormErrorMessage("");
      }
    }, 2500);
  };

  const onRcFormSuccess = () => {
    onNewRcAdded();
    setFormStatus("success");
  };

  const renderForm = () => {
    if (formStatus === "success") {
      return (
        <>
          <DText style={tw`text-lg font-bold mb-[10px]`}>
            Новый ЖК успешно добавлен
          </DText>

          <DText style={tw`text-lg text-center`}>
            Выберете его в соответствующем поле
          </DText>
        </>
      );
    } else {
      return (
        <>
          <DModal
            modalVisible={typeof formErrorMessage === "string"}
            setModalVisible={setFormErrorMessage}
          >
            <DText style={tw`text-lg text-center font-bold mb-[10px]`}>
              {formErrorMessage}
            </DText>

            <DText style={tw`text-lg text-center`}>
              Проверьте правильность ввода и повторите попытку
            </DText>
          </DModal>

          <DText style={tw`text-lg font-bold mb-[10px]`}>Добавить ЖК</DText>

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            // keyboardShouldPersistTaps="always"
          >
            <View style={tw`flex flex-col gap-[20px] w-full py-5`}>
              <Input
                required={true}
                topTitle={"Название"}
                onChangeText={(v) => {
                  setForm((prev) => {
                    return { ...prev, [v.name]: v.value };
                  });
                }}
                name={"name"}
                placeholder={"Название ЖК*"}
              />

              <DropdownModal
                style={tw`h-[40px]`}
                required={true}
                isLoading={isLoading}
                options={cities}
                topTitle={"Город"}
                name={"city_link"}
                onValueChange={(v) => {
                  setForm((prev) => {
                    return {
                      ...prev,
                      ...{ [v.name]: v.value, area_link: null },
                    };
                  });
                  setSelectedCityName(v.name);
                }}
              />

              <DropdownAreas
                city={form.city_link}
                multiselect={false}
                style={tw`h-[40px]`}
                isLoading={isLoading}
                topTitle={"Район"}
                name={"area_link"}
                onValueChange={(v) => {
                  setForm((prev) => {
                    return { ...prev, [v.name]: v.value };
                  });
                }}
              />

              <View style={{ zIndex: 10 }}>
                <InputSuggest
                  listViewStyle={tw`border border-greyborder rounded mx-[5px] absolute top-[48px] left-0`}
                  required={true}
                  topTitle={"Адрес"}
                  onChangeText={(v) => {
                    setForm((prev) => {
                      return { ...prev, address: v };
                    });
                  }}
                  initialValue={addressValue}
                  name={"address"}
                  placeholder={"Укажите адрес или передвиньте метку на карте*"}
                />
              </View>

              <Input
                topTitle={"Описание"}
                onChangeText={(v) => {
                  setForm((prev) => {
                    return { ...prev, [v.name]: v.value };
                  });
                }}
                name={"description"}
                placeholder={"Описание"}
              />

              <MapScreenAdd
                onFieldChange={(v) => {
                  setForm((prev) => {
                    return { ...prev, address: v.value };
                  });
                  setAddressValue(v.value);
                }}
              />

              <Button style={tw`flex self-end w-full`} onPress={sendRcForm}>
                Далее
              </Button>
            </View>
          </ScrollView>
        </>
      );
    }
  };

  return <>{renderForm()}</>;
}
