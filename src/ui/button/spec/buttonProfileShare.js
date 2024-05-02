import { Share, Platform } from "react-native";
import { useSelector } from "react-redux";

import Button from "../button";
import tw from "../../../../lib/tailwind";
import Btn from "../btn";
import { Path, Svg } from "react-native-svg";

export default function ButtonProfileShare({
  isDisabled = false,
  icon,
  children,
  ...props
}) {
  const user = useSelector((state) => state.userLogin.value);
  const url = `https://flate.pro/users/${(user && user.sef_code) || user.id}`;

  const params =
    Platform.OS === "android"
      ? {
          message: `Посмотрите все мои предложения:\n\n${url}`,
          title: "Посмотрите все мои предложения",
        }
      : {
          message: `Посмотрите все мои предложения:\n\n${url}`,
        };

  const onShare = async () => {
    if (isDisabled) return;

    try {
      const result = await Share.share(params);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Btn
      isDisabled={isDisabled}
      icon={icon ? icon : <ShareIcon />}
      onPress={onShare}
      {...props}
    >
      {children}
    </Btn>
  );
}

function ShareIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
    >
      <Path
        d="M3.423 10.423a2.423 2.423 0 100-4.846 2.423 2.423 0 000 4.846zM12.577 15a2.423 2.423 0 100-4.846 2.423 2.423 0 000 4.846zM12.577 5.846a2.423 2.423 0 100-4.846 2.423 2.423 0 000 4.846zM5.587 6.923L10.412 4.5M5.587 9.077l4.825 2.423"
        stroke="#1A1F25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
