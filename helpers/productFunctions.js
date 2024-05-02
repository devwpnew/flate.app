// import API from "pages/api/service/api";

import FormData from "form-data";
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import API from "../api/service/api";
const cyrillicToTranslit = new CyrillicToTranslit();

export async function reGenerateProductName(itemId) {
    if (!itemId) {
        return { error: 'id обязателен' }
    }
    const getProd = await API.get.product.byID(itemId)
    const checkName = await generateProductName(getProd)
    if (checkName != getProd.name) {
        const res = await API.update.product({ id: itemId, name: checkName })
        return res
    } else {
        return 'Имя не изменилось'
    }
}

export async function reGenerateProductImage(itemId) {
    if (!itemId) {
        return { error: 'id обязателен' }
    }
    const getProd = await API.get.product.byID(itemId)
    const checkImage = await generateProductImage(getProd)
    // console.log('getProd.image', getProd.image)
    // console.log('checkImage', checkImage)
    if (checkImage && getProd.image != checkImage) {
        const res = await API.update.product({ id: itemId, image: checkImage })
        return res
    } else if (checkImage) {
        return 'Изображение не было получено из товара'
    } else {
        return 'Изображение не изменилось'
    }
}

export async function generateProductName(data) {
    try {
        if (data instanceof FormData || typeof data == 'object') {
            let rcId = false
            let sectionId = false
            let livingSquare = false
            let landSquares = false
            let propProdAdress = false
            let roomCountId = false
            let floor = false
            let house_types = false
            let defaultName = false

            if (data instanceof FormData) {
                const parts = data.getParts()

                // // console.log('parts', parts)

                const rcIdFIeld = parts.find(item => item.fieldName == 'rc_link')
                rcId = rcIdFIeld ? rcIdFIeld.string : false
                const sectionIdField = parts.find( item => item.fieldName == 'section_relation')
                sectionId = sectionIdField ? sectionIdField.string : false
                const livingSquareField = parts.find( item => item.fieldName == 'living_squares')
                livingSquare = livingSquareField ? livingSquareField.string : false
                const landSquaresField = parts.find( item => item.fieldName == 'land_squares')
                landSquares = landSquaresField ? landSquaresField.string : false

                const buildingAddressField = parts.find(item => item.fieldName == 'building_address')
                const buildingLinkField = parts.find(item => item.fieldName == 'building_link')

                if(buildingAddressField && buildingAddressField.string) {
                    propProdAdress = buildingAddressField.string
                } else if (buildingLinkField && buildingLinkField.string) {
                    const buildingObject = await API.get.buildings({filter: {id: buildingLinkField.string}, limit: 1});
                    propProdAdress = buildingObject.name;
                } else {
                    const propAdressField = parts.find(item => item.fieldName == 'property_product_address')
                    propProdAdress = propAdressField ? propAdressField.string : false
                }
                const roomCountField = parts.find(item => item.fieldName == 'product_room_count')
                roomCountId = roomCountField ? roomCountField.string : false
                const floorField = parts.find(item => item.fieldName == 'property_product_floor')
                floor = floorField ? floorField.string : false
                const houseTypeField = parts.find(item => item.fieldName == 'house_types')
                house_types = houseTypeField ? houseTypeField.string : false
                const defaultNameField = parts.find(item => item.fieldName == 'name')
                defaultName = defaultNameField ? defaultNameField.string : false
            } else {
                rcId = data?.rc_link?.id
                sectionId = data?.section_relation.map((section) => { return section.id })
                livingSquare = data?.living_squares
                landSquares = data?.land_squares
                if(data?.building_address) {
                    propProdAdress = data.building_address
                } else if (data?.building_link) {
                    const buildingObject = await API.get.buildings({filter: {id: data.building_link.id}, limit: 1});
                    propProdAdress = buildingObject.name;
                } else {
                    propProdAdress = data?.properties?.product_address
                }
                roomCountId = data.product_room_count
                floor = data?.properties?.product_floor
                house_types = data?.house_types
                defaultName = data.name
            }

            let newName = '';

            let strLandSquares = landSquares
            if (landSquares) {
                if ((landSquares % 100 < 10 || landSquares % 100 > 20) && landSquares % 10 == 1) {
                    strLandSquares += ' сотка'
                } else if ((landSquares % 100 < 10 || landSquares % 100 > 20) && landSquares % 10 >= 2 && landSquares % 10 <= 4) {
                    strLandSquares += ' сотки'
                } else {
                    strLandSquares += ' соток'
                }
            }

            if (sectionId == 3 || (Array.isArray(sectionId) && sectionId.includes(3))) { // Квартиры
                if (rcId) {
                    const arrRc = await API.get.rcs({ filter: { id: rcId }, limit: 1 })
                    if (arrRc) {
                        newName += `${arrRc['name']},`
                    }
                } else {
                    if (propProdAdress) {
                        newName += `${propProdAdress},`;
                    }
                }

                if (livingSquare) {
                    if (newName != '') {
                        newName += ' '
                    }
                    newName += `${livingSquare} м²`
                }

                if (roomCountId || roomCountId === 0) {
                    const roomCountField = await API.get.fieldInfo('product', 'product_room_count')
                    const roomCountValue = roomCountField.descObj.result_options[roomCountId]

                    if(roomCountValue == "Свободная планировка") {
                        newName += ', Своб. планировка'
                    } else {
                        newName += `, ${roomCountValue}`
                        newName += Number(roomCountValue) ? '-комн.' : ''
                    }
                }

                if (floor) {
                    newName += `, ${floor} этаж`
                }
            } else if (sectionId == 4 || (Array.isArray(sectionId) && sectionId.includes(4))) { // Дома
                const house_typesFields = await API.get.fieldInfo('product', 'house_types')
                const house_typesValue = house_typesFields.descObj.result_options[house_types]

                newName += house_typesValue ? house_typesValue : ' Дом'

                if (livingSquare) {
                    newName += ` ${livingSquare} м²`
                }

                if (floor) {
                    newName += `, ${floor} этаж`
                }

                if (strLandSquares) {
                    newName += `, ${strLandSquares}`
                }
            } else if (sectionId == 5 || (Array.isArray(sectionId) && sectionId.includes(5))) { // Земля
                newName = `Земельный участок`

                if (strLandSquares) {
                    newName += `, ${strLandSquares}`
                }
            }

            return newName == '' ? defaultName : newName;
        } else {
            return { error: 'No data' }
        }
    } catch (Error) {
        return {Error, function: "generateProductName"}
    }
}

export async function generateProductImage(data) {
    try {
        const product = data;
        const currentImage = product.image;
        if (product?.properties?.product_galery) {
            const galery = JSON.parse(product.properties.product_galery);
            if (galery.includes(currentImage)) {
                return currentImage;
            } else {
                return galery[0]
            }
        } else {
            return null
        }
    } catch (e) {
        return { error: e }
    }
}

export async function checkproductPremium(itemId) {
    try {
        const prod = await API.get.product.byID(itemId)
        if(prod.premium != 0 && prod.date_paid == null) {
            const res = await API.update.product({id: itemId, date_paid: new Date()})
            return res
        } else {
            return "Премиум статус не изменился"
        }
    } catch (e) {
        return (e)
    }
}

export function textToCode (name, changeRegister = false){

    if(changeRegister) {
        name = name.toLowerCase()
    }

    const nameTranslit = cyrillicToTranslit.transform(name, '-');

    let rep = nameTranslit.replaceAll('.', '-')
    rep = rep.replaceAll(',', '-')
    rep = rep.replaceAll('/', '-')
    rep = rep.replaceAll('"', '-')
    rep = rep.replaceAll('\'', '-')
    rep = rep.replaceAll('«', '-')
    rep = rep.replaceAll('»', '-')

    while(rep.indexOf('--') + 1){
        rep = rep.replaceAll('--', '-')
    }

    return rep
}