import api from "../../api/service/api";

export function userHandler(navigation, user, cb) {
  if (user && Object.keys(user).length > 0) {
    if (cb) {
      cb();
    }
  } else {
    navigation.navigate("Login");
  }
}

export async function userModerationHandler(id) {
  try {
    const userResult = await api.get.user({
      sort: {
        id: "asc",
      },
      filter: {
        id: id,
      },
      window_host: "https://flate.pro",
    });

    if (userResult[0]) {
      const userGroup = userResult[0]?.user_group?.id;

      if (userGroup === 6) {
        return false;
      } else {
        return userResult[0];
      }
    }
  } catch (e) {
    console.log(e);
  }
};
