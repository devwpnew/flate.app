import api from "../../api/service/api";
import { paths } from "./config";

export const handleDeepLink = async (path) => {
  const pathParts = path.split("/");

  if (!pathParts) {
    return null;
  }
  const lastPathEl = pathParts[pathParts.length - 1];


  if (!lastPathEl) {
    return null;
  }

  const screen = getScreenBySlug(lastPathEl);

  if (screen) {
    return {
      screen: screen,
    };
  }

  const section = await getSectionBySlug(lastPathEl);

  if (section) {
    return {
      screen: "Category",
      params: {
        name: section.name,
        section: section,
      },
    };
  }

  const product = await getProductBySlug(lastPathEl);

  if (product) {
    return {
      screen: "Page",
      params: {
        name: product.name,
        product: product,
      },
    };
  }

  const user = await getUserByUsername(lastPathEl);

  if (user) {
    return {
      screen: "SearchPage",
      params: {
        title: user?.user_name,
        filter: { user_id: user.id },
      },
    };
  }
};

export const getScreenBySlug = (slug) => {
  for (const screen in paths) {
    const webPaths = paths[screen].webPaths;

    if (webPaths.includes(slug)) {
      return screen;
    }
  }
};

export const getSectionBySlug = async (slug) => {
  const sections = await api.get.sections({
    sort: {
      id: "asc",
    },
    filter: {
      active: true,
    },
    window_host: "https://flate.pro",
  });

  const section = sections.filter((section) => section.slug == slug);
  if (section.length > 0) {
    return section[0];
  }

  return null;
};

export const getProductBySlug = async (slug) => {
  const product = await api.get.product.list({
    window_host: "https://flate.pro",
    filter: {
      published: "1",
      slug: slug,
    },
    limit: 1,
    sort: { sort: "ASC" },
  });

  if (product && product.id) {
    return product;
  }

  return null;
};

export const getUserByUsername = async (username) => {
  const id = parseInt(username);

  const filter = {};

  if (!isNaN(id)) {
    filter["id"] = id;
  } else {
    filter["sef_code"] = username;
  }

  const user = await api.get.user({
    sort: {
      id: "asc",
    },
    filter: filter,
    window_host: "https://flate.pro",
  });

  if (user) {
    return user[0];
  }

  return null;
};
