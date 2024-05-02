import API from "../../api/service/api";
import { useState, useEffect } from "react";

import formattedFilterProps from "../../helpers/filter/formattedFilterProps";

export default function useFilterProp(propName) {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setProps] = useState(null);

  async function fetchProps(prop) {
    let response = [];
    if (Array.isArray(prop)) {
      await Promise.all(
        prop.map(async (item) => {
          const propRes = await API.get.fieldInfo("product", item.name);

          if (propRes?.descObj?.result_options) {
            response.push({
              title: item.title,
              name: item.name,
              value: formattedFilterProps(propRes?.descObj?.result_options),
            });
          }
        })
      );
    } else {
      response = await API.get.fieldInfo("product", prop);

      if (response?.descObj?.result_options) {
        response = formattedFilterProps(response?.descObj?.result_options);
      }
    }

    return response;
  }

  useEffect(() => {
    (async function () {
      try {
        setError(null);
        setLoading(true);

        const response = await fetchProps(propName);

        setProps(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { data, error, isLoading };
}
