export default async function yaGeocodeByAddress(address, type) {
  try {
    // API-ключ Яндекс Геокодера
    var apiKey = "d1243c14-b620-45f3-b9b3-6fb17ca79202";

    // URL-адрес запроса к API Яндекс Геокодераа
    var url =
      "https://geocode-maps.yandex.ru/1.x/?apikey=" +
      apiKey +
      "&format=json&geocode=" +
      encodeURIComponent(address);

    // Отправка GET-запроса к API Яндекс Геокодера
    const response = await fetch(url);
    const data = await response.json();

    if (type === "suggested") {
      const suggested = [];

      // &spn=3.552069,2.400552
      const suggestedResultsArray =
        data.response.GeoObjectCollection.featureMember;

      if (suggestedResultsArray) {
        suggestedResultsArray.map((suggestedItem) => {
          const name = suggestedItem.GeoObject.name;
          const description = suggestedItem.GeoObject.description;

          const address = `${name}, ${description}`;

          suggested.push(address);
        });
      }


      return suggested;
      
    } else {
      // Парсинг координат из полученного ответа
      var coordinates =
        data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(
          " "
        );

      var longitude = parseFloat(coordinates[0]);
      var latitude = parseFloat(coordinates[1]);


      return { longitude, latitude };
    }
  } catch (error) {
    // console.log("Произошла ошибка:", error);
  }
}
