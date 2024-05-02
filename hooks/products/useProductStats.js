import { useState } from "react";
import { useEffect } from "react";
import api from "../../api/service/api";

export default function useProductStats(id) {
  const [isLoading, setIsLoading] = useState(false);
  const [inFavorite, setFavoriteStat] = useState(0);
  const [expiry, setProductExpiry] = useState(0);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const favCount = await api.get.product.favoritesCount(id);
      const expiry = await api.get.product.expiry(id);

      if (favCount) {
        setFavoriteStat(favCount);
      }

      if (expiry) {
        setProductExpiry(expiry);
      }
      setIsLoading(false);
    })();
  }, []);

  return {
    inFavorite: inFavorite.count,
    expiry: expiry,
    isLoading: isLoading,
  };
}
