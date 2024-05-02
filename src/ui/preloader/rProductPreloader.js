import { useId } from "react";
import Preloader from "./preloader";

export default function RProductPreloader({ amount, style = {} }) {
  const amountItems = [];

  for (let i = 0; i < amount; i++) {
    const id = useId()
    amountItems.push(<Preloader key={id} style={{ ...style }} />);
  }
  return <>{amountItems}</>;
}
