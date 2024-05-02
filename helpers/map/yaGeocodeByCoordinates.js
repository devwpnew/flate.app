export default async function yaGeocodeByCoordinates(coordinates) {
  try {
    // API-ключ Яндекс Геокодера
    var apiKey = "d1243c14-b620-45f3-b9b3-6fb17ca79202";

    // Координаты для обратного геокодирования
    var latitude = coordinates.latitude;
    var longitude = coordinates.longitude;

    // URL-адрес запроса к API Яндекс Геокодера
    var url =
      "https://geocode-maps.yandex.ru/1.x/?apikey=" +
      apiKey +
      "&format=json&geocode=" +
      longitude +
      "," +
      latitude;

    // Отправка GET-запроса к API Яндекс Геокодера
    const response = await fetch(url);
    const data = await response.json();

    // Парсинг адреса из полученного ответа
    var address =
      data.response.GeoObjectCollection.featureMember[0].GeoObject
        .metaDataProperty.GeocoderMetaData.Address.formatted;

    // Ваше дальнейшее действие с полученным адресом
    return address;

    return { longitude, latitude };
  } catch (error) {
    // console.log("Произошла ошибка:", error);
  }
}
