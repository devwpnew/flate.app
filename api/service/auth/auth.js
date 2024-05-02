import AsyncStorage from '@react-native-async-storage/async-storage';
// import { pbkdf2Sync, randomBytes } from 'crypto';

import axios from 'axios';
import API from '../api';
import * as Device from 'expo-device';
import CryptoES from 'crypto-es';
import * as Crypto from 'expo-crypto';
import { Buffer } from "buffer";

let domen = "https://flate.pro";
// let domen = "http://45.128.207.181:3000/";
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

export default AUTH = {

    isUserRegistered: async function isUserRegistered(phone) {
        const checkUserExistFields = {
            table: "users",
            filter: { logicOr: { phone: phone, additional_phones: phone } },
            limit: 1
        }
        const getUserId = await API.get.data(checkUserExistFields)
        if (getUserId && !getUserId.error) {
            if (Array.isArray(getUserId) && getUserId.length > 0) {
                return getUserId[0].id ? true : false
            }
            return getUserId.id ? getUserId.id : false
        }
        return false
    },

    isPhoneBanned: async function isPhoneBanned(phone) {
        const checkUserExistFields = {
            table: "users",
            filter: { phone: phone },
            limit: 1,
        }

        const getUserId = await API.get.data(checkUserExistFields)

        if (getUserId) {
            const userBanned = await API.get.isUserBanned(getUserId)
            return userBanned
        }

        return false;
    },

    isPhoneRejected: async function isPhoneRejected(phone) {
        const checkUserExistFields = {
            table: "users",
            filter: { phone: phone },
            limit: 1
        }

        const getUserId = await API.get.data(checkUserExistFields)

        if (getUserId && (getUserId.user_group == '7' || getUserId.user_group.id == '7')) {
            return true;
        }

        return false;
    },


    isUserAuthorized: async function isUserAuthorized() {
        try {
            const userDevice = Device.modelName


            const userToken = await AsyncStorage.getItem('userToken')
            const pushToken = await AsyncStorage.getItem('pushToken')
            console.log('pushToken', pushToken)
            // console.log('storage', userToken)

            if (!userToken) {
                return false;
            }

            const check = await axios.post(
                `${domen}/api/admin_api/authFunctions`,
                {
                    function: 'isUserAuthorized',
                    userToken: userToken,
                    userDevice: userDevice,
                    native: true,
                    pushToken
                },
            );

            // // console.log('check', check.data)

            // return res.data

            // const check = await API.auth.checkUserToken(userToken, userDevice)

            // // console.log('check', check)

            return (check.data)
        } catch (e) {
            return { error: e, function: 'isUserAuthorized' }
        }
    },

    authorizeUserAxios: async function authUserAxios(userId, device, adminPassword) {
        try {
            let tokenVariables = false;
            if(adminPassword) {
                tokenVariables = adminPassword
            } else if (device) {
                tokenVariables = device + '-' + userId
            }

            const pushToken = await AsyncStorage.getItem('pushToken');
            const addTokenToUser = await axios.get(
                `${domen}/api/admin_api/authFunctions`,
                {
                    params: {
                        fields: {
                            function: 'authorize',
                            userId,
                            device,
                            tokenVariables,
                            pushToken
                        }
                    }
                }
            );
            // // console.log('addTokenToUser', addTokenToUser.data)
            if (addTokenToUser.data.error) {
                return addTokenToUser.data
            } else if (addTokenToUser.data.update.itemId) {
                await AsyncStorage.setItem('userToken', addTokenToUser.data.token)
                
                const getUserInfo = await API.get.user({window_host: domen, filter: {id: addTokenToUser.data.update.itemId}, limit: '1'});
                return {user: getUserInfo, visited: getUserInfo && (getUserInfo.last_login_date ? true : false)}
            } else {
                return ({ error: "Произошла необрабатываемая ошибка" })
            }
        } catch (e) {
            return { error: e, function: 'authorizeUserAxios' }
        }
        // if (addTokenToUser.data.error) {
        //     return addTokenToUser.data
        // } else if (addTokenToUser.data.itemId) {
        //     await AsyncStorage.setItem()
        //     const getUserInfo = await API.get.user({window_host: domen,filter: {id: userId}, limit: '1'});
        //     return {id: addTokenToUser.data.itemId, visited: getUserInfo.last_login_date ? true : false}
        // } else {
        //     return ({ error: "Произошла необрабатываемая ошибка" })
        // }
    },

    userPasswordAuth: async function userPasswordAuth(userFilter, adminPassword) {

        const userDevice = Device.modelName

        if (!userFilter) {
            return { error: 'Фильтр пользователя обязателен' }
        }

        const verify = await axios.get(
            `${domen}/api/admin_api/authFunctions`,
            {
                params: {
                    fields: {
                        function: 'passwordAuth',
                        userFilter,
                        userDevice,
                        adminPassword,
                        native: true
                    }
                }
            }
        );

        if (verify?.data?.token) {
            await AsyncStorage.setItem('userToken', verify.data.token)
            return true
        }
        return false
    },

    exitAccount: async function authExitAccount() {
        const res = await axios.post(
            `${domen}/api/admin_api/authFunctions`,
            { function: 'exitAccount' },
        );
        return res.data
    },

    checkCode: async function authCheckCode(userId, inputOtp) {
        try {
            // // console.log(`${domen}/api/user/checkSmsCode`)
            const request = await axios.get(
                `${domen}/api/user/checkSmsCode`,
                {
                    params: {
                        fields: {
                            userId: userId,
                            userInputOtp: inputOtp,
                        }
                    }
                }
            );

            // // console.log('correctuin', request?.data?.response)
            if (request?.data?.response == 'correct') {
                const userDevice = Device.modelName
                const authorization = await API.auth.authorizeUserAxios(
                    userId,
                    userDevice
                );

                // console.log('authorization', authorization)
            }
            return request.data
        } catch (e) {
            return { error: e, function: "checkCode" }
        }
    },

    sendCode: async function authSendCall(userPhone, type = 'call') {
        try {
            const request = await axios.get(
                `${domen}/api/user/sendSmsCode`,
                {
                    params: {
                        fields: {
                            phone: userPhone,
                            window_host: domen,
                            type,
                        }
                    }
                }
            );
            return request.data
        } catch (e) {
            return { error: e, function: 'smsRu' }
        }

    }
}