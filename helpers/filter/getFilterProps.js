import propsObj from "./propsObj";

export default function getFilterProps(slug) {
  const propsFields = [];
  const rangeFields = [];

  const possibleProps = propsObj;

  if (slug === "flats" || slug === "rc" || slug == 3) {
    propsFields.push(
      possibleProps.status,
      possibleProps.product_room_count,
      possibleProps.mortgage,
      possibleProps.repairment,
      possibleProps.sum_contract,
      possibleProps.handed_over
    );
    rangeFields.push(possibleProps.living_squares, possibleProps.product_price);
  }

  if (slug === "houses" || slug == 4) {
    propsFields.push(
      possibleProps.house_types,
      possibleProps.house_floors,
      possibleProps.house_construction,
      possibleProps.house_communication,
      possibleProps.sum_contract,
      possibleProps.mortgage
    );
    rangeFields.push(
      possibleProps.living_squares,
      possibleProps.land_squares,
      possibleProps.product_price
    );
  }

  if (slug === "commertion" || slug == 5) {
    propsFields.push(possibleProps.commercial_types);
    rangeFields.push(possibleProps.object_squares, possibleProps.product_price);
  }

  if (slug === "land" || slug == 6) {
    propsFields.push(
      possibleProps.status_lands,
      possibleProps.house_communication,
      possibleProps.mortgage,
      possibleProps.sum_contract
    );
    rangeFields.push(possibleProps.land_squares, possibleProps.product_price);
  }

  if (slug === "parkings" || slug == 7) {
    propsFields.push(possibleProps.parking_types);
    rangeFields.push(possibleProps.object_squares, possibleProps.product_price);
  }

  return {
    propsFields,
    rangeFields,
  };
}
