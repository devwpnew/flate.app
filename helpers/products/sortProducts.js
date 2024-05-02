export default function sortProducts(sort, products) {
  if (!sort || !products || products.length === 0) return null;

  const clone = products.slice(0);

  if (sort?.id === "price-DESC") {
    return clone.sort((a, b) => b.product_price - a.product_price);
  }

  if (sort?.id === "price-desc") {
    return clone.sort((a, b) => a.product_price - b.product_price);
  }

  if (sort?.id === "rc_link-ASC") {
    const filtered = clone.filter((p) => p.rc_link);
    const sorted = filtered.sort(function (a, b) {
      if (a.rc_link.name.toLowerCase() < b.rc_link.name.toLowerCase()) {
        return -1;
      }
      if (a.rc_link.name.toLowerCase() > b.rc_link.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    
    
    return sorted;
  }

  if (sort?.id === "rc_link-DESC") {
    const filtered = clone.filter((p) => p.rc_link);
    const sorted = filtered.sort(function (a, b) {
      if (a.rc_link.name.toLowerCase() > b.rc_link.name.toLowerCase()) {
        return -1;
      }
      if (a.rc_link.name.toLowerCase() < b.rc_link.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    return sorted;
  }

  if (sort?.id === "date_created-DESC") {
    return clone.sort(
      (a, b) =>
        new Date(b.date_published).getTime() -
        new Date(a.date_published).getTime()
    );
  }

  if (sort?.id === "date_created-ASC") {
    return clone.sort(
      (a, b) =>
        new Date(a.date_published).getTime() -
        new Date(b.date_published).getTime()
    );
  }

  if (sort?.id === "default") {
    return clone;
    // return clone.sort(
    //   (a, b) =>
    //     new Date(a.date_published).getTime() -
    //     new Date(b.date_published).getTime()
    // );
  }

  if (sort?.id === "name-ASC") {
    return clone.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }

  if (sort?.id === "name-DESC") {
    return clone.sort(function (a, b) {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    });
  }

  if (sort?.id === "squares-ASC") {
    return clone.sort((a, b) => {
      const squaresA =
        a && a.living_squares !== null ? a.living_squares : a && a.land_squares;
      const squaresB =
        b && b.living_squares !== null ? b.living_squares : b && b.land_squares;

      return squaresB - squaresA;
    });
  }

  if (sort?.id === "squares-DESC") {
    return clone.sort((a, b) => {
      const squaresA =
        a && a.living_squares !== null ? a.living_squares : a && a.land_squares;
      const squaresB =
        b && b.living_squares !== null ? b.living_squares : b && b.land_squares;

      return squaresA - squaresB;
    });
  }

  if (sort?.id === "squares-price-ASC") {
    return clone.sort((a, b) => {
      const squaresA =
        a && a.living_squares !== null ? a.living_squares : a && a.land_squares;
      const squaresB =
        b && b.living_squares !== null ? b.living_squares : b && b.land_squares;
      const priceA = a.product_price / squaresA;
      const priceB = b.product_price / squaresB;

      return priceB - priceA;
    });
  }

  if (sort?.id === "squares-price-DESC") {
    return clone.sort((a, b) => {
      const squaresA =
        a && a.living_squares !== null ? a.living_squares : a && a.land_squares;
      const squaresB =
        b && b.living_squares !== null ? b.living_squares : b && b.land_squares;
      const priceA = a.product_price / squaresA;
      const priceB = b.product_price / squaresB;

      return priceA - priceB;
    });
  }
}
