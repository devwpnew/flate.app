import api from "../../../api/service/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { setLogedIn } from "../../store/global/user/userLogin";
import { useDispatch, useSelector } from "react-redux";
import { View, TouchableOpacity } from "react-native";
import Svg, { Path, G, ClipPath, Defs } from "react-native-svg";
import tw from "../../../lib/tailwind";

import DText from "../../ui/text/dText";
import DModal from "../../ui/modal/dModal";
import H2 from "../../ui/heading/h2";
import Button from "../../ui/button/button";
import { setFavorites } from "../../store/global/user/userFavorites";

export default function UserActions({ navigation }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userLogin.value);

  const [isShowDeleteDialog, setIsShowDeleteDialog] = useState(false);
  const [isShowExitDialog, setIsShowExitDialog] = useState(false);

  const exitAccount = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      navigation.navigate("Login", {
        disallowBack: true,
      });
      dispatch(setLogedIn({}));
      dispatch(setFavorites([]));
      setIsShowExitDialog(false);
    } catch (e) {
      // console.log(e);
    }
  };

  const deleteAccount = async () => {
    try {
      await AsyncStorage.removeItem("userToken");

      const res = await api.remove.user({ id: user.id });

      if (res) {
        dispatch(setLogedIn({}));
        dispatch(setFavorites([]));
        navigation.navigate("Home");
        setIsShowDeleteDialog(false);
      }
    } catch (e) {
      // console.log(e);
      setIsShowDeleteDialog(false);
    }
  };

  return (
    <>
      <View style={tw`flex flex-col w-full`}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Items")}
          navigation={navigation}
          screen={"Items"}
          style={tw`flex flex-row items-center justify-between p-1 rounded text-grey mb-2.5 w-full`}
        >
          <View style={tw`flex flex-row items-center w-full`}>
            <Svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M2.29165 3.66699H0.458348C0.205004 3.66699 0 3.872 0 4.12534V5.95869C0 6.21203 0.205004 6.41703 0.458348 6.41703H2.2917C2.54504 6.41703 2.75004 6.21203 2.75004 5.95869V4.12534C2.75 3.872 2.545 3.66699 2.29165 3.66699Z"
                fill="#A0A0A0"
              />
              <Path
                d="M2.29165 9.625H0.458348C0.205004 9.625 0 9.83 0 10.0833V11.9167C0 12.17 0.205004 12.375 0.458348 12.375H2.2917C2.545 12.375 2.75 12.17 2.75 11.9167V10.0833C2.75 9.83 2.545 9.625 2.29165 9.625Z"
                fill="#A0A0A0"
              />
              <Path
                d="M2.29165 15.584H0.458348C0.205004 15.584 0 15.789 0 16.0423V17.8756C0 18.129 0.205004 18.334 0.458348 18.334H2.2917C2.545 18.334 2.75 18.129 2.75 17.8756V16.0423C2.75 15.789 2.545 15.584 2.29165 15.584Z"
                fill="#A0A0A0"
              />
              <Path
                d="M21.5413 4.58398H5.04136C4.78801 4.58398 4.58301 4.78899 4.58301 5.04233V5.95898C4.58301 6.21233 4.78801 6.41733 5.04136 6.41733H21.5413C21.7947 6.41733 21.9997 6.21233 21.9997 5.95898V5.04233C21.9997 4.78899 21.7947 4.58398 21.5413 4.58398Z"
                fill="#A0A0A0"
              />
              <Path
                d="M21.5413 10.084H5.04136C4.78801 10.084 4.58301 10.289 4.58301 10.5423V11.459C4.58301 11.7123 4.78801 11.9173 5.04136 11.9173H21.5413C21.7947 11.9173 21.9997 11.7123 21.9997 11.459V10.5423C21.9997 10.289 21.7947 10.084 21.5413 10.084Z"
                fill="#A0A0A0"
              />
              <Path
                d="M21.5413 15.584H5.04136C4.78801 15.584 4.58301 15.789 4.58301 16.0423V16.959C4.58301 17.2123 4.78801 17.4173 5.04136 17.4173H21.5413C21.7947 17.4173 21.9997 17.2123 21.9997 16.959V16.0423C21.9997 15.789 21.7947 15.584 21.5413 15.584Z"
                fill="#A0A0A0"
              />
            </Svg>
            <DText style={tw`ml-2.5 text-sm`}>Мои объявления</DText>
          </View>

          <ArrowRightIcon />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Favorites")}
          screen={"Favorites"}
          style={tw`flex flex-row items-center justify-between p-1 rounded text-grey mb-2.5 w-full`}
        >
          <View style={tw`flex flex-row items-center w-full`}>
            <Svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M14.425 0.200195C17.4487 0.200195 19.9001 2.7222 19.9001 5.8322C19.9001 10.9727 9.99985 17.8002 9.99985 17.8002C9.99985 17.8002 0.100098 11.2188 0.100098 5.83215C0.100098 1.96009 2.55158 0.200195 5.57463 0.200195C7.39563 0.200195 9.00418 1.11892 9.99985 2.52556C10.9957 1.11892 12.6045 0.200195 14.425 0.200195Z"
                fill="#A0A0A0"
              />
            </Svg>

            <DText style={tw`ml-2.5 text-sm`}>Избранное</DText>
          </View>

          <ArrowRightIcon />
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={() => navigation.navigate("Messages")}
          navigation={navigation}
          screen={"Messages"}
          style={tw`flex flex-row items-center justify-between p-1 rounded text-grey mb-2.5 w-full`}
        >
          <View style={tw`flex flex-row items-center w-full`}>
            <View style={tw`flex items-center justify-center w-5 h-5 relative`}>
              <Svg
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M10.0001 0C4.62536 0 0.100098 3.58892 0.100098 8.20431C0.100098 10.7668 1.52098 13.1452 3.93925 14.6941L2.3537 16.545C1.94339 17.024 2.41132 17.7451 3.03866 17.5744L7.95973 16.2342C14.0457 17.2892 19.9001 13.4785 19.9001 8.20435C19.9001 3.58979 15.3758 0 10.0001 0Z"
                  fill="#A0A0A0"
                />
              </Svg>
            </View>

            <DText style={tw`ml-2.5 text-sm`}>Сообщения</DText>
          </View>

          <ArrowRightIcon />
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={() => navigation.navigate("Help")}
          navigation={navigation}
          screen={"Help"}
          style={tw`flex flex-row items-center justify-between p-1 rounded text-grey mb-2.5 w-full`}
        >
          <View style={tw`flex flex-row items-center w-full`}>
            <Svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M11 0C4.93436 0 0 4.93436 0 11C0 17.0656 4.93436 22 11 22C17.0656 22 22 17.0656 22 11C22 4.93436 17.0656 0 11 0ZM11 17.4166C10.4939 17.4166 10.0834 17.0061 10.0834 16.5C10.0834 15.9939 10.4939 15.5834 11 15.5834C11.5061 15.5834 11.9166 15.9939 11.9166 16.5C11.9166 17.0061 11.5061 17.4166 11 17.4166ZM12.451 11.5885C12.1266 11.7379 11.9166 12.0652 11.9166 12.4218V12.8334C11.9166 13.3393 11.5069 13.75 11 13.75C10.4931 13.75 10.0834 13.3393 10.0834 12.8334V12.4218C10.0834 11.352 10.7121 10.3712 11.683 9.92293C12.617 9.49307 13.2916 8.35172 13.2916 7.79161C13.2916 6.52856 12.2641 5.5 11 5.5C9.73595 5.5 8.70839 6.52856 8.70839 7.79161C8.70839 8.29767 8.29851 8.70839 7.79161 8.70839C7.28471 8.70839 6.875 8.29767 6.875 7.79161C6.875 5.51746 8.72568 3.66661 11 3.66661C13.2743 3.66661 15.125 5.51746 15.125 7.79161C15.125 9.03015 14.0506 10.8506 12.451 11.5885Z"
                fill="#A0A0A0"
              />
            </Svg>

            <DText style={tw`ml-2.5 text-sm`}>Помощь</DText>
          </View>

          <ArrowRightIcon />
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={() => navigation.navigate("Payment")}
          navigation={navigation}
          screen={"Payment"}
          style={tw`flex flex-row items-center justify-between p-1 rounded text-grey mb-2.5 w-full`}
        >
          <View style={tw`flex flex-row items-center w-full`}>
            <Svg
              width="20"
              height="17"
              viewBox="0 0 20 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.3385 3.18976L13.619 0.167508C14.7197 -0.12743 15.8506 0.525697 16.1449 1.6257L16.5636 3.1877H17.5625C18.7017 3.1877 19.625 4.11101 19.625 5.2502V7.3127H13.4375C13.0731 7.3127 12.7232 7.45776 12.4654 7.71557C12.2076 7.97338 12.0625 8.32332 12.0625 8.6877V10.7502C12.0625 11.1146 12.2076 11.4645 12.4654 11.7223C12.7232 11.9801 13.0731 12.1252 13.4375 12.1252H19.625V14.1877C19.625 15.3269 18.7017 16.2502 17.5625 16.2502C14.2329 16.2502 5.76706 16.2502 2.4375 16.2502C1.29831 16.2502 0.375 15.3269 0.375 14.1877C0.375 11.9389 0.375 7.49901 0.375 5.2502C0.375 4.1447 1.24537 3.24201 2.3385 3.18976ZM19.625 8.6877V10.7502H13.4375V8.6877H19.625ZM15.1404 3.1877L14.8173 1.98183C14.719 1.6147 14.3416 1.39745 13.9751 1.49576L7.65975 3.1877H15.1404Z"
                fill="#A0A0A0"
              />
            </Svg>

            <DText style={tw`ml-2.5 text-sm`}>Платные услуги</DText>
          </View>

          <ArrowRightIcon />
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          onPress={() => navigation.navigate("Selections")}
          navigation={navigation}
          screen={"Selections"}
          style={tw`flex flex-row items-center justify-between p-1 rounded text-grey mb-2.5 w-full`}
        >
          <View style={tw`flex flex-row items-center w-full`}>
            <Svg
              width={19}
              height={19}
              viewBox="0 0 19 19"
              xmlns="http://www.w3.org/2000/svg"
              fill={"#A0A3A9"}
            >
              <G clipPath="url(#clip0_3737_5189)">
                <Path d="M14.284 6.403h-2.751a.93.93 0 01-.887-.644l-.85-2.617a.311.311 0 00-.591 0l-.85 2.617a.93.93 0 01-.888.644H4.716a.311.311 0 00-.183.563l2.226 1.617a.93.93 0 01.339 1.043l-.85 2.616a.31.31 0 00.478.348l2.225-1.616a.93.93 0 011.097 0l2.226 1.616a.311.311 0 00.478-.348l-.85-2.616a.93.93 0 01.34-1.042l2.225-1.617a.31.31 0 00-.183-.564z" />
                <Path d="M19 2.544A2.378 2.378 0 0016.625.17H2.375A2.378 2.378 0 000 2.544v10.858a2.378 2.378 0 002.375 2.375h1.357a.34.34 0 01.315.465L3.012 18.83l6.342-3.02a.34.34 0 01.146-.033h7.125A2.378 2.378 0 0019 13.402V2.544zM15.32 7.44l-2.43 1.765a.34.34 0 00-.123.379l.928 2.856c.141.419-.01.881-.37 1.138a1.003 1.003 0 01-1.196 0l-2.43-1.765a.34.34 0 00-.398 0l-2.43 1.765a1.018 1.018 0 01-1.566-1.138l.928-2.856a.34.34 0 00-.124-.38L3.681 7.44a1.018 1.018 0 01.598-1.841h3.002a.34.34 0 00.323-.234l.928-2.856a1.018 1.018 0 011.936 0l.928 2.856a.34.34 0 00.323.234h3.002a1.018 1.018 0 01.598 1.841z" />
              </G>
              <Defs>
                <ClipPath id="clip0_3737_5189">
                  <Path fill="#fff" d="M0 0H19V19H0z" />
                </ClipPath>
              </Defs>
            </Svg>

            <DText style={tw`ml-2.5 text-sm`}>Подборки</DText>
          </View>

          <ArrowRightIcon />
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={() => navigation.navigate("Settings")}
          navigation={navigation}
          screen={"Settings"}
          style={tw`flex flex-row items-center justify-between p-1 rounded text-grey mb-2.5 w-full`}
        >
          <View style={tw`flex flex-row items-center w-full`}>
            <Svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M21.3411 13.4108L19.3189 11.8296C19.3446 11.5858 19.3666 11.3007 19.3666 10.9991C19.3666 10.6975 19.3455 10.4124 19.3189 10.1686L21.3429 8.58645C21.7188 8.28944 21.8214 7.76235 21.5822 7.32329L19.4793 3.685C19.2547 3.27435 18.7625 3.0635 18.2629 3.24775L15.8768 4.20565C15.4194 3.87565 14.94 3.597 14.4441 3.37425L14.0811 0.843348C14.0215 0.363 13.6035 0 13.1094 0H8.89276C8.39866 0 7.9816 0.363 7.92291 0.836L7.559 3.3761C7.07866 3.59245 6.6066 3.86745 6.129 4.2075L3.7365 3.24685C3.28821 3.0736 2.75196 3.2679 2.52921 3.67675L0.423656 7.3196C0.175254 7.73945 0.277906 8.28485 0.662004 8.5892L2.68416 10.1704C2.65206 10.4793 2.6365 10.7479 2.6365 11C2.6365 11.2521 2.6521 11.5207 2.68416 11.8305L0.660156 13.4127C0.284309 13.7106 0.182559 14.2377 0.421809 14.6758L2.52466 18.3141C2.74925 18.7238 3.23691 18.9365 3.74106 18.7513L6.12716 17.7934C6.58366 18.1225 7.06306 18.4012 7.559 18.6248L7.922 21.1548C7.98156 21.637 8.39866 22 8.89366 22H13.1103C13.6044 22 14.0224 21.637 14.0811 21.164L14.445 18.6248C14.9253 18.4076 15.3965 18.1335 15.875 17.7925L18.2675 18.7532C18.383 18.7981 18.5031 18.821 18.6268 18.821C18.9825 18.821 19.3097 18.6267 19.4747 18.3242L21.5867 14.6667C21.8214 14.2377 21.7187 13.7106 21.3411 13.4108ZM11.0011 14.6667C8.97891 14.6667 7.33441 13.0222 7.33441 11C7.33441 8.97785 8.97891 7.33335 11.0011 7.33335C13.0232 7.33335 14.6677 8.97785 14.6677 11C14.6677 13.0222 13.0232 14.6667 11.0011 14.6667Z"
                fill="#A0A0A0"
              />
            </Svg>

            <DText style={tw`ml-2.5 text-sm`}>Настройки</DText>
          </View>

          <ArrowRightIcon />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => setIsShowExitDialog(true)}
        style={tw`flex flex-row items-center py-4 border-t border-b border-greyborder`}
      >
        <View style={tw`flex flex-row items-center w-full`}>
          <Svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M8.25014 11.9165C8.75703 11.9165 9.16674 12.3272 9.16674 12.8331V16.4998C9.16674 17.0049 9.57746 17.4164 10.0835 17.4164H12.8335V3.66658C12.8335 2.88375 13.3321 2.18434 14.0819 1.92401L14.3533 1.8332H10.0835C9.57746 1.8332 9.16674 2.24476 9.16674 2.74997V5.49995C9.16674 6.00583 8.75703 6.41655 8.25014 6.41655C7.74325 6.41655 7.33354 6.00583 7.33354 5.49995V2.74997C7.33354 1.23383 8.56737 0 10.0835 0H19.9375C19.9724 0 20.0016 0.0156096 20.0355 0.0201414C20.0797 0.0164488 20.1218 0 20.1666 0C21.1777 0 22 0.822105 22 1.8332V18.333C22 19.1159 21.5013 19.8153 20.7516 20.0756L15.235 21.9145C15.048 21.9723 14.8621 21.9998 14.6667 21.9998C13.6556 21.9998 12.8335 21.1775 12.8335 20.1664V19.2498H10.0835C8.56737 19.2498 7.33354 18.016 7.33354 16.4998V12.8331C7.33354 12.3272 7.74325 11.9165 8.25014 11.9165Z"
              fill="#A0A0A0"
            />
            <Path
              d="M0.268763 8.51841L3.9355 4.85184C4.19751 4.58966 4.59178 4.51078 4.93452 4.65277C5.27642 4.79494 5.50015 5.12945 5.50015 5.49989V8.24986H9.16673C9.67278 8.24986 10.0835 8.66041 10.0835 9.16646C10.0835 9.67252 9.67278 10.0831 9.16673 10.0831H5.50015V12.833C5.50015 13.2035 5.27642 13.538 4.93452 13.6802C4.59178 13.8221 4.19751 13.7433 3.9355 13.4813L0.268763 9.81451C-0.0895863 9.45616 -0.0895863 8.87676 0.268763 8.51841Z"
              fill="#A0A0A0"
            />
          </Svg>
          <DText style={tw`ml-2.5 text-sm`}>Выйти</DText>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setIsShowDeleteDialog(true)}
        style={tw`flex flex-row items-center py-4 border-t border-b border-greyborder mt-5`}
      >
        <View style={tw`flex flex-row items-center w-full`}>
          <Svg
            width={22}
            height={22}
            viewBox="0 0 67 68"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M33.438 2.246c-9.22 0-16.72 7.5-16.72 16.719 0 9.218 7.5 16.719 16.72 16.719 9.218 0 16.718-7.5 16.718-16.72 0-9.218-7.5-16.718-16.718-16.718zm0 29.258c-6.915 0-12.54-5.625-12.54-12.54 0-6.914 5.625-12.538 12.54-12.538 6.914 0 12.539 5.624 12.539 12.539 0 6.914-5.625 12.539-12.54 12.539zM44.075 37.837a2.073 2.073 0 00-1.693.02 21.096 21.096 0 01-17.889 0 2.073 2.073 0 00-1.692-.02A27.15 27.15 0 006.27 62.852c0 1.149.94 2.09 2.09 2.09H43.5a2 2 0 002-2v-.18a2 2 0 00-2-2H10.533c.752-8.088 5.684-15.215 13.082-18.705a25.42 25.42 0 0019.645 0 22.917 22.917 0 016.777 4.874c.824.86 2.206.955 3.055.12l.107-.104c.737-.724.807-1.896.102-2.65a27.184 27.184 0 00-9.227-6.46z"
              fill="#A0A0A0"
            />
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M48.586 51.586a2 2 0 012.828 0l12 12a2 2 0 11-2.828 2.828l-12-12a2 2 0 010-2.828z"
              fill="#F23C34"
            />
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M63.414 51.586a2 2 0 010 2.828l-12 12a2 2 0 11-2.828-2.828l12-12a2 2 0 012.828 0z"
              fill="#F23C34"
            />
          </Svg>
          <DText style={tw`ml-2.5 text-sm text-grey`}>Удалить аккаунт</DText>
        </View>
      </TouchableOpacity>

      {/* <View style={tw`mb-8 mt-[20px] text-sm`}>
        <DText style={tw`text-grey`}>
          © 2011—2022 Название.ру — сделано в России. Жильё с гарантией.
        </DText>
      </View>
      <View style={tw`mb-8 text-sm`}>
        <DText style={tw`text-grey text-underline mb-1`}>
          Пользовательское соглашение
        </DText>
        <DText style={tw`text-grey text-underline mb-1`}>Правила пользования</DText>
        <DText style={tw`text-grey`}>
          Оплачивая услуги на сайте, вы принимаете{" "}
          <DText style={tw`text-grey`}>оферту</DText>
        </DText>
      </View>
      <View style={tw`mb-8 text-sm flex flex-col`}>
        <DText style={tw`mb-1`}>Реклама на сайте</DText>
        <DText>Помощь </DText>
      </View> */}

      <DModal
        modalVisible={isShowExitDialog}
        setModalVisible={setIsShowExitDialog}
      >
        <TouchableOpacity>
          <H2 style={tw`mb-5`}>Внимание!</H2>
        </TouchableOpacity>

        <View style={tw`mb-5`}>
          <DText style={tw`text-lg text-center`}>
            Вы дейтвительно хотите выйти?
          </DText>
        </View>

        <View style={tw`flex flex-row gap-2.5 items-center`}>
          <Button
            style={{ height: 40, width: 60 }}
            onPress={() => setIsShowExitDialog(false)}
          >
            Нет
          </Button>
          <Button style={{ height: 40, width: 60 }} onPress={exitAccount}>
            Да
          </Button>
        </View>
      </DModal>
      <DModal
        modalVisible={isShowDeleteDialog}
        setModalVisible={setIsShowDeleteDialog}
      >
        <TouchableOpacity>
          <H2 style={tw`mb-5`}>Внимание!</H2>
        </TouchableOpacity>

        <View style={tw`mb-5`}>
          <DText style={tw`text-lg text-center`}>
            Вы уверены, что хотите удалить свой профиль? Это действие нельзя
            будет отменить
          </DText>
        </View>

        <View style={tw`flex flex-row gap-2.5 items-center`}>
          <Button
            style={{ height: 40, width: 60 }}
            onPress={() => setIsShowDeleteDialog(false)}
          >
            Нет
          </Button>
          <Button style={{ height: 40, width: 60 }} onPress={deleteAccount}>
            Да
          </Button>
        </View>
      </DModal>
    </>
  );
}

function ArrowRightIcon() {
  return (
    <Svg
      width="5"
      height="7"
      viewBox="0 0 5 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.35993 3.16392C4.54669 3.34953 4.54669 3.65047 4.35993 3.83608L1.31641 6.86079C1.12965 7.0464 0.826839 7.0464 0.640074 6.86079C0.453309 6.67518 0.453309 6.37424 0.640074 6.18863L3.06527 3.77842L3.06527 3.22158L0.640073 0.811367C0.453308 0.625756 0.453308 0.32482 0.640073 0.139209C0.826839 -0.0464026 1.12964 -0.0464026 1.31641 0.139209L4.35993 3.16392Z"
        fill="#666666"
      />
    </Svg>
  );
}
