import FaqItem from "./faqItem";

export default function FaqItems({ arItems }) {
  if (!arItems) return <></>;

  return (
    <>
      {arItems.map((el) => {
        const item = el.item;
        const arAnswer = item.textContent;

        return <FaqItem item={item} arAnswer={arAnswer} />;
      })}
    </>
  );
}