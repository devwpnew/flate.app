import { decodeData, encodeData, post } from "../../config/config";

export const selectionRepository = {
  list: async ({ sort = { sort: "DESC" }, filter = {} } = {}) => {
    try {
      const response = await post("/api/v2/selections/getList", {
        sort,
        filter,
        limit: "all",
      });
      return response;
    } catch (error) {
      throw new Error(`Error in section.list request: ${error.message}`);
    }
  },
  add: async ({ name = "", user_id = "" } = {}) => {
    try {
      if (!name || !user_id) {
        throw new Error(
          "Both name and user_id are required for adding a selection."
        );
      }

      const response = await post("/api/v2/selections/add", {
        fields: { name: name, user_id: user_id },
      });
      return response;
    } catch (error) {
      throw new Error(`Error in section.add request: ${error.message}`);
    }
  },
  delete: async ({ id = "" } = {}) => {
    try {
      if (!id) {
        throw new Error("id is required for deleting a selection.");
      }

      const response = await post("/api/v2/selections/removeById", {
        id: id,
      });
      return response;
    } catch (error) {
      throw new Error(`Error in section.delete request: ${error.message}`);
    }
  },
  edit: async ({
    id = "",
    name = "",
    title = "",
    description = "",
    postscriptum = "",
  } = {}) => {
    try {
      if (!id) {
        throw new Error("Both id id required for editing a selection.");
      }

      const fields = {};

      if (name) {
        fields.name = name;
      }

      if (title) {
        fields.title = title;
      }

      if (description) {
        fields.description = description;
      }

      if (postscriptum) {
        fields.postscriptum = postscriptum;
      }

      const response = await post("/api/v2/selections/editItems", {
        filter: { id: id },
        fields: fields,
      });
      return response;
    } catch (error) {
      throw new Error(`Error in section.edit request: ${error.message}`);
    }
  },
  sort: async ({ selections = [] } = {}) => {
    try {
      if (!selections) {
        throw new Error("Список подборок обязателен");
      }
      if (!Array.isArray(selections)) {
        throw new Error(
          "Подборки (selections) должны быть массивом объектов. Примеры: [{id:1},{id:333}} или [1,333,555,777]. Значение sort не учитывается ни в одном из случаев"
        );
      }
      if (selections.length === 0) {
        throw new Error("Зачем сортировать пустой массив?");
      }
      const response = await post("/api/v2/selections/updateSort", {
        selections,
      });
      return response;
    } catch (error) {
      throw new Error(`Error in section.sort request: ${error.message}`);
    }
  },
  generateCode: ({ user_id = "", id = "" } = {}) => {
    if (!user_id || !id) return;

    const code = encodeData({ user_id: user_id, id: id });

    return code;
  },
  parseCode: ({ code = "" } = {}) => {
    if (!code) return;

    const string = decodeData(code);

    return string;
  },
};
