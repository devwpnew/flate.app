export default function emailConfirmationTemplate(code){
    return (`
        <a href=https://flate.pro/user/profile/settings/?email_confirmation=${code}>Подтвердить</a>
        Вставить: https://flate.pro/user/profile/settings/?email_confirmation=${code}
    `)
}