import axios from "axios";
import FormData from "form-data";
// import { checkproductPremium, reGenerateProductImage, reGenerateProductName } from "./helpers/productFunctions";
// import { generateSaltHash } from "pages/api/user/auth";
import API from "../api";
import api from "../api";
import { checkproductPremium, reGenerateProductImage, reGenerateProductName } from "../../../helpers/productFunctions";

let domen = "https://flate.pro";
// let domen = "http://45.128.207.181:3000";

let UPDATE = {};
export default UPDATE = {
  item: async function updateItem(data) {
    try {

      const sendEditRequest = await axios.post(
        `${domen}/api/admin_api/edit`,
        data,
        data instanceof FormData && {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return sendEditRequest;
    } catch (error) {
      return error;
    }
  },

  tasks: async function updateTasks(fields) {
    const tasksFields = {
      table: "tasks",
      ...fields
    }
    const res = await API.update.item(tasksFields);
    return res
  },

  reports: async function updateReports(fields) {
    const tasksFields = {
      table: "reports",
      ...fields
    }
    const res = await API.update.item(tasksFields);
    return res
  },

  productsByFilter: async function updateProductsByFilter(filter, update) {
    const getProdsFields = {
      table: 'product',
      filter,
    }
    const getProds = await API.get.product.list(getProdsFields)
    if (Array.isArray(getProds) && getProds.length) {
      getProds.forEach(async (elem) => {
        await API.update.product({ id: elem.id, ...update })
      })
    }
  },

  product: async function updateProduct(data) {
    const curDate = new Date()

    // console.log('data', data)
    // console.log('typeof', typeof data)
    // console.log('instance', data instanceof FormData)

    if (data instanceof FormData) {
      data.append("table", "product");

      const idField = data.getParts().find(item => item.fieldName == 'id')

      if (!idField || !idField.string) {
        throw { error: 'ID обязателен при обновлении' };
      }

      const pubField = data.getParts().find(item => item.fieldName == 'published')

      if (pubField && pubField.string == '1') {
        data.append('date_published', curDate)
      }

      const premField = data.getParts().find(item => item.fieldName == 'premium')
      const datePaidField = data.getParts().find(item => item.fieldName == 'date_paid')

      if((premField && premField.string != 0) && (!datePaidField || !datePaidField.string)) {
        data.append('date_paid', new Date())  
      }

    } else {
      data.table = "product"

      if (!data.id) {
        throw { error: 'ID обязателен при обновлении' };
      }

      if (data.published == 1) {
        data.date_published = curDate
      }

      if(data.premium != 0 && !data.date_paid) {
        data.date_paid = new Date()
      }

    }

    const res = {};

    res.full = await API.update.item(data);

    if (res?.full?.data?.error) {
      throw { error: res.full.data.error };
    }

    res.name = await reGenerateProductName(res.full.data.itemId);
    res.image = await reGenerateProductImage(res.full.data.itemId);
    res.prem = await checkproductPremium(res.full.data.itemId);

    // console.log('res', res)

    return res
  },
  user: async function updateUser(data) {
    let sef_code = '';
    let userId = '';

    if (data instanceof FormData) {
      data.append("table", "users");

      const sefField = data.getParts().find(item => item.fieldName == 'sef_code')

      if (sefField && sefField.string) {
        sef_code = sefField.string;
      }

      const idField = data.getParts().find(item => item.fieldName == 'id')

      if(!idField || !idField.string ) {
        return {Error: "ID пользователя обязателен"}
      } else {
        userId = idField.string
      }
      
    } else {
      if (data.sef_code) {
        sef_code = data.sef_code
      }
      data.table = "users"

      if(!data.id) {
        return {Error: "ID пользователя обязателен"}
      } else {
        userId = data.id
      }
    }
    if (sef_code) {
      if (sef_code.length < 5) {
        return { error: 'Слишком короткий никнейм' }
      }

      sef_code = sef_code.toLowerCase()

      if (sef_code == 'admin' || sef_code == 'administrator') {
        return { error: 'Запрещенный никнейм' }
      }

      const getCurUser = await api.get.user({ filter: { id: `${userId}` }, limit: 1 })
      if (getCurUser && getCurUser.sef_code == sef_code) {
        return { error: 'У вас уже установлен данный никнейм' }
      }

      const getSefUsers = await api.get.user({ filter: { sef_code } })
      if (Array.isArray(getSefUsers) && getSefUsers.length > 0) {
        return { error: "Данный никнейм уже зарегистрирован" }
      }

      if (data instanceof FormData) {
        // data.set('sef_code', sef_code);
      } else {
        // data.sef_code = sef_code
      }
    }
    const res = await API.update.item(data);
    return res;
  },
  news: async function updateNews(fields) {
    if (fields instanceof FormData) {
      fields.append("table", "news");
    } else {
      fields.table = "news";
    }
    const res = await this.item(fields);
    return res;
  },
  cities: async function updateNews(fields) {
    if (fields instanceof FormData) {
      fields.append("table", "cities");
    } else {
      fields.table = "cities";
    }
    const res = await this.item(fields);
    return res;
  },
  areas: async function updateAreas(fields) {
    if (fields instanceof FormData) {
      fields.append("table", "areas");
    } else {
      fields.table = "areas";
    }
    const res = await api.update.item(fields);
    return res;
  },
  rcs: async function updateRcs(fields) {
    if (fields instanceof FormData) {
      fields.append("table", "rcs");
    } else {
      fields.table = "rcs";
    }

    const res = await api.update.item(fields);
    return res;
  },
  productViewCount: async function updateProductViewCount(product, window_host) {
    const prod = typeof product == 'object' ? product : await api.get.product.byID(product)
    const views = prod.stat_views
    const updateCountFields = {
      id: prod.id,
      table: "product",
      stat_views: parseInt(views + 1),
      date_change: "false",
      window_host: window_host
    };

    const data = await API.set.item(updateCountFields);
    if (data) {
      return data;
    }
  },

  settings: async function updateSettings(fields, host) {
    const resFields = []
    if (fields instanceof FormData) {
      for (const pair of fields.entries()) {
        if (pair[0] == 'password') {
          const saltHash = API.auth.generateSaltHash(pair[1])
          resFields.push({ name: 'master_password_token', value: saltHash.userToken })
          resFields.push({ name: 'master_password_salt', value: saltHash.salt })
        } else {
          resFields.push({ name: pair[0], value: pair[1] })
        }
      }
    } else {
      if (Array.isArray(fields)) {
        for (const prop in fields) {
          if (prop == 'password') {
            const saltHash = API.auth.generateSaltHash(fields[property])
            resFields.push({ name: 'master_password_token', value: saltHash.userToken })
            resFields.push({ name: 'master_password_salt', value: saltHash.salt })
          } else {
            resFields.push({ name: prop, value: fields[prop] })
          }
        }
      } else if (typeof fields == 'object') {
        for (const property in fields) {
          if (property == 'password') {
            const saltHash = API.auth.generateSaltHash(fields[property])
            resFields.push({ name: 'master_password_token', value: saltHash.userToken })
            resFields.push({ name: 'master_password_salt', value: saltHash.salt })
          } else {
            resFields.push({ name: property, value: fields[property] })
          }
        }
      }
    }

    return await Promise.all(
      resFields.map(async (field) => {
        const fieldInfo = await API.get.setting(field.name, false)

        if (!fieldInfo) {
          return { Error: `Не найдено настройки с именем ${field.name}` }
        }
        if (fieldInfo.value != field.value) {
          // return {fieldInfo, field}
          const updateSettingFields = {
            table: 'site_settings',
            id: fieldInfo.id,
            value: field.value,
            date_edited: new Date(),
          }
          if (host) {
            updateSettingFields.window_host = host
          }
          const res = await api.update.item(updateSettingFields);
          if (res?.data?.error) {
            return res.data.error;
          }
          return res.data
        }
      })
    )
  },

  banner: async function updateBanner(data) {
    if (data instanceof FormData) {
      data.append("table", "banners");
      const idField = data.getParts().find(item => item.fieldName == 'id')
      if (!idField || !idField.string) {
        return { error: 'ID обязателен' }
      }
    } else {
      if (!data.id) {
        return { error: 'ID обязателен' }
      }
      data.table = "banners";
    }
    const res = await api.update.item(data);
    return res;
  }
};
