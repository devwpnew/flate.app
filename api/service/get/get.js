import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { dateDiffInDays } from "helpers/dateFunctions";

import API from "../api";
import PRODUCT from "./product";
import api from "../api";
import { dateDiffInDays } from "../../../helpers/dateFunctions";
import { Platform } from "react-native";

let domen = "https://flate.pro";
// let domen = "http://45.128.207.181:3000"

const userSelectFieldsList = ['id', 'user_name', 'phone', 'email', 'user_group', 'date_registered', 'date_paid_to', 'paid', 'user_description', 'user_last_name', 'favorites', 'email_confirmed', 'phone_confirmed', 'email_confirmation', 'user_avatar', 'user_agency', 'default_city', 'professional_confirmation', 'sef_code', 'additional_phones', 'product_count', 'last_login_date', 'paid', 'date_paid', 'date_paid_to', 'date_notifications_read'];

let GET = {};
export default GET = {
  data: async function getData(fields) {
    try {
      const res = await axios({
        method: "POST",
        url: `${domen}/api/admin_api/getList`,
        data: fields,
      });

      if (res.data.error) {
        return { error: res.data.error };
      }
      const data = res.data;

      return data;
    } catch (error) {
      return error;
    }
  },

  activeCity: async function getActiveCity() {
    const fromStorage = await AsyncStorage.getItem("city");
    if (fromStorage) {
      const cookieCity = await API.get.cities({
        filter: { id: fromStorage },
        limit: 1,
      });
      return cookieCity;
    } else {
      const firstCity = await API.get.cities({
        sort: { id: "asc" },
        limit: 1,
      });
      return firstCity;
    }
  },

  fieldInfo: async function getFieldInfo(table, fieldCode) {
    if (!table) {
      return { error: "Таблица обязательна" };
    }
    if (!fieldCode) {
      return { error: "Код поля обязателен" };
    }

    const fields = {
      table: table,
      fieldCode: fieldCode,
    };

    const res = await axios.post(`${domen}/api/admin_api/getColumn`, fields);

    const data = res.data;
    return data;
  },

  fieldPrintableValue: async function getFieldPrintableValue(
    table,
    fieldCode,
    itemValue
  ) {
    const fieldInfo = await API.get.fieldInfo(table, fieldCode);
    if (!fieldInfo) {
      return {
        error: `Поле ${fieldCode} не найдено в таблице ${table}`,
        Method: "get.fieldPrintableValue",
      };
    }
    if (typeof itemValue != "undefined") {
      if (
        fieldInfo.descObj.field_type == "select" ||
        fieldInfo.descObj.field_type == "multiple-select"
      ) {
        if (Array.isArray(itemValue)) {
          const formattedValues = itemValue.map((val) => {
            return fieldInfo.descObj.result_options[val];
          });
          return formattedValues.join(", ");
        } else {
          return fieldInfo.descObj.result_options[itemValue];
        }
      } else if (itemValue) {
        return itemValue;
      }
    } else {
      return null;
    }
  },

  rowsCount: async function getRowsCount(fields) {
    try {
      fields.limit = "all";

      const res = await axios.post(`${domen}/api/admin_api/getCount`, fields);

      if (res.data.error) {
        return { error: res.data.error, Method: "get.rowsCount" };
      }
      const data = res.data;

      return data;
    } catch (error) {
      // console.log(error);
    }
  },

  sectionsSort: function getSectionsSort(sections) {
    let sectionsResult = [];
    let sectionsLevel2 = [];
    let sectionsLevel3 = [];

    sections.map((section) => {
      if (section.parent_category) {
        if (section.parent_category.parent_category) {
          sectionsLevel3.push(section);
        } else {
          sectionsLevel2.push(section);
        }
      } else {
        sectionsResult.push(section);
      }
    });

    sectionsLevel2.map((sectionLevel2) => {
      sectionsResult.map((sectionLevel1) => {
        if (sectionLevel1.id == sectionLevel2.parent_category.id) {
          if (!sectionLevel1.children) {
            sectionLevel1.children = [];
          }
          sectionLevel1.children.push(sectionLevel2);
        }
      });
    });

    sectionsLevel3.map((sectionLevel3) => {
      sectionsResult.map((sectionLevel1) => {
        if (sectionLevel1.children) {
          sectionLevel1.children.map((sectionLevel2) => {
            if (
              sectionLevel2.id == sectionLevel3.parent_category.id &&
              sectionLevel1.id == sectionLevel3.parent_category.parent_category
            ) {
              if (!sectionLevel2.children) {
                sectionLevel2.children = [];
              }
              sectionLevel2.children.push(sectionLevel3);
            }
          });
        }
      });
    });

    return sectionsResult;
  },

  sections: async function getSections(fields) {
    const sectionsFields = {
      table: "sections",
      ...fields,
    };

    if (sectionsFields.select) {
      if (!sectionsFields.select.indexOf("parent_category") === -1) {
        sectionsFields.select.push("parent_category");
      }
    }
    const data = await API.get.data(sectionsFields);

    if (data) {
      if (Array.isArray(data)) {
        const sectionsResult = API.get.sectionsSort(data);
        return sectionsResult;
      } else {
        return data;
      }
    }
  },

  itemPropertyInfo: async function getItemPropertyInfo(table, propertyCode) {
    const propertyInfoFields = {
      table: "properties",
      filter: {
        prop_table: table,
        slug: propertyCode,
      },
      limit: 1,
    };
    const arProp = await API.get.data(propertyInfoFields);
    return arProp;
  },

  itemProperties: async function getItemProperties(table, item) {
    if (!table) {
      return { error: "Таблица обязательна", Method: "get.itemProperties" };
    }
    if (!item) {
      return { error: "Товар обязателен", Method: "get.itemProperties" };
    }

    let propsFields = {
      table: "property_values",
      filter: {
        prop_value_table: table,
        prop_value_element: typeof item == "object" ? item.id : item,
      },
    };

    const arProps = await API.get.data(propsFields);
    return arProps;
  },

  itemPropertyValue: async function getItemPropertyValues(
    table,
    item,
    propertyCode,
    limit
  ) {
    const element = typeof item == "object" ? item.id : item;
    if (!element) {
      return { error: "Элемент обязателен", Method: "itemPropertyValue" };
    }
    let propsFields = {
      table: "property_values",
      filter: {
        prop_value_table: table,
        prop_value_element: element,
        prop_code: propertyCode,
      },
    };

    if (typeof limit != "undefined") {
      propsFields = { ...propsFields, limit: limit };
    }

    return await API.get.data(propsFields);
  },

  propertyPrintableValue: async function getPropertyPrintableValue(
    table,
    item,
    propertyCode
  ) {
    let value = null;
    if (item.properties && item.properties[propertyCode]) {
      value = item.properties[propertyCode];
    } else if (item) {
      value = await API.get.itemPropertyValue(table, item, propertyCode);
    } else {
      return {
        error: "Значение или элемент обязательны",
        Method: "get.propertyPrintableValue",
      };
    }

    if (Array.isArray(value)) {
      return value.prop_value;
    } else {
      return value;
    }
  },

  expiryDaysByDate: function getExpiryDaysByDate(date) {
    const diffDays = dateDiffInDays(date);
    return diffDays;
  },

  news: async function getNews(fields) {
    const newsFields = {
      table: "news",
      ...fields,
    };

    const data = await API.get.data(newsFields);

    if (data) {
      return data;
    }
  },

  buildings: async function getBuildings(fields) {
    const buildingFields = {
      table: "buildings",
      ...fields,
    };

    const data = await API.get.data(buildingFields);

    if (data) {
      return data;
    }
  },

  cities: async function geCities(fields) {
    const citiesFields = {
      table: "cities",
      ...fields,
    };

    const data = await API.get.data(citiesFields);

    if (data) {
      return data;
    }
  },

  areasList: async function getAreasSortedList(city) {
    const getAreasFields = {
      sort: {
        sort: "asc",
      },
      filter: {
        link_city: typeof city == "object" ? city.id : city,
      },
      limit: "all",
    };

    const getAreas = await api.get.areas(getAreasFields);
    const arRes = [];
    const stashArray = [];
    if (getAreas && Array.isArray(getAreas)) {
      getAreas.forEach((area) => {
        area.value = area.id;

        if (area.parent_area) {
          stashArray.push(area);
        } else {
          arRes.push(area);
        }
      });
    }
    stashArray.forEach((stashed) => {
      stashed.value = stashed.id;
      
      const search = arRes.find(
        (arResArea, index) => arResArea.id === stashed.parent_area.id
      );
      if (search) {
        if (!search.children) {
          search.children = [];
        }
        search.children.push(stashed);
      }
    });
    return arRes;
  },

  areas: async function getAreas(fields) {
    const areasFields = {
      table: "areas",
      ...fields,
    };

    const data = await API.get.data(areasFields);

    if (data) {
      return data;
    }
  },

  rcs: async function getRcs(fields) {
    const rcsFields = {
      table: "rcs",
      ...fields,
    };

    const data = await API.get.data(rcsFields);

    if (data) {
      return data;
    }
  },

  rcProdCount: async function getRcProdCount(id) {
    const getCountFields = {
      table: "product",
      filter: {
        rc_link: id,
        published: "1",
      },
    };
    const res = await api.get.rowsCount(getCountFields);
    return res;
  },

  user: async function getUser(fields) {
    const userFields = {
      table: "users",
      ...fields,
    };

    if (!fields.select) {
      userFields["select"] = userSelectFieldsList
    }

    const data = await API.get.data(userFields);

    if (data) {
      return data;
    }
  },

  userCount: async function getProductsCount(filter) {
    const getProdCountFields = {
        table: "users",
        filter: filter
    };

    const count = await API.get.rowsCount(getProdCountFields);

    if (count) {
        return count;
    }
},

  isBanned: async function getIsBanned(table, id) {
    if (!table) {
      return { error: "Таблица обязательна", Method: "get.isBanned" };
    }
    if (!id) {
      return { error: "id обязателен", Method: "get.isBanned" };
    }
    const itemArr = await API.get.data({
      table: table,
      filter: { id: id },
      limit: 1,
    });
    if (new Date(itemArr.date_banned_to) > new Date()) {
      return true;
    }
    if (!itemArr.date_banned_to && itemArr.date_banned) {
      return true;
    }
    return false;
  },

  isProductBanned: async function getIsProductBanned(prod) {
    return await API.get.isBanned(
      "product",
      typeof prod == "object" ? prod.id : prod
    );
  },

  isUserBanned: async function getIsUserBanned(user) {
    return await API.get.isBanned(
      "users",
      typeof user == "object" ? user.id : user
    );
  },

  userGroups: async function getUserGroups(fields) {
    const groupsFields = {
      table: "users_groups",
      ...fields,
    };

    const data = await API.get.data(groupsFields);

    if (data) {
      return data;
    }
  },

  favoritesById: async function getFavoritesById(userId, parse) {
    if (!userId) {
      return { error: "User ID Обязателен", Method: "get.favoritesByID" };
    }
    const getFavoritesByIdFields = {
      select: "favorites",
      table: "users",
      filter: { id: userId },
      limit: 1,
      needParse: false
    };

    const data = await API.get.data(getFavoritesByIdFields);
    if (data) {
      const res = data.favorites &&
         Promise.all(
          data.favorites.map( async (favItem) => {
            if (favItem) {
              return await api.get.product.byID(favItem);
            } else {
              return null;
            }
          })
        )
      // const filtered = res && res.filter((n) => n);
      return res;
    } else {
      return [];
    }
  },

  favorites: async function getFavorites(req, res) {
    let user;
    if ((user = await API.auth.isUserAuthorized(req, res))) {
      return user.favorites ? user.favorites : [];
    } else {
      return { error: "Неавторизованный пользователь", Method };
    }
  },

  dialogue: async function getDialogue(fields) {
    const getDialogueFields = {
      table: "dialogues",
      ...fields,
    };
    const data = await API.get.data(getDialogueFields);
    if (data) {
      return data;
    }
  },

  messages: async function getMessages(fields) {
    const getDialogueFields = {
      table: "messages",
      ...fields,
    };
    const data = await API.get.data(getDialogueFields);
    if (data) {
      return data;
    }
  },

  tasks: async function getTasks(fields, wMessages = false) {
    const getTaskFields = {
      table: "tasks",
      sort: { date_created: "asc" },
      ...fields,
    };

    const tasks = await API.get.data(getTaskFields);

    if (tasks && wMessages) {
      if (Array.isArray(tasks)) {
        const requests = await Promise.all(
          tasks.map(async (task) => {
            const getMsgs = await API.get.taskMessages(task);
            task.messages = getMsgs;
            return task;
          })
        );
        return requests; // Возвращаем список тасков с сообщениями
      } else {
        const task = tasks;
        const getMsgs = await API.get.taskMessages(task);
        task.messages = getMsgs;
        return task; // Одна задача с сообщениями
      }
    }
    return !tasks ? [] : tasks; // Без сообщений без разницы как возвращать
  },

  taskMessages: async function getTaskMessages(task, additionalFields = {}) {
    const getTaskFields = {
      ...{
        table: "task_messages",
        filter: {
          task: typeof task == "object" ? task.id : task,
        },
        sort: { date_created: "asc" },
      },
      ...additionalFields,
    };
    const data = await API.get.data(getTaskFields);
    return data;
  },

  reports: async function getReports(fields) {
    const getReportFields = {
      table: "reports",
      sort: { date_created: "asc" },
      ...fields,
    };

    const reports = await API.get.data(getReportFields);

    return !reports ? [] : reports;
  },

  messagesUnread: async function getMessagesUnreadCount(user) {
    const userId = typeof user == "object" ? user.id : user;
    if (!userId) {
      return { error: "UserId Обязателен" };
    }
    let resUnread = 0;
    const dialogues = await API.get.dialogue({
      filter: { logicOr: { from_user: userId, to_user: userId } },
    });
    if (dialogues) {
      await Promise.all(
        dialogues.map(async (dialogue) => {
          const getUnread = await API.get.messages({
            filter: {
              dialogue: dialogue.id,
              read_by_opposite: "false",
              from_user: `!=${userId}`,
            },
          });
          if (getUnread) {
            resUnread += getUnread.length;
          }
        })
      );
    }

    return resUnread;
  },

  imageInfo: async function getImageInfo(path, newName) {
    try {
      const arrGetImageInfoFields = {
        imageUrl: path,
      };
      const res = await axios.post(
        `
        ${domen}/api/admin_api/getImageInfo`,
        arrGetImageInfoFields,
        { params: { responseType: "arraybuffer" } }
      );
      if (res.data && !res.data.error) {
        // const file = new File([res.data], newName ? newName : randomBytes(10).toString('hex') )
        // return file
        return res.data;
      }
    } catch (e) {
      // console.log("error", e);
    }
  },

  setting: async function getSetting(fieldName, onlyValue = true) {
    try {
      if (!fieldName) {
        return { error: "Не указано название настройки" };
      }
      const data = await API.get.data({
        table: "site_settings",
        filter: {
          name: fieldName,
        },
        limit: 1,
      });

      if (onlyValue && data.value) {
        return data.value;
      }

      return data;
    } catch (e) {
      // console.log("error", e);
    }
  },

  notificationsByUser: async function getNotificationsByUser(user) {
    let dateRead = false;
    const userId = typeof user == "object" ? user.id : user;
    if (!userId) {
      return { error: "Не удалось получить ID пользователя" };
    }
    if (typeof user == "object") {
      // dateReg = new Date(user.date_registered)
      dateRead = new Date(user.date_notifications_read);
    } else {
      const getUser = await API.get.user({ filter: { id: user }, limit: 1 });
      if (!getUser && !getUser.data) {
        return { error: `Не удалось найти пользователя с ID=${user}` };
      }
      // dateReg = new Date(getUser.date_registered)
      dateRead = new Date(getUser.date_notifications_read);
    }

    const notificationsFields = {
      table: "personal_notifications",
      filter: {
        user_id: userId,
      },
      limit: "all",
      sort: { date_created: "desc" },
    };

    const res = await API.get.notifications(notificationsFields);

    const currentDate = dateRead ? new Date(dateRead) : false;

    if (res && !res.error) {
      const arRes = res.map((item) => {
        const dateCreated = new Date(item.date_created);
        if (dateCreated < currentDate) {
          item.read = true;
        } else {
          item.read = false;
        }
        return item;
      });
      return arRes;
    }
    return false;
  },

  notificationsUnreadCount: async function getUnreadNotificationsCount(user) {
    let dateRead = false,
      dateReg = false;

    const userId = typeof user == 'object' ? user.id : user
    if (!userId) {
      return { error: "Не удалось получить ID пользователя" }
    }
    if (typeof user == 'object') {
      dateReg = new Date(user.date_registered)
      if (user.date_notifications_read) {
        dateRead = new Date(user.date_notifications_read)
      }
    } else {
      const getUser = await API.get.user({ filter: { id: user }, limit: 1 })
      if (!getUser && !getUser.data) {
        return { error: `Не удалось найти пользователя с ID=${user}` }
      }
      dateReg = new Date(getUser.date_registered)
      if (getUser.date_notifications_read) {
        dateRead = new Date(getUser.date_notifications_read)
      }
    }

    const useDate = (dateRead && dateRead) > dateReg ? dateRead : dateReg
    const unreadFields = {
      table: 'personal_notifications',
      filter: { // Если есть дата прочтения
        date_created: { from: useDate },
        user_id: userId
      }
    }
    return await API.get.rowsCount(unreadFields)
  },

  notifications: async function getNotifications(fields) {
    const data = await API.get.data({
      table: "personal_notifications",
      ...fields,
    });
    return data;
  },

  banners: async function getBannersList(fields) {
    const data = await API.get.data({
      table: "banners",
      ...fields,
    });
    return data;
  },

  bannerById: async function getBannerById(id) {
    if (!id) {
      return { error: "ID обязателен" };
    }

    const data = await API.get.data({
      table: "banners",
      filter: { id: id },
      limit: 1,
    });

    return data;
  },

  needUpdate: async function getNeedUpdate(version) {
    try {
      const type = Platform.OS;

      console.log("version", version);

      if (!version) {
        return { error: "Версия обязательна" };
      }

      const check = await axios.get(`${domen}/api/admin_api/authFunctions`, {
        params: {
          fields: {
            function: "checkUpdates",
            version: version,
            type: type,
          },
        },
      });

      return check.data.needUpdate;
    } catch (e) {
      return { error: e };
    }
  },

  updateText: async function getUpdateText() {
    try {
      const get = await axios.get(`${domen}/api/admin_api/authFunctions`, {
        params: { fields: { function: "getUpdateText" } },
      });
      return get.data?.texts;
    } catch (e) {
      return { error: e };
    }
  },

  product: PRODUCT,
};
