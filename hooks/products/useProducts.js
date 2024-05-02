import API from "../../api/service/api";
import { useState, useEffect } from "react";

export default function useProducts(callback) {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setProducts] = useState(null);

  async function getProducts(params) {
    const requestParams = {
      ...params,
    };

    // // console.log(requestParams, 'requestParams');

    const response = await API.get.product.list({ ...requestParams });

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
        
        if (Object.keys(response).includes("Error")) {
          setError(response);
        } else {
          setProducts(response);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [callback]);

  return { data, error, isLoading };
}

// const activeCity = useSelector((state) => state.userCity.value);

// const products = useProducts(
//   useMemo(() => {
//     return {
//       filter: {
//         published: 1,
//         city_link: activeCity.id,
//       },
//     };
//   }, [activeCity])
// );
