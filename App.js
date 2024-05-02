import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { useEffect, useRef, useState } from "react";
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_500Medium,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
  OpenSans_300Light_Italic,
  OpenSans_400Regular_Italic,
  OpenSans_500Medium_Italic,
  OpenSans_600SemiBold_Italic,
  OpenSans_700Bold_Italic,
  OpenSans_800ExtraBold_Italic,
} from "@expo-google-fonts/open-sans";

import {
  Manrope_200ExtraLight,
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from "@expo-google-fonts/manrope";

import MainStack from "./navigate";

import * as SplashScreen from "expo-splash-screen";
import api from "./api/service/api";

import * as Notifications from "expo-notifications";
import ErrorBoundary from "./helpers/errors/ErrorBoundary";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();

  useEffect(() => {
    (async () => {
      await api.set.pushNotificationToken();

      // console.log(process.env)

      // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      //   setNotification(notification);
      //   console.log(notification)
      // });

      // responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      //   console.log(response);
      // });

      // return () => {
      //   Notifications.removeNotificationSubscription(notificationListener.current);
      //   // Notifications.removeNotificationSubscription(responseListener.current);
      // };
    })();
  }, []);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    // LogBox.ignoreAllLogs();
  }, []);

  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_500Medium,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
    OpenSans_300Light_Italic,
    OpenSans_400Regular_Italic,
    OpenSans_500Medium_Italic,
    OpenSans_600SemiBold_Italic,
    OpenSans_700Bold_Italic,
    OpenSans_800ExtraBold_Italic,
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <MainStack />
      </ErrorBoundary>
    </Provider>
  );
}

// export default function App() {
//   LogBox.ignoreAllLogs();

//   let [fontsLoaded] = useFonts({
//     OpenSans_300Light,
//     OpenSans_400Regular,
//     OpenSans_500Medium,
//     OpenSans_600SemiBold,
//     OpenSans_700Bold,
//     OpenSans_800ExtraBold,
//     OpenSans_300Light_Italic,
//     OpenSans_400Regular_Italic,
//     OpenSans_500Medium_Italic,
//     OpenSans_600SemiBold_Italic,
//     OpenSans_700Bold_Italic,
//     OpenSans_800ExtraBold_Italic,
//   });

//   if (!fontsLoaded) {
//     return <AppLoading />;
//   }

//   return (
//     <Provider store={store}>
//       {!fontsLoaded ? <AppLoading /> : <MainStack />}
//     </Provider>
//   );
// }
