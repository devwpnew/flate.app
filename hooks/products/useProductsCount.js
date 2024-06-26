import API from "../../api/service/api";
import { useState, useEffect } from "react";

export default function useProductsCount(callback) {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState(null);

  async function getProducts(params) {
    const requestParams = {
      ...params,
    };

    const response = await API.get.product.count({ ...requestParams });
    return response;
  }

  useEffect(() => {
    (async function () {
      try {
        setError(null);
        setLoading(true);
        const response = await getProducts({
          window_host: "https://flate.pro",
          ...callback,
        });

        setProducts(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [callback]);
  // // console.log(callback, 'callback');
  return { products, error, isLoading };
}

// const activeCity = useSelector((state) => state.userCity.value);

// const products = useProductsCount(
//   useMemo(() => {
//     return {
//       filter: {
//         published: 1,
//         city_link: activeCity.id,
//       },
//     };
//   }, [activeCity])
// );
