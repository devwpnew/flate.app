import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import Home from "./src/template/home";
import Home from "./src/pages/rHome";

import Page from "./src/pages/rPage";
// import Page from "./src/template/page";

import Category from "./src/pages/rCategory";

import Authorization from "./src/template/user/authorization";
import Login from "./src/template/user/login";
import Profile from "./src/template/user/rProfile";
import Lk from "./src/template/user/lk";

import Items from "./src/template/user/rItems";
// import Favorites from "./src/template/user/favorites";
import Favorites from "./src/template/user/rFavorites";

import Messages from "./src/template/user/messages";
import Help from "./src/template/user/rHelp";
import Settings from "./src/template/user/rSettings";
import Add from "./src/template/user/add";
import Payment from "./src/template/payment";
import Requests from "./src/template/requests";
import Selections from "./src/template/selections";
import Loading from "./src/template/loading";
import EditPage from "./src/template/editPage";
import Search from "./src/template/search";
import Registration from "./src/template/user/registration";
import Select from "./src/template/select";
import SearchPage from "./src/template/searchPage";
import SearchPageHolder from "./src/template/searchPageHolder";
import Contacts from "./src/template/user/contacts";
import Question from "./src/template/user/question";
import Notifications from "./src/template/user/Notifications";
import ScreenHeader from "./src/ui/screen/screenHeader";
import Test from "./src/template/test";
import AddRc from "./src/template/addRc";
import Story from "./src/template/story";
import Adv from "./src/template/adv";
import Map from "./src/template/map";

import * as Linking from "expo-linking";
import ProductPageHolder from "./src/template/productPageHolder";
import SectionPageHolder from "./src/template/sectionPageHolder";
import Collections from "./src/template/user/collections";
import CollectionsPage from "./src/template/user/collectionsPage";
import CollectionsSend from "./src/template/user/collectionsSend";
import Analytics from "./src/template/analytics";

// LinkingConfiguration.js

const searchLinks = {
  SearchUser: "/users/:user",
  SearchRcs: "/rcs/:rc",
};

const categoryProducts = {
  Flats: "posts/flats",
  Houses: "posts/houses",
  Land: "posts/land",
  Commertion: "posts/commertion",
  Parkings: "posts/parkings",
};

const productsLinks = {
  ProductFlats: "posts/flats/:productSlug",
  ProductHouses: "posts/houses/:productSlug",
  ProductLand: "posts/land/:productSlug",
  ProductCommertion: "posts/commertion/:productSlug",
  ProductParkings: "posts/parkings/:productSlug",
};

const url = Linking.createURL("/");

export const linkingObj = {
  prefixes: [url, "https://flate.pro", "flate.pro://"],
  config: {
    // initialRouteName: "Loading",
    screens: {
      ...categoryProducts,
      ...productsLinks,
      ...searchLinks,
    },
  },
};

const Stack = createNativeStackNavigator();

export default function Navigate() {
  function getCategoryTemplates() {
    const template = [];

    for (const categoryName in categoryProducts) {
      template.push(
        <Stack.Screen
          key={categoryName}
          name={categoryName}
          component={SectionPageHolder}
          options={({ route }) => ({
            header: () => (
              <ScreenHeader
                title={route.params.name}
                variant="empty"
                route={route}
              />
            ),
          })}
        />
      );
    }

    return template;
  }

  function getProductTemplates() {
    const template = [];

    for (const productName in productsLinks) {
      template.push(
        <Stack.Screen
          key={productName}
          name={productName}
          component={ProductPageHolder}
          options={({ route }) => ({
            header: () => (
              <ScreenHeader
                title={route.params.name}
                variant="empty"
                route={route}
              />
            ),
          })}
        />
      );
    }

    return template;
  }

  function getSearchTemplates() {
    const template = [];

    for (const searchName in searchLinks) {
      template.push(
        <Stack.Screen
          key={searchName}
          name={searchName}
          component={SearchPageHolder}
          options={({ route }) => ({
            header: () => (
              <ScreenHeader
                title={route.params.name}
                variant="empty"
                route={route}
              />
            ),
          })}
        />
      );
    }

    return template;
  }

  return (
    <NavigationContainer linking={linkingObj}>
      <Stack.Navigator initialRouteName={"Loading"}>
        <Stack.Screen
          name="Loading"
          component={Loading}
          options={({ route }) => ({
            header: () => <ScreenHeader variant="empty" route={route} />,
          })}
        />
        {/* {getCategoryTemplates()} */}
        {getProductTemplates()}
        {getSearchTemplates()}
        <Stack.Screen
          name="Login"
          component={Login}
          options={({ route }) => ({
            header: () => <ScreenHeader variant="empty" route={route} />,
          })}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={({ route }) => ({
            header: () => <ScreenHeader title="Регистрация" route={route} />,
          })}
        />
        <Stack.Screen
          name="User"
          component={Registration}
          options={({ route }) => ({
            header: () => (
              <ScreenHeader title="Редактирование профиля" route={route} />
            ),
          })}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ route }) => ({
            header: () => <ScreenHeader variant="home" route={route} />,
          })}
        />
        <Stack.Screen
          name="Page"
          component={Page}
          options={({ route }) => ({
            header: () => (
              <ScreenHeader
                title={route.params.name}
                variant="page"
                route={route}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={({ route }) => ({
            header: () => (
              <ScreenHeader
                title={route?.params?.title ? route.params.title : "Параметры"}
                route={route}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Category"
          component={Category}
          options={({ route }) => ({
            header: () => (
              <ScreenHeader
                title={route.params.name}
                variant="category"
                route={route}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Map"
          component={Map}
          options={({ route }) => ({
            header: () => <ScreenHeader title={"На карте"} route={route} />,
          })}
        />
        <Stack.Screen
          name="Authorization"
          component={Authorization}
          options={{
            title: "Личный кабинет",
            headerBackTitleVisible: false,
            headerBackTitle: " ",
            headerTintColor: "#1F1F1F",
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={({ route }) => ({
            header: () => (
              <ScreenHeader variant="profile" title="Еще" route={route} />
            ),
          })}
        />
        <Stack.Screen
          name="Lk"
          component={Lk}
          options={({ route }) => ({
            header: () => (
              <ScreenHeader variant="profile" title="Кабинет" route={route} />
            ),
          })}
        />
        <Stack.Screen
          name="Contacts"
          component={Contacts}
          options={({ route }) => ({
            header: () => <ScreenHeader title="Контакты" route={route} />,
          })}
        />
        <Stack.Screen
          name="Items"
          component={Items}
          options={({ route }) => ({
            header: () => <ScreenHeader title="Мои объявления" route={route} />,
          })}
        />
        <Stack.Screen
          name="Favorites"
          component={Favorites}
          options={({ route }) => ({
            header: () => <ScreenHeader title="Избранное" route={route} />,
          })}
        />
        <Stack.Screen
          name="Messages"
          component={Messages}
          options={{
            title: "Сообщения",
            headerBackTitleVisible: false,
            headerBackTitle: " ",
            headerTintColor: "#1F1F1F",
          }}
        />
        <Stack.Screen
          name="Help"
          component={Help}
          options={({ route }) => ({
            header: () => <ScreenHeader title="Помощь" route={route} />,
          })}
        />
        <Stack.Screen
          name="Collections"
          component={Collections}
          options={({ route }) => ({
            header: () => (
              <ScreenHeader
                variant="collections"
                title="Подборки"
                route={route}
              />
            ),
          })}
        />
        <Stack.Screen
          name="CollectionsPage"
          component={CollectionsPage}
          options={({ route }) => ({
            header: () => (
              <ScreenHeader
                variant="collections"
                isPage={true}
                title="Подборки"
                route={route}
              />
            ),
          })}
        />
        <Stack.Screen
          name="CollectionsSend"
          component={CollectionsSend}
          options={({ route }) => ({
            header: () => (
              <ScreenHeader title="Отправляем клиенту" route={route} />
            ),
          })}
        />
        <Stack.Screen
          name="Question"
          component={Question}
          options={({ route }) => ({
            header: () => <ScreenHeader title="Есть идея?" route={route} />,
          })}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={({ route }) => ({
            header: () => (
              <ScreenHeader
                variant="notifications"
                title="Уведомления"
                route={route}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={({ route }) => ({
            header: () => (
              <ScreenHeader title={"Платные услуги"} route={route} />
            ),
          })}
        />
        <Stack.Screen
          name="Requests"
          component={Requests}
          options={{
            title: "Запросы",
            headerBackTitleVisible: false,
            headerBackTitle: " ",
            headerTintColor: "#1F1F1F",
          }}
        />
        <Stack.Screen
          name="Selections"
          component={Selections}
          options={{
            title: "Подборки",
            headerBackTitleVisible: false,
            headerBackTitle: " ",
            headerTintColor: "#1F1F1F",
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={({ route }) => ({
            header: () => (
              <ScreenHeader
                variant="settings"
                title={"Мой профиль"}
                route={route}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Add"
          component={Add}
          options={({ route }) => ({
            header: () => (
              <ScreenHeader title="Размещение объявления" route={route} />
            ),
          })}
        />
        <Stack.Screen
          name="EditPage"
          component={EditPage}
          options={({ route }) => ({
            header: () => (
              <ScreenHeader
                title={`Редактировать ${route.params.pName}`}
                route={route}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Select"
          component={Select}
          options={({ route }) => ({
            header: () => (
              <ScreenHeader title={route.params.title} route={route} />
            ),
          })}
        />
        <Stack.Screen
          name="AddRc"
          component={AddRc}
          options={({ route }) => ({
            header: () => (
              <ScreenHeader title={"Добавить новый ЖК"} route={route} />
            ),
          })}
        />
        <Stack.Screen
          name="Analytics"
          component={Analytics}
          options={({ route }) => ({
            header: () => (
              <ScreenHeader variant="safe-bar" title={"Аналитика по районам"} route={route} />
            ),
          })}
        />
        <Stack.Screen
          name="Test"
          component={Test}
          options={({ route }) => ({
            header: () => <ScreenHeader title={"Test"} route={route} />,
          })}
        />
        <Stack.Screen
          name="STORY"
          component={Story}
          options={({ route }) => ({
            header: () => null,
            presentation: "transparentModal",
          })}
        />
        <Stack.Screen
          name="Adv"
          component={Adv}
          options={({ route }) => ({
            header: () => null,
            presentation: "modal",
          })}
        />
        <Stack.Screen
          name="SearchPage"
          component={SearchPage}
          options={({ route }) => ({
            header: () => (
              <ScreenHeader
                title={route.params.name}
                variant="category"
                route={route}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
