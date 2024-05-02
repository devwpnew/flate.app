import { LinearGradient } from "expo-linear-gradient";


export default function Gradient({
  children,
  isReverseColors,
  colors = ['#1479F5', '#00CF8A'],//["#479AFF", "#1DDA9B"],
  start = { x: 0, y: 0 },//{ x: 1.0, y: 1.0 },
  end = { x: 1, y: 0 },//{ x: 0.0, y: 0.0 },
  locations = [0, 1],
  ...props
}) {
  const getColors = () => {
    let arColors = colors;

    if (isReverseColors) {
      arColors = arColors.reverse();
    }

    return arColors;
  };

  return (
    <LinearGradient
      colors={getColors()}
      start={start}
      end={end}
      locations={locations}
      {...props}
    >
      {children}
    </LinearGradient>
  );
}
