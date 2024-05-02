import api from "../../api/service/api";
import * as Linking from "expo-linking";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogedIn } from "../../src/store/global/user/userLogin";
import { Image, View } from "react-native";
import Main from "../layout/main/main";
import tw from "../../lib/tailwind";
import PreloaderSpinner from "../ui/preloader/preloaderSpinner";
import { setCity } from "../store/global/user/userCity";
import { storeCities } from "../store/app/cities";
import { storeSections } from "../store/app/sections";

const staticSochi = {
  in_name: "Сочи",
  name: "Сочи",
  id: 5,
};

const query = {
  sort: {
    id: "asc",
  },
  filter: {
    active: true,
  },
  window_host: "https://flate.pro",
};

import { handleDeepLink } from "../ui/linkhandlers";
import { colors } from "../ui/config";
import { setFavorites } from "../store/global/user/userFavorites";

export default function Loading({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state) => state.userLogin.value);
  const sections = useSelector((state) => state.sections.value);
  const cities = useSelector((state) => state.cities.value);

  const url = Linking.useURL();

  const dispatch = useDispatch();

  const handleUserRegistration = (user) => {
    if (!user.user_name || !user.professional_confirmation) {
      navigation.replace("Registration");
    }
  };

  const setRootCities = (cities) => {
    if (cities) {
      dispatch(storeCities(cities));
    }
  };

  const setRootSections = (sections) => {
    if (sections) {
      dispatch(storeSections(sections));
    }
  };

  const setRootUser = (user) => {
    if (user && Object.keys(user).length > 0) {
      dispatch(setLogedIn(user));
    }
  };

  const setRootUserFavorites = (user) => {
    if (user?.favorites) {
      const list = user.favorites.map((p) => {
        {
          return { id: p.id };
        }
      });
      dispatch(setFavorites(list));
    } else {
      dispatch(setFavorites([]));
    }
  };

  const setRootUserCity = (cities, user) => {
    const fallbackCity = cities[0] ? cities[0] : staticSochi;

    const city = user?.default_city ? user.default_city : fallbackCity;

    dispatch(setCity(city));
  };

  useEffect(() => {
    (async function fetchUser() {
      setIsLoading(true);

      const userAuth = await api.auth.isUserAuthorized();
      const arSections = await api.get.sections(query);
      const arCities = await api.get.cities(query);

      setRootCities(arCities);
      setRootSections(arSections);

      if (userAuth && Object.keys(userAuth).length > 0) {
        // FILL STORE
        setRootUser(userAuth);
        setRootUserCity(arCities, userAuth);
        setRootUserFavorites(userAuth);

        // REDIRECT TO REGISTRATION
        handleUserRegistration(userAuth);
      }

      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (isLoading === true) return;

    if (url) {
      const { hostname, path, queryParams } = Linking.parse(url);

      navigation.replace("Home");
      if (path) {
        const pathParts = path.split("/");
        handleDeepLink(pathParts, navigation);
      }
    } else {
      navigation.replace("Home");
    }
  }, [isLoading, url]);

  return (
    <View style={{ backgroundColor: colors["white"] }}>
      <View style={tw`h-full flex flex-col justify-center items-center`}>
        {/* <PreloaderSpinner /> */}

        <Image
          width={110}
          height={110}
          style={{ width: 110, height: 110 }}
          source={require("../../assets/loader.gif")}
        />
      </View>
    </View>
  );
}
