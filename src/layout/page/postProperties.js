import API from "../../../api/service/api";
import tw from "../../../lib/tailwind";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Dimensions, View, TouchableOpacity, Linking } from "react-native";

import Svg, { Path } from "react-native-svg";
import DText from "../../ui/text/dText";
import Preloader from "../../ui/preloader/preloader";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default function PostProperties({ product }) {
  const user = useSelector((state) => state.userLogin.value);

  const slug = product?.section_relation[0].slug;

  const [isLoading, setIsLoading] = useState(false);
  const [displayProperties, setDisplayProperties] = useState(false);

  const props = getCurrentDisplayProperties(slug);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (props && props.length > 0) {
        setDisplayProperties(
          await API.get.product.displayProperties(props, product)
        );
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      <View style={tw`my-5 px-[15px]`}>
        <DText style={tw`text-xl font-bold mb-2`}>{title(slug)}</DText>
        {/* <View style={tw`items-center justify-between mb-5 max-w-lg`}>
          {currentDisplayPropertiesMain(product, slug)}
        </View> */}

        <View style={tw`flex flex-col flex-nowrap text-sm leading-6 w-full`}>
          {!isLoading ? (
            <>
              {displayProperties &&
                displayProperties.map((prop) => {
                  if (prop && prop.display_value) {
                    if (!user && prop.code === "comission_sum_terms")
                      return null;
                    return (
                      <View
                        key={prop.code}
                        style={tw`flex flex-row justify-between gap-2 relative `}
                      >
                        <DText style={tw`bg-white text-grey text-base `}>
                          {prop.display_name}:
                        </DText>
                        <Svg
                          style={tw`absolute left-0 bottom-[4px] w-full h-[1px] -z-10`}
                          xmlns="http://www.w3.org/2000/svg"
                          width={"100%"}
                          height={1}
                          viewBox="0 0 600 1"
                          fill="none"
                        >
                          <Path
                            stroke="#DFDFDF"
                            strokeDasharray="4 4"
                            d="M0 0.5L600 0.5"
                          />
                        </Svg>
                        <DText style={tw`bg-white `}>
                          {prop.display_value}
                        </DText>
                      </View>
                    );
                  }
                })}
              {product.cloud_links && (
                <View
                  style={tw`flex flex-row justify-between gap-2 relative overflow-hidden`}
                >
                  <DText style={tw`bg-white text-grey text-base `}>
                    Ссылка на облако
                  </DText>
                  <Svg
                    style={tw`absolute left-0 bottom-[7px] w-full h-[1px] -z-10`}
                    xmlns="http://www.w3.org/2000/svg"
                    width={"100%"}
                    height={1}
                    viewBox="0 0 600 1"
                    fill="none"
                  >
                    <Path
                      stroke="#DFDFDF"
                      strokeDasharray="4 4"
                      d="M0 0.5L600 0.5"
                    />
                  </Svg>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(product.cloud_links)}
                  >
                    <DText style={tw`bg-white  text-underline`}>Перейти</DText>
                  </TouchableOpacity>
                </View>
              )}
              {product.youtube_video_link && (
                <View
                  style={tw`flex flex-row justify-between gap-2 relative overflow-hidden`}
                >
                  <DText style={tw`bg-white text-grey text-base `}>
                    Ссылка на ютуб
                  </DText>
                  <Svg
                    style={tw`absolute left-0 bottom-[7px] w-full h-[1px] -z-10`}
                    xmlns="http://www.w3.org/2000/svg"
                    width={"100%"}
                    height={1}
                    viewBox="0 0 600 1"
                    fill="none"
                  >
                    <Path
                      stroke="#DFDFDF"
                      strokeDasharray="4 4"
                      d="M0 0.5L600 0.5"
                    />
                  </Svg>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(product.youtube_video_link)}
                  >
                    <DText
                      href={product.youtube_video_link}
                      style={tw`bg-white  text-underline`}
                    >
                      Перейти
                    </DText>
                  </TouchableOpacity>
                </View>
              )}
            </>
          ) : (
            [1, 2, 3, 4, 5, 6, 7].map((i) => {
              return (
                <View
                  key={i}
                  style={tw`flex flex-row justify-between gap-2 relative overflow-hidden`}
                >
                  <Preloader style={tw`w-full h-[17px] mb-1`} />
                </View>
              );
            })
          )}
        </View>
      </View>
    </>
  );
}

const title = (slug) => {
  if (slug == "houses") {
    return "О доме";
  }

  if (slug == "flats") {
    return "О квартире";
  }

  if (slug == "place") {
    return "Об участке";
  }

  if (slug == "commertion") {
    return "О коммерции";
  }

  if (slug == "parkings") {
    return "О паркинге";
  }
};

const getCurrentDisplayProperties = (slug) => {
  if (slug == "houses") {
    return [
      { code: "house_types", display_name: "Вид" },
      { code: "house_floors", display_name: "Этажей в доме" },
      { code: "house_construction", display_name: "Конструкция" },
      { code: "house_communication", display_name: "Коммуникации" },
      // { code: "comission", display_name: "Комиссия" },
      { code: "comission_sum_terms", display_name: "Комиссия" },
      { code: "off_comission_value", display_name: "Условия комиссии" },
      { code: "repairment", display_name: "Ремонт" },
      { code: "sum_contract", display_name: "Сумма в договоре" },
      { code: "mortgage", display_name: "Ипотека" },
    ];
  }

  if (slug == "flats") {
    return [
      { code: "status", display_name: "Статус" },
      { code: "handed_over", display_name: "Дом сдан" },
      // { code: "comission", display_name: "Комиссия" },
      { code: "comission_sum_terms", display_name: "Комиссия" },
      { code: "off_comission_value", display_name: "Условия комиссии" },
      { code: "repairment", display_name: "Ремонт" },
      { code: "sum_contract", display_name: "Сумма в договоре" },
      { code: "mortgage", display_name: "Ипотека" },
    ];
  }

  if (slug == "place") {
    return [
      { code: "sum_contract", display_name: "Сумма в договоре" },
      { code: "status_lands", display_name: "Статус" },
      { code: "house_communication", display_name: "Коммуникации" },
      // { code: "comission", display_name: "Комиссия" },
      { code: "comission_sum_terms", display_name: "Комиссия" },
      { code: "off_comission_value", display_name: "Условия комиссии" },
      { code: "repairment", display_name: "Ремонт" },
      { code: "sum_contract", display_name: "Сумма в договоре" },
      { code: "mortgage", display_name: "Ипотека" },
    ];
  }

  if (slug == "commertion") {
    return [
      { code: "commercial_types", display_name: "Вид" },
      // { code: "comission", display_name: "Комиссия" },
      { code: "comission_sum_terms", display_name: "Комиссия" },
      { code: "off_comission_value", display_name: "Условия комиссии" },
      { code: "repairment", display_name: "Ремонт" },
      { code: "sum_contract", display_name: "Сумма в договоре" },
      { code: "mortgage", display_name: "Ипотека" },
    ];
  }

  if (slug == "parkings") {
    return [
      { code: "parking_types", display_name: "Вид" },
      // { code: "comission", display_name: "Комиссия" },
      { code: "comission_sum_terms", display_name: "Комиссия" },
      { code: "off_comission_value", display_name: "Условия комиссии" },
      { code: "repairment", display_name: "Ремонт" },
      { code: "sum_contract", display_name: "Сумма в договоре" },
      { code: "mortgage", display_name: "Ипотека" },
    ];
  }

  if (slug == "land") {
    return [
      { code: "status_lands", display_name: "Статус" },
      // { code: "comission", display_name: "Комиссия" },
      { code: "comission_sum_terms", display_name: "Комиссия" },
      { code: "off_comission_value", display_name: "Условия комиссии" },
      { code: "repairment", display_name: "Ремонт" },
      { code: "sum_contract", display_name: "Сумма в договоре" },
      { code: "mortgage", display_name: "Ипотека" },
    ];
  }
};

const currentDisplayPropertiesMain = (product, slug) => {
  if (slug == "houses") {
    return (
      <>
        {product.living_squares && (
          <View style={tw`flex flex-row justify-between w-full`}>
            <DText style={tw`text-grey text-sm`}>Площадь дома</DText>
            <DText style={tw`text-xl font-bold mb-2`}>
              {product.living_squares} м²
            </DText>
          </View>
        )}

        {product.land_squares && (
          <View style={tw`flex flex-row justify-between w-full`}>
            <DText style={tw`text-grey text-sm`}>Площадь участка</DText>
            <DText style={tw`text-xl font-bold mb-2`}>
              {product.land_squares} соток
            </DText>
          </View>
        )}
      </>
    );
  } else if (slug == "flats") {
    return (
      <>
        {product.living_squares && (
          <View style={tw`flex flex-row justify-between w-full`}>
            <DText style={tw`text-grey text-sm`}>Общая площадь</DText>
            <DText style={tw`text-xl font-bold mb-2`}>
              {product.living_squares} м²
            </DText>
          </View>
        )}

        {product.properties && product.properties.product_floor && (
          <View style={tw`flex flex-row justify-between w-full`}>
            <DText style={tw`text-grey text-sm`}>Этаж</DText>
            <DText style={tw`text-xl font-bold mb-2`}>
              {product.properties.product_floor}
              {product?.flat_floors && ` из ${product.flat_floors}`}
            </DText>
          </View>
        )}

        {product?.product_room_count || product.product_room_count === 0 ? (
          <View style={tw`flex flex-row justify-between w-full`}>
            <DText style={tw`text-grey text-sm`}>Количество комант</DText>
            <DText style={tw`text-xl font-bold mb-2`}>
              {product.product_room_count === 0 ? "1" : ""}
              {product.product_room_count === 1 ? "2" : ""}
              {product.product_room_count === 2 ? "3" : ""}
              {product.product_room_count === 3 ? "4" : ""}
              {product.product_room_count === 4 ? "5" : ""}
              {product.product_room_count === 5 ? "Студия" : ""}
              {product.product_room_count === 6 ? "Свободная планировка" : ""}
            </DText>
          </View>
        ) : (
          ""
        )}
      </>
    );
  } else if (slug == "place") {
    return (
      <>
        {product.land_squares && (
          <View style={tw`flex flex-row justify-between w-full`}>
            <DText style={tw`text-grey text-sm`}>Общая площадь</DText>
            <DText style={tw`text-xl font-bold mb-2`}>
              {product.land_squares} га
            </DText>
          </View>
        )}
      </>
    );
  } else if (slug == "commertion") {
    return (
      <>
        {product.object_squares && (
          <View style={tw`flex flex-row justify-between w-full`}>
            <DText style={tw`text-grey text-sm`}>Общая площадь</DText>
            <DText style={tw`text-xl font-bold mb-2`}>
              {product.object_squares} м²
            </DText>
          </View>
        )}
      </>
    );
  }

  if (slug == "parkings") {
    return (
      <>
        {product.object_squares && (
          <View style={tw`flex flex-row justify-between w-full`}>
            <DText style={tw`text-grey text-sm`}>Общая площадь</DText>
            <DText style={tw`text-xl font-bold mb-2`}>
              {product.object_squares} м²
            </DText>
          </View>
        )}
      </>
    );
  }

  if (slug == "land") {
    return (
      <>
        {product.land_squares && (
          <View style={tw`flex flex-row justify-between w-full`}>
            <DText style={tw`text-grey text-sm`}>Площадь участка</DText>
            <DText style={tw`text-xl font-bold mb-2`}>
              {product.land_squares} соток
            </DText>
          </View>
        )}
      </>
    );
  }
};
