import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../api";

const prodTable = 'product'
const daysPublish = 30

let PRODUCT = {}
export default PRODUCT = {

    viewedList: async () => {
        const strItems = await AsyncStorage.getItem('products_viewed');
        const arItems = strItems.split(',')
        return arItems
    },

    list: async function getProducts(fields) {
        const productsFields = {
            table: prodTable,
            ...fields,
        };

        const data = await API.get.data(productsFields);

        // if (data) {
            return data ? data : false;
        // }
    },
    byID: async function getProductByID(id) {
        return await API.get.product.list({ filter: { id: id }, limit: 1 })
    },
    properties: async function getProductProperties(product) {
        return await API.get.itemProperties(prodTable, product)
    },
    propertyValue: async function getProductPropertyValue(product, propertyCode, limit) {
        return await API.get.itemPropertyValue(prodTable, product, propertyCode, limit)
    },
    fieldPrintableValue: async function getProductFieldPrintableValue(fieldCode, value) {
        return await API.get.fieldPrintableValue(prodTable, fieldCode, value)
    },
    propertyPrintableValue: async function getProductPropertyPrintableValue(propertyCode, item) {
        return await API.get.propertyPrintableValue(prodTable, item, propertyCode)
    },
    displayProperties: async function getProductDisplayProperties(properties, product) {
        let res = []
        res = await Promise.all(properties.map(async (prop) => {
            if (prop.code.startsWith('property_')) {
                const propertyCode = prop.code.replace('property_', '', prop.code)
                return { ...prop, display_value: await API.get.product.propertyPrintableValue(propertyCode, product) }
            } else {
                return { ...prop, display_value: await API.get.product.fieldPrintableValue(prop.code, product[prop.code]) }
            }
        }))
        return res
    },

    expiry: async function getProductExpiry(product) {
        if (typeof product == 'undefined') {
            return { Error: "Товар обязателен", Method: "get.product.expiry" }
        }
        if (typeof product === 'object' && product !== null) {
            if (!product.date_published) {
                return { Error: "Дата публикации не передана", Method: "api.get.product.expiry" }
            } else {
                const daysBetween = API.get.expiryDaysByDate(product.date_published)
                return daysBetween >= 0 ? daysPublish - daysBetween : daysBetween
            }
        } else if (typeof product == 'number') {
            const prod = await API.get.product.byID(product)
            if (!prod.error) {
                if (prod.date_published) {
                    const daysBetween = API.get.expiryDaysByDate(prod.date_published)
                    return daysBetween >= 0 ? daysPublish - daysBetween : daysBetween
                } else {
                    return { Error: `У товара с ID=${product} нет даты публикации`, Method: "api.get.product.expiry" }
                }
            } else {
                return { Error: `Элемент с ID=${product} не найден в таблице products`, Method: "api.get.product.expiry" }
            }
        }
    },

    favoritesCount: async function getProductFavoritesCount(product) {
        const favCountFields = {
            table: 'users',
            filter: {
                favorites: (typeof product == 'object' ? product.id : product)
            }
        }
        const res = await API.get.rowsCount(favCountFields);
        return res;
    },

    count: async function getProductsCount(filter) {
        const getProdCountFields = {
            table: prodTable,
            filter: filter
        };

        const count = await API.get.rowsCount(getProdCountFields);

        if (count) {
            return count;
        }
    },

    detailUrl: async function getProductDetailUrl(product) {
        let arProd = false;
        if (typeof product == "object" && product.id) {
            arProd = product;
        } else {
            arProd = await API.get.product.list({ filter: { id: product, published: '1', }, limit: 1 });
        }

        const url = `/posts/${arProd.section_relation[0].slug}/${arProd.slug}`;

        return url;
    },

    sectionRelation: async function getProductSectionRelation(product) {
        if (typeof product == "object" && product.section_relation) {
            arSect = await API.get.data({
                filter: { id: product.section_relation },
            });
        } else {
            arSect = await API.get.sections({ filter: { id: product } });
        }
    },

    isBanned: async function getProductIsBanned(product){
        return await API.get.isBanned('products', typeof product == 'object' ? product.id : product)
    }
}