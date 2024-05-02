import axios from "axios";

import API from "../api";
import FormData from "form-data";
import { generateProductName, reGenerateProductImage } from "../../../helpers/productFunctions";
// import { generateProductName, reGenerateProductImage } from "helpers/productFunctions";
let domen = "https://flate.pro";
// let domen = "http://45.128.207.181:3000"

let ADD = {};
export default ADD = {
  item: async function addItem(data) {
    try {
      const res = await axios.post(
        `${domen}/api/admin_api/create`,
        data,
        data instanceof FormData && {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (res.data.error) {
        throw { error: res.data.error };
      }
      return res.data;
    } catch (error) {
      return error;
    }
  },
  user: async function addUser(fields) {
    let resFields = false;
    if (fields instanceof FormData) {

      const passField = fields.getParts().find(item => item.fieldName == 'password')
      if (passField && passField.string) {
        const hash = API.auth.generateSaltHash(passField.string);
        fields.set("password", hash.userToken);
        fields.set("password_salt", hash.salt);
      }

      const emailField = fields.getParts().find(item => item.fieldName == 'email')
      if (emailField && emailField.string) {
        fields.set("email", email.toLowerCase());
        const checkExistEmail = await API.get.user({ filter: { email: emailField.string }, limit: 1 })
        if (checkExistEmail && checkExistEmail.id) {
          return { error: 'Данный Email уже зарегистрирован' }
        }
      }

      const phoneField = fields.getParts().find(item => item.fieldName == 'phone')
      if (phoneField && phoneField.string) {
        const checkExistPhone = await API.get.user({ filter: { phone: phoneField.string }, limit: 1 })
        if (checkExistPhone && checkExistPhone.id) {
          return { error: "Пользователь с таким номером телефона уже зарегистрирован" }
        }
      }
      fields.set("table", "users")
      fields.set("date_registered", new Date())
      resFields = fields
    } else {
      if (fields.password) {
        const hash = API.auth.generateSaltHash(fields.password);
        fields.password = hash.userToken;
        fields.password_salt = hash.salt;
      }
      if (fields.email) {
        fields.email = fields.email.toLowerCase();
        const checkExistEmail = await API.get.user({ filter: { email: fields.email }, limit: 1 })
        if (checkExistEmail && checkExistEmail.id) {
          return { error: 'Данный Email уже зарегистрирован' }
        }
      }
      if (fields.phone) {
        const checkExistPhone = await API.get.user({ filter: { phone: fields.phone }, limit: 1 })
        if (checkExistPhone && checkExistPhone.id) {
          return { error: "Пользователь с таким номером телефона уже зарегистрирован" }
        }
      }
      fields.date_registered = new Date();
      resFields = {
        table: "users",
        ...fields,
      }
    }
    const data = await API.add.item(resFields);
    if (data) {
      return data;
    }
  },
  favoritesById: async function addFavoritesById(user_id, addFavorites) {
    let idAdd;

    if (!addFavorites) {
      return { error: "addFavorites нечитаем (массив или id)" }
    }

    const user = await API.get.user({ filter: { id: user_id }, limit: 1 });
    if (!user) {
      return { error: "User Обязателен" };
    }
    if (!Array.isArray(addFavorites) && addFavorites) {
      idAdd = addFavorites;
      addFavorites = [idAdd];
    }
    let resultFavorites = [];
    if (user.favorites) {
      if (Array.isArray(user.favorites)) {
        user.favorites.map((userFavorite) => {
          if (userFavorite && userFavorite.id) {
            resultFavorites.push(userFavorite.id); // преобразуем объект с товарами в массив с айдишниками
          }
        });
        addFavorites.map((addFavorite) => {
          if (resultFavorites.indexOf(addFavorite) === -1) {
            resultFavorites.push(addFavorite); // добавляем только те айдишники которых нет
          }
        });
      }
    } else {
      resultFavorites = addFavorites;
    }
    const addFavoritesFields = {
      table: "users",
      id: user_id,
      favorites: resultFavorites,
    };
    const data = await API.set.item(addFavoritesFields);
    if (data) {
      return data;
    }
  },
  favorites: async function addFavorites(req, res, addFavorites) {
    let user;
    if ((user = await API.auth.isUserAuthorized(req, res))) {
      const data = await this.favoritesById(user, addFavorites);
      if (data) {
        return data;
      }
    } else {
      return { error: "Неавторизованный пользователь или не указан ID" };
    }
  },
  rcs: async function addRcs(fields, cityName) {
    let addRcFields = false;
    let getCity = false;
    if (cityName) {
      getCity = await API.get.cities({ filter: { name: cityName }, limit: 1 })
    }

    const publishedValue = await API.get.setting('rcs_moderation') == 'N' ? '1' : '0'

    if (fields instanceof FormData) {
      addRcFields = fields;
      addRcFields.append('published', publishedValue)
      addRcFields.append('table', 'rcs')

      if (typeof getCity != undefined && getCity && !getCity.error && getCity.id) {
        addRcFields.append('city_link', getCity.id)
      }
    } else {
      fields.published = publishedValue
      if (getCity && !getCity.error) {
        fields.city_link = getCity.id
      }
      addRcFields = {
        table: "rcs",
        ...fields,
      };
    }

    const data = await API.add.item(addRcFields);
    const isRcModerationOn = await API.get.setting('rcs_moderation')
    if (data && data.itemId && isRcModerationOn == 'Y') {
      API.sendEmailNotification.newRc(data.itemId, domen);
    }
    return data;
  },
  product: async function addProduct(sendData) {
    try {

      sendData.append("table", "product")
      sendData.append("published", "0")

      const nameField = sendData.getParts().find(item => item.fieldName == 'name')

      if ( !nameField || !nameField.string ) {
        const newName = await generateProductName(sendData);
        sendData.append('name', newName.trim())
      }

      const buildingAdressFeild = sendData.getParts().find(item => item.fieldName == 'building_address')

      if (buildingAdressFeild && buildingAdressFeild.string) {
        const buildingAddress = buildingAdressFeild.string

        const createBuildingFields = {
          name: buildingAddress,
        }
        const cityLinkField = sendData.getParts().find(item => item.fieldName == 'city_link')
        if (cityLinkField && cityLinkField.string) {
          createBuildingFields.city_link = cityLinkField
        }
        const areaLinkField = sendData.getParts().find(item => item.fieldName == 'area_link')
        if (areaLinkField && areaLinkField.string) {
          createBuildingFields.area_link = areaLinkField.string
        }

        const getExistBuilding = await API.get.buildings({ filter: createBuildingFields, limit: 1 }, true);
        if (getExistBuilding && getExistBuilding.id) {
          sendData.append('building_link', getExistBuilding.id)
        } else {
          const sendCreateBuilding = await API.add.building(createBuildingFields);

          if (sendCreateBuilding && sendCreateBuilding.itemId) {
            sendData.append('building_link', sendCreateBuilding.itemId)
          }
        }
      }

      const res = {};
      res.full = await API.add.item(sendData)

      const isProdModerationOn = await API.get.setting('product_moderation')

      if (res.full && res.full.itemId) {
        res.genImage = await reGenerateProductImage(res.full.itemId)
        if (isProdModerationOn == 'Y') {
          API.sendEmailNotification.newProduct(res.full.itemId, domen)
        }
      }

      // return false
      return res;

    } catch (Error) {
      return ({ Error, function: "API.add.product" });
    }
  },
  building: async function addBuilding(fields) {
    let addBuildingFields = false;
    if (fields instanceof FormData) {
      addBuildingFields = fields;
      addBuildingFields.append('table', 'buildings')
    } else {
      addBuildingFields = {
        table: "buildings",
        ...fields,
      };
    }
    const data = await API.add.item(addBuildingFields);
    if (data) {
      return data;
    }
  },
  news: async function addNews(fields) {
    let addNewsFields = false;
    if (fields instanceof FormData) {
      addNewsFields = fields;
      addNewsFields.append('table', 'news')
    } else {
      addNewsFields = {
        table: "news",
        ...fields,
      };
    }
    const data = await API.add.item(addNewsFields);
    if (data) {
      return data;
    }
  },
  cities: async function addCities(fields) {
    let addCityFields = false;
    if (fields instanceof FormData) {
      addCityFields = fields;
      addCityFields.append('table', 'cities')
    } else {
      addCityFields = {
        table: "cities",
        ...fields,
      };
    }
    const data = await API.add.item(addCityFields);
    if (data) {
      return data;
    }
  },
  areas: async function addAreas(fields) {
    let addCityFields = false;
    if (fields instanceof FormData) {
      addCityFields = fields;
      addCityFields.append('table', 'areas')
    } else {
      addCityFields = {
        table: "areas",
        ...fields,
      };
    }
    const data = await API.add.item(addCityFields);
    if (data) {
      return data;
    }
  },
  dialogue: async function addDialogue(fields) {
    const addDialogueFields = {
      table: "dialogues",
      ...fields,
    };
    const data = await API.add.item(addDialogueFields);
    if (data) {
      return data;
    }
  },
  message: async function addMessage(data) {
    if (data instanceof FormData) {
      data.append("table", "messages");
      const response = await API.add.item(data);
      return response;
    } else if (typeof data == "object") {
      let { from_user, to_user, product, text } = data;

      from_user = typeof from_user == "object" ? from_user.id : from_user;
      to_user = typeof to_user == "object" ? to_user.id : to_user;
      product = typeof product == "object" ? product.id : product;

      if (!from_user) {
        return { error: "Отправитель обязателен" };
      }
      if (!to_user) {
        return { error: "Получатель обязателен" };
      }
      if (!product) {
        return { error: "Товар обязателен" };
      }
      if (!text) {
        return { error: "Пустое сообщение " };
      }

      if (from_user == to_user) {
        return { error: "Вы не можете писать сообщения себе" };
      }

      const dialogueExist = await API.get.dialogue({
        filter: { from_user, to_user, product },
        limit: 1
      });

      let dialogue = dialogueExist?.id;

      if (!dialogue) {
        const createDialogue = await API.add.dialogue({
          from_user,
          to_user,
          product,
        });

        if (createDialogue) {
          dialogue = createDialogue.itemId;
        }
      }

      if (dialogue) {
        const messageFields = {
          table: "messages",
          text,
          from_user,
          dialogue,
        };

        const addMess = await API.add.item(messageFields);
        return addMess;
      } else {
        return { error: "Диалог не найден и не удалось создать новый" };
      }
    }
  },

  newsNotification: async function addNewsNotification(news_id, previewText, host) {
    let res = {}
    res.Notification = await API.add.globalNotification({ news_id, text: previewText, window_host: host })
    if (res?.Notification?.itemId) {
      res.sendEmail = await API.sendEmailNotification.newsNotification(news_id, host)
    }
    return res
  },

  mainNotification: async function addMainNotification(title, text, window_host) {
    let res = {};
    res.notif = await API.add.globalNotification({ title, text })
    res.mail = await API.sendEmailNotification.mainNotification(title, text, domen);

    res.smsNotif = await axios.post(
      `${domen}/api/user/sendSmsText`,
      {
        window_host: domen,
        text: `${title}\r\n${text}`,
        fields: { user_id: "all" }
      }
    );
    return res
  },

  personalNotification: async function addPersonalNotification(fields, template) {

    const prod_id = typeof fields.product_id == 'object' ? fields.product_id.id : fields.product_id

    if (template) {
      const resTemplate = notificationTemplates(prod_id, template);
      if (!fields.title) {
        fields.title = resTemplate.title;
      }
      if (!fields.text) {
        fields.text = resTemplate.text;
      }
    }

    if (!fields.text) {
      return { error: "Текст уведомления обязателен" }
    }
    if (!fields.user_id) {
      const arProd = await API.get.product.list({ filter: { id: prod_id }, limit: 1 })
      if (arProd?.user_id?.id) {
        fields.user_id = arProd.user_id.id;
      } else {
        return { error: "ID пользователя обязателен" }
      }
    }

    const createPersNotif = {
      table: 'personal_notifications',
      ...fields
    }

    let response = {};

    response.addDB = await API.add.item(createPersNotif);

    if (!response.error) {
      if (template == 'unpublish') {
        response.EmailUnpub = await API.sendEmailNotification.unpublish(fields.product_id, fields.user_id, domen)
        response.SmsUnpub = await axios.post(
          `${domen}/api/user/sendSmsText`,
          {
            window_host: domen,
            text: `У объявления номер ${fields.product_id} на сайте https://flate.pro закончился срок размещения`,
            fields: fields
          }
        );
      }
      if (template == 'unprem') {
        response.EmailUnprem = await API.sendEmailNotification.unprem(fields.product_id, fields.user_id, domen)
        response.SmsUnprem = await axios.post(
          `${domen}/api/user/sendSmsText`,
          {
            window_host: domen,
            text: `У объявления номер ${fields.product_id} на сайте https://flate.pro закончился срок платного размещения`,
            fields: fields
          }
        );
      }
      if (template == 'sendEdit') {
        response.EmailSendEdit = await API.sendEmailNotification.sendEditProduct(fields.product_id, fields.user_id, fields.text, domen)
      }
    }

    return response;
  },

  globalNotification: async function addGlobalNotification(fields) {
    const getUsers = await API.get.user({ filter: {}, limit: 'all' });

    const responses = Promise.all(getUsers.map(async (user) => {
      const persFields = { ...{ user_id: user.id }, ...fields }
      return await API.add.personalNotification(persFields)
    }));

    return responses;
  },

  task: async function addTask(fields) {
    const createTaskFields = {
      table: 'tasks',
      ...fields
    }
    const response = await API.add.item(createTaskFields);
    if(createTaskFields?.status == 1) {
      await API.sendEmailNotification.feedback(fields)
    }
    return response;
  },

  taskMessage: async function addTaskMessage(data) {
    if (data instanceof FormData) {
      data.append("table", "task_messages");
      const response = await API.add.item(data);
      return response;
    } else {
      return { Error: 'Поддерживается только FormData' }
    }
  },

  userAdditionalPhone: async function addUserAdditionalPhone(phone, user) {
    const isReged = await API.auth.isUserRegistered(phone);
    if (isReged) {
      return { error: "Этот номер телефона уже зарегистрирован" }
    }

    const userId = typeof user == 'object' ? user.id : user
    const arUser = await API.get.user({ filter: { id: userId }, limit: 1 })

    if (arUser.phone == phone) {
      return { error: 'Данный номер телефона уже используется как главный' }
    }

    let additionalPhones = [];

    if (Array.isArray(arUser.additional_phones)) {
      additionalPhones = arUser.additional_phones;
      additionalPhones.push(phone)
    }

    const updateFields = {
      id: userId,
      additional_phones: additionalPhones
    }

    const res = await API.update.user(updateFields);
    return res
  },

  report: async function addReport(fields) {

    const resFields = fields;

    resFields.user_id = typeof fields.user_id == 'object' ? fields.user_id.id : fields.user_id

    const createTaskFields = {
      table: 'reports',
      ...fields
    }
    const response = await API.add.item(createTaskFields);
    if (!response.error) {

      let prod = false,
        user = false;

      if (typeof fields.product == 'object') {
        prod = fields.product
      } else {
        prod = await API.get.product.list({ filter: { id: fields.product }, limit: 1 });
      }

      if (typeof fields.user_id == 'object') {
        user = fields.user_id
      } else {
        user = await API.get.user({ filter: { id: fields.user_id }, limit: 1 })
      }
      await API.sendEmailNotification.report(prod, user, fields.text, domen)
    }
    return response;
  }
};

const notificationTemplates = function (product, template) {
  if (template == 'unpublish') {
    return {
      title: `У объявления номер ${product} закончился срок размещения`,
      text: `Вы можете возобновить показ объявления или оно будет полностью удалено через 30 дней`
    }
  } else if (template == 'unprem') {
    return {
      title: `У объявления номер ${product} закончился срок платного размещения`,
      text: `Для продления требуется оплата`
    }
  } else if (template == 'sendEdit') {
    return {
      title: `Ваше объявление номер ${product} отклонено`,
    }
  }
}