import api from "../../../api/service/api";

import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View } from "react-native";
import { setAddForm } from "../../store/global/addForm/addForm";
import { setFetchState } from "../../store/global/helpers/fetchTrigger";

import FormData from "form-data";

import Main from "../../layout/main/main";
import FieldSection from "./fields/fieldSection";
import FieldStatus from "./fields/fieldStatus";
import FieldImages from "./fields/fieldImages";
import FieldName from "./fields/fieldName";
import FieldDescription from "./fields/fieldDescription";
import FieldPrice from "./fields/fieldPrice";
import FieldAddress from "./fields/fieldAddress";
import FieldConnect from "./fields/fieldConnect";
import FieldAbout from "./fields/fieldAbout";
import FieldFiles from "./fields/fieldFiles";
import FieldContacts from "./fields/fieldContacts";

import Btn from "../../ui/button/btn";
import RModal from "../../ui/modal/rModal";

import validateAddForm from "../../../helpers/validate/validateAddForm";
import Container from "../../ui/common/container";
import Paragraph from "../../ui/text/paragraph";
import Title from "../../ui/heading/title";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function isObject(variable) {
  return Object.prototype.toString.call(variable) === "[object Object]";
}

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

export default function Add({ route, navigation, product }) {
  const dispatch = useDispatch();

  const isFetch = useSelector((state) => state.fetchTrigger.value);

  const [formId, setFormId] = useState(1);

  const form = useSelector((state) => state.addForm.value);
  const user = useSelector((state) => state.userLogin.value);

  const [response, setResponse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // GET INITIAL FORM
  const initialForm = () => {
    let form = {};

    if (product) {
      let pObj = {};

      if (product?.id) {
        pObj = {
          id: product.id,
          published: "0",
          section_relation: product.section_relation[0].id,
          city_link: product.city_link.id,
        };

        if (product?.rc_link) {
          pObj["rc_link"] = product.rc_link.id;
        }

        if (product?.properties?.product_galery) {
          const defaultImages = JSON.parse(product?.properties?.product_galery);
          const defaultImagesFormatted = defaultImages.map((img) => {
            const id = img.split("/").slice(-1).join("");
            const image = {
              assetId: id,
              uri: "https://flate.pro" + img,
            };
            return image;
          });

          if (defaultImagesFormatted && defaultImagesFormatted?.length > 0) {
            pObj["property_product_galery"] = defaultImagesFormatted;
          }
        }
      }

      form = { ...form, ...pObj };

      if (route?.params?.form) {
        form = { ...form, ...route.params.form };
      }
    } else {
      const dObj = {
        user_id: user?.id,
        property_product_phone: user?.phone,
        section_relation: "3",
        messages_calls: 1,
      };

      form = { ...form, ...dObj };

      if (route?.params?.form) {
        form = { ...form, ...route.params.form };
      }
    }

    return form;
  };

  const initialValue = initialForm();

  const [formState, setFormState] = useState(initialValue);

  // ON CHANGE FIELD
  const onFieldChange = (v) => {
    const fieldName = v?.name;
    const fieldValue = v?.value;

    if (fieldName) {
      if (isObject(fieldValue)) {
        const isEmptyObj = Object.keys(fieldValue).length === 0;

        if (!isEmptyObj) {
          setFormState((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue,
          }));
        }
      } else {
        if (!fieldValue) {
          setFormState((prevState) => {
            const newState = {};
            for (const propName in prevState) {
              if (propName !== fieldName) {
                newState[propName] = prevState[propName];
              }
            }
            return newState;
          });

          return;
        }

        setFormState((prevState) => {
          return {
            ...prevState,
            [fieldName]: fieldValue,
          };
        });

        // console.log(formState);
      }
    }
  };

  const onFieldSectionChange = (v) => {
    setFormState(initialValue);
    dispatch(setAddForm(initialValue));
    onFieldChange(v);
    setFormId(Math.random());
  };

  // SUBMIT
  const onSubmitForm = async () => {
    const sectionId = parseInt(form.section_relation);
    const isValid = validateAddForm(form, sectionId, product);

    // console.log(form);

    if (isValid.check) {
      setIsLoading(true);
      const formData = new FormData();

      if (!product) {
        formData.append("user_id", user.id);
      }

      for (const key in form) {
        if (!form[key]) return;

        if (typeof form[key] === "string" || typeof form[key] === "number") {
          formData.append(key, form[key].toString().trim());
        } else if (key == "property_product_galery") {
          appendImages(form[key], key, formData);
        } else {
          formData.append(key, form[key]);
        }
      }

      let res = {};

      if (product) {
        // for(const t in formData) {
        //   console.log(formData[t], t, '===================');
        // }

        res = await api.update.product(formData);
      } else {
        res = await api.add.product(formData);
      }

      console.log(res, "res");
      console.log(form);

      if (res?.full?.itemId || res?.full?.data?.itemId) {
        const successT = (
          <>
            <Title style={{ marginBottom: 20 }}>
              {product ? "Сохранено!" : "Спасибо!"}
            </Title>

            <Paragraph>
              Ваше объявление отправлено на проверку, оно появится в поиске
              через несколько минут
            </Paragraph>
          </>
        );

        setResponse(successT);
        setIsSuccess(true);

        // setTimeout(() => {
        //   if(route.name === 'Add') {
        //     navigation.navigate("Items",{
        //       isCanGoBack: false
        //     });
        //   }
        //   setResponse(false)
        // }, 15000);

        dispatch(setFetchState(!isFetch));
      } else {
        const errorT = (
          <>
            <Title style={{ marginBottom: 20 }}>Произошла ошибка.</Title>

            <Paragraph>
              Проверьте правильность ввода и повторите попытку
            </Paragraph>
          </>
        );

        setResponse(errorT);
      }

      setIsLoading(false);
    } else {
      let errorStr = "";

      // const [id] = Object.entries(isValid.scrollToFields)[0];

      // setScrollToEl(id);

      for (const key in isValid.errorFields) {
        if (isValid.errorFields[key]) {
          errorStr += isValid.errorFields[key] + "\n";
        }
      }

      const error = (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Title style={{ marginBottom: 20 }}>Произошла ошибка.</Title>
          <Paragraph style={{ textAlign: "center", marginBottom: 14 }}>
            Проверьте правильность ввода и повторите попытку
          </Paragraph>
          <Paragraph>{errorStr}</Paragraph>
        </View>
      );

      setResponse(error);
      return;
    }
  };

  // ON CLOSE MODAL
  const onCloseModal = () => {
    setResponse(false);

    if (isSuccess) {
      navigation.navigate("Items", {
        tabName: "moderated",
      });

      console.log({
        tabName: "moderated",
      });

      setFormState(initialValue);
      dispatch(setAddForm(initialValue));
      setFormId(Math.random());
    }
  };

  // RESET
  // const isFocused = useIsFocused();

  // useEffect(() => {
  //   if (isFocused && !product) {
  //     setFormState(initialValue);
  //   }
  // }, [isFocused]);

  // ON MULTISELECT CHANGE
  useEffect(() => {
    if (route.params) {
      setFormState((prevState) => {
        const newState = prevState;

        const multiSelectedValues = route.params?.selectedOptions?.map(
          (selectedOption) => {
            return selectedOption.value;
          }
        );

        if (multiSelectedValues) {
          if (route.params.name == "area_link") {
            newState[route.params.name] = multiSelectedValues[0];
          } else {
            newState[route.params.name] = multiSelectedValues;
          }
        }

        return newState;
      });
    }
  }, [route.params]);

  // ON CHANGE
  useEffect(() => {
    dispatch(setAddForm(formState));
  }, [formState]);

  // INITIAL
  // useEffect(() => {
  //   if(initialValue) {
  //     for(const fieldName in initialValue) {
  //       setFormState((prevState) => ({
  //         ...prevState,
  //         [fieldName]: initialValue[fieldName],
  //       }));
  //     }
  //   }
  // }, [])

  console.log(form?.map_coordinates);

  return (
    <Main>
      <KeyboardAwareScrollView
        keyboardDismissMode={"none"}
        keyboardShouldPersistTaps={"always"}
        showsVerticalScrollIndicator={false}
        extraScrollHeight={50}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
      >
        {!product && (
          <Container>
            <FieldSection
              initialValue={3}
              product={product}
              onFieldChange={onFieldSectionChange}
            />
          </Container>
        )}

        {formState?.section_relation && (
          <View key={formId}>
            <Container>
              <FieldAddress
                onFieldChange={onFieldChange}
                onTextFieldChange={onFieldChange}
                user={user}
                product={product}
              />

              <FieldStatus onFieldChange={onFieldChange} product={product} />

              {form?.section_relation == 7 || form?.section_relation == 6 ? (
                <FieldName
                  onTextFieldChange={onFieldChange}
                  name={product?.name}
                />
              ) : (
                ""
              )}

              <FieldAbout
                onFieldChange={onFieldChange}
                onTextFieldChange={onFieldChange}
                product={product}
              />
            </Container>

            <FieldImages
              onFieldChange={onFieldChange}
              defaultImages={
                product?.properties?.product_galery &&
                JSON.parse(product?.properties?.product_galery)
              }
            />

            <Container>
              <FieldFiles onTextFieldChange={onFieldChange} product={product} />

              <FieldDescription
                onTextFieldChange={onFieldChange}
                product={product}
              />

              <FieldPrice
                onFieldChange={onFieldChange}
                onTextFieldChange={onFieldChange}
                product={product}
              />

              <FieldContacts
                onFieldChange={onFieldChange}
                product={product}
                user={product?.user_id ? product?.user_id : user}
              />

              <Btn
                style={{ marginTop: 10 }}
                isLoading={isLoading}
                onPress={onSubmitForm}
              >
                {product ? "Сохранить" : "Разместить"}
              </Btn>
            </Container>
          </View>
        )}
      </KeyboardAwareScrollView>

      <RModal
        modalVisible={
          typeof response === "object" || typeof response === "string"
        }
        setModalVisible={onCloseModal}
      >
        {typeof response === "string" ? (
          <Paragraph>{response}</Paragraph>
        ) : (
          response
        )}
      </RModal>
    </Main>
  );
}
