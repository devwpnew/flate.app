import api from "../../../api/service/api";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { storeSections } from "../../store/app/sections";
import { storeCities } from "../../store/app/cities";
import { setLogedIn } from "../../store/global/user/userLogin";
import { setFavorites } from "../../store/global/user/userFavorites";
import { setCity } from "../../store/global/user/userCity";

import PageLoading from "../../ui/preloader/pageLoading";

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

export default function UserWrapper({ children, onLoaded }) {
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state) => state.userLogin.value);
  const sections = useSelector((state) => state.sections.value);
  const cities = useSelector((state) => state.cities.value);

  const dispatch = useDispatch();

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
      }

      setIsLoading(false);

      if(onLoaded) {
        onLoaded()
      }
    })();
  }, [onLoaded]);

  return isLoading ? <PageLoading /> : children;
}
