import isJson from "../isJson";

export default function getProductImageSrc(product) {
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
  return imageSrc;
}
