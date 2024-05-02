import Paragraph from "../../../../ui/text/paragraph";

import declension from "../../../../../helpers/formatters/declension";

export default function ExpiryCount({ isLoading, count }) {
  const getColor = () => {
    let color = "";

    if (!count) color = "grey-medium";
    if (count == 0) color = "grey-medium";
    if (count < 10) color = "red";
    if (count >= 10) color = "blue";
    if (count >= 20) color = "green";

    return color;
  };

  return (
    <>
      {!isLoading && (
        <Paragraph numberOfLines={1} color={getColor()} size="md">
          {declension(count, ["Остался", "Осталось", "Осталось"])} {count}{" "}
          {declension(count, ["день", "дня", "дней"])}
        </Paragraph>
      )}
    </>
  );
}
