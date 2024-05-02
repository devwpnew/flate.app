import api from "../../../../api/service/api";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setLogedIn } from "../../../store/global/user/userLogin";

import RInputMulti from "../../../ui/input/rInputMulti";
import Btn from "../../../ui/button/btn";

export default function PhoneEdit({ arValues, ...props }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const user = useSelector((state) => state.userLogin.value);

  const [status, setStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formAdditionalPhones, setFormAdditionalPhones] = useState([]);

  const onSendNewPhone = async () => {
    return false;


    setIsLoading(true);

    const result = [];

    await Promise.all(
      formAdditionalPhones.map(async (phone) => {
        if (phone && phone.replace(/[^0-9]/g, "").length === 11) {
          const res = await api.add.userAdditionalPhone(phone, user);

          if (res?.error) {
            console.log(res.error);
          }

          if (res?.data) {
            result.push(res.data);
          }
          
          console.log(res.data);

        }
      })
    );

    setIsLoading(false);

    // const updatedUser = await api.get.user({
    //   window_host: "https://flate.pro",
    //   filter: {
    //     id: user.id,
    //   },
    //   sort: {
    //     id: "asc",
    //   },
    //   limit: 1,
    // });

    // if (updatedUser) {
    //   dispatch(setLogedIn(updatedUser));
    // }

    // navigation.navigate("Profile");
      
    console.log(result);

  };

  const onDeletePhone = async (phone) => {
    setIsLoading(true);
    const res = await api.remove.userAdditionalPhone(phone, user);
    console.log(res, "res");
    setIsLoading(false);
    setSuccess("номер удален");
  };

  return (
    <>
      <RInputMulti
        arValues={arValues}
        placeholder={"+7"}
        name="additional_phones"
        onChangeText={(v) =>
          setFormAdditionalPhones((prev) => [...prev, v.value])
        }
        text="Добавить еще номер"
        mask="phone"
        {...props}
      />

      {formAdditionalPhones.length > 0 && (
        <Btn isLoading={isLoading} onPress={onSendNewPhone}>
          Сохранить номера
        </Btn>
      )}
    </>
  );
}
