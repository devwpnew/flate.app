import base64 from "base-64";

import axios from "axios";

const api = axios.create({
  baseURL: "https://flate.pro",
});

export async function post(path, data = {}) {
  if (!path) {
    throw new Error("Invalid path");
  }

  try {
    const response = await api.post(path, data);
    const results = response.data;

    if (typeof results === "string") {
      return {
        msg: results,
      };
    } else {
      return results;
    }
  } catch (error) {
    throw new Error(`Error in post request: ${error.message}`);
  }
}

export function encodeData(data) {
  const jsonString = JSON.stringify(data);
  const encodedString = base64.encode(jsonString);
  return encodedString;
}

export function decodeData(encodedString) {
  const jsonString = base64.decode(encodedString);
  const decodedData = JSON.parse(jsonString);

  return decodedData;
}