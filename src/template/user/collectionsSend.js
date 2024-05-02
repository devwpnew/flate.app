import api from "../../../api/service/api";

import { useEffect, useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {
  Alert,
  Dimensions,
  Platform,
  ScrollView,
  Share,
  TouchableOpacity,
  View,
} from "react-native";

import Main from "../../layout/main/main";
import Footer from "../../layout/main/footer";
import Container from "../../ui/common/container";
import Wrapper from "../../layout/main/wrapper";
import Paragraph from "../../ui/text/paragraph";
import RProductPreloader from "../../ui/preloader/rProductPreloader";

import Btn from "../../ui/button/btn";
import RInput from "../../ui/input/rInput";
import ProductCollections from "../../layout/product/item/productCollections";
import {
  getProductAddressNew,
  getProductPublished,
} from "../../../helpers/product/getters";
import useDebounce from "../../../hooks/useDebounce";

export default function CollectionsSend({ navigation }) {
  const user = useSelector((state) => state.userLogin.value);
  const route = useRoute();

  const scrollViewRef = useRef(null);

  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const productStyle = {
    width: Dimensions.get("screen").width - 20,
    height: 100,
  };

  const [url, setUrl] = useState(null);

  const agent = user.user_last_name
    ? `${user.user_name} ${user.user_last_name}`
    : user.user_name;

  const [form, setForm] = useState({
    title: "Уважаемый клиент!",
    description: "Ознакомьтесь с объектами по вашему запросу:",
    postscriptum: `С уважением, ${agent}.`,
  });

  const debouncedForm = useDebounce(form, 2000);

  const collectionId = route?.params?.collectionId;

  useEffect(() => {
    async function fetchData() {
      setIsProductsLoading(true);

      const collection = await api.selections.selection.list({
        filter: {
          id: collectionId,
        },
      });

      console.log(collection, "collection");

      if (collection[0]) {
        const collectionEl = collection[0];

        const urlData = {
          id: collectionEl.id,
          user_id: collectionEl.user_id,
        };

        const code = api.selections.selection.generateCode(urlData);
        const fullUrl = "https://myflat.pro/" + code;

        setUrl(fullUrl);

        setForm({
          title: collectionEl.title ? collectionEl.title : "Уважаемый клиент!",
          description: collectionEl.description
            ? collectionEl.description
            : "Ознакомьтесь с объектами по вашему запросу:",
          postscriptum: collectionEl.postscriptum
            ? collectionEl.postscriptum
            : `С уважением, ${agent}.`,
        });
      }

      const collectionProducts = await api.selections.product.list({
        filter: {
          selection: collectionId,
        },
      });

      if (collectionProducts && collectionProducts?.length > 0) {
        setProducts(collectionProducts);
      } else {
        setProducts([]);
      }

      setIsProductsLoading(false);
    }

    fetchData();
  }, [collectionId]);

  useEffect(() => {
    const saveCollectionFields = async () => {
      try {
        const edited = await api.selections.selection.edit({
          id: collectionId,
          title: debouncedForm.title,
          description: debouncedForm.description,
          postscriptum: debouncedForm.postscriptum,
        });
        console.log(edited);
      } catch (error) {
        console.log(error);
      }
    };
    saveCollectionFields();
  }, [
    collectionId,
    debouncedForm.title,
    debouncedForm.description,
    debouncedForm.postscriptum,
  ]);

  const onInputChange = (obj) => {
    setForm({ ...form, [obj.name]: obj.value });
  };

  const onLinkSend = async () => {
    try {
      // const message = `${form.title} ${form.description}\n\n${url}\n\n${form.postscriptum}`;

      const msgTitle = "Уважаемый клиент!";
      const msgDescription = "Ознакомьтесь с объектами по вашему запросу:";
      const msgPostscriptum = `С уважением, ${agent}.`;

      const message = `${msgTitle} ${msgDescription}\n\n${url}\n\n${msgPostscriptum}`;

      const params =
        Platform.OS === "android"
          ? {
              message: message,
            }
          : {
              message: message,
            };

      const result = await Share.share(params);

      if (result.action === Share.sharedAction) {
        Alert.alert("Готово!", ``, [
          {
            text: "OK",
          },
        ]);
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const loadProduct = async (id) => {
    try {
      const product = await api.get.product.byID(id);

      const address = getProductAddressNew(product);
      const published = getProductPublished(product);

      if (published === "active" && product && address) {
        navigation.push("Page", { name: address, product: product });
        return;
      }

      onMessage("Ошибка", "Объект не найден или его сняли с публикации");
    } catch (error) {
      console.log(error);
      onMessage("Ошибка", "Произошла непредвиденная ошибка");
    }
  };

  const onMessage = (title, msg) => {
    Alert.alert(title, msg, [
      {
        text: "OK",
      },
    ]);
  };

  return (
    <Main>
      <Wrapper>
        <Container>
          <View style={{ marginBottom: 10 }}>
            <RInput
              shadow={false}
              color="grey-light"
              left={
                <Paragraph
                  style={{ fontSize: 14, width: 80 }}
                  numberOfLines={1}
                  color="grey-medium"
                >
                  Заголовок
                </Paragraph>
              }
              name="title"
              value={form.title}
              onChangeText={onInputChange}
            />
          </View>

          <View style={{ marginBottom: 10 }}>
            <RInput
              multiline={true}
              shadow={false}
              color="grey-light"
              left={
                <Paragraph
                  style={{ fontSize: 14, width: 80 }}
                  numberOfLines={1}
                  color="grey-medium"
                >
                  Описание
                </Paragraph>
              }
              name="description"
              value={form.description}
              onChangeText={onInputChange}
            />
          </View>

          <View style={{ marginBottom: 10 }}>
            <RInput
              shadow={false}
              color="grey-light"
              left={
                <Paragraph
                  style={{ fontSize: 14, width: 80 }}
                  numberOfLines={1}
                  color="grey-medium"
                >
                  Поскриптум
                </Paragraph>
              }
              name="postscriptum"
              value={form.postscriptum}
              onChangeText={onInputChange}
            />
          </View>

          <View style={{ marginBottom: 40 }}>
            <Btn
              isDisabled={!form?.title || !form?.description}
              onPress={!form?.title || !form?.description ? null : onLinkSend}
            >
              Отправить ссылку
            </Btn>
          </View>

          <Paragraph
            style={{ fontSize: 13, marginBottom: 7 }}
            color="grey-dark"
          >
            В подборке
          </Paragraph>

          <ScrollView
            style={{ height: 400 }}
            showsVerticalScrollIndicator={false}
            ref={scrollViewRef}
          >
            {isProductsLoading && products.length === 0 && (
              <RProductPreloader
                amount={5}
                style={{ ...productStyle, borderRadius: 20, marginTop: 10 }}
              />
            )}
            {!isProductsLoading && products.length > 0 ? (
              <>
                {products.map((product, index) => {
                  return (
                    <TouchableOpacity
                      key={product.id}
                      onPress={() => {
                        if (product?.product_id) {
                          loadProduct(product.product_id);
                        }
                      }}
                      style={{
                        marginTop: 10,
                        overflow: "hidden",
                      }}
                    >
                      <ProductCollections
                        variant={"mini"}
                        wrapperStyle={productStyle}
                        product={product}
                      />
                    </TouchableOpacity>
                  );
                })}
              </>
            ) : (
              <></>
            )}

            <View style={{ height: 120 }}></View>
          </ScrollView>
        </Container>
      </Wrapper>

      <Footer scrollViewRef={scrollViewRef} navigation={navigation} />
    </Main>
  );
}
