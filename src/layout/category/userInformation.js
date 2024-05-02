import { View } from "react-native";
import { useEffect, useState, useMemo } from "react";

import tw from "../../../lib/tailwind";
import api from "../../../api/service/api";

import PreloaderSpinner from "../../ui/preloader/preloaderSpinner";
import Preloader from "../../ui/preloader/preloader";
import DText from "../../ui/text/dText";
import CallButton from "../page/buttons/callButton";
import UserAvatar from "../profile/userAvatar";

import useProductsCount from "../../../hooks/products/useProductsCount";

import declension from "../../../helpers/formatters/declension";

export default function UserInformation({ userId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async function fetchUser() {
      setIsLoading(true);
      setUser(
        await api.get.user({
          window_host: "https://flate.pro",
          filter: {
            id: userId,
          },
          sort: {
            id: "asc",
          },
          limit: 1,
        })
      );
      setIsLoading(false);
    })();
  }, []);

  const userProductsCount = useProductsCount(
    useMemo(() => {
      return {
        user_id: userId,
        published: "1",
      };
    }, [])
  );

  return (
    <>
      {isLoading ? (
        <View style={tw`flex flex-row justify-center`}>
          <PreloaderSpinner />
        </View>
      ) : (
        <>
          <View style={tw`pb-4 border-b border-greyborder w-full`}>
            <View style={tw`flex flex-row items-center`}>
              <View style={tw`w-[40px] h-[40px] text-lg mr-2.5`}>
                <UserAvatar avatar={user.user_avatar} name={user.user_name} />
              </View>
              <View>
                <DText style={tw`font-bold leading-5`}>{user.user_name}</DText>

                {userProductsCount.isLoading ? (
                  <View style={tw`w-full h-[20px]`}>
                    <Preloader />
                  </View>
                ) : (
                  <>
                    {/* <Link href={`/users/${(user && user.sef_code) || user.id}`}> */}
                    <DText style={tw`text-sm leading-5`}>
                      {userProductsCount?.products?.count &&
                        `${userProductsCount?.products?.count} ${declension(
                          userProductsCount?.products?.count,
                          ["объявление", "объявления", "объявлений"]
                        )}`}
                    </DText>
                    {/* </Link> */}
                  </>
                )}
              </View>
            </View>

            {user?.user_agency && (
              <View style={tw`text-sm mt-5`}>
                <DText style={tw`font-bold`}>Место работы: </DText>
                <DText>{user?.user_agency}</DText>
              </View>
            )}
          </View>

          {user?.user_description && (
            <View style={tw`text-sm mt-4`}>
              <DText style={tw`font-bold`}>О себе: </DText>
              <DText>{user?.user_description}</DText>
            </View>
          )}

          <View style={tw`h-10 w-full mt-4 mb-1.5`}>
            <CallButton phone={user.phone} />
          </View>
        </>
      )}
    </>
  );
}
