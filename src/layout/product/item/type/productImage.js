import { Image, ImageBackground } from "expo-image";
// import { Image, ImageBackground } from "react-native";

// import { ImageBackground } from "../../../../ui/image/imageBackground";

import { useRef, useState } from "react";

import Preloader from "../../../../ui/preloader/preloader";
import { colors } from "../../../../ui/config";

const blurhash = "LDQ^2Uoz_4ofoffQt8j[?cfQD$fQ";

export default function ProductImage({ style = {}, children, ...props }) {
  const tries = useRef(0);

  const [isLoading, setIsLoading] = useState(false);

  const onLoadHandler = () => {
    if (tries.current >= 1) {
      return;
    }

    setIsLoading(true);
    tries.current = tries.current + 1;
  };

  const getLayout = () => {
    if (children) {
      return (
        <>
          <ImageBackground
            style={{ ...style, backgroundColor: colors["grey-light"] }}
            transition={1000}
            placeholder={require("../../../../../assets/empty-grey-light.jpg")}
            {...props}
          >
            {children}
          </ImageBackground>
        </>
      );
    }

    return (
      <>
        <Image
          cachePolicy={'memory-disk'}
          style={{ ...style, backgroundColor: colors["grey-light"] }}
          transition={1000}
          placeholder={require("../../../../../assets/empty-grey-light.jpg")}
          {...props}
        />
      </>
    );
  };

  const layout = getLayout();

  return layout;
}
