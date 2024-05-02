import { post } from "../../config/config";

export const productRepository = {
  list: async ({ sort = { sort: "DESC" }, filter = {} } = {}) => {
    try {
      const response = await post("/api/v2/selection_product/getList", {
        sort: sort,
        filter: filter,
        limit: "all"
      });
      return response;
    } catch (error) {
      throw new Error(`Error in product.list request: ${error.message}`);
    }
  },
  add: async ({ productId = "", selectionId = "" } = {}) => {
    try {
      if (!productId || !selectionId) {
        throw new Error(
          "Both productId and selectionId are required for adding a product."
        );
      }

      const response = await post(
        "/api/v2/selection_product/addProductToSelection",
        {
          productId: productId,
          selectionId: selectionId,
        }
      );
      return response;
    } catch (error) {
      throw new Error(`Error in product.add request: ${error.message}`);
    }
  },
  delete: async ({ productId = "" } = {}) => {
    try {
      if (!productId) {
        throw new Error("Both productId is required for deleting a product.");
      }

      const response = await post("/api/v2/selection_product/removeById", {
        id: productId,
      });

      return response;
    } catch (error) {
      throw new Error(`Error in product.delete request: ${error.message}`);
    }
  },
  sort: async ({ selectionProducts = [] } = {}) => {
    try {
      if (!selectionProducts) {
        throw new Error("Список подборок обязателен");
      }
      if (!Array.isArray(selectionProducts)) {
        throw new Error(
          "Подборки (selectionProducts) должны быть массивом объектов. Примеры: [{id:1},{id:333}} или [1,333,555,777]. Значение sort не учитывается ни в одном из случаев"
        );
      }
      if (selectionProducts.length === 0) {
        throw new Error("Зачем сортировать пустой массив?");
      }
      const response = await post("/api/v2/selection_product/updateSort", {
        selectionProducts,
      });
      return response;
    } catch (error) {
      throw new Error(`Error in product.sort request: ${error.message}`);
    }
  },
  edit: async ({ productId = "", comission = "" } = {}) => {
    try {
      if (!productId) {
        throw new Error("Both productId is required for editing a product.");
      }

      const response = await post("/api/v2/selection_product/editById", {
        id: productId,
        fields: { comission: comission },
      });
      return response;
    } catch (error) {
      throw new Error(`Error in product.add request: ${error.message}`);
    }
  },
};
