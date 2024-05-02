import API from "../../../../api/service/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogedIn } from "../../../store/global/user/userLogin";
import tw from "../../../../lib/tailwind";

import DropdownModal from "../dropdownModal";
import Button from "../../button/button";
import InputPhone from "../../../ui/input/spec/inputPhone";
import DModal from "../../modal/dModal";
import DText from "../../text/dText";
import Dropdown from "../dropdown";
import RModal from "../../modal/rModal";
import Title from "../../heading/title";
import Paragraph from "../../text/paragraph";
import RInput from "../../input/rInput";
import { View } from "react-native";

export default function DropdownPhone({ initialValue, ...props }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userLogin.value);

  const [initialValueRes, setInitialValueRes] = useState(null);
  const [response, setResponse] = useState(false);

  const [newPhone, setNewPhone] = useState(false);
  const [isAddNewPhone, setIsAddNewPhone] = useState(false);

  const [isLoadingPhones, setIsLoadingPhones] = useState(true);
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    setIsLoadingPhones(true);

    const phonesArr = [];

    const phone = user.phone;
    const additionalPhones = user?.additional_phones;

    phonesArr.push({ name: phone, id: phone });

    if (additionalPhones) {
      additionalPhones.map((phone) => {
        if (phone) {
          phonesArr.push({ name: phone, id: phone });
        }
      });
    }

    if (phonesArr.length > 0) {
      setPhones(phonesArr);
    }
    setIsLoadingPhones(false);
  }, [user]);

  const onSendNewPhone = async () => {
    if (!newPhone) {
      setResponse("Вы не ввели телефон.");
      return;
    }

    if (newPhone.length < 11) {
      setResponse("Длина телефона не может быть ниже 11 символов.");
      return;
    }

    setIsLoadingPhones(true);

    const res = await API.add.userAdditionalPhone(newPhone, user);

    if (res?.error) {
      setResponse(res.error);
    }

    if (res?.data) {
      const updatedUser = await API.get.user({
        window_host: "https://flate.pro",
        filter: {
          id: user.id,
        },
        sort: {
          id: "asc",
        },
        limit: 1,
      });

      if (updatedUser) {
        dispatch(setLogedIn(updatedUser));
      }

      setResponse("Успешно");
      setIsAddNewPhone(false);
    }

    setIsLoadingPhones(false);
  };

  const onRemovePhone = async (phone) => {
    if (phones.length == 1) {
      setResponse("Нельзя удалить единственный номер телефона.");
      return;
    }

    setIsLoadingPhones(true);

    const res = await API.remove.userAdditionalPhone(phone.value, user);

    if (res?.error) {
      setResponse(res.error);
      return;
    }

    const updatedUser = await API.get.user({
      window_host: "https://flate.pro",
      filter: {
        id: user.id,
      },
      sort: {
        id: "asc",
      },
      limit: 1,
    });

    if (updatedUser) {
      dispatch(setLogedIn(updatedUser));

      setIsLoadingPhones(false);
      setResponse("Номер удален");
    }
  };

  useEffect(() => {
    if (phones && initialValue) {
      const initialValueNew = phones.find(
        (p) => p.id.replace(/\D/g, "") === initialValue.replace(/\D/g, "")
      );

      if (initialValueNew) {
        setInitialValueRes(initialValueNew);
      }
    }
  }, [initialValue, phones]);

  // console.log(phones);

  return (
    <>
      <Dropdown
        required={true}
        isLoading={isLoadingPhones}
        options={phones}
        initialValue={initialValueRes && initialValueRes.id}
        onValueRemove={(v) => onRemovePhone(v)}
        {...props}
      />

      {isAddNewPhone ? (
        <>
          <View style={{ marginVertical: 10 }}>
            <RInput
              isLoading={isLoadingPhones}
              mask="phone"
              onChangeText={(v) => setNewPhone(v.value)}
              placeholder="+7"
            />
          </View>

          <Paragraph color="blue" onPress={() => onSendNewPhone()}>
            Принять
          </Paragraph>
        </>
      ) : (
        <>
          {/* <Paragraph
          style={{ marginTop: 10 }}
          color="blue"
          onPress={() => setIsAddNewPhone(true)}
        >
          Добавить еще номер
        </Paragraph> */}
        </>
      )}

      <RModal
        modalVisible={typeof response === "string"}
        setModalVisible={setResponse}
      >
        <Title style={{ marginBottom: 20 }}>
          {response === "Успешно" ? "Успешно" : "Ошибка"}
        </Title>
        <Paragraph size="lg">{response}</Paragraph>
      </RModal>
    </>
  );
}
