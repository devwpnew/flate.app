import Preloader from "./preloader";

export default function ProductPreloader({ amount, style = {} }) {
  const amountItems = [];

  for (let i = 0; i < amount; i++) {
    amountItems.push(<Preloader key={i} style={style} />);
  }
  return <>{amountItems}</>;
}
