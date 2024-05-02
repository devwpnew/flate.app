import isJson from "../formatters/isJson";
const imageNotFound = "../../assets/thumb-not-found.jpg";

export const dateOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};

export function getProductSection(product) {
  const section = product?.section_relation[0];
  let name = section.name;

  switch (section.name) {
    case "Квартиры":
      name = "Квартира";
      break;
    case "Дома":
      name = "Дом";
      break;
    case "Земля":
      name = "Земля";
      break;
    case "Коммерция":
      name = "Коммерция";
      break;
    case "Паркинги":
      name = "Паркинг";
      break;
  }

  return name;
}

export function getProductRooms(product) {
  let rooms = "-";

  const possibleRooms = {
    0: 1,
    1: 2,
    2: 3,
    3: 4,
    5: "Студия",
    6: "Свободная планировка",
  };

  if (product?.product_room_count) {
    rooms = possibleRooms[product.product_room_count];
  }

  return rooms;
}

export function getProductFloor(product) {
  let from = "-";
  let to = "-";

  if (product?.properties?.product_floor) {
    from = product.properties.product_floor;
  }

  if (product?.flat_floors) {
    to = product?.flat_floors;
  }

  let floors = `${from}/${to}`;

  return floors;
}

export function getProductSquares(product) {
  let squares = "";
  if (product?.land_squares) {
    squares = product?.land_squares;
  }

  if (product?.object_squares) {
    squares = product?.object_squares;
  }

  if (product?.living_squares) {
    squares = product?.living_squares;
  }

  return squares;
}

function formateAddress(address) {
  const replacements = [
    [/россия/gi, ""],
    [/краснодарский край/gi, ""],
    [/городской округ/gi, ""],
    [/сочи/gi, ""],
    [/краснодар/gi, ""],
    [/микрорайон/gi, "мкр"],
    [/улица/gi, "ул"],
    [/село/gi, "с."],
    [/садоводческое некоммерческое товарищество/gi, "СНТ"],
    [/посёлок городского типа/gi, "ПГТ"],
    [/жилой район/gi, ""],
    [/садовое товарищество/gi, "СТ"],
    [/садоводческое товарищество/gi, "СТ"],
    [/поселок/gi, "п."],
    [/посёлок/gi, "п."],
    // [/\s+/g, ""],
    [",,", ""],
    [", ,", ""],
    [",  ", ""],
    [",, ", ""],
    [/(^, |, $)/g, ""],
  ];

  replacements.forEach(([pattern, replacement]) => {
    address = address.replace(pattern, replacement);
  });

  address = address.trim();

  return address;
}

export function getProductAddressNew(product) {
  let address = getProductAddress(product);

  if (product?.building_link?.name) {
    address = product.building_link.name;
  }

  if (product?.rc_link?.name) {
    address = product.rc_link.name;
  }

  address = formateAddress(address);

  return address;
}

export function getProductAddress(product) {
  let address = product?.properties?.product_address;

  if (!address) {
    return (
      <>
        {product?.city_link.name}

        {product?.area_link && product?.area_link?.name && (
          <>
            {", "}р-н {product?.area_link?.name}
          </>
        )}
      </>
    );
  } else {
    return address;
  }
}

export function getProductDate(product) {
  let date = "";

  if (product?.date_published) {
    date = product?.date_published;
  }

  // if (product?.date_created) {
  //   date = product?.date_created;
  // }

  return new Date(date).toLocaleDateString("ru-RU", dateOptions);
}

export function getProductPrice(product) {
  const numberFormat = new Intl.NumberFormat("ru");
  const pr = product?.product_price;

  if (pr) {
    return numberFormat.format(product.product_price);
  } else {
    ("");
  }
}

export function getProductPriceSquares(product) {
  const numberFormat = new Intl.NumberFormat("ru");

  let squares = 0;

  const pr = product?.product_price;

  if (pr) {
    if (product?.land_squares) {
      squares = product?.land_squares;
    }

    if (product?.object_squares) {
      squares = product?.object_squares;
    }

    if (product?.living_squares) {
      squares = product?.living_squares;
    }

    return numberFormat.format(Math.ceil(product.product_price / squares));
  } else {
    return "";
  }
}

export function getProductPublished(product) {
  const publishedObj = {
    0: "moderated",
    1: "active",
    2: "archive",
  };

  return publishedObj[product.published];
}

export function getProductImageSrc(product) {
  const srcUrl = "https://flate.pro";
  let imageSrc = null;

  if (product?.image) {
    if (isJson(product.image)) {
      imageSrc = srcUrl + JSON.parse(product.image)[0];
    } else {
      if (product.image.length > 5) {
        imageSrc = srcUrl + product.image;
      } else {
        imageSrc = false;
      }
    }
  }

  if (imageSrc) {
    return { uri: imageSrc };
  } else {
    return { uri: srcUrl + "/thumb-not-found.jpg" };
  }
}

export function getProductGallery(product) {
  const srcUrl = "https://flate.pro";
  const gallery = product?.properties?.product_galery?.split(",");

  if (gallery) {
    const arGallery = JSON.parse(gallery).map((src) => srcUrl + src);

    return arGallery;
  } else {
    return [`${srcUrl}/thumb-not-found.jpg`];
  }
}
